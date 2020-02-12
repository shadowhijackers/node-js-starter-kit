import express, {Request, Response, Router} from 'express';
import container, {Service} from "typedi";

import {UsersService} from "../../services";

@Service()
export class UsersRoutes {

    public router: express.Router;

    constructor(
        private userService: UsersService
    ) {
        this.router = Router();
    }

    setUserRoutes(){
      this.getUsers();
      return this.router;
    }

    async getUsers(){
       console.log("userRoutes", this.userService);
      this.router.get('/', async (req: Request, res: Response)=>{
          res.status(200).send(await this.userService.getUsers());
      })
    }

    public static getUserRoutes(){
        return container.get(UsersRoutes).setUserRoutes();
    }

}
