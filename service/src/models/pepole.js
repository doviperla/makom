module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pepole', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey:true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    wife_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    places_count: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    point_on_map: {
      type: DataTypes.STRING,
      allowNull: true
    },
    orat_keva: {
      type: DataTypes.STRING,
      allowNull: true
    },
    orat_keva_end: {
      type: DataTypes.STRING,
      allowNull: true
    },
    amount_per_place: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    zeout: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    mens_rosh_ashana: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    womens_rosh_ashana: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mens_kipur: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    womens_kipur: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    comments: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sum: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    paid_up: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    pepole_list_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'pepole',
    schema: 'makom_schema',
    timestamps: false
  });
};
