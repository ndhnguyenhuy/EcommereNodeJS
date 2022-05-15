class RegisterController {
  // Get/ Login
  register(req, res) {
    res.render("register", { layout: false });
  }
  create(req, res, next) {
    res.send("vào create");
  }
}
module.exports = new RegisterController();
