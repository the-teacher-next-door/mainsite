const db = require("../Models");

module.exports = {
  checkLogin: (req, res) => {
    if (req.isAuthenticated()) {
      // send user id to client
      res.send(req.user);
    } else {
      res.send(false);
    }
  },
  save: (req, res) => {
    console.log(req.body.description);
    const getRidOFSemiColon = req.body.title.toLowerCase().replace(":", "");
    const cleanTitle = getRidOFSemiColon.replace(/ /g, "-");
    db.blogs
      .updateOne(
        { _id: req.body.id },
        {
          $set: {
            username: req.body.username,
            blog: req.body.blog,
            title: req.body.title,
            cleanTitle,
            img: req.body.img,
            live: req.body.live,
            category: req.body.category,
            description: req.body.description
          }
        }
      )
      .then(done => {
        console.log(done);
        res.send(done);
      })
      .catch(err => {
        console.log("err: " + err);
        res.send({ err });
      });
  },
  new: (req, res) => {
    console.log(req.body);
    db.blogs
      .create({
        username: req.body.username,
        blog: "<p>New Blog</p>",
        title: req.body.title,
        live: false,
        views: 0,
        category: "Reading"
      })
      .then(done => {
        res.send(done);
      })
      .catch(err => {
        console.log("err: " + err);
        res.send({ err: "duplicate title" });
      });
  },
  loadall: (req, res) => {
    db.blogs.find({}).then(done => {
      res.send(done);
    });
  },
  updateViews: (req, res) => {
    db.blogs
      .updateOne(
        { _id: req.body.id },
        {
          $set: {
            views: req.body.views
          }
        }
      )
      .then(done => {
        res.send(done);
      });
  },
  load: (req, res) => {
    db.blogs
      .findOne({
        cleanTitle: req.params.title
      })
      .then(done => {
        res.send(done);
      });
  },
  loadAdmin: (req, res) => {
    db.blogs
      .findOne({
        _id: req.params.id
      })
      .then(done => {
        res.send(done);
      });
  },
  loadFour: (req, res) => {
    const query = req.params.category.replace(/\+/g, " ");
    db.blogs
      .find({ category: { $regex: query, $options: "i" } })
      .limit(4)
      .then(blogs => {
        res.send(blogs);
      });
  },
  loadEight: (req, res) => {
    db.blogs
      .find({})
      .limit(8)
      .then(blogs => {
        res.send(blogs);
      });
  },

  search: (req, res) => {
    const query = req.params.search.replace(/\+/g, " ");
    db.blogs
      .find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { category: { $regex: query, $options: "i" } }
        ]
      })
      .then(blogs => {
        res.send(blogs);
      });
  },
  categorySearch: (req, res) => {
    const query = req.params.search.replace(/\+/g, " ");
    db.blogs
      .find({ category: { $regex: query, $options: "i" } })
      .then(blogs => {
        res.send(blogs);
      });
  },
  delete: (req, res) => {
    console.log(req.params.id);
    db.blogs
      .deleteOne({
        _id: req.params.id
      })
      .then(data => {
        res.send("deleted");
      })
      .catch(err => {
        res.send("err");
      });
  }
};
