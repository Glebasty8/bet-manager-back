module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('bets', 'sportType'),
            queryInterface.addColumn('bets', 'sportTypeId', {
                type: Sequelize.INTEGER
            }),
        ])
    },
    down: (queryInterface) => {
        return Promise.all([
            queryInterface.removeColumn('bets', 'sportTypeId'),
            queryInterface.addColumn('bets', 'sportType', {
                type: Sequelize.TEXT
            }),
        ])
    }
};
