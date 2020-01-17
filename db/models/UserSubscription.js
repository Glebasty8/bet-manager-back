module.exports =  (sequelize, DataTypes) => {
    const UserSubscription = sequelize.define('user-subscription', {
        subscriptionId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER,
        orderId: DataTypes.TEXT,
    }, {
        freezeTableName: true,
        tableName: 'user-subscriptions',
        timestamps: true,
        paranoid: true
    });

    UserSubscription.associate = models => {
        models.UserSubscription.belongsTo(models.Subscription, { foreignKey: 'subscriptionId', as: 'subscription' });
        models.UserSubscription.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    };

    return UserSubscription;
};

