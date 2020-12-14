const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const connection_string = "postgres://app:password@postgres/db";
const sequelize = new Sequelize(connection_string);
const init_pepole = require('../models/pepole');

const Pepole = init_pepole(sequelize, DataTypes);
