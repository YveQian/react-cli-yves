import React from 'react'
import "./login.less"
import LogonImg from "@/assets/img/logo.png"
import { Input,Button  } from 'antd';
// import { UserOutlined } from '@ant-design/icons';
export default class HomeIndex extends React.Component {
    enter(){
        window.location.href="/layout/articles/articlesList"
    }
    
    render(){
        return (
            <div  className="login">
                <div className="login_main">
                    <div className="login_main_left">
                        <div>
                           <img src={LogonImg}/>
                           <strong>运营管理系统</strong>
                        </div>
                    </div>
                    <div className="login_main_right">
                        <div className="login_title">                        
                            <h1>登录/注册</h1>
                            <span>ENTER</span>
                        </div>
                        <ul className="input_style">
                            <li><Input size="large" placeholder="请输入手机号" style={{height:"100%",'border':'1px solid white','borderBottom':'1px solid #dddddd'}}/></li>
                            <li><Input size="large" placeholder="验证码" style={{height:"100%",'border':'1px solid white','borderBottom':'1px solid #dddddd'}} /></li>
                        </ul>
                        <Button type="primary" className="login_enter" onClick={this.enter}>登录/注册</Button>
                    </div>
                </div>
            </div>
        )
    }
}