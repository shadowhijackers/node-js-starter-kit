import {EventSubscriber, On} from "event-dispatch";

import {IUser} from "../types";
import {EventDispatcherNamesEnum} from "../common/enums/event-dispatcher-names.enum";

@EventSubscriber()
export class UsersEventsSubscriber {


    @On(EventDispatcherNamesEnum.users.register)
    register(user: IUser) {

    }

    @On(EventDispatcherNamesEnum.users.signIn)
    signIn(user: IUser) {

    }

}
