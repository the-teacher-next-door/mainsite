const db = require("../Models");

module.exports = {
  submit: (req, res) => {
    db.comments
      .create({
        name: req.body.name,
        comment: req.body.comment,
        blogId: req.body.blogId,
        reply: req.body.reply,
        respondingTo: req.body.respondingTo
      })
      .then(done => {
        res.send(done);
      })
      .catch(err => {
        console.log(err);
        if (err.message.includes("`name` is required")) {
          res.send({ message: `name is required` });
        } else {
          res.send({ message: `comment is required` });
        }
      });
  },
  load: (req, res) => {
    console.log(req.params);
    const query = req.params.id.replace(/\+/g, " ");
    db.comments
      .find({ blogId: { $regex: query, $options: "i" } })
      .then(data => {
        res.send(data);
      });
  },
  loadReplies: (req, res) => {
    console.log(req.params);
    const query = req.params.id.replace(/\+/g, " ");
    db.comments
      .find({ respondingTo: { $regex: query, $options: "i" } })
      .then(data => {
        res.send(data);
      });
  }
};
//
