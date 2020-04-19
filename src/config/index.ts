import dotenv from 'dotenv';
import appRoot from 'app-root-path';

// Set the NODE_ENV to 'development' by default
// process.env.NODE_ENV = process.env.NODE_ENV || 'development';
debugger
console.log(appRoot.path);
if(process.env.NODE_ENV == 'development'){

    const envFound = dotenv.config({path: `${appRoot.path}/environments/${process.env.NODE_ENV}.env`});
    if (!envFound) {
        console.log(appRoot);
        throw new Error("⚠️  Couldn't find .env file  ⚠️");
    }
    console.log(envFound)

}

export default {
    /**
     * Your favorite port
     */
    port: parseInt(process.env.PORT || '3000', 10),

    /**
     *  mongodb config
     */
    db: {
        url: process.env.MONGODB_URI,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    },
    /**
     * Your secret sauce
     */
    jwtSecret: process.env.JWT_SECRET,

    sessionSecret: 'MsSinErt',

    /**
     * Used by winston logger
     */
    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },


    /**
     * Agendash config
     */
    agendash: {
        user: 'agendash',
        password: '123456'
    },
    /**
     * API configs
     */
    api: {
        prefix: '/api/v1',
    },
    /**
     * Mailgun email credentials
     */
    emails: {
        apiKey: 'API key from mailgun',
        domain: 'Domain Name from mailgun'
    }
};
