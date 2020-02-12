import container, {Inject, Service} from "typedi";

@Service()
export class UsersService {

    constructor(
       @Inject('UsersModel') private usersModel: any
    ) {
    }

    public async getUsers(){
      return await this.usersModel.getUsers({});
    }

}
