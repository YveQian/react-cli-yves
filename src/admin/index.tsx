import React from 'react'
import ReactDom from 'react-dom'
import AppRouter from "./router.js"
import { Provider } from "mobx-react"
import store from "./store"
import { ConfigProvider  } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn')
import 'antd/dist/antd.css'

export default class App extends React.Component {
    UNSAFE_componentWillMount(){
        store.layoutStore.get_config_baseUrl()
    }
    render(){
        return (
            <div style={{height:'100%'}}>
                <Provider {...store} >
                    <ConfigProvider locale={zh_CN}>
                    <AppRouter />
                    </ConfigProvider>
                </Provider>
            </div>
        )
    }
}
ReactDom.render(<App/>,document.getElementById("app"))