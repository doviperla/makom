const { Sequelize } = require('sequelize');
const init_models = require('./models/init-models');

let _sequelize = null;

module.exports.init = async () => {
    try {
        const connection_string = "postgres://imedis_admin:1nc1d3nt4L@localhost:2744/makom";
        // const connection_string = "postgres://makom_admin:bfaknmt8!@test.csewenyqwx9l.eu-central-1.rds.amazonaws.com:2744/makom";
        const sequelize = new Sequelize(connection_string);
        await sequelize.authenticate();
        await init_models(sequelize);
        console.log('Connection has been established successfully.');
        return sequelize.models;
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports.getSequelize = () => {
    return _sequelize
};