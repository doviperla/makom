module.exports = function (sequelize, DataTypes) {
    return sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            primaryKey: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        account_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'users',
        schema: 'makom_schema',
        timestamps: false
    });
};
