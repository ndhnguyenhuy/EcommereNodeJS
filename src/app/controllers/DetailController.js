const Product = require("../models/product");
const cartProduct = require("../models/cartProduct");
const { mongoosesToObject } = require("../../until/mongoose");

// page home , cart , product , search
class DetailController {
  show(req, res, next) {
    Product.findOne({ _id: req.params._id })
      .then((product) =>
        res.render("detailProduct", {
          product: mongoosesToObject(product),
        })
      )
      .catch(next);
  }
  send(req, res, next) {
    Product.findOne({ _id: req.params._id })

      .then((product) => {
        var name = product.name;
        var description = product.description;
        var price = product.price;
        var image = product.image;
        res.send(product);
        cartProduct.create({
          name,
          image: image,
          description,
          price,
        });
      })
      .catch(next);
  }
}
module.exports = new DetailController();
