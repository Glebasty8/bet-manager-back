module.exports =  (sequelize, DataTypes) => {
    const Subscription = sequelize.define('subscription', {
        title: DataTypes.TEXT,
        cost: DataTypes.FLOAT,
        description: DataTypes.TEXT,
        subscriptionTimeInHours: DataTypes.INTEGER,
    }, {
        freezeTableName: true,
        tableName: 'subscriptions',
        timestamps: true,
        paranoid: true
    });

    Subscription.associate = models => {
        models.Subscription.hasMany(models.UserSubscription, { foreignKey: 'subscriptionId', as: 'subscriptions' });
    };

    return Subscription;
};

