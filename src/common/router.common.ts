import express, {RequestHandler, Router} from 'express';
import {IRouterParams} from "../types/IRouterParams";
import {RouterMethodsEnum} from "./enums/router-methods.enum";
import {Service} from "typedi";

@Service()
export class CustomRouter {

    // @ts-ignore
    router: express.Router;

    // For future purpose
    // @ts-ignore
    baseURL: string;

    init(baseURL: string) {
        this.baseURL = baseURL;
        this.router = Router();
    }

    setRoute(routerParams: IRouterParams) {

        switch (routerParams.method) {
            case RouterMethodsEnum.get: {
                this.router.get(routerParams.path, routerParams.middleware, routerParams.handler);
                break
            }
            case RouterMethodsEnum.post: {
                this.router.post(routerParams.path, routerParams.middleware, routerParams.handler);
                break;
            }

            case RouterMethodsEnum.put: {
                this.router.put(routerParams.path, routerParams.middleware, routerParams.handler);
                break;
            }
            case RouterMethodsEnum.patch: {
                this.router.patch(routerParams.path, routerParams.middleware, routerParams.handler);
                break;
            }
            case  RouterMethodsEnum.delete: {
                this.router.delete(routerParams.path, routerParams.middleware, routerParams.handler);
                break;
            }
            default:
                // @ts-ignore
                this.router[routerParams.method] && this.router[routerParams.method](routerParams.path, routerParams.middleware, routerParams.handler);

        }

    }

    exportRouterInstance() {
        return this.router;
    }

}
