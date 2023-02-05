import Uparrow from "./icons/Uparrow.js";
import Downarrow from "./icons/Downarrow.js";
import Settingsicon from "./icons/Settingsicon.js";
import Addicon from "./icons/Addicon.js";
import { useState, useEffect } from "react";



function ToastMessage({ toastobject,index,type}) {

const [isVisible,setIsVisible] = useState(true);

setTimeout(()=>{
  setIsVisible(false);
}, 5000);

  return (
<div>    
   {isVisible?<div className={type=="1"?"toastmessage":"minor_update"}><p>{toastobject.value}</p></div>:null}
   </div>     

  );

}

export default ToastMessage;
