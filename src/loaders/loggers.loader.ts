import winston from 'winston';
import config from '../config';
import appRoot from 'app-root-path';

const transports = [];
if (process.env.NODE_ENV == 'development') {
    transports.push(
        new winston.transports.Console()
    )
} else {
    transports.push(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.cli(),
                winston.format.splat(),
                winston.format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                })
            )
        })
    );
    transports.push(
        new winston.transports.File({
            filename: 'app.log',
            level: 'info',
            dirname: appRoot.path + '/logs',
        }))
}

const LoggerInstance = winston.createLogger({
    level: config.logs.level,
    levels: winston.config.npm.levels,
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({stack: true}),
        winston.format.splat(),
        winston.format.json()
    ),
    transports
});

export default LoggerInstance;
