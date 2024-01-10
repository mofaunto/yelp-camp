module.exports.isLoggedIn = (req, res, next) => {
  // Check whether the user is logged in or not to make new campground
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be signed in to do this");
    return res.redirect("/login");
  }
  next();
};

//Remembering the original url where user was redirected from to the login page
module.exports.storeReturnTo = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo;
  }
  next();
};
