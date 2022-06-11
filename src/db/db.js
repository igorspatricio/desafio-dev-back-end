const Sequelize = require('sequelize');
const sequelize = new Sequelize('desafio1', 'postgres', '123456', {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432
});



module.exports = sequelize;