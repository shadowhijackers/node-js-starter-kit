import express from 'express';
import http2 from 'http';
import "reflect-metadata";

import loaders from './loaders'
import config from './config';

export class AppServer {

    public static PORT =  config.port || '3000';

    constructor() {
    }

    public static async  start(){

        const app = express();
        console.log(config);
        const loadedModules = await loaders({ expressApp: app});
        console.log(this.PORT);
        http2.createServer(loadedModules.app).listen(this.PORT)

    }

}


AppServer.start();
