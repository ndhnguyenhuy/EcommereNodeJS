const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const payProduct = new Schema({
  author: ObjectId,
  name: { type: String },
  quantity: { type: String },
  size: { type: String },
  price: { type: String },
});
module.exports = mongoose.model("payProduct", payProduct);
