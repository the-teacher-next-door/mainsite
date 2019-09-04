const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);

const Schema = mongoose.Schema;

const sliderSchema = new Schema({
  link: { type: String, required: true },
  title: { type: String, required: true },
  img: { type: String, required: false }
});

const slider = mongoose.model("slider", sliderSchema);
module.exports = slider;
