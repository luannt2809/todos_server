var config = {
  server: 'ADMIN-PC\\LUANNT',  //update me
  authentication: {
    type: 'default',
    options: {
      userName: 'sa', //update me
      password: '123abc'  //update me
    }
  },
  options: {
    // If you are on Microsoft Azure, you need encryption:
    encrypt: false,
    database: 'TodosDB'  //update me
  }
};

module.exports = config;
