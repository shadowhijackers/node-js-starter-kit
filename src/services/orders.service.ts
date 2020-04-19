import {Inject, Service} from "typedi";
import {EventDispatcher} from "event-dispatch";

@Service()
export class OrdersService {

    eventDispatcher = new EventDispatcher();

    constructor(
        @Inject('OrdersModel') private ordersModel: any
    ) {
    }

    public async getOrders(options: any) {
        const result = await this.ordersModel.getOrders(options);
        return result;
    }

    public async postOrders(orderDetails: any) {
        const result = await this.ordersModel.saveOrder(orderDetails);
        return result;
    }

}
