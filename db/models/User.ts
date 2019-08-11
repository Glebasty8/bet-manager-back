export default (sequelize: any, DataTypes: any) => {
    const User =  sequelize.define('user', {
        userName: DataTypes.TEXT,
        age: DataTypes.INTEGER,
        email: DataTypes.TEXT,
        password: DataTypes.TEXT,
        tempPassword: DataTypes.TEXT,
        role: DataTypes.TEXT,
    }, {
        freezeTableName: true,
        tableName: 'users',
        timestamps: true,
        paranoid: true
    });

    User.associate = models => {
        models.User.hasMany(models.Bet, { as: 'bets' });
    };

    return User;
};
