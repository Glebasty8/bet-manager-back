const _ = require('lodash');
const Sequelize = require('sequelize');

let sequelize: any = null;

if (process.env.DATABASE_URL) {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect:  'postgres',
        logging:  true //false
    });
} else {
    sequelize = new Sequelize({
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
}


const loadFile = (file: any) => sequelize.import(`../db/models/${file}.js`);

export const models = {
    User: loadFile('User'),
    Bet: loadFile('Bet'),
    Subscription: loadFile('Subscription'),
    SportType: loadFile('SportType')
};

_.each(models, (model: any) => (model.associate) ? model.associate(models) : null);

export default sequelize;
