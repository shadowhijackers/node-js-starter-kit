import container, {Inject, Service} from "typedi";
import {IUser} from "../types";

@Service()
export class UsersService {

    constructor(
       @Inject('UsersModel') private usersModel: any
    ) {
    }

    public async getUsers(){
      return await this.usersModel.getUsers({});
    }

    public async registerUser(payload: IUser ){
        return await this.usersModel.registerUserDetails(payload)
    }

}
