var epxress = require("express");
const {
  getListThongBao,
  insertThongBao,
  TestStore,
} = require("../controllers/ThongBaoController");
const { getMessaging } = require("firebase-admin/messaging");
var router = epxress.Router();

router.get("/list", getListThongBao);
router.post("/insert", insertThongBao);
router.delete("/delete/:MaTB", insertThongBao);

module.exports = router;
