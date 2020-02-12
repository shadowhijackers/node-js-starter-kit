import mongoose, {Schema} from 'mongoose';

export class UsersModelSchema {

    schema: Schema<any>;

    constructor() {
        this.schema = new mongoose.Schema({
            "_id": {type: mongoose.Types.ObjectId},
            "name": {type: String},
            "password": String,
            "role": {
                type: String,
                default: 'user',
            },
        }, {timestamps: true, versionKey: false});
    }

    configStaticsExtensionMethods() {
        this.addGetUsersExtension();
    }

    addGetUsersExtension() {
        this.schema.statics.getUsers = function (query: any) {
            return new Promise((resolve, reject) => {
                this.find(query).then((result: any) => {
                    resolve(result);
                }).catch((err: Error) => {
                    reject(err);
                });
            });
        }
    }

    static getInstance() {
        const ins = new UsersModelSchema();
        ins.configStaticsExtensionMethods();
        return ins.schema;
    }

}
