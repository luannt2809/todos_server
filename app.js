var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var VaiTroRouter = require("./routes/VaiTro");
var PhongBanRouter = require("./routes/PhongBan");
var NguoiDungRouter = require("./routes/NguoiDung");
var CongViecRouter = require("./routes/CongViec");
var NguoiLienQuanRouter = require("./routes/NguoiLienQuan");
var ThongBaoRouter = require("./routes/ThongBao");
var LogCongViecRouter = require("./routes/LogCongViec");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/vaitro", VaiTroRouter);
app.use("/api/phongban", PhongBanRouter);
app.use("/api/nguoidung", NguoiDungRouter);
app.use("/api/congviec", CongViecRouter);
app.use("/api/nguoilienquan", NguoiLienQuanRouter);
app.use("/api/thongbao", ThongBaoRouter);
app.use("/api/logcongviec", LogCongViecRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
