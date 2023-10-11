var epxress = require("express");
const {
  getListThongBao,
  insertThongBao,
  sendNotification,
} = require("../controllers/ThongBaoController");
var router = epxress.Router();

router.get("/list", getListThongBao);
router.post("/send", sendNotification);
router.post("/insert", insertThongBao);
router.delete("/delete/:MaTB", insertThongBao);

module.exports = router;
