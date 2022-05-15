var express = require("express");

var router = express.Router();
const CartController = require("../app/controllers/CartController");

router.delete("/:id", CartController.delete);
router.get("/", CartController.showcart);

module.exports = router;
