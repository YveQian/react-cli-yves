import { observable,action,makeObservable  } from "mobx"

class testStore {

    @observable name = '测试';
    @observable age = 19;

    constructor(){
        makeObservable(this)
    }
    @action.bound 
    addAge (){
        // console.log(this.age)
        // console.log(this.age)
            this.age += 1     
    };
    
}

export default new testStore();