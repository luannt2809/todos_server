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
    res.status(500).send("Lỗi khi lấy dữ liệu");
    console.log(err);
    sql.close();
  }
};

exports.getPhongBanByID = async (req, res) => {
  try {
    await sql.connect(dbConfig);

    const procName = "GetPhongBanByID";

    const request = new sql.Request();

    const result = await request.execute(procName);

    res.json(result.recordset);

    sql.close();
  } catch (err) {
    res.status(500).send("Lỗi khi lấy dữ liệu");
    console.log(err);
    sql.close();
  }
};

exports.insertPhongBan = async (req, res) => {
  await sql.connect(dbConfig);
  var phongBan = {
    TenPhongBan: req.body.TenPhongBan,
    ArrMaVT: req.body.ArrMaVT,
  };

  const query = `insert into PhongBan(TenPhongBan, ArrMaVT) values (N'${phongBan.TenPhongBan}', '${phongBan.ArrMaVT}')`;

  sql.query(query, (err, rows) => {
    if (err) {
      res.status(500).send("Thêm phòng ban thất bại");
      console.log(err);
      sql.close();
    } else {
      res.send("Thêm phòng ban thành công");
      sql.close();
    }
  });
};

exports.updatePhongBan = async (req, res) => {
  await sql.connect(dbConfig);

  var phongBan = {
    MaPB: req.params.MaPB,
    TenPhongBan: req.body.TenPhongBan,
    ArrMaVT: req.body.ArrMaVT,
  };

  const procName = "GetPhongBanByID";

  const request = new sql.Request();
  request.input("MaPB", sql.Int, phongBan.MaPB);

  const result = await request.execute(procName);

  const query = `update PhongBan set TenPhongBan = N'${
    phongBan.TenPhongBan == undefined
      ? result.recordset[0].TenPhongBan
      : phongBan.TenPhongBan
  }', ArrMaVT = '${
    phongBan.ArrMaVT == undefined
      ? result.recordset[0].ArrMaVT
      : phongBan.ArrMaVT
  }'
                  where MaPB = ${phongBan.MaPB}`;

  sql.query(query, (err, rows) => {
    if (err) {
      res.status(500).send("Cập nhật phòng ban thất bại");
      console.log(err);
      sql.close();
    } else {
      res.send("Cập nhật phòng ban thành công");
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
