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

function Pricing() {
const [checked,setchecked] = useState(false);
const {handleSignout,loginWithGoogle} = useContext(authContext);
const navigate = useNavigate();


const PricingCard=(idname)=>{
return (<div className="item-pricing-section--dashboard" id={idname}>
                                        {/* <div className="image-item-documents--dashboard"></div> */}
                                        <div>
                                        <div className="title-item-pricing--dashboard"><span>{idname}</span></div>
                                       
                                        <div className="subtitle-item-pricing--dashboard">
                                                <span><li></li>Create and Store Unlimited Resumes</span>
                                                <span><li></li>Generate and store upto 25 different cover letters per week</span>       
                                        </div>
                                        <div className="tag-holder-item-pricing--dashboard">
                                                <div className="buttons-pricing--dashboard"> <div className="title-item-pricing--dashboard" id="price-tag"><span id="currency-price-tag">INR</span><span> 350</span></div></div>
                                        </div>
                                        </div>
                                    </div>);
}

return (  <div className="dashboard-page">
                <div className="navbar-general--dashboard">
                        <div className="navbar-component-container--dashboard"></div>
                </div>
                <div className="container-content--dashboard">
                        {/* <div className="menu-faux--dashboard component-content--dashboard"></div> */}
                        <MenuDash item="4"/>
                        
                        <div className="content-holder--dashboard component-content--dashboard">
                            <div className="section-content-holder--dashboard conversion-banner-section--dashboard">
                                    <div className="component-banner-section--dashboard banner-text--dashboard"><span>Get access to SOP Writer and other premium features at just INR 570</span></div>
                            </div>
                        
                            <div className="section-content-holder--dashboard documents-section--dashboard">
                                    <div className="component-documents-section--dashboard documents-section-title--dashboard"><span className="title-documents--section">Pricing</span><span className="viewall-documents--section"></span></div>
                                    <div className="component-documents-section--dashboard documents-buttons--dashboard">
                                         <div className="buttons-documents-component" id="selected-button-pricing"><span>14 Days</span></div>
                                         <div className="buttons-documents-component"><span>1 Month</span></div>
                                         <div className="buttons-documents-component"><span>6 Months</span></div>
                                         {/* <div className="buttons-documents-component"><span>12 Months</span></div> */}

                                    </div>
                                    <div className="component-documents-section--dashboard documents-display-section--dashboard">
                                    {PricingCard("Basic")}
                                    {PricingCard("Regular")}
                                    {PricingCard("Professional")}
                                    {/* <div className="documents-loading--dashboard"><span>Loading...</span></div> */}
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