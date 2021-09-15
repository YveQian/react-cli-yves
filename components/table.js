import React,{useEffect, useState, useMemo} from 'react';
import { Table } from 'antd';
import { artcilesAllDataContext } from "../context/globleContext.js";
const FunTable = (props)=>{
    const [loadingFun, setLoadingFun] = useState('')
    const [columnsFun, setColumnsFun] = useState(props.columns);
    const [dataFun, setdataFun] = useState({});
    const [scrollFun, setscrollFun] = useState({});
    const [paginationFun, setPaginationFun] =  useState(props.pagination)
    const context = React.useContext(artcilesAllDataContext)
    // const isloading = ()=>{
    //     if(props.loading&&typeof (props.loading) == 'boolean'){
    //         setLoading(context.loading)
           
    //     }
    // }
    const isSetscroll=()=>{
        if(props.scroll&&JSON.stringify(props.scroll)!='{}'){
            setscrollFun(props.scroll)
        }
    }
    useEffect(()=>{
        setdataFun(context)
        setColumnsFun(props.columns)
        isSetscroll()   
        // isloading() 
        console.log(context)
        // console.log(context)
    },[context])
    return (
            <div>
                <Table loading={dataFun.loading} columns={columnsFun} dataSource={dataFun.data} scroll={scrollFun}  pagination={paginationFun} ></Table>
            </div>
    )
}

export default FunTable