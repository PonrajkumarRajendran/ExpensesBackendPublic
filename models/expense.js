const mongoose = require("mongoose");
const expenseSchema = new mongoose.Schema({
  userid: String,
  expenseTitle: String,
  expenseType: String,
  expenseValue: Number,
  expenseDate: String,
  expenseMonth: String,
});
module.exports = mongoose.model("Expense", expenseSchema);
