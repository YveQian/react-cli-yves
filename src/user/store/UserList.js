import { observable, action } from "mobx"

class UserListStore {

    @observable name = "";
    constructor(){
        this.name = "my name is user list;";
    }
    
}

export default new UserListStore();