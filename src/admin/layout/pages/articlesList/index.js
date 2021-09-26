
import React from 'react';
import moment from 'moment';
import { Form, Input, DatePicker, TimePicker, Select, Cascader, InputNumber, Row, Col, Button, Tooltip, Tag, Space, Popconfirm, Menu, Dropdown, message, Modal} from 'antd';
const { Option } = Select;
import './articlesList.less'
import { DownOutlined } from '@ant-design/icons';
import {$require} from '@/admin/assets/js/require.js'
import { Table } from 'antd';
import { inject, observer } from "mobx-react"
import FunTable from '@/../components/table.js'
import { artcilesAllDataContext } from "@/../context/globleContext.js";

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
};

const { Provider } = artcilesAllDataContext;

  @inject("testStore")
  @inject("layoutStore")
  @observer
class articlesListIndex extends React.Component {
    // constructor(props) {
    //   super(props);

    // }
    state = {
        loadings: [],
        form:{
            title:'',
            name:'',
            mobile:'',
            column_id:null,
            createtime_start:null,
            createtime_end:null
        },
        after_this_id:'',
        last_target:false,
        data:[],
        column_list:[],
        TableLoading: false
        // Main_height:0
    }
    watchArticle = (item)=>{
      this.props.history.push('/layout/articles/articlesList/ArticleCommon')  
    }
    hideModal = () => {
      this.setState({
        visible: false,
      });
    };
    deleteData = (record)=>{
      const dataSource = [...this.state.data];
      this.setState({
        data: dataSource.filter((item) => item.key !== record.article_id),
      })
    }
    formParams = (params)=>{
      let formData = new FormData()
      if(JSON.stringify(params) != '{}'){
        for(let key in params){
          if( (typeof (params[key]) == 'string'&&params[key].length>0)||key =='after_this_id'){
            formData.append(key,params[key])
          }else if(typeof (params[key]) == 'number'){
            formData.append(key,params[key])
          }
        }
      }
      return formData
    }
    getMoreData = ()=>{
      if(this.state.last_target){
        message.destroy()
        return message.info('已经到底了');
      }
      let params = {
        ...this.state.form,
        after_this_id:this.state.after_this_id,
        page_size:20
      }
      
      this.renderData(params)
    }
    renderData = (params,type)=>{

      let tamplate = [...this.state.data];
      if(type&&type=='init'){
        this.setState({
          data:[]
        })
        tamplate = []
      }

      $require({method:'post',url:'/service/admin/information/article/list_search',data:this.formParams(params)}).then((res)=>{
        this.setState(()=>{
          return {
            ...this.setState,
            TableLoading:true
          }
        })
        const data =  res.data.result.data      
        if( data.length>0){
          res.data.result.data.forEach((item,index)=>{
              tamplate.push({
                  ...item,
                  status:item.status==1?'待审核':item.status==0?'通过':'拒绝',
                  key:item.article_id
              })
          })
          if(data.length<params.page_size){
            this.setState(()=>{
              return {
                after_this_id:data[data.length-1].article_id+'',
                data:tamplate,
                last_target:true,
                TableLoading:false
              }
            })
          }
          this.setState (()=>{
            return {
              after_this_id:data[data.length-1].article_id+'',
              data:tamplate,
              TableLoading:false
            }
          })
        //  console.log(this.FunTable)
        }else{
          this.setState(()=>{
            return {
              last_target:true,
              TableLoading:false
            }
          })
        }
      })
    }
    sendForm = ()=>{
        let params = {
          ...this.state.form,
          after_this_id:'',
          page_size:20
        }
        params.createtime_start = moment(params.createtime_start,'YYYY-MM-DD')&&moment(params.createtime_start,'YYYY-MM-DD').length>0?moment(params.createtime_start,'YYYY-MM-DD') + ' 00:00:00':null
        params.createtime_end = moment(params.createtime_end,'YYYY-MM-DD')&&moment(params.createtime_end,'YYYY-MM-DD').length>0?moment(params.createtime_end,'YYYY-MM-DD') + ' 23:59:59':null
        this.renderData(params,'init')
        this.setState({
          ...this.state,
          last_target:false
        })
    }
    cannelFrom = ()=>{
      this.setState(()=>{
        return {
          last_target:false,
          form:{
            title:'',
            name:'',
            mobile:'',
            column_id:null,
            createtime_start:null,
            createtime_end:null
          },
          // createtime_start:null,
          // createtime_end:null
        }
      })
      this.renderData({after_this_id:'',page_size:20},'init')
    }
    getChangeValue(value,key){
      console.log(this.state,this.state.form,'.......')
      this.state.form[key] = value;
      this.setState(this.state)
    }
    handleCulum(e,record,key){
      // e.preventDefault()
      // console.log(e,record,'???')
      console.log(record,key,'??')
    }
    async UNSAFE_componentWillMount(){
        console.log(this.props,'.....')
        // await this.props.layoutStore.get_config_baseUrl()
        $require({method:'post',url:'/service/admin/column/list',data:this.formParams({after_this_id:0,page_size:20})}).then((info)=>{
          let list = info.data.result.data;
          this.setState(()=>{
            return {
              column_list:list
            }
          })
          // console.log(info.data.result.data)
        })
        await this.renderData({after_this_id:'',page_size:20})
        
    }
    
