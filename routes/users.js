const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const User = require("../models/user");
const passport = require("passport");
const { storeReturnTo } = require("../middleware");

//Registration routes

router.get("/register", (req, res) => {
  res.render("users/register");
});

router.post(
  "/register",
  catchAsync(async (req, res, next) => {
    // If username already exists, this will flash the error message in the same page
    try {
      const { email, username, password } = req.body;
      const user = new User({ email, username });
      const registeredUser = await User.register(user, password);
      //Login user automatically when they register
      req.login(registeredUser, (err) => {
        if (err) return next(err);
        req.flash("success", "Welcome to Yelp Camp");
        res.redirect("/campgrounds");
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("register");
    }
  })
);

// Logging in routes

router.get("/login", (req, res) => {
  res.render("users/login");
});

// passport.authenticate for checking whether the user exists in the database
router.post(
  "/login",
  // using storeReturnTo to save returnTo value from session to res.locals
  storeReturnTo,
  //passport.authenticate logs the user and clears req.session
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  //using res.locals.returnTo to redirect user after login
  (req, res) => {
    req.flash("success", "Welcome Back!");
    const redirectUrl = res.locals.returnTo || "/campgrounds";
    res.redirect(redirectUrl);
  }
);

// Logging out

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Goodbye!");
    res.redirect("/campgrounds");
  });
});

module.exports = router;
