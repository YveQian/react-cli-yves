import { observable, action, computed, makeObservable,autorun  } from "mobx"
// import {$require_source} from '../../assets/js/require.js'
// import $ from 'jquery'
class LoginStore {

    @observable win_height = 0;
    @observable win_width = 0;
    @observable config_baseUrl = '';

    constructor(){
        makeObservable(this);
        window.addEventListener("resize", this.updateWin);
    };
    updateWin (){
        autorun(()=>{
            this.win_height =  window.innerHeight
            this.win_width = window.innerWidth
            // console.log( this.win_height)
        })

    };
    
    destroyWin() {
        window.removeEventListener("resize", this.updateWin);
    }
    @action  get_config_baseUrl (){
        // let base = window.location.hostname=='http://admin.sinanbao.com/'?'':'dev-';
        // $require_source({method:'get',url:`https://${base}api.sinanbao.com/config`,params:{}}).then((res)=>{
        //     this.config_baseUrl = "https://"+res.data.cache_domains[0]+'/'
        // })
    }
   
}

export default new LoginStore();