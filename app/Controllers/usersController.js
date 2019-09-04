const passport = require("passport");
const saltRounds = 10;
const bcrypt = require("bcrypt");
const db = require("../Models");

module.exports = {
  checkLogin: (req, res) => {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
      console.log(`User Controller Check Login: 👍`);
      // send user id to client
      res.send(req.user);
    } else {
      console.log(`User Controller Check Login: 👎`);
      res.send(false);
    }
  },

  findById(req, res) {
    console.log(`User Controller: 🔑 ${req.params.id}`);
    db.users
      .findOne({
        _id: req.params.id
      })
      .then(userInfo => {
        res.send(userInfo);
      });
  },

  createUser: (req, res) => {
    req.checkBody("username", "Username cannot be empty.").notEmpty();
    req.checkBody("email", "Email field must not be empty.").notEmpty();
    req.checkBody("email", "Email field must be and email.").isEmail();
    req
      .checkBody("password", "Password must be 8 characters long.")
      .len(8, 100);
    req
      .checkBody("passwordMatch", "Password must be 8 characters long.")
      .len(8, 100);
    req
      .checkBody("passwordMatch", "Password must be 8 characters long.")
      .equals(req.body.password);

    const errors = req.validationErrors();

    if (errors) {
      res.send(errors);
    } else {
      // hash the password
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(req.body.password, salt);
      // bcrypt the password then insert

      db.users
        .create({
          username: req.body.username,
          email: req.body.email,
          password: hash,
          admin: req.body.admin
        })
        .then(created => {
          console.log("created a user");
          req.login(created._id, err => {
            console.log(`Create User: ✔`);
            res.send(true);
          });
        })
        .catch(err => {
          // create user errors
          // either duplicate username or email
          if (err) {
            console.log(err.errmsg);
            const data = [err.errmsg];
            res.send(err);
          }
        });
    }
  }
};
