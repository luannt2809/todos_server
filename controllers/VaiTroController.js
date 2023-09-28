const dbConfig = require("../config/dbConfig");
var sql = require("mssql");

exports.getListVaiTro = async (req, res) => {
  try {
    await sql.connect(dbConfig);

    const procName = "GetAllVaiTro";

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

exports.getVaiTroByID = async (req, res) => {
  await sql.connect(dbConfig);

  const procName = "GetVaiTroByID";
  const inputParam = req.params.MaVT;

  const request = new sql.Request();
  request.input("MaVT", sql.VarChar(20), inputParam);

  request.execute(procName, (err, rows) => {
    if (err) {
      res.send("Có lỗi xảy ra");
      console.log(err);
      sql.close();
    } else {
      res.send("Lấy dữ liệu thành công");
      sql.close();
    }
  });
};

