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

exports.insertVaiTro = async (req, res) => {
  await sql.connect(dbConfig);

  var vaiTro = {
    TenVaiTro: req.body.TenVaiTro,
  };
  const query = `insert into VaiTro(TenVaiTro) values (N'${vaiTro.TenVaiTro}')`;

  sql.query(query, (err, rows) => {
    if (err) {
      console.log(err);
      res.send("Thêm vai trò thất bại");
      sql.close();
    } else {
      res.send("Thêm vai trò thành công");
      sql.close();
    }
  });
};

exports.updateVaiTro = async (req, res) => {
  await sql.connect(dbConfig);

  var vaiTro = {
    MaVT: req.params.MaVT,
    TenVaiTro: req.body.TenVaiTro,
  };
  const query = `update VaiTro set TenVaiTro = N'${vaiTro.TenVaiTro}'
                where MaVT = ${vaiTro.MaVT}`;

  sql.query(query, (err, rows) => {
    if (err) {
      res.send("Sửa vai trò thất bại");
      console.log(err);
      sql.close();
    } else {
      res.send("Sửa vai trò thành công");
      sql.close();
    }
  });
};

exports.deleteVaiTro = async (req, res) => {
  await sql.connect(dbConfig);

  var vaiTro = {
    MaVT: req.params.MaVT,
  };
  const query = `delete from VaiTro where MaVT = ${vaiTro.MaVT}`;

  sql.query(query, (err, rows) => {
    if (err) {
      res.send("Xóa vai trò thất bại");
      console.log(err);
      sql.close();
    } else {
      res.send("Xóa vai trò thành công");
      sql.close();
    }
  });
};
