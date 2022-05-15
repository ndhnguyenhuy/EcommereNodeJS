const cartProduct = require("../models/cartProduct");
const { mutipleMongooseToObject } = require("../../until/mongoose");
class CartController {
  // Get/ Cart
  showcart(req, res, next) {
    cartProduct
      .find({})
      .then((product) => {
        if (typeof product[0] === "undefined") {
          res.render("cart", {});
        } else {
          res.render("cart", { product: mutipleMongooseToObject(product) });
        }
      })
      .catch(next);
  }

  delete(req, res, next) {
    cartProduct
      .deleteOne({ _id: req.params.id })
      .then(() => res.render("cart"))
      .catch(next);
  }
}
module.exports = new CartController();
