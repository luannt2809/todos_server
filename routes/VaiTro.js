var epxress = require("express");
const {
  getListVaiTro,
  getVaiTroByID,
} = require("../controllers/VaiTroController");
var router = epxress.Router();

router.get("/list", getListVaiTro);
router.get('/:MaVT', getVaiTroByID);

module.exports = router;
