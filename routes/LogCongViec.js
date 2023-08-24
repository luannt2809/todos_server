const express = require("express");
const {
  getLogCongViecByMaCV,
} = require("../controllers/LogCongViecController");
const router = express.Router();

router.get("/:MaCV", getLogCongViecByMaCV);

module.exports = router;
