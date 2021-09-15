import React from 'react'
import {withRouter} from 'react-router-dom'
import {Button} from "antd"
import { inject, observer } from "mobx-react"

@inject("UserListStore")
class UserListPage extends React.Component {

    push = ()=>{
        this.props.history.push("/user/add?name=231");
    }
    render(){
        const {UserListStore} = this.props;
        return (
            <div>
                <p>UserListPage</p>
                <p>组件：{UserListStore.name}</p>
                <Button onClick={this.push}>添加用户</Button>
            </div>
        )
    }
}

export default withRouter(UserListPage);