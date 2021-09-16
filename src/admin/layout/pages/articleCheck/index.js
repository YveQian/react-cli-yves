
import React from 'react'
// import {withRouter} from 'react-router-dom'
import {Button} from "antd"
import { inject, observer } from "mobx-react"
import FunTable from '@/../components/table.js'
import globleContext from '@/../context/globleContext.js'

@inject("testStore")
@observer
class articlesCheckIndex extends React.Component {
    state = {}

    UNSAFE_componentWillMount(){
        // const {testStore} = this.props;
        // setInterval(()=>{
        //     testStore.addAge()
        // },1000)
        
    }
    setAge = ()=>{
        const {testStore} = this.props;
        
        testStore.addAge()
    }
    getChildrenData(){
        console.log('father')
    }
    // const 
    render(){
        const {testStore} = this.props;
        const columns = [
            {
              title: '姓名',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '年龄',
              dataIndex: 'age',
              key: 'age',
            },
            {
              title: '住址',
              dataIndex: 'address',
              key: 'address',
            },
        ];
        const dataSource = [
            {
              key: '1',
              name: '胡彦斌',
              age: 32,
              address: '西湖区湖底公园1号',
            },
            {
              key: '2',
              name: '胡彦祖',
              age: 42,
              address: '西湖区湖底公园1号',
            },
        ];
        return (
            <div>
                <p>articleCheckList</p>
                <p>组件：{testStore.name}</p>
                <p>组件年龄：{testStore.age}</p>
                <Button onClick={this.setAge}>增加年龄</Button>
                <FunTable columns={columns} data={dataSource} pagination={false}></FunTable>
            </div>
        )
    }
}
export default articlesCheckIndex