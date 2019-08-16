const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
  link: { type: String, required: true }
});

const books = mongoose.model("books", bookSchema);
module.exports = books;
