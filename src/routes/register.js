var express = require("express");
var router = express.Router();
const RegisterController = require("../app/controllers/RegisterController");
router.use("/register", RegisterController.register);
module.exports = router;
