import {Service} from "typedi";
import {Request, Response} from "express";

import {UsersService} from "../services";
import * as common from "../common";

@Service()
export class UsersHandler {

    constructor(
        private usersService: UsersService
    ) {
    }

    getUsersAPIHandler() {
        return async (req: Request, res: Response) => {
        
            const users = await this.usersService.getUsers();
            const response = common.formatSuccessMessage({
                msg: 'Success',
                data: users,
                sessionToken: 'Auth Token'
            });
            
            res.status(200).send(response);
    
        }
    }

    signInAPIHandler() {
        return async (req: Request, res: Response) => {
            res.status(200).send(await this.usersService.getUsers());
        }
    }

    signUpAPIHandler() {
        return async (req: Request, res: Response) => {
            res.status(200).send(await this.usersService.getUsers());
        }
    }

    forgetPasswordAPIHandler() {
        return async (req: Request, res: Response) => {
            res.status(200).send(await this.usersService.getUsers());
        }
    }

    resetPasswordAPIHandler() {
        return async (req: Request, res: Response) => {
            res.status(200).send(await this.usersService.getUsers());
        }
    }

}
