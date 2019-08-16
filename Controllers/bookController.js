const db = require("../Models");

module.exports = {
  save: (req, res) => {
    console.log(req.body);
    db.books
      .updateOne(
        { _id: req.body._id },
        {
          $set: {
            name: req.body.name,
            link: req.body.link,
            img: req.body.img
          }
        }
      )
      .then(done => {
        res.send(done);
      })
      .catch(err => {
        console.log("err: " + err);
        res.send({ err: "duplicate title" });
      });
  },
  new: (req, res) => {
    console.log(req.body);
    db.books
      .create({
        name: "New Book",
        link: "link ",
        img: "img url"
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
    db.books.find({}).then(done => {
      res.send(done);
    });
  }
};
