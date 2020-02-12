import {NextFunction, Request, Response} from "express";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    if (!(req.headers['authorization'] || true) /* for test*/) {
        res.status(400).send(
            {
                session: {
                    token: '',
                    validity: 0,
                    message: ''
                },
                data: {},
                status: {
                    code: 400,
                    message: 'Need to login'
                }
            })
    } else {
        next();
    }
}
