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
const nodemailer = require("nodemailer");
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

    //tinify
    const tinify = require("tinify");
    tinify.key = "WzqmfsbnJKXCv0Zv9Mrw0b3FyGy8msQd";

    // Init Upload
    const upload = multer({
      storage: storage,
      limits: { fileSize: 90000000 },
      fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
      }
    }).single("myImage");

    const freebiesUpload = multer({
      storage: freebiesStorage,
      limits: { fileSize: 90000000 },
      fileFilter: function(req, file, cb) {
        checkZipType(file, cb);
      }
    }).array("myImage");
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
      const filetypes = /zip|pdf/;
      // Check ext
      const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      // Check mime
      const mimetype = filetypes.test(file.mimetype);

      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb("Error: Zips and PDFs Only!");
      }
    }
    server.use(express.urlencoded({ extended: true }));
    server.use(express.json({ limit: "100MB" }));
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
      return nextApp.render(req, res, "/index");
    });

    // blog routes
    server.get("/blog/:slug", (req, res) => {
      return nextApp.render(req, res, "/blog", { q: req.params.slug });
    });

    //for older blog routes
    server.get("/my-blog/reading/:slug", (req, res) => {
      return nextApp.render(req, res, "/blog", { q: req.params.slug });
    });

    server.get("/my-blog/writing/:slug", (req, res) => {
      return nextApp.render(req, res, "/blog", { q: req.params.slug });
    });

    server.get("/my-blog/math/:slug", (req, res) => {
      console.log(req.params.slug);
      let string = req.params.slug;

      console.log(`new ${string}`);
      return nextApp.render(req, res, "/blog", { q: req.params.slug });
    });

    server.get("/my-blog/holidays/:slug", (req, res) => {
      return nextApp.render(req, res, "/blog", { q: req.params.slug });
    });

    server.get("/my-blog/classroom-ideas/:slug", (req, res) => {
      return nextApp.render(req, res, "/blog", { q: req.params.slug });
    });

    server.get("/my-blog/:slug", (req, res) => {
      return nextApp.render(req, res, "/my-blog", { q: req.params.slug });
    });

    server.get("/contact", (req, res) => {
      return nextApp.render(req, res, "/contact");
    });

    server.get("/admin", (req, res) => {
      db.users.findById(req.user).then(user => {
        if (req.isAuthenticated() && user.admin === true) {
          return nextApp.render(req, res, "/admin");
        } else {
          return nextApp.render(req, res, "/admin-login");
        }
      });
    });

    server.get("/admin-blogs", (req, res) => {
      db.users.findById(req.user).then(user => {
        if (req.isAuthenticated() && user.admin === true) {
          return nextApp.render(req, res, "/admin-blogs");
        } else {
          return nextApp.render(req, res, "/admin-login");
        }
      });
    });

    server.get("/admin-images", (req, res) => {
      db.users.findById(req.user).then(user => {
        if (req.isAuthenticated() && user.admin === true) {
          return nextApp.render(req, res, "/admin-images");
        } else {
          return nextApp.render(req, res, "/admin-login");
        }
      });
    });

    server.get("/admin-slider", (req, res) => {
      db.users.findById(req.user).then(user => {
        if (req.isAuthenticated() && user.admin === true) {
          return nextApp.render(req, res, "/admin-slider");
        } else {
          return nextApp.render(req, res, "/admin-login");
        }
      });
    });
    server.get("/admin-freebies", (req, res) => {
      db.users.findById(req.user).then(user => {
        if (req.isAuthenticated() && user.admin === true) {
          return nextApp.render(req, res, "/admin-freebies");
        } else {
          return nextApp.render(req, res, "/admin-login");
        }
      });
    });
    server.get("/admin-blog/:slug", (req, res) => {
      db.users.findById(req.user).then(user => {
        if (req.isAuthenticated() && user.admin === true) {
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

    // upload routes

    server.post("/api/upload", (req, res) => {
      console.log(req.file);
      upload(req, res, err => {
        var source = tinify.fromFile(req.file.path);
        source.toFile(req.file.path);
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

    server.post(`/api/email/send`, async (req, res) => {
      const email_format = `
        <ul>
          <li>Name: ${req.body.name}</li> 
          <li>Email: ${req.body.email}</li>
          <li>Help Topic: ${req.body.topic}</li>
        </ul>

        <h3>Email</h3>
        <p>${req.body.text}</p>

        
      `;

      let transporter = nodemailer.createTransport({
        host: "smtp.mail.yahoo.com",
        port: 465,
        service: "yahoo",
        secure: false,
        auth: {
          user: "bobbyboyd.a@yahoo.com", // generated ethereal user
          pass: "sac6kings" // generated ethereal password
        }
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Teacher Next Door Contact Form" <bobbyboyd.a@yahoo.com>', // sender address
        to: "bboyd2008@gmail.com", // list of receivers
        subject: "The Teacher Next Door Contact Form", // Subject line
        text: "Hello world?", // plain text body
        html: email_format // html body
      });
      res.send("sent");

      console.log("Message sent: %s", info.messageId);
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
