const db = require("../Models");

module.exports = {
  loadall: (req, res) => {
    console.log(req.body);
    db.images.find({}).then(done => {
      res.send(done);
    });
  }
};
