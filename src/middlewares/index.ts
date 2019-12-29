import * as express from 'express';
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import * as compression from "compression";
import * as morgan from "morgan";
import * as rateLimit from "express-rate-limit";
import extractToken from './extractToken';

const isProduction = process.env.NODE_ENV === 'production';
const origin = {
    origin: isProduction ? 'https://bet-man-app1.herokuapp.com' : '*',
};

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 150, // 100 requests,
})

const middleware = (app: express.Application) => {
    app.use(cors(origin));
    app.use(helmet());
    app.use(limiter)
    app.use(extractToken);
    app.use(bodyParser.json());
    app.use(compression())
    app.use(morgan('[:date[clf]] ":method :url HTTP/:http-version"'));
    app.use(
        bodyParser.urlencoded({
            extended: true,
        })
    );
};

export default middleware;
