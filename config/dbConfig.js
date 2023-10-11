// const connectString =
//   "server=DESKTOP-55BHLHA\\LUANNT;Database=TodosDB;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
// module.exports = connectString;

const config = {
  server: "192.168.1.42",
  user: "luannt2809",
  password: "123456",
  database: "TodosDB",
  trustServerCertificate: true,
  options: {
    encrypt: false,
  }
};

module.exports = config;
