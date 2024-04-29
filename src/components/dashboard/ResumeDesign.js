import {useState,useEffect,useContext,createContext,useRef} from "react";
import "../stylesheets/resumedesign.css";
import Loadericon from "../../icons/Loadericon";
import { useNavigate } from "react-router-dom";
import { authContext} from "../../pages/Router";
import Closeicon_S from "../../icons/Closeicon_simple";
import { appuiContext } from "../../pages/App";


function ResumeDesign(){
    const navigate = useNavigate();
    const {setShowDesign,showDesign} = useContext(appuiContext);
    const parentRef = useRef(null);

    useEffect(()=>{
       
    });

  const closePopUp=(e)=>{
    if (e.target === parentRef.current) {
    setShowDesign(false);
    }
  }

  const openSop=(e)=>{
    navigate("/SOPWriter");
    setShowDesign(false);
  }




return (<div className="resumedesign-popup-container-scrim" ref={parentRef} onClick={closePopUp} >
                     <style>
                     {showDesign?`body{
                        overflow:hidden;
                        }`:""}
                     </style>
                     <div className="resumedesign-popup-holder-container">
                     <div className="resumedesign-popup-holder">
                        <h2>Choose a resume</h2>
                        <p>We'll build an SOP from the resume you choose</p>

                        <br></br>
                        <div className="resumedesign-resume-holder">
                        <div className="resumedesign-list-item" onClick={openSop}>
                           <div className="resumedesign-list-item-cover"></div>  
                          <div className="resumedesign-list-item-text">
                                      <h4>Resume Name</h4>
                              
                          </div>
                        </div>  

                        <div className="resumedesign-list-item" onClick={openSop}>
                           <div className="resumedesign-list-item-cover"></div>  
                          <div className="resumedesign-list-item-text">
                                      <h4>Resume Name</h4>
                              
                          </div>
                        </div>  

                        <div className="resumedesign-list-item" onClick={openSop}>
                           <div className="resumedesign-list-item-cover"></div>  
                          <div className="resumedesign-list-item-text">
                                      <h4>Resume Name</h4>
                              
                          </div>
                        </div>  

                        <div className="resumedesign-list-item" onClick={openSop}>
                           <div className="resumedesign-list-item-cover"></div>  
                          <div className="resumedesign-list-item-text">
                                      <h4>Resume Name</h4>
                              
                          </div>
                        </div>  



                        <div className="resumedesign-list-item" onClick={openSop}>
                           <div className="resumedesign-list-item-cover"></div>  
                          <div className="resumedesign-list-item-text">
                                      <h4>Resume Name</h4>
                              
                          </div>
                        </div>  
                        
                  </div>

</div>

                        <div  className="resumedesign-closebutton-holder" onClick={()=>{setShowDesign(false);}}><div><Closeicon_S/></div></div>
                    </div>    
                  
                    
            </div>);
    }

export default ResumeDesign;