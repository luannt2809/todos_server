const dbConfig = require("../config/dbConfig");
const sql = require("mssql");

exports.getLogCongViecByMaCV = async (req, res) => {
  try {
    await sql.connect(dbConfig);

    const procName = "GetLogCongViecByMaCV";
    const inputParam = req.params.MaCV;

    const request = new sql.Request();
    request.input("MaCV", sql.Int, inputParam);

    const result = await request.execute(procName);

    res.json(result.recordset);

    sql.close();
  } catch (err) {
    res.send("Lỗi khi lấy dữ liệu");
    console.log(err);
    sql.close();
  }
};
