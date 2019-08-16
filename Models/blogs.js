const mongoose = require("mongoose");
const mongoose_fuzzy_searching = require("mongoose-fuzzy-searching");
mongoose.set("useFindAndModify", false);

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  username: { type: String, required: true },
  blog: { type: String, required: true },
  title: { type: String, required: true, unique: true },
  date: { type: String, default: convertDate() },
  img: { type: String, required: false },
  live: { type: Boolean, required: true },
  views: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true }
});

function convertDate() {
  const date = new Date().toDateString();
  return date;
}
blogSchema.plugin(mongoose_fuzzy_searching, {
  fields: ["title", "blog", "category"]
});
const blogs = mongoose.model("blogs", blogSchema);
module.exports = blogs;
