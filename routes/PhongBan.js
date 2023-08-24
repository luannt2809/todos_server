var express = require("express");
const {
  getListPhongBan,
  insertPhongBan,
  updatePhongBan,
  deletePhongBan,
} = require("../controllers/PhongBanController");
var router = express.Router();

router.get("/list", getListPhongBan);
router.post("/insert", insertPhongBan);
router.put("/update/:MaPB", updatePhongBan);
router.delete("/delete/:MaPB", deletePhongBan);

module.exports = router;
