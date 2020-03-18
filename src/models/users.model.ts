import mongoose, {Schema} from 'mongoose';
import {IUser} from "../types";

export class UsersModelSchema {

    schema: Schema<any>;

    constructor() {
        this.schema = new mongoose.Schema({
            "_id": {type: mongoose.Types.ObjectId},
            "name": {type: String},
            "email": {type: String},
            "password": String,
            "role": {type: String, default: 'user',},
        }, {timestamps: true, versionKey: false});
    }

    configStaticsExtensionMethods() {
        this.addGetUsersExtension();
        this.registerUserDetailsExtension();
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

    registerUserDetailsExtension() {

        this.schema.statics.registerUserDetails = function (user: IUser) {

            return new Promise((resolve, reject) => {
                this.find({email: user.email})
                    .then((result: any) => {
                        if (!result) {
                            this.create(user, ((err: Error) => {
                                if (!err) {
                                    resolve({message: 'User created successfully', isSuccess: true})
                                }
                            })).catch((err: Error) => reject(err));
                        } else {
                            resolve({message: 'Email is already exsits', isSuccess: false})
                        }
                    }).catch((err: Error) => reject(err))
                ;
            });

        }
    }

    static getInstance() {
        const ins = new UsersModelSchema();
        ins.configStaticsExtensionMethods();
        return ins.schema;
    }

}
