module.exports =  (sequelize, DataTypes) => {
    const SportType =  sequelize.define('sport-type', {
        name: DataTypes.TEXT,
    }, {
        freezeTableName: true,
        tableName: 'sport-types',
        timestamps: true,
        paranoid: true
    });

    SportType.associate = models => {
        models.SportType.hasMany(models.Bet, { as: 'bets' });

    };

    return SportType
};

