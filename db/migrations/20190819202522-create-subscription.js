module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('subscriptions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
              type: Sequelize.TEXT,
              allowNull: false
            },
            cost: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            subscriptionTimeInHours: {
              type: Sequelize.INTEGER,
              allowNull: false,
            },
            description: {
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
        });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable('subscriptions');
    }
};
