var express = require("express");
const { getListNguoiLienQuan, insertNguoiLienQuan } = require("../controllers/NguoiLienQuanController");
var router = express.Router();

router.get("/list", getListNguoiLienQuan);
router.post("/insert", insertNguoiLienQuan);

module.exports = router;
