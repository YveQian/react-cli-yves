import * as React from "react";
import {useState,useContext,useEffect} from "react";

// import * as ReactDOM from "react-dom";
import { tsxHelloContext } from '../context/globleContext.js'


export interface IHelloProps{
  message?: string;
  msglist?:Text[];
}
export interface Text {
  id:number,
  name:string
}
const Hello = (props:IHelloProps) : any=> {
  const theme = useContext(tsxHelloContext)
  const [Data,setData] = useState<(Array<Text>)>([{id:0,name:''}])
  useEffect(()=>{
    setData(props.msglist)
  },[])
  console.log(theme)
  const style = {
    background: theme.background,
    color: theme.color,
  }
  return (
    <div>
        <h2 style={style}>{props.message}</h2>
        {/* if (IHelloProps.msglist instanceof Array) { */}
        {Data.map((item)=>(
            <div key={item.id}>
              {item.name}
            </div>
          ))}
        {/* } */}
    </div>
   
  )
}
Hello.defaultProps = {
  message: "Hello World",
  msglist:[
    {id:1,name:'hemff',age:13}
  ]
}

export default Hello