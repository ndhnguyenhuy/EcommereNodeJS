const Product = require("../models/product");
const { mutipleMongooseToObject } = require("../../until/mongoose");
const { response } = require("express");

// page home , cart , product , search
class SiteController {
  hello(req, res, next) {
    res.render("hello", { layout: false });
  }
  home(req, res, next) {
    res.render("home");
  }
  search(req, res) {
    res.send("kết quả tìm kiếm");
  }
  shop(req, res, next) {
    Product.find({})
      .then((product) => {
        res.render("product", { product: mutipleMongooseToObject(product) });
      })
      .catch(next);
  }
}
module.exports = new SiteController();
