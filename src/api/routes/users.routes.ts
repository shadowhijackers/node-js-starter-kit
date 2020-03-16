import express, {Request, Response, Router} from 'express';
import container, {Service} from "typedi";

import {UsersService} from "../../services";
import {authMiddleware} from "../middleware";
import {CustomRouter} from "../../common/router.common";
import {RouterMethodsEnum} from "../../common/enums/router-methods.enum";
import responseModel from "../../config/response";
import {UsersHandler} from "../../handlers";

@Service()
export class UsersRoutes {

    constructor(
        private userService: UsersService,
        private customRouter: CustomRouter,
        private usersHandler: UsersHandler
    ) {
        this.customRouter.init('users')
    }

    setUserRoutes() {
        this.getUsers();
        return this.customRouter.exportRouterInstance();
    }

    getUsers() {

        this.customRouter.setRoute({
            path: '/',
            method: RouterMethodsEnum.get,
            middleware: [authMiddleware],
            handler: this.usersHandler.getUsersAPIHandler(),
            description: `This api used to get the users list`,
            responseModel: {
                ...responseModel,
                data: {
                    users: [
                        {
                            id: 0,
                            name: 'xyz'
                        }
                    ]
                }
            }
        });

    }

    signIn() {

        this.customRouter.setRoute({
            path: '/login',
            method: RouterMethodsEnum.post,
            handler: this.usersHandler.signInAPIHandler(),
            middleware: [],
            description: 'Sign in api'
        });

    }

    signUp() {

        this.customRouter.setRoute({
            path: '/register',
            method: RouterMethodsEnum.post,
            handler: this.usersHandler.signUpAPIHandler(),
            middleware: [],
            description: 'Sign up api'
        });

    }

    forgetPassword() {

        this.customRouter.setRoute({
            path: '/forget-password',
            method: RouterMethodsEnum.post,
            handler: this.usersHandler.forgetPasswordAPIHandler(),
            middleware: [],
            description: 'forget password api'
        });

    }

    resetPassword() {

        this.customRouter.setRoute({
            path: '/reset-password',
            method: RouterMethodsEnum.put,
            handler: this.usersHandler.resetPasswordAPIHandler(),
            middleware: [],
            description: 'reset password api'
        });

    }

    public static getUserRoutes() {
        return container.get(UsersRoutes).setUserRoutes();
    }

}
