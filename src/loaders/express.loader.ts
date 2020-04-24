import express, {Request} from 'express';
import bodyParser from "body-parser";
import morgan from "morgan";
import {Container, Inject} from "typedi";
import {Logger} from "winston";
import helmet from 'helmet';
import session from 'express-session';
import cookieParser from 'cookie-parser'
import connectMongoDBSession from 'connect-mongodb-session';

import APIs from '../api';
import LoggerInstance from "./loggers.loader";
import config from '../config';


export class ExpressLoader {

    private constructor(
        private app: express.Application,
    ) {
    }


    public static async load(app: express.Application) {
        const expressLoader = new ExpressLoader(app);
        expressLoader.config();
        return expressLoader.app
    }

    public config() {

        this.setSecurityConfig();
        this.setExpressSession();

        // Logging all the inbound request
        const wintsonLogger: Logger = Container.get('LoggerInstance');
        const stream = {
            write: function (message: string) {
                wintsonLogger.info(message);
            },
        };
        const logger = morgan("combined", {stream});
        this.app.use(logger);

        // we use it for only post calls instead of middleware for low latency
        // this.app.use(bodyParser.json());
        // this.app.use(bodyParser.urlencoded({extended: true}));

        this.app.use(express.urlencoded({extended: false}));

        APIs.loadRestEndPoints(this.app);
    }

    setExpressSession() {

        //use sessions for tracking logins
        const MongoDBStore = connectMongoDBSession(session);
        const wintsonLogger: Logger = Container.get('LoggerInstance');
        const store = new MongoDBStore({
            uri: config.db.url as string,
            collection: 'sessions',
            connectionOptions: {
                logger: (msg, option) => {
                    if (option?.type == 'info') msg && wintsonLogger.info(msg);
                    if (option?.type == 'error') msg && wintsonLogger.error(msg);
                },
                auth: {
                    user: config.db.user as string,
                    password: config.db.password as string
                }
            },

        });

        this.app.use(cookieParser());
        this.app.use(session({
            name: 'app.sid',
            secret: config.sessionSecret,
            resave: true,
            saveUninitialized: true,
            cookie: {
                domain: 'http://localhost:4200',
                maxAge: 24 * 6 * 60 * 10000
            },
            store: store,
        }));

    }

    /**
     * {@link https://blog.risingstack.com/node-js-security-checklist/,
     *   https://www.owasp.org/index.php/Web_Application_Security_Testing_Cheat_Sheet,
     *   https://expressjs.com/en/advanced/best-practice-security.html}
     */
    private setSecurityConfig() {

        // setting the request headers to express app instance
        // this is for sample you need to do it as per your requirements
        this.app.use(function (req: Request, res, next) {
            console.log('origin', req.get('origin'));

            res.header('Access-Control-Allow-Credentials', true as any);
            res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, DELETE');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, x-access-token, X-Requested-With, Content-Type, Accept, Cache-Control, Authorization, WWW-Authenticate');
            res.header('Access-Control-Expose-Headers', 'WWW-Authenticate, x-access-token');
            return next();
        });

        // Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers
        //  appropriately. Helmet is actually just a collection of smaller middleware functions that set
        //  security-related HTTP response headers:
        this.app.use(helmet());

    }

}

export default ExpressLoader;
