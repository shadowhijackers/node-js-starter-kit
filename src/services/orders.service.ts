import {Inject, Service} from "typedi";
import {EventDispatcher} from "event-dispatch";

@Service()
export class OrdersService {

    eventDispatcher = new EventDispatcher();

    constructor(
        @Inject('OrdersModel') private ordersModel: any
    ) {
    }

    public async getOrders(options: any, role: string) {
        const result = await this.ordersModel.getOrders(options, role);
        return result;
    }

    public async postOrders(orderDetails: any) {
        const order = this.ordersModel(orderDetails);
        const result = await this.ordersModel.saveOrder(orderDetails);
        return result;
    }

}
