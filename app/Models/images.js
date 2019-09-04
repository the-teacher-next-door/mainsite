const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

const Schema = mongoose.Schema;

const imageSchema = new Schema({
  fieldname: { type: String, required: true },
  originalname: { type: String, required: true },
  encoding: { type: String, required: true },
  mimetype: { type: String, required: true },
  destination: { type: String, required: true },
  filename: { type: String, required: true },
  path: { type: String, required: true },
  size: { type: String, required: true }
});

const images = mongoose.model("images", imageSchema);
module.exports = images;
