import container, {Service} from "typedi";
import bodyParser from 'body-parser';

import {UsersService} from "../../../services";
import {authMiddleware} from "../middleware";
import {CustomRouter} from "../../../core";
import {RouterMethodsEnum} from "../../../common/enums";
import responseModel from "../../../config/response";
import {UsersHandler} from "../handlers";

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
        this.signUp();
        this.signIn();
        this.forgetPassword();
        this.resetPassword();
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

    signUp() {

        this.customRouter.setRoute({
            path: '/register',
            method: RouterMethodsEnum.post,
            handler: this.usersHandler.signUpAPIHandler(),
            middleware: [
                bodyParser.json(),
                bodyParser.urlencoded({extended: true}),
            ],
            description: 'Sign up api'
        });

    }

    signIn() {

        this.customRouter.setRoute({
            path: '/login',
            method: RouterMethodsEnum.post,
            handler: this.usersHandler.signInAPIHandler(),
            middleware: [
                 bodyParser.json(),
                 bodyParser.urlencoded({extended: true}),
                ],
            description: 'Sign in api'
        });

    }

    forgetPassword() {

        this.customRouter.setRoute({
            path: '/forget-password',
            method: RouterMethodsEnum.post,
            handler: this.usersHandler.forgetPasswordAPIHandler(),
            middleware: [
                bodyParser.json(),
                bodyParser.urlencoded({extended: true}),
            ],
            description: 'forget password api'
        });

    }

    resetPassword() {

        this.customRouter.setRoute({
            path: '/reset-password',
            method: RouterMethodsEnum.put,
            handler: this.usersHandler.resetPasswordAPIHandler(),
            middleware: [
                bodyParser.json(),
                authMiddleware
            ],
            description: 'logout the session'
        });

    }

    logout(){
      this.customRouter.setRoute({
          path: '/logout',
          method: RouterMethodsEnum.get,
          handler: this.usersHandler.logoutAPIHandler(),
          middleware: [
              bodyParser.urlencoded({extended: true}),
              authMiddleware
          ],
          description: 'reset password api'
      })
    }

    public static getUserRoutes() {
        return container.get(UsersRoutes).setUserRoutes();
    }

}
