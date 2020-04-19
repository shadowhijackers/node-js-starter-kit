import {EventSubscriber, On} from "event-dispatch";
import {EventDispatcherNamesEnum} from "../common/enums/event-dispatcher-names.enum";

@EventSubscriber()
export class OrdersEventSubscriber {

    @On(EventDispatcherNamesEnum.orders.create)
    create(data: any) {

    }
}
