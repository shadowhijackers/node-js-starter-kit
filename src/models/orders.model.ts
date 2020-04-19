import mongoose, {NativeError, Schema} from "mongoose";


export class OrdersModelSchema {

    schema: Schema<any>;

    constructor() {
        this.schema = new mongoose.Schema({
            "_id": {type: mongoose.Types.ObjectId, auto: true},
            "name": {type: String},
            "unitType": {type: String, default: 'kg'},
            "units": {type: String},
            "userId": {type: mongoose.Types.ObjectId},
        }, {capped: false, timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}, versionKey: false});

        this.configStaticsExtensionMethods();
    }

    configStaticsExtensionMethods() {
        this.getOrdersExtension();
        this.postOrdersExtension();
    }

    getOrdersExtension() {

        this.schema.statics.getOrders = function (options: { userId: string, createdAt: Date }) {
            return new Promise((resolve, reject) => {
                const startDate = new Date(options.createdAt).setHours(0, 0, 1);
                const endDate = new Date(options.createdAt).setHours(24, 0);
                console.log('payload', {
                    userId: options.userId,
                    created_at: {
                        $gte: new Date(startDate).toISOString(),
                        $lt: new Date(endDate).toISOString()
                    }
                });
                this.find({
                    userId: options.userId,
                    created_at: {
                        $gte: new Date(startDate).toISOString(),
                        $lt: new Date(endDate).toISOString()
                    }
                }).exec((err: NativeError, orders: any) => {
                    if (!err) {
                        resolve(orders);
                    } else {
                        resolve({error: 'No orders found'})
                    }
                })
            })
        }

    }

    postOrdersExtension() {

        this.schema.statics.saveOrder = function (orderDetails: any) {
            return new Promise((resolve, reject) => {
                console.log('orders', orderDetails);
                this.create(orderDetails, (err: NativeError) => {
                    if (!err) {
                        resolve({message: 'Order created successfully'})
                    } else {
                        resolve({error: 'Order not created'})
                    }
                })
            });
        }
    }


    static getInstance() {
        const ins = new OrdersModelSchema();
        ins.configStaticsExtensionMethods();
        return ins.schema;
    }

}
