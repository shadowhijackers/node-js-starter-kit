import express, {Request, Response} from 'express';
import {UsersRoutes} from "./routes/users.routes";
import config from '../../config';

export default ( app: express.Application )=> {
    app.get(config.api.prefix + '/', async (req: Request, res: Response)=>{
        res.status(200).send(`<h1> APP IS RUNNING</h1>`)
    });
    app.use(config.api.prefix + '/users', UsersRoutes.getUserRoutes());
}
