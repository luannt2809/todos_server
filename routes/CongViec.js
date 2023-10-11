var express = require("express");
const {
    getListCongViec,
    insertCongViec,
    updateCongViec,
    deleteCongViec,
    insertCongViec2,
    getCongViecByID,
    getListCongViecByMaND,
    timKiemCongViec,
    getAllTaskAssigned, GetAllTransferTask,
} = require("../controllers/CongViecController");
var router = express.Router();

router.get("/list", getListCongViec);
router.get("/search/", timKiemCongViec);
router.get("/list-task-assigned/:MaNguoiGiao", getAllTaskAssigned);
router.get("/list-task-transfer/:MaCV", GetAllTransferTask)
router.get("/:MaCV", getCongViecByID);
router.post("/insert", insertCongViec);
router.put("/update/:MaCV", updateCongViec);
router.delete("/delete/:MaCV", deleteCongViec);

module.exports = router;
