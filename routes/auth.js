const passport = require("passport");
const token_secret = "rajknsldgiuasdgasd";
const jwt = require("jsonwebtoken");
const router = require("express").Router();

router.get("/success", async (req, res) => {
  const token = jwt.sign({ _id: req.user }, token_secret);
  const uri = "http://localhost:3000/middle/" + token;
  res.redirect(uri);
});
router.get("/failed", (req, res) => {
  res.send("Failed to login");
});
router.get("/auth/logout", (req, res) => {
  req.logout((err) => {
    if (!err) {
      res.cookie("user", "");
      res.redirect("http://localhost:3000/");
    }
  });
});

router.get("/auth/facebook", passport.authenticate("facebook"));
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "http://localhost:5000/api/user/success",
    failureRedirect: "http://localhost:5000/api/user/failed",
  })
);

router.post("/signup", (req, res) => {
  const userName = req.body.userName;
  const email = req.body.email;
  const password = req.body.password;
});
module.exports = router;
