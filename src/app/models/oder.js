const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const oderProduct = new Schema({
  author: ObjectId,
  name: { type: String, maxlength: 255 },
  quantity: { type: String, maxlength: 255 },
  image: { type: String, maxlength: 255 },
  price: { type: String, maxlength: 255 },
  address: { type: String },
  province: { type: String },
  district: { type: String },
  ward: { type: String },
  phone: { type: String },
  email: { type: String },
});
module.exports = mongoose.model("oderProduct", oderProduct);
