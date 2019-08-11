import * as express from 'express';

import 'dotenv/config';

import db from '../db';
import routes from './routes';
import middleware from './middlewares';

db.authenticate()
    .then(() => {
        console.log('Connection with database has been established successfully.');

        const app: express.Application = express();
        middleware(app);

        //Set all routes from routes folder
        app.use("/api", routes);

        app.listen(process.env.DEV_PORT, () => {
            console.log(`Express server has started on port ${process.env.DEV_PORT}!`);
        });
    })
    .catch(error => console.log(error));


