const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const cartProduct = new Schema({
  author: ObjectId,
  name: { type: String, maxlength: 255 },
  description: { type: String },
  image: { type: String, maxlength: 255 },
  slug: { type: String, maxlength: 255 },
  ID: { type: String, maxlength: 255 },
  price: { type: String, maxlength: 255 },
});
module.exports = mongoose.model("cart", cartProduct);
