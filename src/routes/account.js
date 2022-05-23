var express = require("express");
var router = express.Router();
const accountController = require("../app/controllers/accountController");

router.post("/create", accountController.create);
router.get("/", accountController.show);

module.exports = router;
