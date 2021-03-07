module.exports = function (sequelize, DataTypes) {
    return sequelize.define('account', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        logo: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        sequelize,
        tableName: 'account',
        schema: 'makom_schema',
        timestamps: false
    });
};
