module.exports = function (sequelize, DataTypes) {
    return sequelize.define('map', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            autoIncrement: true,
            primaryKey: true
        },
        pepole_list_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        selected_gender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        selected_time: {
            type: DataTypes.STRING,
            allowNull: false
        },
        map_data: {
            type: DataTypes.JSON,
            allowNull: true
        }
    }, {
        sequelize,
        tableName: 'map',
        schema: 'makom_schema',
        timestamps: false
    });
};