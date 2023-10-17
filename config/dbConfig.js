var config = {
  server: 'ADMIN',  //update me
  authentication: {
    type: 'default',
    options: {
      userName: 'luannt2809', //update me
      password: '123456'  //update me
    }
  },
  options: {
    // If you are on Microsoft Azure, you need encryption:
    encrypt: false,
    database: 'TodosDB'  //update me
  }
};

module.exports = config;
