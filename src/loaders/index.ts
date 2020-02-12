import mongoose from 'mongoose';

import ExpressLoader from './express.loader';
import Logger from './loggers.loader';
import MongoDBLoader from './mongoose.loader';
import dependencyInjector from './dependencyInjector';
import {UserModelSchema} from '../models';

export async function loadModules(moduleInstance: { expressApp: any }) {

    const mongooseConnection = await MongoDBLoader();
    Logger.info('✌️ DB loaded and connected!');

    const userModel = {name: 'UserModel', model: mongoose.model('user', UserModelSchema.getInstance())};

    dependencyInjector(
        mongooseConnection,
        [
            userModel
        ]);

    const app = await ExpressLoader.load(moduleInstance.expressApp);
    Logger.info('Express loaded');

    return {
        app
    }
}

export default loadModules
