const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

const Schema = mongoose.Schema;

const notificationsSchema = new Schema({
  notification: { type: String, required: true },
  date: { type: String, default: Date.now() }
});

const notifications = mongoose.model("notifications", notificationsSchema);
module.exports = notifications;
