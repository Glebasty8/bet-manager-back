'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('subscriptions', [{
            userId: 1,
            type: 1,
            completionDate: '2019-09-19',
            createdAt: new Date(),
            updatedAt: new Date(),
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('subscriptions', null, {});
    }
};
