import mongoose, {NativeError, Schema} from 'mongoose';
import * as bcrypt from "bcrypt";

import {IUser} from "../types";

const SchemaTypes = mongoose.Schema.Types;

export class UsersModelSchema {

    schema: Schema<any>;

    constructor() {
        this.schema = new mongoose.Schema({
            "_id": {type: mongoose.Types.ObjectId, auto: true},
            "name": {type: String},
            "email": {type: String},
            "password": String,
            "role": {type: String, default: 'user',},
        }, {timestamps: true, versionKey: false});
    }

    configStaticsExtensionMethods() {
        this.hooksExtention();
        this.getUsersExtention();
        this.registerUserDetailsExtention();
        this.authenticateExtention();
    }

    hooksExtention(){
        this.schema.pre('save', function(next){
            const user: any = this;
            bcrypt.hash(user.password, 10, function (err, hash){
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            })
        })
    }


    getUsersExtention() {
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

    registerUserDetailsExtention() {

        this.schema.statics.registerUserDetails = function (user: IUser) {

            return new Promise((resolve, reject) => {
                this.find({email: user.email})
                    .then((result: any) => {
                        if (!result || result.length === 0) {
                            this.create(user, ((err: Error, doc: any) => {
                                if (!err) {
                                    resolve(doc);
                                   return
                                }

                                resolve({error: 'Something went wrong', isSuccess: false});
                                return;
                            }));
                        } else {
                            console.log('Error',result);
                            resolve({error: 'Email is already exsits', isSuccess: false})
                        }
                    }).catch((err: Error) => reject(err))
                ;
            });

        }
    }

    authenticateExtention() {
        this.schema.statics.authenticate = function (auth: { email: string, password: string }) {
            return new Promise((resolve, reject) => {
                this.findOne({email: auth.email})
                    .exec((err: NativeError, user: any) => {
                        if (!err) {
                            bcrypt.compare(user.password, auth.password, (err, callback) => {
                                if (!err) {
                                    const output = JSON.parse(JSON.stringify(user));
                                    delete output.password;
                                    resolve(output)
                                } else {
                                    resolve({error: 'Password not matched'});
                                }
                            })
                        }else resolve({error: 'user not found'});
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