    render(){
        const { loadings, column_list} = this.state;
        const {testStore,layoutStore} = this.props;
        const columns = [
          {
            title: '文章编号',
            dataIndex: 'article_id',
            key:'article_id',
            fixed:'left',
            width: 200,
            onCell: () => {
              return {
                style: {
                  maxWidth: 200,
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow:'ellipsis',
                  cursor:'pointer'
                }
              }
            },
            render: (text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
          },
          {
            title: '图片',
            dataIndex: 'title_img_cos_key ',
            key: 'title_img_cos_key ',
            width: 100,
            render:(text,record)=>  record.title_img_cos_key&&record.title_img_cos_key.length>0?
            record.title_image_size==0?
            <a target="_blank" rel="noopener noreferrer" href={layoutStore.config_baseUrl+record.title_img_cos_key}><img src={layoutStore.config_baseUrl+record.title_img_cos_key} alt="" height="40px" width="60px;"/></a>
            :
            <a target="_blank" rel="noopener noreferrer" href={layoutStore.config_baseUrl+record.title_img_cos_key}><img src={layoutStore.config_baseUrl+record.title_img_cos_key} alt="" max-height="40px" width="60px;"/></a>
            :null
          },
          {
            title: '文章标题',
            dataIndex: 'title',
            key: 'title',
            width: 300,
            onCell: () => {
              return {
                style: {
                  maxWidth: 300,
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow:'ellipsis',
                  cursor:'pointer'
                }
              }
            },
            render: (text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
          },
          {
            title: '所属栏目',
            dataIndex: 'column_name',
            key: 'column_name',
            width: 100,
            onCell: () => {
              return {
                style: {
                  maxWidth: 100,
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow:'ellipsis',
                  cursor:'pointer'
                }
              }
            },
            render: (text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
          },
          {
            title: '创建人姓名',
            dataIndex: 'name',
            key: 'name',
            width: 200,
            onCell: () => {
              return {
                style: {
                  maxWidth: 200,
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow:'ellipsis',
                  cursor:'pointer'
                }
              }
            },
            render: (text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
          },
          {
            title: '创建人id',
            dataIndex: 'author_id',
            key: 'author_id',
            width: 200,
            onCell: () => {
              return {
                style: {
                  maxWidth: 200,
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow:'ellipsis',
                  cursor:'pointer'
                }
              }
            },
            render: (text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
          },
          {
            title: '提交时间',
            dataIndex: 'createtime',
            key: 'createtime',
            width: 250,
            onCell: () => {
              return {
                style: {
                  maxWidth: 250,
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow:'ellipsis',
                  cursor:'pointer'
                }
              }
            },
            render: (text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
          },
          {
            title: '更新时间',
            dataIndex: 'updatetime',
            key: 'updatetime',
            width: 250,
            onCell: () => {
              return {
                style: {
                  maxWidth: 250,
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow:'ellipsis',
                  cursor:'pointer'
                }
              }
            },
            render: (text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
          },
          {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            fixed:'right',
            width: 100,
            render:tags=>(
              <>
                {[tags].map((item)=>{
                  let color = item=='待审核'? 'geekblue' : 'green';
                  if (item === '拒绝') {
                    color = 'volcano';
                  }
                  return (
                    <Tag color={color} key={item}>
                    {item.toUpperCase()}
                    </Tag>
                  )
                })}
              </>
            )
          },
          {
              title: '操作',
              key: 'operation',
              fixed: 'right',
              width: 250,
              fixed:'right',
              render: (text,record) => (
                <Space size="middle">
                  <a onClick={()=>this.watchArticle(record)}>浏览</a>
                  <Dropdown overlay={()=>{
                     return(
                      <Menu >
                      {       
                        column_list.map((item)=>{
                          return (      
                            // <Popconfirm title="是否确认删除?" onConfirm={() => this.deleteData(record)}>         
                              <Menu.Item key={item.id} onClick={()=>this.handleCulum(text, record,item.id)}>
                                {item.column_name}
                              </Menu.Item>
                            // </Popconfirm>
                          )
                        })
                      }
                    </Menu>
                     )
                  }} trigger={['click']}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    所属栏目<DownOutlined />
                    </a>
                  </Dropdown>
                  <Popconfirm title="是否确认删除?" onConfirm={() => this.deleteData(record)}>
                    <a>删除</a>
                  </Popconfirm>                
                </Space>
              )
          }
        ];

        return ( 
            <div className="article_box">
                 {/* <div>{testStore.name}</div> */}
                 <Form {...formItemLayout}>
                 <Row gutter={24}>
                    <Col span={6}>
                    <Form.Item
                    label="标题："
                    validateStatus="success"
                    >
                    <Input placeholder="请输入标题" id="error" style={{width:'100%'}}  onChange={(e)=>this.getChangeValue(e.target.value,'title')}  value={this.state.form.title}/>
                    </Form.Item>
                    </Col>
                    <Col span={6}>
                    <Form.Item label="创建人：" validateStatus="success"  >
                    <Input placeholder="请输入创建人" id="warning" value={this.state.form.name} onChange={(e)=>this.getChangeValue(e.target.value,'name')} />
                    </Form.Item>
                    </Col>
                    <Col span={6}>
                    <Form.Item label="创建人电话：" validateStatus="success" >
                    <Input placeholder="请输入创建人电话：" id="warning" value={this.state.form.mobile}  onChange={(e)=>this.getChangeValue(e.target.value,'mobile')}/>
                    </Form.Item>
                    </Col>
                    <Col span={6}>
                    <Form.Item label="栏目："  validateStatus="success">
                    <Select allowClear placeholder="请输入栏目" value={this.state.form.column_id}  onChange={(value)=>this.getChangeValue(value,'column_id')}>
                      {column_list.map((item)=>{
                          return (<Option value={item.id} key={item.id}>{item.column_name}</Option>)
                      })}
                    </Select>
                    </Form.Item>
                    </Col>
                    <Col span={6} >
                    <Form.Item label="发布时间：" style={{ marginBottom: 0 }} >
                    <Form.Item
                        validateStatus="success"
                        style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
                    >
                        <DatePicker value={this.state.form.createtime_start} format="YYYY-MM-DD" onChange={(value,dateString)=>this.getChangeValue(value,'createtime_start')}/>
                    </Form.Item>
                    <span
                        style={{ display: 'inline-block', width: '24px', lineHeight: '32px', textAlign: 'center' }}
                    >
                        -
                    </span>
                    <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                        <DatePicker value={this.state.form.createtime_end}  format="YYYY-MM-DD" onChange={(value,dateString)=>this.getChangeValue(value,'createtime_end')} />
                    </Form.Item>
                    </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Button type="primary" onClick={this.sendForm}>
                        搜索
                        </Button>
                        <Button onClick={this.cannelFrom}>
                        清空
                        </Button>
                    </Col>
                </Row>

                </Form>
                {/* <Table columns={columns} dataSource={this.state.data} scroll={{ x: 1500 ,y:`calc(100vh - 340px)`}}  pagination={false} onScrollCapture={() => this.onScrollEvent()}/> */}
                <Provider value={{
                  data:this.state.data,
                  loading:this.state.TableLoading
                }}>
                <FunTable  columns={columns}  scroll={{ x: 1500 ,y:`calc(100vh - 340px)`}}  pagination={false} onRef={c=>this.FunTable=c}></FunTable>
                </Provider>
                <Button style={{margin:'20px auto',display:'block'}} onClick={this.getMoreData}>{!this.state.last_target?'加载更多':'没有更多'}</Button>
            </div>
        )
    }
}
export default articlesListIndex;
