import express from 'express';
import http2, {Server} from 'http';
import {Container} from "typedi";
import {Logger} from "winston";

import loaders from './loaders'
import config from './config';


export class AppServer {

    public  PORT =  config.port || '3000';
    logger: Logger | null = null;

    constructor() {
    }

    public static async  start(){

        const appServer = new AppServer();
        const app = express();
        const loadedModules = await loaders({ expressApp: app});
        appServer.logger = Container.get('LoggerInstance');
        const server = http2.createServer(loadedModules?.app)
            .listen(appServer.PORT);

        server.on( 'listening',  appServer.onListening(server));
        server.on('error', appServer.onError(server));
        appServer.prepareAppToExitWhileCrashes(server);
        appServer.exceptionHandling();

    }

    private  onListening(server: Server){
        return ()=>{
            const addr = server.address();
            console.log('listening');
        }
    }

    private  onError(server: Server){
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

    prepareAppToExitWhileCrashes(server: Server) {
        process.on('SIGINT', function () {
            server.close(function () {
                process.exit(0);
            });
        });
    }

     exceptionHandling(){

        process.on('uncaughtException',  (err) => {
            this.logger?.error(err);
            process.exit(1); // process will start the server again by pm2 in production
        });

        const unhandledRejections = new Map();
         process.on('unhandledRejection', (reason, promise) => {
             unhandledRejections.set(promise, reason);
             console.log(reason);
         });

         process.on('rejectionHandled', async (promise) => {
             unhandledRejections.delete(promise);
             console.log(await promise);
         });

    }

}


AppServer.start();
