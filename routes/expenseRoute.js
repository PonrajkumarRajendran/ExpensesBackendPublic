const router = require("express").Router();
const Expense = require("../models/expense");
const verify = require("./verifytoken");
router.post("/addexpense", verify, async (req, res) => {
  console.log("inside");
  const userid = req.user._id;
  const dateString = req.body.expenseDate;
  const expenseMonthValue =
    dateString.slice(5, 7) + "/" + dateString.slice(0, 4);
  const newExpense = new Expense({
    userid: userid,
    expenseTitle: req.body.expenseTitle,
    expenseType: req.body.expenseType,
    expenseValue: req.body.expenseValue,
    expenseDate: req.body.expenseDate,
    expenseMonth: expenseMonthValue,
  });
  const saveExpense = await newExpense.save();
  return res.status(200).send("added successfully");
});
router.post("/getweekexpense", verify, async (req, res) => {
  const userid = req.user._id;
  const weekDate = req.body.dates;

  var responseObject = [];
  responseObject = await Expense.find({
    userid: userid,
    expenseDate: weekDate,
  });
  res.send(responseObject);
});
router.post("/deleteexpense", verify, async (req, res) => {
  const deletedExpense = await Expense.deleteOne({ _id: req.body.id });
  return res.send("Successfully deleted");
});
router.post("/getmonthreport", verify, async (req, res) => {
  const userid = req.user._id;
  const monthValue = req.body.monthValue;
  const monthExpenseList = await Expense.find({
    userid: userid,
    expenseMonth: monthValue,
  });
  res.send(monthExpenseList);
});
router.post("/getmonthstotal", verify, async (req, res) => {
  const userid = req.user._id;
  const monthValue = req.body.monthValue;
  const monthExpenseList = await Expense.find({
    userid: userid,
    expenseMonth: monthValue,
  });
  var total = 0;
  var foodTotal = 0;
  var shoppingTotal = 0;
  var travelTotal = 0;
  var miscTotal = 0;
  monthExpenseList.map((index) => {
    const tempObject = index;
    total += tempObject["expenseValue"];
    if (tempObject["expenseType"] === "Food") {
      foodTotal += tempObject["expenseValue"];
    } else if (tempObject["expenseType"] === "Travel") {
      travelTotal += tempObject["expenseValue"];
    } else if (tempObject["expenseType"] === "Shopping") {
      shoppingTotal += tempObject["expenseValue"];
    } else {
      miscTotal += tempObject["expenseValue"];
    }
  });
  const responseObject = {
    total: total,
    foodTotal: foodTotal,
    shoppingTotal: shoppingTotal,
    travelTotal: travelTotal,
    miscTotal: miscTotal,
  };
  res.send(responseObject);
});
module.exports = router;
