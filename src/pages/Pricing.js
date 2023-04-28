import "./stylesheets/dashboard.css";
import Googleicon from "../icons/Googleicon.js";
import Downarrow from "../icons/Downarrow.js";
import Uparrow from "../icons/Uparrow.js";
import Staricon from "../icons/Staricon.js";
import {useState,useEffect,useContext,createContext,useRef} from "react";
import {Link} from "react-router-dom";
import {authContext} from "./Router.js";
import NavBar from "../components/NavBar.js";
import { useNavigate } from "react-router-dom";
import MenuDash from "../components/dashboard/MenuDash.js";
import NavbarDash from "../components/dashboard/NavbarDash";

function Pricing() {
const [checked,setchecked] = useState(false);
const {handleSignout,loginWithGoogle} = useContext(authContext);
const navigate = useNavigate();
const [Pframe,setPframe] = useState("frame-t");
const frames = ["frame-z","frame-o","frame-t","frame-th","frame-f"];
const [flag,setFlag] = useState(true);
const [fr,setFr]= useState(2);
const [period,setPeriod] = useState(0);

const plans = {
  "basic":["basic-14-days","basic-1-month","basic-3-months"],
  "regular":["regular-14-days","regular-1-month","regular-3-months"],
  "professional":["professional-14-days","professional-1-month","professional-3-months"]
};


const assignPlan = ()=>{
  if(fr===1){
console.log(plans["basic"][period]);
  }else if(fr===2){
    console.log(plans["regular"][period]);
  }else if(fr===3){
    console.log(plans["professional"][period]);
  }
}

const moveright = ()=>{
if(flag){
  setFlag(false);
  setTimeout(()=>{
setFlag(true);
  },500)
        console.log(Pframe);
      if(Pframe===frames[2]){
        setPframe(frames[3]);   
        setFr(3);
      }else if(Pframe===frames[3]){
        setPframe(frames[1]);
        setFr(1);
      }else if(Pframe===frames[1]){
        setPframe(frames[2]);
        setFr(2);
      }
    }
      }
      
      
const moveleft = ()=>{
  if(flag){
    setFlag(false);
    setTimeout(()=>{
  setFlag(true);
    },500)
  console.log(Pframe);
  if(Pframe===frames[2]){
    setPframe(frames[1]);  
    setFr(1); 
  }else if(Pframe===frames[1]){
    setPframe(frames[3]);
    setFr(3);
  }else if(Pframe===frames[3]){
    setPframe(frames[2]);
    setFr(2);
  }}
        }







const PricingCard=(idname,classnm)=>{
return (<div className={`item-pricing-section--dashboard  ${classnm}`} id={idname} >
                                        {/* <div className="image-item-documents--dashboard"></div> */}
                                        <div>
                                        <div className={`title-item-pricing--dashboard`} ><span>{idname}</span></div>
                                       
                                        <div className={`subtitle-item-pricing--dashboard`}>
                                                <span><li></li>Create and Store Unlimited Resumes</span>
                                                <span><li></li>Generate and store upto 25 different cover letters per week</span>       
                                        </div>
                                        <div className={`tag-holder-item-pricing--dashboard`}>
                                                <div className="buttons-pricing--dashboard"> <div className="title-item-pricing--dashboard" id="price-tag"><span id="currency-price-tag">INR</span><span> 350</span></div></div>
                                        </div>
                                        <div className={`tag-holder-item-pricing--dashboard hide-on-desktop2`}>
                                                <div className="buttons-pricing--dashboard"> <div className="title-item-pricing--dashboard" id="price-tag"><span id="currency-price-tag">Subscribe</span><span> Now</span></div></div>
                                        </div>
                                        </div>
                                    </div>);
}

return (  <div className="dashboard-page">
               <NavbarDash/>
                <div className="container-content--dashboard">
                        {/* <div className="menu-faux--dashboard component-content--dashboard"></div> */}
                        <MenuDash item="4"/>
                        
                        <div className="content-holder--dashboard component-content--dashboard">
                            {/* <div className="section-content-holder--dashboard conversion-banner-section--dashboard">
                                    <div className="component-banner-section--dashboard banner-text--dashboard"><span>Get access to SOP Writer and other premium features at just INR 570</span></div>
                            </div> */}
                        
                            <div className="section-content-holder--dashboard documents-section--dashboard">
                                    <div className="component-documents-section--dashboard documents-section-title--dashboard"><span className="title-documents--section">Pricing</span><span className="viewall-documents--section"></span></div>
                                    <div className="component-documents-section--dashboard documents-buttons--dashboard">
                                        <div className="documents-buttons--dashboard">
                                         <div className="buttons-documents-component" id={period===0?`selected-button-pricing`:""} onClick={()=>{setPeriod(0);}}><span>14 Days</span></div>
                                         <div className="buttons-documents-component" id={period===1?`selected-button-pricing`:""} onClick={()=>{setPeriod(1);}}><span>1 Month</span></div>
                                         <div className="buttons-documents-component" id={period===2?`selected-button-pricing`:""} onClick={()=>{setPeriod(2);}}><span>3 Months</span></div>
                                         {/* <div className="buttons-documents-component"><span>12 Months</span></div> */}
                                         </div>
                                         <div className="buttons-documents-component" id="checkout-button--pricing" onClick={()=>{assignPlan();}}> <span>Checkout</span></div>
                                    </div>
                                 <div className="pricing-carousel-holder"> 
                                        <div className="pricing-track-button left-pricing-button" onClick={()=>{moveleft()}}></div>
                                              <div className="component-documents-section--dashboard documents-display-section--dashboard pricing-display-section">
                                                    <div className="pricing-track" id={Pframe}>
                                                        <div className="hide-on-desktop">{PricingCard("Regular","tab-class")}</div>
                                                         <div className="hide-on-desktop">{PricingCard("Professional","tab-class")}</div>
                                                         <div onClick={()=>{setFr(1)}}  className="hide-on-nondesktop">{PricingCard("Basic",`tab-class ${fr===1?"selected-pricing-card":""}`)}</div>
                                                         <div onClick={()=>{setFr(2)}}  className="hide-on-nondesktop">{PricingCard("Regular",`tab-class ${fr===2?"selected-pricing-card":""}`)}</div>
                                                         <div onClick={()=>{setFr(3)}}  className="hide-on-nondesktop">{PricingCard("Professional",`tab-class ${fr===3?"selected-pricing-card":""}`)}</div>
                                                         <div className="hide-on-desktop2">{PricingCard("Basic",`tab-class ${fr===1?"selected-pricing-card":""}`)}</div>
                                                         <div className="hide-on-desktop2">{PricingCard("Regular",`tab-class ${fr===2?"selected-pricing-card":""}`)}</div>
                                                         <div className="hide-on-desktop2">{PricingCard("Professional",`tab-class ${fr===3?"selected-pricing-card":""}`)}</div>
                                                        <div className="hide-on-desktop">{PricingCard("Basic","tab-class")}</div>
                                                        <div className="hide-on-desktop">{PricingCard("Regular","tab-class")}</div>
                                                    </div>
                                    
                                    {/* <div className="documents-loading--dashboard"><span>Loading...</span></div> */}
                                                </div>
                                        <div className="pricing-track-button right-pricing-button" onClick={()=>{moveright()}}></div>
                                </div> 
                                
                            </div>
              
                        </div>
                  </div> 
                  <div className="foobar-general--dashboard">
                        <div className="foobar-component-container--dashboard"></div>
                </div>            
</div>);



}

export default Pricing;