var Sequelize = require('sequelize');

var db = new Sequelize('postgres://localhost:5432/fitness', {
  logging: false
});



db.sync( {force: true} ).then(function () {
  console.log('Sequelize models synced to PostgreSQL');
});

module.exports = db;