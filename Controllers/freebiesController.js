const db = require("../Models");

module.exports = {
  loadall: (req, res) => {
    console.log(req.body);
    db.freebies.find({}).then(done => {
      res.send(done);
    });
  },
  save: (req, res) => {
    console.log(req.body);
    db.freebies
      .updateOne(
        //need to get id from form
        { _id: req.body._id },
        {
          $set: {
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
        res.send({ err: err });
      });
  }
};
