var epxress = require("express");
const {
  getListVaiTro,
  insertVaiTro,
  updateVaiTro,
  deleteVaiTro,
} = require("../controllers/VaiTroController");
var router = epxress.Router();

router.get("/list", getListVaiTro);
router.post("/insert", insertVaiTro);
router.put("/update/:MaVT", updateVaiTro);
router.delete("/delete/:MaVT", deleteVaiTro);

module.exports = router;
