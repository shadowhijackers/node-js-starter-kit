import {Service} from "typedi";
import * as jwt from 'jsonwebtoken';

import config from '../config';

export class JwtProvider {

    public static generateToken(user: any) {
       return jwt.sign({id: user._id}, config.jwtSecret as string, {
            expiresIn: 86400 // expires in 24 hours
        });
    }

    public static verifyToken(token: string, callback: Function) {
        jwt.verify(token, config.jwtSecret as string, callback as any)
    }

}
