import {Service} from "typedi";
import {UsersService} from "../services";
import {Request, Response} from "express";

@Service()
export class UsersHandler {

    constructor(
        private usersService: UsersService
    ) {
    }

    getUsersAPIHandler() {
        return async (req: Request, res: Response) => {
            const users = await this.usersService.getUsers();
            res.status(200).send(users);
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
