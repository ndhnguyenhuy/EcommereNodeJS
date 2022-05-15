const Account = require("../models/accountModel");
// const { mongoosesToObject } = require("../../until/mongoose");

// page home , cart , product , search
class AccountController {
  create(req, res, next) {
    var useremail = req.body.useremail;
    var username = req.body.username;
    var password = req.body.password;
    Account.findOne({ useremail: useremail })
      .then((data) => {
        if (data) {
          res.json("Tai khoan nay da ton tai");
        } else {
          return Account.create({
            useremail: useremail,
            username: username,
            password: password,
          });
        }
      })

      .then((_data) => {
        res.render("redirect", { layout: false });
      })
      .catch((_err) => {
        res.status(500).send("tai khoan da ton tai");
      });
  }
}
module.exports = new AccountController();
