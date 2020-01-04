module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('bets', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            sportTypeId: {
                type: Sequelize.INTEGER
            },
            competition: Sequelize.TEXT,
            forecast: Sequelize.TEXT,
            betAmount: Sequelize.FLOAT,
            coefficient: Sequelize.FLOAT,
            competitors: Sequelize.ARRAY(Sequelize.TEXT),
            isFree: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            userId: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            deletedAt: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            status: {
                type: Sequelize.INTEGER,
                defaultValue: 1,
                allowNull: false
            },
            eventDate: {
                type: Sequelize.DATE,
                allowNull: false
            }
        });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable('bets');
    }
};
