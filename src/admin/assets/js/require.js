// console.log(axios)
import axios from 'axios';
const url ={
    local:'/api', //本地
    sysyem:'/system',//资源路径 https://api.sinanbao.com/config
    dev:'https://dev-snb-admin-api.sinanbao.com', //测试
    prd:'https://admin-api.sinanbao.com' //生产
}

let baseUrl  = process.env.NODE_ENV=='development'?url.dev:url.prd;

var Axios = axios.create();

const $require_source =(params = {})=>{
  let inParams ={
      method:params.method,
      url :params.url,
      headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8','snb-client-type':'web'}
  }
  // console.log(params.method,'axios')
  if(params.method.indexOf('get')>0){
      inParams.params = params.params || {}
  }else{
      inParams.data = params.data || {}
  }
  if(params.token&&params.token.length>0){
      inParams.headers={'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8','snb-client-type':'web','token':params.token}
  }
  return new Promise((resolve, reject) => {
      Axios(inParams)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
  });
}
const $require =(params = {})=>{
    let inParams ={
        method:params.method,
        url :baseUrl+params.url    
    }
    console.log(params.method,'axios')
    if(params.method.indexOf('get')>0){
        inParams.params = params.params || {}
    }else{
        inParams.data = params.data || {}
    }
    if(params.token&&params.token.length>0){
        inParams.headers={'token':params.token}
    }
    return new Promise((resolve, reject) => {
        Axios(inParams)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
    });
}
const  getBlob = (url, params = {}) =>{
    return new Promise((resolve, reject) => {
      Axios({
        url,
        method: "get",
        params,
        responseType:'blob'
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

export {$require, $require_source, getBlob}