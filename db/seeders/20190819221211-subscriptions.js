'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('subscriptions', [
            {
                title: 'Подписка "День"',
                cost: 200,
                description: 'Как минимум один матч на сегодня или завтра будет в вашем распоряжении!',
                subscriptionTimeInHours: 24,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: 'Подписка "Неделя"',
                cost: 700,
                description: 'Так же, как и в прошлой, один день - минимум, и как правило, один прогноз. Очень удобный вариант, чтобы затронуть и еврокубковые, и внутренние чемпионаты',
                subscriptionTimeInHours: 168,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: 'Подписка "Месяц"',
                cost: 2000,
                description: 'От старта - до самого финиша. Период в 30 дней - это наш главный ориентир выхода на положительный баланс. Цель - с первого по последнее число каждого месяца должен быть получен плюсовой баланс. С каждого нового месяца баланс обнуляется.',
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
