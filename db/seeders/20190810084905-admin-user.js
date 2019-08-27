'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      userName: 'Admin',
      email: 'admin@gmail.com',
      password: '$2b$08$fe3RsmkH76OfjYRQHVugMueui.grdI3CNlOrYua85B7GIOyW0snpi',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
      dateOfBirth: '04-07-1997',
      balance: 2000,
      subscriptionId: 1
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
