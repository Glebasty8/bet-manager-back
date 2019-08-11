export default (sequelize: any, DataTypes: any) => {
    const Bet = sequelize.define('bet', {
        sportType: DataTypes.TEXT,
        competition: DataTypes.TEXT,
        forecast: DataTypes.TEXT,
        betAmount: DataTypes.FLOAT,
        coefficient: DataTypes.FLOAT,
        competitors: DataTypes.ARRAY(DataTypes.TEXT),
        isFree: DataTypes.BOOLEAN,
        userId: DataTypes.INTEGER,
    }, {
        freezeTableName: true,
        tableName: 'bets',
        timestamps: true,
        paranoid: true
    });

    Bet.associate = models => {
        models.Comment.belongsTo(models.User, {foreignKey: 'userId', as: 'user'});
    };

    return Bet;
};

