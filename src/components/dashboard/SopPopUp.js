import {useState,useEffect,useContext,createContext,useRef} from "react";
import "../stylesheets/soppopup.css";
import Loadericon from "../../icons/Loadericon";
import { useNavigate } from "react-router-dom";
import { authContext} from "../../pages/Router";


function SopPopUp(){
    const navigate = useNavigate();
    const {setShowSOP,showSop} = useContext(authContext);
    const parentRef = useRef(null);

    useEffect(()=>{
       
    });

  const closePopUp=(e)=>{
    if (e.target === parentRef.current) {
    setShowSOP(false);
    }
  }

return (<div className="sop-popup-container-scrim" ref={parentRef} onClick={closePopUp} style={showSop?{}:{"display":"none"}}>
                     
                     <div className="sop-popup-holder">
                        <div className="closebutton-holder"></div>
                        <h2>Choose a resume</h2>
                        <p>We'll build an SOP from the resume you choose</p>

                        <br></br>
                        <div className="sopapp-resume-holder">
                        <div className="resume-list-item">
                           <div className="resume-list-item-cover"></div>  
                          <div className="resume-list-item-text">
                                      <h4>Resume Name</h4>
                                      <p>Last updated on</p>
                          </div>
                        </div>  
                        <div className="resume-list-item">
                           <div className="resume-list-item-cover"></div>  
                          <div className="resume-list-item-text">
                                      <h4>Resume Name</h4>
                                      <p>Last updated on</p>
                          </div>
                        </div>  
                        <div className="resume-list-item">
                           <div className="resume-list-item-cover"></div>  
                          <div className="resume-list-item-text">
                                      <h4>Resume Name</h4>
                                      <p>Last updated on</p>
                          </div>
                        </div>  
                        <div className="resume-list-item">
                           <div className="resume-list-item-cover"></div>  
                          <div className="resume-list-item-text">
                                      <h4>Resume Name</h4>
                                      <p>Last updated on</p>
                          </div>
                        </div>  
                        <div className="resume-list-item">
                           <div className="resume-list-item-cover"></div>  
                          <div className="resume-list-item-text">
                                      <h4>Resume Name</h4>
                                      <p>Last updated on</p>
                          </div>
                        </div>    
                        <div className="resume-list-item">
                           <div className="resume-list-item-cover"></div>  
                          <div className="resume-list-item-text">
                                      <h4>Resume Name</h4>
                                      <p>Last updated on</p>
                          </div>
                        </div>  
                           
                              
                              
                        </div>



                      
                    </div>    
                    
            </div>);
    }

export default SopPopUp;