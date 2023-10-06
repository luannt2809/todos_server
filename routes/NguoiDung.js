var express = require("express");
const {
  getListNguoiDung,
  registerNguoiDung,
  loginNguoiDung,
  updateNguoiDung,
  deleteNguoiDung,
  getNguoiDungByID,
  getAllOthers,
} = require("../controllers/NguoiDungController");
var router = express.Router();

router.get("/list", getListNguoiDung);
router.get("/:MaND", getNguoiDungByID);
router.get('/others/:MaND', getAllOthers);
router.post("/register", registerNguoiDung);
router.post("/login", loginNguoiDung);
router.put("/update/:MaND", updateNguoiDung);

module.exports = router;
