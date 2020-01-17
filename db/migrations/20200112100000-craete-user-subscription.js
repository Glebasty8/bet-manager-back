module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('user-subscriptions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            subscriptionId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            userId: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            orderId: {
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
        return queryInterface.dropTable('user-subscriptions');
    }
};
