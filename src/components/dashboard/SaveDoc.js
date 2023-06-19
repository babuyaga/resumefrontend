import {useState,useEffect,useContext,createContext,useRef} from "react";
import "../stylesheets/deletedoc.css";
import Loadericon from "../../icons/Loadericon";
import { useNavigate } from "react-router-dom";
import { authContext} from "../../pages/Router";
import axios from "axios";


function SaveDoc(){

const navigate = useNavigate();

    const {showSave,setShowSave} = useContext(authContext);
    const parentRef = useRef(null);
    const buttonRef = useRef(null);
    useEffect(()=>{
       
    });

  const closePopUp=(e)=>{
    if ((e.target === parentRef.current)||(e.target === buttonRef.current)) {
      setShowSave(false);
    }

if(e.target === buttonRef.current){
  navigate("/Dashboard");
}

  }

  const openSop=(e)=>{

   
  }

  const SaveStuff=()=>{
 
  }

return (<div className="delete-popup-container-scrim" ref={parentRef} onClick={closePopUp} style={showSave?{}:{"display":"none"}}>
                     <style>
                     {showSave?`body{
                        overflow:hidden;
                        }`:""}
                     </style>
                     <div className="delete-popup-holder">
                       
                        <h2>Discard changes to: <br></br> {showSave.name}?</h2>
                        <p></p>
                                          <p>{showSave.type}</p>
                           
                              <div className="delete-popup--button-holder">
                                <button id="delete-button-popup-doc" onClick={SaveStuff}>Save</button>
                              <button onClick={closePopUp} ref={buttonRef}>Discard</button>
                              
                              
                              
                              </div>
                              
                



                      
                    </div>    
                    
            </div>);
    }

export default SaveDoc;