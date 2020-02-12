import mongoose from 'mongoose';
import { Db } from 'mongodb';
import config from '../config';

export default async (): Promise<any> => {
    try {
        const mongooseInstance = await mongoose.connect(config.db.url as string, {
            keepAlive: true,
            keepAliveInitialDelay: 300000,
            socketTimeoutMS: 2000000,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            user: config.db.user,
            pass: config.db.password
        });
        return mongooseInstance.connection.db;
    }catch (e) {
        console.error(e);
    }
};
