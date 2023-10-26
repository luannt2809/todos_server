var sql = require("mssql");
const dbConfig = require("../config/dbConfig");
var admin = require("firebase-admin");
var listToken = [];

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

exports.getListCongViecByMaND = async (req, res) => {
    try {
        await sql.connect(dbConfig);

        const procName = "GetAllCongViecByMaND";
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

exports.timKiemCongViec = async (req, res) => {
    try {
        await sql.connect(dbConfig);

        const maND = req.query.MaND;
        const startDate = req.query.StartDate;
        // const inputTime = req.query.InputTime;

        const procName = "TimKiemCongViec";
        const request = new sql.Request();
        request.input("MaND", sql.Int, maND);
        request.input("StartDate", sql.Date, startDate);
        // request.input("InputTime", sql.VarChar(10), inputTime);

        const result = await request.execute(procName);

        res.json(result.recordset);

        sql.close();
    } catch (err) {
        res.status(500).send("Lỗi khi lấy dữ liệu");
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

exports.getAllTaskAssigned = async (req, res) => {
    try {
        await sql.connect(dbConfig);

        const maNguoiGiao = req.query.MaNguoiGiao;
        const trangThai = req.query.TrangThai;

        const procName = "GetAllTaskAssigned";
        const request = new sql.Request();
        request.input("MaNguoiGiao", sql.Int, maNguoiGiao);
        request.input("TrangThai", sql.NVarChar(20), trangThai)

        const result = await request.execute(procName);

        res.json(result.recordset);

        sql.close();
    } catch (err) {
        res.status(500).send("Lỗi khi lấy dữ liệu");
        console.log(err);
        sql.close();
    }
};

exports.GetAllTransferTask = async (req, res) => {
    try {
        await sql.connect(dbConfig);

        const procName = "GetAllTransferTask";
        const inputParam = req.params.MaCV;

        const request = new sql.Request();
        request.input("MaCV", sql.Int, inputParam);

        const result = await request.execute(procName);

        res.json(result.recordset);

        sql.close();
    } catch (err) {
        res.status(500).send("Lỗi khi lấy dữ liệu");
        console.log(err);
        sql.close();
    }
};

exports.GetAllTaskWithStatus = async (req, res) => {
    try {
        await sql.connect(dbConfig);

        const maNguoiLam = req.query.MaNguoiLam;
        const trangThai = req.query.TrangThai;

        const procName = "GetAllTaskWithStatus";
        const request = new sql.Request();
        request.input("MaNguoiLam", sql.Int, maNguoiLam);
        request.input("TrangThai", sql.NVarChar(20), trangThai);

        const result = await request.execute(procName);

        res.json(result.recordset);

        sql.close();
    } catch (err) {
        res.status(500).send("Lỗi khi lấy dữ liệu");
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

    const query = `insert into CongViec(TieuDe, NoiDung, GioBatDau, GioKetThuc, NgayBatDau, NgayKetThuc, TrangThai,
                                TienDo, GhiChu, MaNguoiLam, MaNguoiGiao, Kieu)
            output inserted.MaCV values (N'${congViec.TieuDe}', N'${congViec.NoiDung}', '${congViec.GioBatDau
        }', '${congViec.GioKetThuc}', '${congViec.NgayBatDau}', '${congViec.NgayKetThuc
        }',
                    N'${congViec.TrangThai}', ${congViec.TienDo}, ${congViec.GhiChu ? `N'${congViec.GhiChu}'` : null
        }, ${congViec.MaNguoiLam ? congViec.MaNguoiLam : null}, ${congViec.MaNguoiGiao ? congViec.MaNguoiGiao : null
        }, ${congViec.Kieu ? congViec.Kieu : null})`;

    sql.query(query, (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send("Thêm công việc thất bại");
            sql.close();
        } else {
            const procName = "GetNguoiDungByID"
            const request = new sql.Request()
            request.input("MaND", sql.Int, congViec.MaNguoiLam)

            request.execute(procName, (err1, rows1) => {
                if (err1) {
                    console.log(err1);
                    res.status(500).send("Có lỗi xảy ra");
                    sql.close();
                } else {
                    const message = {
                        token: rows1.recordset[0].TokenUser,
                        notification: {
                            title: `${congViec.TieuDe} đã được tạo`,
                            body: `${congViec.NoiDung}`
                        }
                    }

                    admin.messaging().send(message).then((response) => {
                        const queryInsertNotify = `insert into ThongBao(TieuDe, NoiDung, MaCV, MaND) values 
                            (N'${message.notification.title}',
                            N'${message.notification.body}', ${rows.recordset[0].MaCV}, ${congViec.MaNguoiLam})`

                        request.query(queryInsertNotify, (err2, rows2) => {
                            if (err2) {
                                console.log(err);
                                res.status(500).send("Có lỗi xảy ra");
                                sql.close();
                            } else {
                                res.send("Thêm công việc thành công");
                                sql.close();
                            }
                        })
                    }).catch((err3) => {
                        console.log(err3)
                        res.status(500).send("Có lỗi xảy ra");
                        sql.close();
                    })
                }
            })
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

    const request = new sql.Request();
    request.input("MaCV", sql.Int, inputParam);

    request.execute(procName, (err, rows) => {
        if (err) {
            res.status(500).send("Có lỗi xảy ra khi cập nhật công việc");
            console.log(err);
            sql.close();
        } else {
            const query = `update CongViec
                        set TieuDe      = N'${congViec.TieuDe
                    ? congViec.TieuDe
                    : rows.recordset[0].TieuDe
                }',
                            NoiDung     = N'${congViec.NoiDung
                    ? congViec.NoiDung
                    : rows.recordset[0].NoiDung
                }',
                            GioBatDau   = '${congViec.GioBatDau
                    ? congViec.GioBatDau
                    : rows.recordset[0].GioBatDau.toISOString()
                        .split("T")[1]
                        .split(".")[0]
                }',
                            GioKetThuc  = '${congViec.GioKetThuc
                    ? congViec.GioKetThuc
                    : rows.recordset[0].GioKetThuc.toISOString()
                        .split("T")[1]
                        .split(".")[0]
                }',
                            NgayBatDau  = '${congViec.NgayBatDau
                    ? congViec.NgayBatDau
                    : rows.recordset[0].NgayBatDau.toISOString().split(
                        "T"
                    )[0]
                }',
                            NgayKetThuc = '${congViec.NgayKetThuc
                    ? congViec.NgayKetThuc
                    : rows.recordset[0].NgayKetThuc.toISOString().split(
                        "T"
                    )[0]
                }',
                            TrangThai   = N'${congViec.TrangThai
                    ? congViec.TrangThai
                    : rows.recordset[0].TrangThai
                }',
                            TienDo      = ${congViec.TienDo
                    ? congViec.TienDo
                    : rows.recordset[0].TienDo
                },
                            GhiChu      = N'${congViec.GhiChu
                    ? congViec.GhiChu
                    : rows.recordset[0].GhiChu
                }',
                            MaNguoiLam  = ${congViec.MaNguoiLam
                    ? congViec.MaNguoiLam
                    : rows.recordset[0].MaNguoiLam
                },
                            MaNguoiGiao = ${congViec.MaNguoiGiao
                    ? congViec.MaNguoiGiao
                    : rows.recordset[0].MaNguoiGiao
                },
                            Kieu        = ${congViec.Kieu
                    ? congViec.Kieu
                    : rows.recordset[0].Kieu
                }
                        where MaCV = ${congViec.MaCV}
        `;
            sql.query(query, (err1, rows1) => {
                // rows1 không có gì trả về
                if (err1) {
                    res.status(500).send("Cập nhật công việc thất bại");
                    console.log(err1);
                    sql.close();
                } else {
                    // sau khi cập nhật thông tin công việc thành công thì sẽ insert log thực hiện vào bảng LogCongViec
                    const query = `insert into LogCongViec(MaCV, TieuDe, NoiDung, GioBatDau, GioKetThuc, NgayBatDau,
                                                        NgayKetThuc, TrangThai, TienDo, GhiChu, MaNguoiLam,
                                                        MaNguoiGiao, Kieu, MoTa)
                                values (${rows.recordset[0].MaCV}, N'${congViec.TieuDe ? congViec.TieuDe : rows.recordset[0].TieuDe
                        }', N'${congViec.NoiDung ? congViec.NoiDung : rows.recordset[0].NoiDung
                        }', '${congViec.GioBatDau
                            ? congViec.GioBatDau
                            : rows.recordset[0].GioBatDau.toISOString()
                                .split("T")[1]
                                .split(".")[0]
                        }', '${congViec.GioKetThuc
                            ? congViec.GioKetThuc
                            : rows.recordset[0].GioKetThuc.toISOString()
                                .split("T")[1]
                                .split(".")[0]
                        }', '${congViec.NgayBatDau
                            ? congViec.NgayBatDau
                            : rows.recordset[0].NgayBatDau.toISOString().split("T")[0]
                        }', '${congViec.NgayKetThuc
                            ? congViec.NgayKetThuc
                            : rows.recordset[0].NgayKetThuc.toISOString().split("T")[0]
                        }', N'${congViec.TrangThai
                            ? congViec.TrangThai
                            : rows.recordset[0].TrangThai
                        }', ${congViec.TienDo ? congViec.TienDo : rows.recordset[0].TienDo
                        }, N'${congViec.GhiChu ? congViec.GhiChu : rows.recordset[0].GhiChu
                        }', ${congViec.MaNguoiLam
                            ? congViec.MaNguoiLam
                            : rows.recordset[0].MaNguoiLam
                        }, ${congViec.MaNguoiGiao
                            ? congViec.MaNguoiGiao
                            : rows.recordset[0].MaNguoiGiao
                        }, ${congViec.Kieu ? congViec.Kieu : rows.recordset[0].Kieu}, N'${req.body.MoTa != undefined
                            ? req.body.MoTa
                            : "Cập nhật thông tin công việc"
                        }')`;
                    sql.query(query, (err2, rows2) => {
                        if (err2) {
                            res.status(500).send("Có lỗi xảy ra khi thêm log công việc");
                            console.log(err2);
                            sql.close();
                        } else {
                            const requestToken = new sql.Request()
                            const procGetNguoiDungByID = "GetNguoiDungByID"
                            requestToken.input("MaND", sql.Int,
                                rows.recordset[0].MaNguoiGiao != null ?
                                    rows.recordset[0].MaNguoiGiao :
                                    rows.recordset[0].MaNguoiLam)

                            requestToken.execute(procGetNguoiDungByID, (err3, rows3) => {
                                if (err3) {
                                    console.log(err3);
                                    res.status(500).send("Có lỗi xảy ra");
                                    sql.close();
                                } else {
                                    const message = {
                                        token: rows3.recordset[0].TokenUser,
                                        notification: {
                                            title: `${congViec.TieuDe} đã được cập nhật`,
                                            body: `${congViec.NoiDung}`
                                        },
                                        data: {
                                            MaCV: rows.recordset[0].MaCV.toString()
                                        }
                                    }

                                    admin.messaging().send(message).then((response) => {
                                        const queryInsertNotify = `insert into ThongBao(TieuDe, NoiDung, MaCV, MaND) values 
                                            (N'${message.notification.title}',
                                            N'${message.notification.body}', ${rows.recordset[0].MaCV}, ${rows.recordset[0].MaNguoiGiao != null ?
                                                rows.recordset[0].MaNguoiGiao :
                                                rows.recordset[0].MaNguoiLam})`

                                        requestToken.query(queryInsertNotify, (err4, rows4) => {
                                            if (err4) {
                                                console.log(err4);
                                                res.status(500).send("Có lỗi xảy ra");
                                                sql.close();
                                            } else {
                                                res.send("Câp nhật công việc thành công");
                                                sql.close();
                                            }
                                        })
                                    }).catch((err5) => {
                                        console.log(err5)
                                        res.status(500).send("Có lỗi xảy ra");
                                        sql.close();
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}

exports.deleteCongViec = async (req, res) => {
    await sql.connect(dbConfig);
    var congViec = {
        MaCV: req.params.MaCV,
    };

    const procName = "GetLogCongViecByMaCV";
    const inputParam = congViec.MaCV;

    // const procCheckKieu = "GetAllTransferTask"

    const request = new sql.Request();
    request.input("MaCV", sql.Int, inputParam);

    // request.input("MaCV", sql.Int, inputParam)

    const result = await request.execute(procName);

    // const resultCheckKieu = await request.execute(procCheckKieu)

    if (result.recordset.length === 0) {
        const query = `delete
                    from CongViec
                    where MaCV = ${congViec.MaCV}`;
        sql.query(query, (err, rows) => {
            if (err) {
                res.status(500).send("Có lỗi xảy ra khi xóa công việc");
                console.log(err);
                sql.close();
            } else {
                res.send("Xóa công việc thành công");
                sql.close();
            }
        });
    } else {
        const query1 = `delete
                    from LogCongViec
                    where LogCongViec.MaCV = ${congViec.MaCV}`;
        const query2 = `delete
                    from CongViec
                    where CongViec.MaCV = ${congViec.MaCV}`;
        sql.query(query1, (err, rows) => {
            if (err) {
                res.status(500).send("Có lỗi xảy ra khi xóa công việc");
                console.log(err);
                sql.close();
            } else {
                sql.query(query2, (err, rows) => {
                    if (err) {
                        res.status(500).send("Có lỗi xảy ra khi xóa công việc");
                        console.log(err);
                        sql.close();
                    } else {
                        res.send("Xóa công việc thành công");
                        sql.close();
                    }
                });
            }
        });
    }
};