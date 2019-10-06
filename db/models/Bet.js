export default (sequelize, DataTypes) => {
    const Bet = sequelize.define('bet', {
        sportType: DataTypes.TEXT,
        competition: DataTypes.TEXT,
        forecast: DataTypes.TEXT,
        betAmount: DataTypes.FLOAT,
        coefficient: DataTypes.FLOAT,
        competitors: DataTypes.ARRAY(DataTypes.TEXT),
        isFree: DataTypes.BOOLEAN,
        userId: DataTypes.INTEGER,
        status: DataTypes.INTEGER,
        eventDate: DataTypes.DATE
    }, {
        freezeTableName: true,
        tableName: 'bets',
        timestamps: true,
        paranoid: true
    });

    Bet.associate = models => {
        models.Bet.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    };

    return Bet;
};

