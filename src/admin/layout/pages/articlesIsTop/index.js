
import React,{useEffect, useState} from 'react';
import Hello from "../../../../../components/articletsx.tsx";
import { inject, observer } from "mobx-react";

const articlesIsTopIndex =()=>{
    const name = 'articlesIsTop页面';
    return (
        <TameplateText props={name}  />
    )  
}
const TameplateText = ({props})=>{
    const [count,setCount]  = useState(0)
    const [name,setName] = useState('')
    const [list,setList] = useState('')
    const [newArt,setNewArt] = useState([])
    
    const handleChange = (event)=>{setName(event.target.value)}
    const handleArtiles = (event)=>{setList(event.target.value)}
    
    const addArtiles = ()=>{
        if(list.length>0){
            setNewArt([...newArt,{name:list}])
        }
    }
    useEffect(()=>{
        console.log(newArt,'我进来了')
    },[newArt])
    return (
        <div>
            <h1>{props}</h1>
            {/* <div>{list}</div> */}
            <div>{count}</div>
            <button onClick={()=>setCount(count+1)}>click me</button>
            <h2>{name}</h2>
            <input value={name} onChange={handleChange}/><br/>
            <input value={list} onChange={handleArtiles}/>
            <button onClick={addArtiles}>add</button>   
            <ul>
                {
                    newArt.map((item,index)=>(
                        <li key={index}>
                            {item.name}
                        </li>
                    ))
                }
            </ul>
            <Hello></Hello>
        </div>
    );
}
// const articleList = ()=>{
    
// }
export default articlesIsTopIndex