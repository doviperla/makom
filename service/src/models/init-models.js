var DataTypes = require("sequelize").DataTypes;
var _pepole = require("./pepole");

function initModels(sequelize) {
  var pepole = _pepole(sequelize, DataTypes);


  return {
    pepole,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
