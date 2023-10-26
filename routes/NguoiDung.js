var express = require("express");
const multer = require('multer')

const {
  getListNguoiDung,
  registerNguoiDung,
  loginNguoiDung,
  updateNguoiDung,
  deleteNguoiDung,
  getNguoiDungByID,
  getAllOthers, uploadImage, forgotPasswd,
} = require("../controllers/NguoiDungController");
var router = express.Router();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })

router.get("/list", getListNguoiDung);
router.get("/:MaND", getNguoiDungByID);
router.get('/others/:MaND', getAllOthers);
router.post("/register", upload.single('image'), registerNguoiDung);
router.post("/login", loginNguoiDung);
router.put("/update/:MaND", upload.single('image'), updateNguoiDung);
router.put("/forgot-passwd/:TenNguoiDung", forgotPasswd)
// router.put('/upload/:MaND', upload.single('image'), uploadImage)

module.exports = router;
