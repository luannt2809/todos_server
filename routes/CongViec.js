var express = require("express");
const {
  getListCongViec,
  insertCongViec,
  updateCongViec,
  deleteCongViec,
  insertCongViec2,
  getCongViecByID,
} = require("../controllers/CongViecController");
var router = express.Router();

router.get("/list", getListCongViec);
router.get("/:MaCV", getCongViecByID);
router.post("/insert", insertCongViec);
// router.post("/insert2", insertCongViec2);
router.put("/update/:MaCV", updateCongViec);
router.delete("/delete/:MaCV", deleteCongViec);

module.exports = router;
