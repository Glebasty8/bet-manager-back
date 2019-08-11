import * as express from 'express';
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import * as morgan from "morgan";
import extractToken from './extractToken';

const middleware = (app: express.Application) => {
    app.use(cors());
    app.use(helmet());
    app.use(extractToken);
    app.use(bodyParser.json());
    app.use(morgan('[:date[clf]] ":method :url HTTP/:http-version"'));
    app.use(
        bodyParser.urlencoded({
            extended: true,
        })
    );
};

export default middleware;
