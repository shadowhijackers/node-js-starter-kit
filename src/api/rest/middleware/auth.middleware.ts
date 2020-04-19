import {NextFunction, Request, Response} from "express";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {

    if (req.session && req.session.userId || true) {
        return next();
    } else {
        res.status(401).send({error: 'You must be logged in to view this page.'});
    }

}
