'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      userName: 'Admin',
      email: 'admin@gmail.com',
      password: '$2b$08$fe3RsmkH76OfjYRQHVugMueui.grdI3CNlOrYua85B7GIOyW0snpi',
      role: 'admin',
      age: '20',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
