const dbConfig = require("../config/dbConfig");
var sql = require("mssql");

exports.getListNguoiLienQuan = async (req, res) => {
  await sql.connect(dbConfig);

  const procName = "getListNguoiLienQuan";
  const request = new sql.Request();

  request.execute(procName, (err, rows) => {
    if (err) {
      res.send("Có lỗi xảy ra khi lấy dữ liệu");
      console.log(err);
      sql.close();
    } else {
      res.json(rows.recordset);
      sql.close();
    }
  });
};

exports.insertNguoiLienQuan = async (req, res) => {
  await sql.connect(dbConfig);

  var nguoiLienQuan = {
    MaCV: req.body.MaCV,
    MaND: req.body.MaND,
    NhanXet: req.body.NhanXet,
  };
  const query = `insert into NguoiLienQuan(MaCV, MaND, NhanXet) values
                (${nguoiLienQuan.MaCV}, ${nguoiLienQuan.MaND}, N'${nguoiLienQuan.NhanXet}')`;

  sql.query(query, (err, rows) => {
    if (err) {
      console.log(err);
      res.send("Thêm người liên quan thất bại");
      sql.close();
    } else {
      res.send("Thêm người liên quan thành công");
      sql.close();
    }
  });
};
