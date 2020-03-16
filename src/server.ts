import express from 'express';
import http2, {Server} from 'http';
import "reflect-metadata";

import loaders from './loaders'
import config from './config';
import {Container} from "typedi";
import {Logger} from "winston";

export class AppServer {

    public static PORT =  config.port || '3000';


    constructor() {
    }

    public static async  start(){

        const app = express();
        const loadedModules = await loaders({ expressApp: app});
        const server = http2.createServer(loadedModules.app)
            .listen(this.PORT);
        server.on( 'listening',  this.onListening(server));
        server.on('error', this.onError(server))

    }

    public static onListening(server: Server){
        return ()=>{
            const addr = server.address();
            console.log('listening');
        }
    }

    public static onError(server: Server){
        return (error: Error | any)=>{

            const logger: Logger = Container.get('LoggerInstance');


            if (error.syscall !== 'listen') {
                throw error;
            }

            var bind = typeof this.PORT === 'string'
                ? 'Pipe ' + this.PORT
                : 'Port ' + this.PORT;

            // handle specific listen errors with friendly messages
            switch (error.code) {
                case 'EACCES':
                    logger.error(bind + ' requires elevated privileges');
                    process.exit(1);
                    break;
                case 'EADDRINUSE':
                    logger.error(bind + ' is already in use');
                    process.exit(1);
                    break;
                default:
                    throw error;
            }

        }
    }

}


AppServer.start();
