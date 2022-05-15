// các trang như là giỏ hàng , sản phẩm , page home , search sản phẩm
var express = require("express");

var router = express.Router();
const SiteController = require("../app/controllers/SiteControllers");
router.use("/search", SiteController.search);
router.use("/product", SiteController.shop);
router.use("/home", SiteController.home);
router.use("/", SiteController.hello);

module.exports = router;
