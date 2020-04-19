import container, {Service} from "typedi";

import {CustomRouter} from "../../../core";
import {OrdersService} from "../../../services/orders.service";
import {OrdersHandler} from "../handlers/orders.handler";
import {RouterMethodsEnum} from "../../../common/enums";
import {authMiddleware} from "../middleware";
import bodyParser from "body-parser";

@Service()
export class OrdersRoutes {

    constructor(
        private orderService: OrdersService,
        private customRouter: CustomRouter,
        private ordersHandler: OrdersHandler
    ) {
        this.customRouter.init('orders')
    }

    setUserRoutes() {
     this.saveOrder();
     this.getOrders();
     return this.customRouter.exportRouterInstance();
    }


    getOrders() {

        this.customRouter.setRoute({
            path: '/',
            method: RouterMethodsEnum.get,
            handler: this.ordersHandler.getOrdersAPIHandler(),
            middleware: [
                authMiddleware
            ],
            description: 'Get orders api'
        });

    }

    saveOrder() {

        this.customRouter.setRoute({
            path: '/',
            method: RouterMethodsEnum.post,
            handler: this.ordersHandler.saveOrderAPIHandler(),
            middleware: [
                bodyParser.json(),
                bodyParser.urlencoded({extended: true}),
                authMiddleware,
            ],
            description: 'save orders api'
        });

    }

    public static getOrdersRoutes() {
        return container.get(OrdersRoutes).setUserRoutes();
    }

}
