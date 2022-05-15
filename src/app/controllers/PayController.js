const { mutipleMongooseToObject } = require("../../until/mongoose");
const payProduct = require("../models/payOrder");
const oderProduct = require("../models/oder");
class PayController {
  // Get/ news
  index(req, res, next) {
    var name = req.body.name;
    var price = req.body.price;
    var size = req.body.size;
    var quantity = req.body.quantity;
    console.log(req.body);
    payProduct.create({
      name: name,
      price: price,
      size: size,
      quantity: quantity,
    });
  }

  show(req, res, next) {
    payProduct.find({}).then((info) => {
      res.render("addressForm", { info: mutipleMongooseToObject(info) });
    });
  }
  order(req, res, next) {
    var name = req.body.name;
    var phone = req.body.phone;
    var email = req.body.email;
    var address = req.body.address;
    var province = req.body.province;
    var district = req.body.district;
    var ward = req.body.ward;
    oderProduct.create({
      name: name,
      phone: phone,
      address: address,
      province: province,
      email: email,
      district: district,
      ward: ward,
    });
    res.render("successOrder", { layout: false });
  }
}

module.exports = new PayController();
