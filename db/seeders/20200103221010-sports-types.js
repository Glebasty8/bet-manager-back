'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('sport-types', [
            {
                name: 'Футбол (Football)',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Баскетбол (Basketball)',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Теннис (Tennis)',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Волейбол (Volleyball)',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Хоккей (Hockey)',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Гандбол (Handball)',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Футзал (Futsal)',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Бейсбол (Baseball)',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Бадминтон (Badminton)',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Дартс (Darts)',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Снукер (Snooker)',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Зимний спорт (Winter sport)',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Настольный теннис (Table tennis)',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Водное поло (Water polo)',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Хоккей на траве (Field hockey)',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Велогонки (Cycling)',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Бокс (Box)',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Бенди (Bandy)',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Гольф (Golf)',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Американский футбол (American football)',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Пляжный волейбол (Пляжный волейбол)',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Пляжный футбол  (Beach football)',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Авто (Auto)',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Мото (Moto)',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Австралийский футбол (Australian football)',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Регби (Rugby)',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Крикет (Cricket)',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Скачки (Horse racing)',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Киберспорт (Cybersport)',
                createdAt: new Date(),
                updatedAt: new Date(),
            }

        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('sport-types', null, {});
    }
};
