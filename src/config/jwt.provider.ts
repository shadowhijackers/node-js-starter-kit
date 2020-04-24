import {Service} from "typedi";
import * as jwt from 'jsonwebtoken';

import config from '../config';

export class JwtProvider {

    public static generateToken(userId: string, role: string) {
       return jwt.sign({id: userId, role}, config.jwtSecret as string, {
            expiresIn: 86400 // expires in 24 hours
        });
    }

    public static verifyToken(token: string) {
       return  jwt.verify(token, config.jwtSecret as string)
    }

}
