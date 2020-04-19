import mongoose from 'mongoose';
import "reflect-metadata";

import ExpressLoader from './express.loader';
import Logger from './loggers.loader';
import MongoDBLoader from './mongoose.loader';
import dependencyInjector from './dependencyInjector';
import {OrdersModelSchema, UsersModelSchema} from '../models';

export async function loadModules(moduleInstance: { expressApp: any }) {

    const mongooseConnection = await MongoDBLoader();
    Logger.info('✌️ DB loaded and connected!');

    const usersModel = {name: 'UsersModel', model: mongoose.model('user',  UsersModelSchema.getInstance() , 'users')};
    const ordersModel = {name: 'OrdersModel', model: mongoose.model('orders',  OrdersModelSchema.getInstance() , 'orders')};

    dependencyInjector(
        mongooseConnection,
        [
            usersModel,
            ordersModel
        ]);

    const app = await ExpressLoader.load(moduleInstance.expressApp);
    Logger.info('Express loaded');

    return {
        app
    }
}

export default loadModules
