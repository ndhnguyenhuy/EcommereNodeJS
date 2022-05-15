const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Account = new Schema({
  author: ObjectId,
  useremail: { type: String },
  username: { type: String },
  password: { type: String, minLength: 8 },
});
module.exports = mongoose.model("account", Account);
