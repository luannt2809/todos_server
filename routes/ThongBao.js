var epxress = require("express");
const {
  getListThongBao,
  insertThongBao,
  TestStore,
} = require("../controllers/ThongBaoController");
var router = epxress.Router();

router.get("/list", getListThongBao);
router.post("/insert", insertThongBao);
router.delete("/delete/:MaTB", insertThongBao);

module.exports = router;
