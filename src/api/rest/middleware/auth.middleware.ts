import {NextFunction, Request, Response} from "express";
import {JwtProvider} from "../../../core/jwt.provider";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {

    const authToken = req.headers['authorization'];
    const decoded: any = JwtProvider.verifyToken(authToken as string);
    req.body.authData = decoded;
    if (decoded && decoded.exp > new Date().getTime()/1000 ) {
        return next();
    } else {
        res.status(401).send({error: 'You must be logged in to view this page.'});
    }

}
