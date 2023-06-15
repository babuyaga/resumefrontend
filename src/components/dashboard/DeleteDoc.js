import {useState,useEffect,useContext,createContext,useRef} from "react";
import "../stylesheets/deletedoc.css";
import Loadericon from "../../icons/Loadericon";
import { useNavigate } from "react-router-dom";
import { authContext} from "../../pages/Router";
import axios from "axios";


function DeleteDoc(){

    const {showDelete,setShowDelete} = useContext(authContext);
    const parentRef = useRef(null);
    const buttonRef = useRef(null);
    useEffect(()=>{
       
    });

  const closePopUp=(e)=>{
    if ((e.target === parentRef.current)||(e.target === buttonRef.current)) {
      setShowDelete(false);
    }
  }

  const openSop=(e)=>{

   
  }

  const deleteStuff=()=>{
    axios.post('http://localhost:5000/api/deletedoc',{rid:showDelete.id}).then((res)=>{
      console.log("Deleted",res);
      setShowDelete(false);
    })
  }

return (<div className="delete-popup-container-scrim" ref={parentRef} onClick={closePopUp} style={showDelete?{}:{"display":"none"}}>
                     <style>
                     {showDelete?`body{
                        overflow:hidden;
                        }`:""}
                     </style>
                     <div className="delete-popup-holder">
                       
                        <h2>Delete {showDelete.name}?</h2>
                        <p>Deleted documents cannot be recovered</p>
                     
                           
                              <div className="delete-popup--button-holder">
                                <button id="delete-button-popup-doc" onClick={deleteStuff}>Delete</button>
                              <button onClick={closePopUp} ref={buttonRef}>Cancel</button>
                              
                              
                              
                              </div>
                              
                



                      
                    </div>    
                    
            </div>);
    }

export default DeleteDoc;