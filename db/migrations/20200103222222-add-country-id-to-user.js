module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('users', 'countryId', {
                type: Sequelize.INTEGER
            })
    },
    down: (queryInterface) => {
        return queryInterface.removeColumn('users', 'countryId')
    }
};
