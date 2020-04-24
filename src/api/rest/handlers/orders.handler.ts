import {Service} from "typedi";
import {Request, Response} from "express";

import {OrdersService} from "../../../services/orders.service";
import * as common from "../../../common";

@Service()
export class OrdersHandler {

    constructor(
        private ordersService: OrdersService
    ) {
    }

    getOrdersAPIHandler() {
        return async (req: Request, res: Response) => {
           if(req.query.orders_date) {

             const options = {userId: req.session?.userId, createdAt: req.query.orders_date};
             const result = await this.ordersService.getOrders(options);

             if(result.error){
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

            const result = await this.ordersService.postOrders(req.body);

            if(result.error){
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
