const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);

const Schema = mongoose.Schema;

const freebieschema = new Schema({
  fieldname: { type: String, required: true },
  originalname: { type: String, required: true },
  encoding: { type: String, required: true },
  mimetype: { type: String, required: true },
  destination: { type: String, required: true },
  filename: { type: String, required: true },
  path: { type: String, required: true },
  size: { type: String, required: true },
  img: { type: String, required: false }
});

const freebies = mongoose.model("freebies", freebieschema);
module.exports = freebies;
