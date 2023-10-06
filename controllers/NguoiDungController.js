const dbConfig = require("../config/dbConfig");
var sql = require("mssql");
var bcrypt = require("bcrypt");

exports.getListNguoiDung = async (req, res) => {
  try {
    await sql.connect(dbConfig);

    const procName = "GetAllNguoiDung";

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

exports.getNguoiDungByID = async (req, res) => {
  try {
    await sql.connect(dbConfig);

    const procName = "getNguoiDungByID";
    const inputParam = req.params.MaND;

    const request = new sql.Request();
    request.input("MaND", sql.Int, inputParam);

    const result = await request.execute(procName);

    res.json(result.recordset);

    sql.close();
  } catch (err) {
    res.status(500).send("Lỗi khi lấy dữ liệu");
    console.log(err);
    sql.close();
  }
};

exports.getAllOthers = async (req, res) => {
  try {
    await sql.connect(dbConfig);

    const procName = "GetAllOthers";
    const inputParam = req.params.MaND;

    const request = new sql.Request();
    request.input("MaND", sql.Int, inputParam);

    const result = await request.execute(procName);

    res.json(result.recordset);

    sql.close();
  } catch (err) {
    res.status(500).send("Lỗi khi lấy dữ liệu");
    console.log(err);
    sql.close();
  }
};

exports.registerNguoiDung = async (req, res) => {
  await sql.connect(dbConfig);

  var nguoiDung = {
    TenNguoiDung: req.body.TenNguoiDung,
    MatKhau: req.body.MatKhau,
    Email: req.body.Email,
    HoTen: req.body.HoTen,
    SoDienThoai: req.body.SoDienThoai,
    MaPB: req.body.MaPB,
    TrangThai: req.body.TrangThai,
  };
  // check tồn tại TenNguoiDung
  const procName = "GetNguoiDungByUsername";
  const inputParam = nguoiDung.TenNguoiDung;

  const request = new sql.Request();
  request.input("Username", sql.VarChar(20), inputParam);

  request.execute(procName, async (err, rows) => {
    if (err) {
      res.status(500).send("Có lỗi xảy ra khi đăng ký");
      sql.close();
      console.log(err);
    } else if (rows.recordset.length > 0) {
      res.status(401).send("Tên người dùng đã tồn tại");
      sql.close();
    } else {
      const salt = await bcrypt.genSalt(12);
      const hashMatKhau = await bcrypt.hash(nguoiDung.MatKhau, salt);

      const insertND = `insert into NguoiDung(TenNguoiDung, MatKhau, Email, HoTen, SoDienThoai, MaPB, TrangThai) values
                      ('${nguoiDung.TenNguoiDung}', 
                      '${hashMatKhau}', 
                      '${nguoiDung.Email}', 
                      N'${nguoiDung.HoTen}', 
                      '${nguoiDung.SoDienThoai}',
                      '${nguoiDung.MaPB}',
                      '${nguoiDung.TrangThai}')`;
      request.query(insertND, (err, rows) => {
        if (err) {
          res.status(500).send("Thêm người dùng thất bại");
          console.log(err);
          sql.close();
        } else {
          res.send("Thêm người dùng thành công");
          sql.close();
        }
      });
    }
  });
};

exports.loginNguoiDung = async (req, res) => {
  await sql.connect(dbConfig);

  var nguoiDung = {
    TenNguoiDung: req.body.TenNguoiDung,
    MatKhau: req.body.MatKhau,
  };

  // check tồn tại tên người dùng
  const procName = "GetNguoiDungByUsername";
  const inputParam = nguoiDung.TenNguoiDung;

  const request = new sql.Request();
  request.input("Username", sql.VarChar(20), inputParam);

  request.execute(procName, async (err, rows) => {
    if (err) {
      res.status(500).send("Có lỗi xảy ra khi đăng nhập");
      sql.close();
      console.log(err);
    } else if (rows.recordset.length == 0) {
      res.status(401).send("Tài khoản không tồn tại");
      sql.close();
    } else if (rows.recordset[0].TrangThai != true) {
      res.status(401).send("Tài khoản khônng hoạt động");
      sql.close();
    } else {
      const checkMatKhau = await bcrypt.compare(
        nguoiDung.MatKhau,
        rows.recordset[0].MatKhau
      );
      if (checkMatKhau) {
        res.json({
          msg: "Đăng nhập thành công",
          nguoiDung: rows.recordset[0],
        });
        sql.close();
      } else {
        res.status(401).send("Mật khẩu không đúng");
        sql.close();
      }
    }
  });
};

exports.updateNguoiDung = async (req, res) => {
  await sql.connect(dbConfig);

  var nguoiDung = {
    MaND: req.params.MaND,
    TenNguoiDung: req.body.TenNguoiDung,
    MatKhau: req.body.MatKhau,
    Email: req.body.Email,
    HoTen: req.body.HoTen,
    SoDienThoai: req.body.SoDienThoai,
    MaPB: req.body.MaPB,
    TrangThai: req.body.TrangThai,
  };

  // check tồn tại nd
  const procName = "GetNguoiDungByID";
  const inputParam = nguoiDung.MaND;

  const request = new sql.Request();
  request.input("MaND", sql.Int, inputParam);

  // check tồn tại TenNguoiDung
  const procCheckTenND = "GetNguoiDungByUsername";
  const inputParamTenND = nguoiDung.TenNguoiDung;

  const requestCheckTenND = new sql.Request();
  requestCheckTenND.input("Username", sql.VarChar(20), inputParamTenND);

  // bat dau sua
  request.execute(procName, async (err, rows) => {
    if (err) {
      res.status(500).send("Có lỗi xảy ra khi cập nhật thông tin người dùng");
      console.log(err);
      sql.close();
    } else if (rows.recordset.length == 0) {
      res.status(401).send("Người dùng không tồn tại");
      console.log(err);
      sql.close();
    } else {
      console.log(nguoiDung);
      if (nguoiDung.TenNguoiDung == rows.recordset[0].TenNguoiDung) {
        const salt = await bcrypt.genSalt(12);
        // kiểm tra mật khẩu có thay đổi thì mã hóa
        let hashMatKhau;
        if (nguoiDung.MatKhau) {
          hashMatKhau = await bcrypt.hash(nguoiDung.MatKhau, salt);
        }

        let trangThai;
        if (nguoiDung.TrangThai == undefined) {
          if (rows.recordset[0].TrangThai == true) {
            trangThai = 1;
          } else {
            trangThai = 0;
          }
        }

        // truy vấn update
        const query = `update NguoiDung set
              TenNguoiDung = '${
                nguoiDung.TenNguoiDung
                  ? nguoiDung.TenNguoiDung
                  : rows.recordset[0].TenNguoiDung
              }',
              MatKhau = '${
                nguoiDung.MatKhau ? hashMatKhau : rows.recordset[0].MatKhau
              }',
              Email = '${
                nguoiDung.Email ? nguoiDung.Email : rows.recordset[0].Email
              }',
              HoTen = N'${
                nguoiDung.HoTen ? nguoiDung.HoTen : rows.recordset[0].HoTen
              }',
              SoDienThoai = '${
                nguoiDung.SoDienThoai
                  ? nguoiDung.SoDienThoai
                  : rows.recordset[0].SoDienThoai
              }',
              MaPB = ${
                nguoiDung.MaPB ? nguoiDung.MaPB : rows.recordset[0].MaPB
              },
              TrangThai = ${
                nguoiDung.TrangThai != undefined ? nguoiDung.TrangThai : trangThai
              }
              where MaND = ${nguoiDung.MaND}`;

        sql.query(query, (err, rows) => {
          if (err) {
            res.status(500).send("Cập nhật thông tin người dùng thất bại");
            console.log(err);
            sql.close();
          } else {
            res.send("Cập nhật thông tin người dùng thành công");
            sql.close();
          }
        });
      } else {
        requestCheckTenND.execute(procCheckTenND, async (err, rows1) => {
          if (err) {
            res
              .status(500)
              .send("Có lỗi xảy ra khi cập nhật thông tin người dùng");
            console.log(err);
            sql.close();
          } else if (rows1.recordset.length > 0) {
            res.status(401).send("Tên người dùng đã tồn tại");
            sql.close();
          } else {
            const salt = await bcrypt.genSalt(12);
            // kiểm tra mật khẩu có thay đổi thì mã hóa
            let hashMatKhau;
            if (nguoiDung.MatKhau) {
              hashMatKhau = await bcrypt.hash(nguoiDung.MatKhau, salt);
            }

            let trangThai;
            if (nguoiDung.TrangThai == undefined) {
              if (rows.recordset[0].TrangThai == true) {
                trangThai = 1;
              } else {
                trangThai = 0;
              }
            }

            // truy vấn update
            const query = `update NguoiDung set
                  TenNguoiDung = '${
                    nguoiDung.TenNguoiDung
                      ? nguoiDung.TenNguoiDung
                      : rows.recordset[0].TenNguoiDung
                  }',
                  MatKhau = '${
                    nguoiDung.MatKhau ? hashMatKhau : rows.recordset[0].MatKhau
                  }',
                  Email = '${
                    nguoiDung.Email ? nguoiDung.Email : rows.recordset[0].Email
                  }',
                  HoTen = N'${
                    nguoiDung.HoTen ? nguoiDung.HoTen : rows.recordset[0].HoTen
                  }',
                  SoDienThoai = '${
                    nguoiDung.SoDienThoai
                      ? nguoiDung.SoDienThoai
                      : rows.recordset[0].SoDienThoai
                  }',
                  MaPB = ${
                    nguoiDung.MaPB ? nguoiDung.MaPB : rows.recordset[0].MaPB
                  },
                  TrangThai = ${
                    nguoiDung.TrangThai != undefined ? nguoiDung.TrangThai : trangThai
                  }
                  where MaND = ${nguoiDung.MaND}`;

            sql.query(query, (err, rows) => {
              if (err) {
                res.status(500).send("Cập nhật thông tin người dùng thất bại");
                console.log(err);
                sql.close();
              } else {
                res.send("Cập nhật thông tin người dùng thành công");
                sql.close();
              }
            });
          }
        });
      }
    }
  });
};

// exports.deleteNguoiDung = (req, res) => {
//   var nguoiDung = {
//     MaND: req.params.MaND,
//   };

//   const query = `delete from NguoiDung where MaND = ${nguoiDung.MaND}`;
//   sql.query(dbConfig, query, (err, rows) => {
//     if (err) {
//       res.send("Có lỗi xảy ra khi xóa người dùng");
//       console.log(err);
//     } else {
//       res.send("Xóa người dùng thành công");
//     }
//   });
// };
