const sql = require("mssql");

const config = {
  user: "DESKTOP-55BHLHA\\LuanNT",

  password: "",

  database: "TodosDB",

  server: "DESKTOP-55BHLHA\\LUANNT",

  pool: {
    max: 10,

    min: 0,

    idleTimeoutMillis: 30000,
  },

  options: {
    encrypt: false, 

    trustServerCertificate: true, 
  },
};

const dbConnect = () => {
  sql
    .connect(config)
    .then(() => {
      console.log("Database Connected");
    })
    .catch((err) => {
      console.log("Lỗi kết nối", err);
    });
};

module.exports = dbConnect;
