import {Service} from "typedi";
import {Request, Response} from "express";

import {OrdersService} from "../../../services/orders.service";
import * as common from "../../../common";

@Service()
export class OrdersHandler {

    constructor(
        private ordersService: OrdersService,
    ) {
    }

    getOrdersAPIHandler() {
        return async (req: Request, res: Response) => {
            if (req.query.orders_date) {

                const userId = req.body.authData.userId;
                const options = {userId: userId, ordersDate: req.query.orders_date};
                const role = req.body.authData.role;
                const result = await this.ordersService.getOrders(options, role);

                if (result.error) {
                    res.status(400).send(result);
                    return
                }
                const response = common.formatSuccessMessage({
                    msg: 'Success',
                    data: result,
                    sessionToken: req?.headers.authorization
                });
                res.status(200).send(response);
                return
            }

            res.status(400).send({error: 'Send neccessary params'})
        }
    }

    saveOrderAPIHandler() {

        return async (req: Request, res: Response) => {

            req.body.userId = req.body.authData.userId;
            delete req.body.authData;
            const result = await this.ordersService.postOrders(req.body);

            if (result.error) {
                res.status(400).send(result);
                return
            }

            const response = common.formatSuccessMessage({
                msg: 'Success',
                data: result,
                sessionToken: req?.headers?.authorization
            });
            res.status(200).send(response);
        }
    }

}
