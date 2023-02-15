
import { useState } from "react";



function ToastMessage({ toastobject,index,type}) {

const [isVisible,setIsVisible] = useState(true);

setTimeout(()=>{
  setIsVisible(false);
}, 5000);

  return (
<div>    
   {isVisible?<div className={type==="1"?"toastmessage":"minor_update"}><p>{toastobject.value}</p></div>:null}
   </div>     

  );

}

export default ToastMessage;
