import express from 'express';
import bodyParser from "body-parser";
import morgan from "morgan";

import api from '../api/index';
import {Container, Inject} from "typedi";
import {Logger} from "winston";
import LoggerInstance from "./loggers.loader";

export class ExpressLoader{

    private constructor(
        private app: express.Application,
    ) {
    }

    public config() {

        const wintsonLogger: Logger = Container.get('LoggerInstance');
        const stream = {
            write: function(message: string) {
                wintsonLogger.info(message);
            },
        };
        const logger = morgan("combined" , {stream});

        this.app.use(bodyParser.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(logger);

        api(this.app);
    }

    public static async load(app: express.Application){
        const expressLoader = new ExpressLoader(app);
        expressLoader.config();
        return expressLoader.app
    }

}

export default ExpressLoader;
