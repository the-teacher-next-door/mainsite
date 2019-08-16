const router = require("express").Router();
const passport = require("passport");
const usersController = require("../Controllers/usersController");

router.route("/checkLogin").get(usersController.checkLogin);

// login
// router.post('/login', passport.authenticate('local', {
//   successRedirect: '/admin',
//   failureRedirect: '/login'
// }));

router.post("/login", function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      return next(err);
    }
    // Redirect if it fails
    if (!user) {
      return res.redirect("/login");
    }
    req.logIn(user._id, function(err) {
      if (err) {
        return next(err);
      }
      // Redirect if it succeeds
      console.log(user);
      if (user.username === "admin") {
        return res.redirect("/admin");
      } else {
        return res.redirect("/teacher-freebies");
      }
    });
  })(req, res, next);
});

router.route("/users/find/:id").get(usersController.findById);

// logout
router.get("/logout", (req, res) => {
  req.logout();
  res.send(false);
});

router.route("/register").post(usersController.createUser);

// req.login uses these functions
passport.serializeUser((user_id, done) => {
  done(null, user_id);
});
// this gets the users info
passport.deserializeUser((user_id, done) => {
  done(null, user_id);
});

module.exports = router;
