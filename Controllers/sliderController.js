const db = require("../Models");

module.exports = {
  addLink: (req, res) => {
    console.log(req.body);
    db.slider
      .create({
        title: req.body.title,
        img: req.body.img,
        link: req.body.link
      })
      .then(done => {
        res.send(done);
      });
  },
  loadall: (req, res) => {
    db.slider.find({}).then(done => {
      console.log(`data ${done}`);
      console.log(1);
      res.send(done);
    });
  },
  save: (req, res) => {
    console.log(req.body._id);
    db.slider
      .updateOne(
        //need to get id from form
        { _id: req.body._id },
        {
          $set: {
            title: req.body.title,
            link: req.body.link,
            img: req.body.img
          }
        }
      )
      .then(done => {
        console.log(done);
        res.send(done);
      })
      .catch(err => {
        console.log("err: " + err);
        res.send({ err: "duplicate title" });
      });
  }
};
