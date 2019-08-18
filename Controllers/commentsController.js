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
