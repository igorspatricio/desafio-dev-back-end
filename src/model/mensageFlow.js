const Sequelize = require('sequelize');
const database = require('../db/db.js');

const MensageFlow = database.define('mensageFlow', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    template_name:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    posit:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});



module.exports = MensageFlow;
