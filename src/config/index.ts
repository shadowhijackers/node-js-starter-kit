import dotenv from 'dotenv';
import appRoot from 'app-root-path';

// Set the NODE_ENV to 'development' by default
// process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const commandArguments = process.argv.slice(2);
commandArguments.forEach((arg)=>{

    const splittedaArgString = arg.split('=');

    if(splittedaArgString[0] === 'env') {
        const envFound = dotenv.config({path: `${appRoot.path}/environments/${splittedaArgString[1]}.env`});
        if (!envFound) {
            console.log(appRoot);
            throw new Error("⚠️  Couldn't find .env file  ⚠️");
        }
        console.log(envFound)
    }

});

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
        prefix: '/api',
    },
    /**
     * Mailgun email credentials
     */
    emails: {
        apiKey: 'API key from mailgun',
        domain: 'Domain Name from mailgun'
    }
};
