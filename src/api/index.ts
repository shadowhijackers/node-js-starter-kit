import express, {Request, Response} from 'express';
import {UserRoutes} from "./routes/user.routes";

export default ( app: express.Application )=> {
    app.get('/', async (req: Request, res: Response)=>{
        res.status(200).send(`<h1> APP IS RUNNING</h1>`)
    });
    app.use('/user', UserRoutes.getUserRoutes());
}
