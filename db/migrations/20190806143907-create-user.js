module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            email: {
                type: Sequelize.TEXT
            },
            userName: {
                type: Sequelize.TEXT
            },
            password: {
                type: Sequelize.TEXT
            },
            role: {
                type: Sequelize.TEXT,
            },
            tempPassword: {
              type: Sequelize.TEXT
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
            recoveryToken: {
                type: Sequelize.JSONB,
                allowNull: true,
            },
            dateOfBirth: {
                type: Sequelize.DATE,
                allowNull: true
            },
            bank: {
                type: Sequelize.DECIMAL,
                allowNull: true
            },
            balance: {
                type: Sequelize.DECIMAL,
                allowNull: false,
                defaultValue: 0,
            },
            subscriptionId: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            countryId: {
                type: Sequelize.INTEGER
            }
        });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable('users');
    }
};
