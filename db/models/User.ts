export default (sequelize: any, DataTypes: any) => {
    const User = sequelize.define('user', {
        userName: DataTypes.TEXT,
        email: DataTypes.TEXT,
        password: DataTypes.TEXT,
        tempPassword: DataTypes.TEXT,
        role: DataTypes.TEXT,
        recoveryToken: DataTypes.JSONB,
        dateOfBirth: DataTypes.DATE,
        bank: DataTypes.DECIMAL,
        balance: DataTypes.DECIMAL,
        subscriptionId: DataTypes.INTEGER
    }, {
        freezeTableName: true,
        tableName: 'users',
        timestamps: true,
        paranoid: true
    });

    User.associate = models => {
        models.User.hasMany(models.Bet, { as: 'bets' });
        models.User.belongsTo(models.Subscription, { foreignKey: 'subscriptionId', as: 'subscription' });
    };

    return User;
};
