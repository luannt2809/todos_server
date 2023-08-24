const dbConfig = require("../config/dbConfig");
var sql = require("mssql");

exports.getListPhongBan = async (req, res) => {
  try {
    await sql.connect(dbConfig);

    const procName = "GetAllPhongBan";

    const request = new sql.Request();

    const result = await request.execute(procName);

    res.json(result.recordset);

    sql.close();
  } catch (err) {
    res.send("Lỗi khi lấy dữ liệu");
    console.log(err);
    sql.close();
  }
};

exports.insertPhongBan = async (req, res) => {
  await sql.connect(dbConfig);
  var phongBan = {
    TenPhongBan: req.body.TenPhongBan,
  };

  const query = `insert into PhongBan(TenPhongBan) values (N'${phongBan.TenPhongBan}')`;

  sql.query(query, (err, rows) => {
    if (err) {
      res.send("Thêm thất bại");
      console.log(err);
      sql.close();
    } else {
      res.send("Thêm thành công");
      sql.close();
    }
  });
};

exports.updatePhongBan = async (req, res) => {
  await sql.connect(dbConfig);

  var phongBan = {
    MaPB: req.params.MaPB,
    TenPhongBan: req.body.TenPhongBan,
  };

  const query = `update PhongBan set TenPhongBan = N'${phongBan.TenPhongBan}'
                  where MaPB = ${phongBan.MaPB}`;

  sql.query(query, (err, rows) => {
    if (err) {
      res.send("Sửa phòng ban thất bại");
      console.log(err);
      sql.close();
    } else {
      res.send("Sửa phòng ban thành công");
      sql.close();
    }
  });
};

exports.deletePhongBan = async (req, res) => {
  await sql.connect(dbConfig);

  var phongBan = {
    MaPB: req.params.MaPB,
  };

  const query = `delete from PhongBan where MaPB = ${phongBan.MaPB}`;

  sql.query(dbConfig, query, (err, rows) => {
    if (err) {
      res.send("Xóa phòng ban thất bại");
      console.log(err);
      sql.close();
    } else {
      res.send("Xóa phòng ban thành công");
      sql.close();
    }
  });
};
