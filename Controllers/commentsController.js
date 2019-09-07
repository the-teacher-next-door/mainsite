const db = require("../Models");
const request = require("request");
module.exports = {
  submit: (req, res) => {
    if (
      req.body.captcha === undefined ||
      req.body.captcha === "" ||
      req.body.captcha === null
    ) {
      return res.send({ message: "Please select captcha." });
    }

    //secret
    const secretKey = "6LdGlrMUAAAAAGH9Bx7z_97puRuai2NHoI1A66Jy";

    //verify url
    const vURL = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

    //make request to verify
    request(vURL, (err, response, body) => {
      JSON.parse(body);

      //not success
      if (body.success !== undefined && !body.success) {
        return res.json({ message: "Failed verification." });
      }

      //success
      db.comments
        .create({
          name: req.body.name,
          comment: req.body.comment,
          read: false,
          blogId: req.body.blogId,
          reply: req.body.reply,
          respondingTo: req.body.respondingTo
        })
        .then(done => {
          res.send(done);
          return res.json({ message: "Captcha Pass" });
        })
        .catch(err => {
          console.log(err);
          if (err.message.includes("`name` is required")) {
            res.send({ message: `name is required` });
          } else {
            res.send({ message: `comment is required` });
          }
        });
    });
  },
  submitReply: (req, res) => {
    //success
    db.comments
      .create({
        name: req.body.name,
        comment: req.body.comment,
        blogId: req.body.blogId,
        read: false,
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
  loadAll: (req, res) => {
    db.comments.find({}).then(data => {
      console.log(data);
      res.send(data);
    });
  },
  loadUnread: (req, res) => {
    db.comments
      .find({
        read: false
      })
      .then(data => {
        console.log(data);
        res.send(data);
      });
  },
  load: (req, res) => {
    const query = req.params.id.replace(/\+/g, " ");
    db.comments
      .find({ blogId: { $regex: query, $options: "i" } })
      .then(data => {
        res.send(data);
      });
  },
  loadReplies: (req, res) => {
    const query = req.params.id.replace(/\+/g, " ");
    db.comments
      .find({ respondingTo: { $regex: query, $options: "i" } })
      .then(data => {
        res.send(data);
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
//
