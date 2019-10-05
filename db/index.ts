const _ = require('lodash');
import Sequelize from 'sequelize';

const sequelize = new Sequelize({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
    dialect: 'postgres',
    pool: {
        max: 25,
        min: 0,
        idle: 20000,
        acquire: 20000
    }
});

const loadFile = file => sequelize.import(`./models/${file}.ts`);

export const models = {
    User: loadFile('User'),
    Bet: loadFile('Bet'),
    Subscription: loadFile('Subscription')
};

_.each(models, model => (model.associate) ? model.associate(models) : null);

export default sequelize;
