const { Sequelize } = require('sequelize');
const { pepole } = require('./models/init-models');
const init_models = require('./models/init-models');

module.exports.init = async () => {
    try {
        const connection_string = "postgres://app:password@postgres/db";
        const sequelize = new Sequelize(connection_string);
        await sequelize.authenticate();
        console.log(init_models());
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}