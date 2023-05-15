const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const token_secret = "TOKENSECRETOFYOURCHOICE";
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const passwordSalt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, passwordSalt);
  const user = new User({
    passwordHash: passwordHash,
    passwordSalt: passwordSalt,
    email: email,
  });
  try {
    const savedUser = await user.save();
    const token = jwt.sign({ _id: savedUser._id }, token_secret);
    const responseObject = {
      userName: savedUser.username,
      token: token,
    };
    res.header("auth-token", token).send(responseObject);
  } catch (err) {
    res.status(400).send(err);
  }
});
router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email: email });
  if (!user) return res.status(400).send("Email is wrong");
  const passwordHash = bcrypt.hash(password, user.passwordSalt);
  const validPass = passwordHash === user.passwordHash;
  if (!validPass) return res.status(400).send("password is wrong");
  const token = jwt.sign({ _id: user._id }, token_secret);
  const responseObject = {
    userName: user.username,
    token: token,
  };
  res.header("auth-token", token).send(responseObject);
});

module.exports = router;
