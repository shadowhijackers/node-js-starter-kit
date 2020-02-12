import container, {Inject, Service} from "typedi";

@Service()
export class UserService {

    constructor(
       @Inject('UserModel') private userModel: any
    ) {
    }

    public async getUsers(){
      return await this.userModel.getUsers({});
    }

}
