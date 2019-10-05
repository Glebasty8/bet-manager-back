import * as express from 'express';

import 'dotenv/config';

import db from '../db';
import routes from './routes';
import middleware from './middlewares';

const PORT = process.env.PORT || 5000;

db.authenticate()
    .then(() => {
        console.log('Connection with database has been established successfully.');

        const app: express.Application = express();
        middleware(app);

        //Set all routes from routes folder
        app.use("/api", routes);

        // app.get('/', (req, res) => {
        //     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
        // });

        app.get("/", (req, res) => {
           res.send('This is BetManager API - v.1.0')
        });

        app.listen(PORT, () => {
            console.log(`Express server has started on port ${PORT}!`);
        });
    })
    .catch(error => console.log(error));


