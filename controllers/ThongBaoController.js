const dbConfig = require("../config/dbConfig");
const sql = require("mssql");

exports.getListThongBao = async (req, res) => {
  try {
    await sql.connect(dbConfig);

    const procName = "GetAllThongBao";

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

exports.insertThongBao = async (req, res) => {
  await sql.connect(dbConfig);

  var thongBao = {
    TieuDe: req.body.TieuDe,
    NoiDung: req.body.NoiDung,
    MaCV: req.body.MaCV,
    MaND: req.body.MaND,
  };

  const query = `insert into ThongBao(TieuDe, NoiDung, MaCV, MaND) values
                (N'${thongBao.TieuDe}', N'${thongBao.NoiDung}', ${thongBao.MaCV}, ${thongBao.MaND})`;
  sql.query(query, (err, rows) => {
    if (err) {
      res.send("Thêm thông báo thất bại");
      console.log(err);
      sql.close();
    } else {
      res.send("Thêm thông báo thành công");
      sql.close();
    }
  });
};

exports.deleteThongBao = async (req, res) => {
  await sql.connect(dbConfig);

  var thongBao = {
    MaTB: req.params.MaTB,
  };

  const query = `delete from ThongBao where MaTB = ${thongBao.MaTB}`;
  sql.query(dbConfig, query, (err, rows) => {
    if (err) {
      res.send("Xóa thông báo thất bại");
      console.log(err);
      sql.close();
    } else {
      res.send("Xóa thông báo thành công");
      sql.close();
    }
  });
};