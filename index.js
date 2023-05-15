const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("./models/user");

//Please enter the connection URI from you local or cloud MongoDB instance.
// Sample URI: mongodb+srv://{username}:{password}@tasks.*******.mongodb.net/{database name}?retryWrites=true&w=majority
const uri = "ADD THE CONNECTION STRING FROM YOUR MONGODB INSTANCE";

mongoose.set("strictQuery", true);
mongoose.connect(uri, {
  useNewUrlParser: true,
});
const authRoute = require("./routes/auth");
const emailRoute = require("./routes/emailRoute");
const allowanceRoute = require("./routes/allowanceRoute");
const expenseRoute = require("./routes/expenseRoute");
app.use(cors());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret:
      "SESSION KEY CAN BE ANYTHING, WE ARE NOT USING COOKIES FOR PERSISTENCE",
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((obj, callBack) => {
  callBack(null, obj);
});
passport.use(
  new FacebookStrategy(
    //Please add client ID and Client secret from your facebook authentication app.
    {
      clientID: "CLIENT ID FROM YOUR FACEBOOK APP",
      clientSecret: "CLIENT SECRET FROM YOUR FACEBOOK APP",
      callbackURL: "http://localhost:5000/api/user/auth/facebook/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const currentUser = await User.findOne({
        userid: profile._json.id,
      });
      if (!currentUser) {
        const newUser = await new User({
          userid: profile._json.id,
        }).save();
        if (newUser) {
          return done(null, newUser);
        }
      }
      return done(null, currentUser);
    }
  )
);

app.use(express.json());
app.use("/api/user", authRoute);
app.use("/api/email", emailRoute);
app.use("/api/allowance", allowanceRoute);
app.use("/api/expense", expenseRoute);
const port = 5000;
app.listen(port, () => console.log("Server is up and running"));
