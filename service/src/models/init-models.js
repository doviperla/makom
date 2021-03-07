const DataTypes = require("sequelize").DataTypes;
const _pepole = require("./pepole");
const _users = require("./users");
const _account = require("./account");
const _pepole_list = require("./pepole_list");

function initModels(sequelize) {
  const pepole = _pepole(sequelize, DataTypes);
  const users = _users(sequelize, DataTypes);
  const account = _account(sequelize, DataTypes);
  const pepole_list = _pepole_list(sequelize, DataTypes);

  users.belongsTo(account, { foreignKey: 'account_id' });
  account.hasMany(pepole_list, { as: 'pepole_lists' });
  pepole_list.belongsTo(account, { foreignKey: 'accountId' });

  return {
    pepole,
    users,
    account,
    pepole_list
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
