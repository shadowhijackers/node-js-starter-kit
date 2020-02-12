import express, {Request, Response} from 'express';
import {UsersRoutes} from "./routes/users.routes";

export default ( app: express.Application )=> {
    app.get('/', async (req: Request, res: Response)=>{
        res.status(200).send(`<h1> APP IS RUNNING</h1>`)
    });
    app.use('/user', UsersRoutes.getUserRoutes());
}
