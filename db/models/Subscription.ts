export default (sequelize: any, DataTypes: any) => {
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
        models.Subscription.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    };

    return Subscription;
};

