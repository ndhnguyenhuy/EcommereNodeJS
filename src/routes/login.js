var express = require("express");
var router = express.Router();
const LoginController = require("../app/controllers/LoginControllers");
const jwt = require("jsonwebtoken");
const Account = require("../app/models/accountModel");

router.post(
  "/author",
  (req, res, next) => {
    var useremail = req.body.useremail;
    var password = req.body.password;
    Account.findOne({ useremail: useremail, password: password })
      .then((data) => {
        if (data) {
          var token = jwt.sign({ _id: data._id }, "mk", {
            expiresIn: "30s",
          });
          res.json({
            mesasge: "Thanh cong",
            token: token,
          });
        } else {
          res.render("nofi", { layout: false });
        }
      })
      .catch();
  },
  (req, res, next) => {
    res.redirect("/private");
  }
);
router.get(
  "/private",
  (req, res, next) => {
    try {
      var token = req.cookies.token;
      console.log(token);
      var data = jwt.verify(token, "mk");
      console.log({ data });
      if (data) {
        next();
      }
    } catch (err) {
      return res.redirect("/login");
    }
  },
  (req, res, next) => {
    res.redirect("/home");
  }
);
router.get("/", LoginController.login);

module.exports = router;
