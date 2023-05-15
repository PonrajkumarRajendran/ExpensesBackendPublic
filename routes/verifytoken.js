const jwt = require("jsonwebtoken");
const token_secret = "YOU CAN USE ANY CODE YOU WANT";
module.exports = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(400).send("Access Denied");
  try {
    const verified = jwt.verify(token, token_secret);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};
