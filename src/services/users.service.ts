import {Inject, Service} from "typedi";
import {EventDispatcher} from "event-dispatch";

import "../subscribers/users.events-subscriber";

import {IUser} from "../types";
import {EventDispatcherNamesEnum} from "../common/enums/event-dispatcher-names.enum";

@Service()
export class UsersService {

    eventDispatcher = new EventDispatcher();

    constructor(
        @Inject('UsersModel') private usersModel: any
    ) {
    }

    public async getUsers() {

        return await this.usersModel.getUsers({});
    }

    public async registerUser(payload: IUser) {
        const result = await this.usersModel.registerUserDetails(payload);
        this.eventDispatcher.dispatch(EventDispatcherNamesEnum.users.register, {payload, result})
    }

}
