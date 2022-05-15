var express = require("express");
var router = express.Router();
const PayController = require("../app/controllers/PayController");
router.post("/order", PayController.index);

router.post("/success", PayController.order);
router.get("/", PayController.show);

module.exports = router;
