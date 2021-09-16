import React from 'react'
import { Menu, Button } from 'antd';
import MenuConfig from './menuConfig'
import  "./layout.less"
import {withRouter} from 'react-router-dom'

import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;
import logo_index from "@/admin/assets/img/logo@2x.png"
import out_logon from "@/admin/assets/img/out_2x.png"

class LayoutIndex extends React.Component {
    rootSubmenuKeys=[]
    state = {
        test:"name",
        collapsed: false,
        All_width:0,
        Main_height:0,
        Main_width:0,
        Side_width:0,
        openKeys: ['/layout/articles'],
        selectKeys:['/layout/articles/articlesList']
    }
    // defaultSelectedKeys={['/layout/articles/articlesAll']}
    // defaultOpenKeys={['/layout/articles']}
    toggleCollapsed = () => {
        this.setState({
          Side_width:!this.state.collapsed?80:'10%',
          Main_width:!this.state.collapsed?document.body.clientWidth-80+'px':'90%',
          collapsed: !this.state.collapsed,
        });
      };
    getWidth = ()=>{
        let _width = document.body.clientWidth;
        // console.log(_width)
        this.setState({
            All_width:_width,
            Side_width:'10%',
            Main_width:'90%'
        })
    }
    getHeight =()=>{
        let _height = document.body.clientHeight - 50;
        this.setState({
            Main_height:_height
        })
    }
    renderMenu = (data)=>{
        return data.map((item)=>{
            if(item.children){
                this.rootSubmenuKeys.push(item.key)
                return (
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                ) 
            }
            return (
                <Menu.Item title={item.title} key={item.key}>{item.title}</Menu.Item>
            )
        })
    }
    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => 
          this.state.openKeys.indexOf(key) === -1
      );
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
          this.setState({ openKeys });
        } else {
          this.setState({
            openKeys: latestOpenKey ? [latestOpenKey] : [],
          });
        }
    }
    onSelect = (item)=>{
        this.setState({
            selectKeys:item.selectedKeys[0],
        });
        // console.log(item,'....')
        console.log(item,'path')
        this.props.history.push(item.selectedKeys[0])
        // console.log(this.props.history)
    }
    getOut = ()=>{
        window.location.href="/login"
    }
    UNSAFE_componentWillMount(){
        this.getHeight()
        this.getWidth()
        window.addEventListener('resize',this.getHeight)
        window.addEventListener('resize',this.getWidth)
        // console.log(window,'????')    

        const menuTreeNode = this.renderMenu(MenuConfig);
        this.setState({
            menuTreeNode:menuTreeNode
        })
        this.setState({
            selectKeys:this.props.history.location.pathname
        })
        console.log(this.props)
    }
    UNSAFE_componentWillUnmount(){
        window.removeEventListener('resize',this.getHeight)
        window.removeEventListener('resize',this.getWidth)
    }
    menuClick = (key)=>{
        console.log(key,'???')
    }
    render(){
        return (
            <div style={{height:'100%'}}>
                <div className="title_box">
                    <div>
                        <h1 style={{float:'left'}}><img src={logo_index} style={{width:'114px',height:'34px',display:'block','margin':'10px 0 0px 10px'}} /></h1>
                        <div style={{float:'right','margin':'10px 40px 10px 0px'}}>
                            <div style={{display:'inline-block','fontSize':'16px'}}>测试123</div>
                            <img  style={{width:'20px',height:'22px',cursor:'pointer',display:'inline-block','verticalAlign':'middle','marginLeft':'10px','marginTop':'-6px'}} src={out_logon} onClick={this.getOut}/>
                        </div>
                    </div>
                </div>
                <div style={{ minWidth:'80px',width: this.state.Side_width,background:'black',float:'left',height:this.state.Main_height+'px'}}>
                    <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                    {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                    </Button>
                    <Menu
                    theme='dark'
                    mode="inline"
                    selectedKeys={this.state.selectKeys}
                    openKeys={this.state.openKeys}
                    onOpenChange={this.onOpenChange}
                    onSelect={this.onSelect}
                    inlineCollapsed={this.state.collapsed}
                    >
                         {this.state.menuTreeNode}
                    </Menu>
                </div>
                <div className="mainbox" style={{boxSizing:'border-box',height:this.state.Main_height+'px',width: this.state.Main_width}}>
                {this.props.children}
                </div>
            </div>
        )
    }
}

export default withRouter(LayoutIndex)