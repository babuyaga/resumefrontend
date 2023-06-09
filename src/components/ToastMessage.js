
import { useState,useEffect } from "react";
import "./stylesheets/ToastMessage.css";
import Closeicon_S from "../icons/Closeicon_simple";

function ToastMessage({ toastobject,type,index}) {

const [isVisible,setIsVisible] = useState(true);
useEffect(()=>{

  return ()=>{
    setTimeout(()=>{
      setIsVisible(false);
    }, 3000);    
  }
},[]);

console.log("Called");

  return (
<div>    
   {isVisible?<div className={type==="1"?"toastmessage":"minor_update"}><p>{toastobject.value}</p><div className="toast-close" onClick={()=>{setIsVisible(false)}}><Closeicon_S/></div></div>:null}
   </div>     

  );

}

export default ToastMessage;
