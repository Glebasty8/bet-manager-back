module.exports =  (sequelize, DataTypes) => {
    const Subscription = sequelize.define('subscription', {
       type: DataTypes.INTEGER,
       userId: DataTypes.INTEGER,
       completionDate: DataTypes.DATE
    }, {
        freezeTableName: true,
        tableName: 'subscriptions',
        timestamps: true,
        paranoid: true
    });

    Subscription.associate = models => {
        models.Subscription.hasOne(models.User);
    };

    return Subscription;
};

