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

            const payload = req.body;
            try {
                if (payload) {

                    const result = await this.usersService.registerUser(payload);
                    const response = common.formatSuccessMessage({
                        msg: 'Success',
                        data: {},
                        sessionToken: 'Auth Token'
                    });

                    if (result.isSuccess) {
                        res.status(200).send(response);
                        return
                    }

                    response.status.code = 400;
                    response.status.message = result.message;

                    res.send(200).send(response);

                }
            } catch (e) {
                const errorResponse = common.formatErrorMessage({msg: 'Something happend in the server', code: 500});
                res.status(400).send(errorResponse);
            }

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
