const config = require("../../config/config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.connection_string);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

const pepole = require("./pepole")(sequelize, Sequelize);
const users = require("./users")(sequelize, Sequelize);
const account = require("./account")(sequelize, Sequelize);
const pepole_list = require("./pepole_list")(sequelize, Sequelize);
const map = require("./map")(sequelize, Sequelize);

users.belongsTo(account, { foreignKey: 'account_id' });
account.hasMany(pepole_list, { as: 'pepole_lists' });
pepole_list.belongsTo(account, { foreignKey: 'accountId' });
map.belongsTo(pepole_list, { foreignKey: 'pepole_list_id' })

db.Pepole = pepole;
db.Users = users;
db.Account = account;
db.PepoleList = pepole_list;
db.Map = map;

module.exports = db;