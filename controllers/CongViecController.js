var sql = require("mssql");
const dbConfig = require("../config/dbConfig");

exports.getListCongViec = async (req, res) => {
  try {
    await sql.connect(dbConfig);

    const procName = "GetAllCongViec";

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

exports.getCongViecByID = async (req, res) => {
  try {
    await sql.connect(dbConfig);

    const procName = "GetCongViecByID";
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

exports.insertCongViec = async (req, res) => {
  await sql.connect(dbConfig);

  var congViec = {
    TieuDe: req.body.TieuDe,
    NoiDung: req.body.NoiDung,
    GioBatDau: req.body.GioBatDau,
    GioKetThuc: req.body.GioKetThuc,
    NgayBatDau: req.body.NgayBatDau,
    NgayKetThuc: req.body.NgayKetThuc,
    TrangThai: req.body.TrangThai,
    TienDo: req.body.TienDo,
    GhiChu: req.body.GhiChu,
    MaNguoiLam: req.body.MaNguoiLam,
    MaNguoiGiao: req.body.MaNguoiGiao,
    Kieu: req.body.Kieu,
  };

  const query = `insert into CongViec(TieuDe, NoiDung, GioBatDau, GioKetThuc, NgayBatDau, NgayKetThuc, TrangThai, TienDo, GhiChu, MaNguoiLam, MaNguoiGiao, Kieu) values 
                  (N'${congViec.TieuDe}', N'${congViec.NoiDung}', '${
    congViec.GioBatDau
  }', '${congViec.GioKetThuc}', '${congViec.NgayBatDau}', '${
    congViec.NgayKetThuc
  }',
                  N'${congViec.TrangThai}', ${congViec.TienDo}, ${
    congViec.GhiChu ? `N'${congViec.GhiChu}'` : null
  }, ${congViec.MaNguoiLam}, ${congViec.MaNguoiGiao}, ${
    congViec.Kieu ? congViec.Kieu : null
  })`;

  sql.query(query, (err, rows) => {
    if (err) {
      console.log(err);
      res.send("Thêm công việc thất bại");
      sql.close();
    } else {
      res.send("Thêm công việc thành công");
      sql.close();
    }
  });
};

exports.updateCongViec = async (req, res) => {
  await sql.connect(dbConfig);

  var congViec = {
    MaCV: req.params.MaCV,
    TieuDe: req.body.TieuDe,
    NoiDung: req.body.NoiDung,
    GioBatDau: req.body.GioBatDau,
    GioKetThuc: req.body.GioKetThuc,
    NgayBatDau: req.body.NgayBatDau,
    NgayKetThuc: req.body.NgayKetThuc,
    TrangThai: req.body.TrangThai,
    TienDo: req.body.TienDo,
    GhiChu: req.body.GhiChu,
    MaNguoiLam: req.body.MaNguoiLam,
    MaNguoiGiao: req.body.MaNguoiGiao,
    Kieu: req.body.Kieu,
  };

  const procName = "GetCongViecByID";
  const inputParam = congViec.MaCV;
  // console.log(inputParam);

  const request = new sql.Request();
  request.input("MaCV", sql.Int, inputParam);

  request.execute(procName, (err, rows) => {
    if (err) {
      res.send("Có lỗi xảy ra khi cập nhật công việc");
      console.log(err);
      sql.close();
    } else {
      // console.log(rows.recordset);
      const query = `update CongViec set 
      TieuDe = N'${
        congViec.TieuDe ? congViec.TieuDe : rows.recordset[0].TieuDe
      }',
      NoiDung = N'${
        congViec.NoiDung ? congViec.NoiDung : rows.recordset[0].NoiDung
      }',
      GioBatDau = '${
        congViec.GioBatDau
          ? congViec.GioBatDau
          : rows.recordset[0].GioBatDau.toISOString()
              .split("T")[1]
              .split(".")[0]
      }',
      GioKetThuc = '${
        congViec.GioKetThuc
          ? congViec.GioKetThuc
          : rows.recordset[0].GioKetThuc.toISOString()
              .split("T")[1]
              .split(".")[0]
      }',
      NgayBatDau = '${
        congViec.NgayBatDau
          ? congViec.NgayBatDau
          : rows.recordset[0].NgayBatDau.toISOString().split("T")[0]
      }',
      NgayKetThuc = '${
        congViec.NgayKetThuc
          ? congViec.NgayKetThuc
          : rows.recordset[0].NgayKetThuc.toISOString().split("T")[0]
      }',
      TrangThai = N'${
        congViec.TrangThai ? congViec.TrangThai : rows.recordset[0].TrangThai
      }',
      TienDo = ${congViec.TienDo ? congViec.TienDo : rows.recordset[0].TienDo},
      GhiChu = N'${
        congViec.GhiChu ? congViec.GhiChu : rows.recordset[0].GhiChu
      }',
      MaNguoiLam = ${
        congViec.MaNguoiLam ? congViec.MaNguoiLam : rows.recordset[0].MaNguoiLam
      },
      MaNguoiGiao = ${
        congViec.MaNguoiGiao
          ? congViec.MaNguoiGiao
          : rows.recordset[0].MaNguoiGiao
      },
      Kieu = ${congViec.Kieu ? congViec.Kieu : rows.recordset[0].Kieu}
      where MaCV = ${congViec.MaCV}
      `;
      sql.query(query, (err, rows1) => {
        // rows1 không có gì trả về
        if (err) {
          res.send("Cập nhật công việc thất bại");
          console.log(err);
          sql.close();
        } else {
          // sau khi cập nhật thông tin công việc thành công thì sẽ insert log thực hiện vào bảng LogCongViec
          const query = `insert into LogCongViec(MaCV, MoTa) values 
                        (${rows.recordset[0].MaCV}, N'${req.body.MoTa}')`;
          sql.query(query, (err, rows) => {
            if (err) {
              res.send("Có lỗi xảy ra khi thêm log công việc");
              console.log(err);
              sql.close();
            } else {
              res.send("Cập nhật công việc thành công");
              sql.close();
            }
          });
        }
      });
    }
  });
};

// // tạo công việc cho người khác sau khi xong (vd: giao việc cho tester)
// exports.insertCongViec2 = async (req, res) => {
//   await sql.connect(dbConfig);

//   var congViec = {
//     MaCV: req.params.MaCV,
//     TieuDe: req.body.TieuDe,
//     NoiDung: req.body.NoiDung,
//     GioBatDau: req.body.GioBatDau,
//     GioKetThuc: req.body.GioKetThuc,
//     NgayBatDau: req.body.NgayBatDau,
//     NgayKetThuc: req.body.NgayKetThuc,
//     TrangThai: req.body.TrangThai,
//     TienDo: req.body.TienDo,
//     GhiChu: req.body.GhiChu,
//     MaNguoiLam: req.body.MaNguoiLam,
//     MaNguoiGiao: req.body.MaNguoiGiao,
//     Kieu: req.body.Kieu,
//   };

//   const query = `insert into CongViec(TieuDe, NoiDung, GioBatDau, GioKetThuc, NgayBatDau, NgayKetThuc, TrangThai, TienDo, GhiChu, MaNguoiLam, MaNguoiGiao, Kieu) values 
//                   (N'${congViec.TieuDe}', N'${congViec.NoiDung}', '${
//     congViec.GioBatDau
//   }', '${congViec.GioKetThuc}', '${congViec.NgayBatDau}', '${
//     congViec.NgayKetThuc
//   }',
//                   N'${congViec.TrangThai}', ${congViec.TienDo}, ${
//     congViec.GhiChu ? `N'${congViec.GhiChu}'` : null
//   }, ${congViec.MaNguoiLam}, ${congViec.MaNguoiGiao}, ${congViec.Kieu})`;

//   sql.query(query, (err, rows) => {
//     if (err) {
//       console.log(err);
//       res.send("Thêm công việc thất bại");
//       sql.close();
//     } else {
//       res.send("Thêm công việc thành công");
//       sql.close();
//     }
//   });
// };

exports.deleteCongViec = async (req, res) => {
  await sql.connect(dbConfig);
  var congViec = {
    MaCV: req.params.MaCV,
  };
  const query = `delete from CongViec where MaCV = ${congViec.MaCV}`;
  sql.query(query, (err, rows) => {
    if (err) {
      res.send("Có lỗi xảy ra khi xóa công việc");
      console.log(err);
      sql.close();
    } else {
      res.send("Xóa công việc thành công");
      sql.close();
    }
  });
};
