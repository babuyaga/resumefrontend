import {useState,useEffect,useContext,createContext,useRef} from "react";
import "../stylesheets/addresume.css";
import Loadericon from "../../icons/Loadericon";
import { useNavigate } from "react-router-dom";
import { authContext} from "../../pages/Router";
import axios from "axios";


function AddResume(){

    const {addResume,setaddResume} = useContext(authContext);
    const parentRef = useRef(null);
    const buttonRef = useRef(null);
    const [name,setName] = useState("");
    const [error,setError] = useState("");
   const navigate = useNavigate();  
  const closePopUp=(e)=>{
    if ((e.target === parentRef.current)||(e.target === buttonRef.current)) {
      setaddResume(false);
    }
  }

  const onNameChange=(e)=>{
setName(e.target.value);
if(e.target.value.length>6){
  setError("");
}

  }

  const validateStuff=()=>{
if(name.length<6){
  setError("Name has to be atleast 6 characters");
}else if(name.length>20){
  setError("Name can be maximum 20 characters");

}else{
  setError("");
addinDB();
}
  }

const addinDB= ()=>{
axios.post("http://localhost:5000/api/newresume",{resumetitle:name,resumetags:["resume"]}).then((res)=>{
console.log(res.data.resumeID);
navigate(`/builder/resume/${res.data.resumeID}`);
setaddResume(false);
})
}


return (<div className="addnew-popup-container-scrim" ref={parentRef} onClick={closePopUp} style={addResume?{}:{"display":"none"}}>
                     <style>
                     {addResume?`body{
                        overflow:hidden;
                        }`:""}
                     </style>
                     <div className="addnew-popup-holder">
                       <h3>Resume Name:</h3>
                       <input value={name} onChange={onNameChange} autoFocus={true} className="addnew-popup-input"></input>   
                       <span className="error-message-addnew-popup" style={{"color":"red"}}>{error?error:" "}</span>
                              <div className="addnew-popup--button-holder">
                                <button id="addnew-button-popup-doc" onClick={validateStuff}>Add</button>
                              <button onClick={closePopUp} ref={buttonRef}>Discard</button>
                              
                              
                              
                              </div>
                              
                



                      
                    </div>    
                    
            </div>);
    }

export default AddResume;