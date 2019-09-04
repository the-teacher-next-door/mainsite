const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);

const Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  admin: { type: Boolean, required: true }
});

const users = mongoose.model("users", userSchema);
userSchema.plugin(passportLocalMongoose);
module.exports = users;
