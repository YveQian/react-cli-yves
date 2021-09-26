import React from "react";
import ReactDom from 'react-dom';
import App2Router2 from "./router2.js";
import { Provider } from "mobx-react";
import store from "./store"

export default class App2 extends React.Component{
    
    render(){
        return (
            <div style={{height:"100%"}}>
                <Provider  {...store} >
                    <App2Router2/>
                </Provider>
            </div>
        )
    }
}
ReactDom.render(<App2/>,document.getElementById("app"))