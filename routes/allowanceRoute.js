const router = require("express").Router();
const verify = require("./verifytoken");
const User = require("../models/user");
router.post("/addallowance", verify, async (req, res) => {
  const userid = req.user._id;
  try {
    const facebookuser = await User.findOne({ userid: userid });
    if (!facebookuser) {
      const modifiedUser = await User.updateOne(
        { _id: userid },
        { allowance: req.body.allowance }
      );
    } else {
      const newModifiedUser = await User.updateOne(
        { userid: userid },
        { allowance: req.body.allowance }
      );
    }
    return res.status(200).send("Successfully Updated");
  } catch (err) {
    return res.status(400).send("Error while updating");
  }
});
router.post("/getallowance", verify, async (req, res) => {
  const userid = req.user._id;
  try {
    const facebookuser = await User.findOne({ userid: userid });
    if (!facebookuser) {
      const anotherUser = await User.findOne({ _id: userid });
      const responseObject = {
        allowance: anotherUser.allowance,
      };
      return res.status(200).send(responseObject);
    } else {
      const anotherResponseObject = {
        allowance: facebookuser.allowance,
      };
      return res.status(200).send(responseObject);
    }
  } catch (err) {
    return res.status(400).send("Error while getting allowance");
  }
});
module.exports = router;
