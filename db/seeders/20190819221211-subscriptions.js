'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('subscriptions', [
            {
                title: 'Subscription for day',
                cost: 200,
                description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
                subscriptionTimeInHours: 24,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: 'Subscription for week',
                cost: 400,
                description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
                subscriptionTimeInHours: 168,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: 'Subscription for month',
                cost: 1000,
                description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
                subscriptionTimeInHours: 720,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('subscriptions', null, {});
    }
};
