const Sequelize = require('sequelize');
const database = require('../db/db');

const Subscription = database.define('subscription', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false

    },
    subscription_date: {
        type: 'TIMESTAMP',
        allowNull: false
    },
    name: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    lastmensage:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    active:{
        type: Sequelize.BOOLEAN,
        allowNull: false
    }

})

module.exports = Subscription;

