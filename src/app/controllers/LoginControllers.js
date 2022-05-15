const Account = require("../models/accountModel");
const jwt = require("jsonwebtoken");
const { mongoosesToObject } = require("../../until/mongoose");
//  định nghĩa tuyến đường và phương thức truy cập cho các trang
class LoginController {
  // Get/ Login
  login(req, res) {
    res.render("login", { layout: false });
  }
  checkLogin(req, res, next) {}
}
module.exports = new LoginController();
