var express = require("express");

var router = express.Router();
const DetailController = require("../app/controllers/DetailController");

router.post("/:_id", DetailController.send);
router.get("/:_id", DetailController.show);

module.exports = router;
