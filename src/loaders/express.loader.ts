import express from 'express';
import bodyParser from "body-parser";

import api from '../api/index';

export class ExpressLoader{

    private constructor(
        private app: express.Application
    ) {
    }

    public config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        api(this.app);
    }

    public static async load(app: express.Application){
        const expressLoader = new ExpressLoader(app);
        expressLoader.config();
        return expressLoader.app
    }

}

export default ExpressLoader;
