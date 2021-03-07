module.exports = function (sequelize, DataTypes) {
    return sequelize.define('pepole_list', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        accountId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'pepole_list',
        schema: 'makom_schema',
        timestamps: false
    });
};