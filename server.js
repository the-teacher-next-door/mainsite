const express = require("express");
const app = express();
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const passport = require("passport");
const expressValidator = require("express-validator");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const db = require("./Models");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
//routes imports
const User = require("./Routes/userRoutes");
const Blogs = require("./Routes/blogRoutes");
const Slider = require("./Routes/sliderRoutes");
const Images = require("./Routes/imageRoutes");
const Freebies = require("./Routes/freebiesRoutes");
const Comments = require("./Routes/commentRoutes");
const Books = require("./Routes/bookRoutes");
// Create the Express-Next App
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

//Start the app
nextApp
  .prepare()
  .then(() => {
    const server = express();

    //Storage for images
    const storage = multer.diskStorage({
      destination: "./public/uploads/",
      filename: function(req, file, cb) {
        cb(
          null,
          file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
      }
    });

    const freebiesStorage = multer.diskStorage({
      destination: "./public/freebies/",
      filename: function(req, file, cb) {
        cb(null, "Freebie-" + Date.now() + path.extname(file.originalname));
      }
    });
    //cors info

    server.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      next();
    });

    // Init Upload
    const upload = multer({
      storage: storage,
      limits: { fileSize: 1000000 },
      fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
      }
    }).single("myImage");

    const freebiesUpload = multer({
      storage: freebiesStorage,
      limits: { fileSize: 10000000 },
      fileFilter: function(req, file, cb) {
        checkZipType(file, cb);
      }
    }).single("myImage");
    // Check File Type
    function checkFileType(file, cb) {
      // Allowed ext
      const filetypes = /jpeg|jpg|png|gif/;
      // Check ext
      const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      // Check mime
      const mimetype = filetypes.test(file.mimetype);

      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb("Error: Images Only!");
      }
    }
    function checkZipType(file, cb) {
      // Allowed ext
      const filetypes = /zip/;
      // Check ext
      const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      // Check mime
      const mimetype = filetypes.test(file.mimetype);

      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb("Error: Zips Only!");
      }
    }
    server.use(express.urlencoded({ extended: true }));
    server.use(express.json());
    server.use(expressValidator());

    //need to set production var
    // mongoose
    //   .connect(
    //     "mongodb://bobby:sac6kings@localhost:27017/tnd?authSource=admin" ||
    //       "mongodb://localhost/tnd",
    //     {
    //       useNewUrlParser: true
    //     }
    //   )
    //   .then(() => {
    //     console.log("connected");
    //   });

    // // store the session in mongo db
    // const store = new MongoDBStore({
    //   uri:
    //     "mongodb://bobby:sac6kings@localhost:27017/tnd?authSource=admin" ||
    //     "mongodb://localhost/tnd",
    //   collection: "sessions"
    // });

    mongoose
      .connect(process.env.MONGOLAB_ORANGE_URI || "mongodb://localhost/tnd", {
        useNewUrlParser: true
      })
      .then(() => {});

    // store the session in mongo db
    const store = new MongoDBStore({
      uri: process.env.MONGOLAB_ORANGE_URI || "mongodb://localhost/tnd",
      collection: "sessions"
    });
    // session
    server.use(
      session({
        secret: "4u9824389ijofsf982u4josafasfd938afdapldksfj poia a0 f2p0jr",
        resave: false,
        saveUninitialized: false,
        store
      })
    );

    // passport
    server.use(passport.initialize());
    server.use(passport.session());

    //route definitions
    server.use("/api", User);
    server.use("/api", Blogs);
    server.use("/api", Slider);
    server.use("/api", Images);
    server.use("/api", Freebies);
    server.use("/api", Comments);
    server.use("/api", Books);

    //serve images
    server.use(
      "/public/uploads",
      express.static(path.join(__dirname, "public/uploads"))
    );

    server.use(
      "/public/freebies",
      express.static(path.join(__dirname, "public/freebies"))
    );
    //  Passport use
    passport.use(
      new LocalStrategy((username, password, done) => {
        // When username is sent, find match in database.
        db.users
          .findOne({
            username
          })
          .then(
            user => {
              if (user === null) {
                // User was not found in the database.
                done(null, false);
              }
              const passwordCheck = bcrypt.compareSync(password, user.password);

              // User was found in the database.
              if (passwordCheck === true) {
                return done(null, user);
              }

              return done(null, false);
            },
            error => {
              console.log(error);
            }
          );
      })
    );

    //check the logged in user
    const checkUser = async id => {
      let user = await db.users.findById(id);
      let data = user.json();
      return data;
    };

    server.get("/", (req, res) => {
      return nextApp.render(req, res, "/");
    });

    server.get("/blog/:slug", (req, res) => {
      return nextApp.render(req, res, "/blog", { q: req.params.slug });
    });

    server.get("/my-blog/:slug", (req, res) => {
      return nextApp.render(req, res, "/my-blog", { q: req.params.slug });
    });

    server.get("/admin", (req, res) => {
      db.users.findById(req.user).then(user => {
        if (req.isAuthenticated() && user.username === "admin") {
          return nextApp.render(req, res, "/admin");
        } else {
          return nextApp.render(req, res, "/admin-login");
        }
      });
    });

    server.get("/admin-images", (req, res) => {
      db.users.findById(req.user).then(user => {
        if (req.isAuthenticated() && user.username === "admin") {
          return nextApp.render(req, res, "/admin-images");
        } else {
          return nextApp.render(req, res, "/admin-login");
        }
      });
    });

    server.get("/admin-slider", (req, res) => {
      db.users.findById(req.user).then(user => {
        if (req.isAuthenticated() && user.username === "admin") {
          return nextApp.render(req, res, "/admin-slider");
        } else {
          return nextApp.render(req, res, "/admin-login");
        }
      });
    });
    server.get("/admin-freebies", (req, res) => {
      db.users.findById(req.user).then(user => {
        if (req.isAuthenticated() && user.username === "admin") {
          return nextApp.render(req, res, "/admin-freebies");
        } else {
          return nextApp.render(req, res, "/admin-login");
        }
      });
    });
    server.get("/admin-blog/:slug", (req, res) => {
      db.users.findById(req.user).then(user => {
        if (req.isAuthenticated() && user.username === "admin") {
          return nextApp.render(req, res, "/admin-blog", {
            q: req.params.slug
          });
        } else {
          return nextApp.render(req, res, "/admin-login");
        }
      });
    });
    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.post("/api/upload", (req, res) => {
      console.log(req.file);
      upload(req, res, err => {
        if (err) {
          res.send({
            msg: err
          });
        } else {
          if (req.file === undefined) {
            res.send({
              msg: "No file selected"
            });
          } else {
            //store file in db
            db.images.create(req.file).then(done => {
              res.send({
                msg: "File Uploaded",
                file: `uploads/${req.file.filename}`
              });
            });
          }
        }
      });
    });

    server.post("/api/freebies/upload", (req, res) => {
      freebiesUpload(req, res, err => {
        let file = req.file;
        file.img = "";
        if (err) {
          res.send({
            msg: err
          });
        } else {
          if (req.file === undefined) {
            res.send({
              msg: "No file selected"
            });
          } else {
            //store file in db
            db.freebies.create(req.file).then(done => {
              res.send({
                msg: "File Uploaded",
                file: `uploads/${req.file.filename}`
              });
            });
          }
        }
      });
    });

    server.put("/api/image/delete", (req, res) => {
      console.log(__dirname + "/" + req.body.path);
      fs.unlink(__dirname + "/" + req.body.path, err => {
        db.images
          .findOneAndRemove({
            path: req.body.path
          })
          .then(done => {
            res.send({ msg: "removed" });
          });
      });
    });

    server.put("/api/freebies/delete", (req, res) => {
      console.log(__dirname + "/" + req.body.path);
      fs.unlink(__dirname + "/" + req.body.path, err => {
        db.freebies
          .findOneAndRemove({
            path: req.body.path
          })
          .then(done => {
            res.send({ msg: "removed" });
          });
      });
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
