const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  name: { type: String, required: true },
  comment: { type: String, required: true },
  blogId: { type: String, required: true },
  reply: { type: Boolean, required: true },
  respondingTo: { type: String, required: false },
  date: { type: String, default: Date.now() }
});

const comments = mongoose.model("comments", commentSchema);
module.exports = comments;
