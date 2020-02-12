import mongoose from 'mongoose';

import ExpressLoader from './express.loader';
import Logger from './loggers.loader';
import MongoDBLoader from './mongoose.loader';
import dependencyInjector from './dependencyInjector';
import {UsersModelSchema} from '../models';

export async function loadModules(moduleInstance: { expressApp: any }) {

    const mongooseConnection = await MongoDBLoader();
    Logger.info('✌️ DB loaded and connected!');

    const usersModel = {name: 'UsersModel', model: mongoose.model('user',  UsersModelSchema.getInstance() , 'users')};

    dependencyInjector(
        mongooseConnection,
        [
            usersModel
        ]);

    const app = await ExpressLoader.load(moduleInstance.expressApp);
    Logger.info('Express loaded');

    return {
        app
    }
}

export default loadModules
