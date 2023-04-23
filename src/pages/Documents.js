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


function Documents() {
const [checked,setchecked] = useState(false);
const {handleSignout,loginWithGoogle} = useContext(authContext);
const navigate = useNavigate();


const documentComp=()=>{
return (<div className="item-documents-section--dashboard">
                                        <div className="image-item-documents--dashboard"></div>
                                        <div>
                                        <div className="title-item-documents--dashboard"><span>My Resume</span></div>
                                        <div className="subtitle-item-documents--dashboard"><span>Last updated at 2:30 PM today</span></div>
                                        <div className="tag-holder-item-documents--dashboard">
                                                <div className="tags-document--dashboard"><span>Resume</span></div>
                                                <div className="tags-document--dashboard"><span>Product</span></div>
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
                        <div className="menu-general--dashboard component-content--dashboard" style={{"marginTop":"20px"}}>
                             <div className="component-menu--dashboard"><p>Menu</p></div>
                             <div className="button-holder--menu component-menu--dashboard">
                                 <div className="button-menu--dashboard"  onClick={()=>{navigate("/dashboard");}}><span>Dashboard</span></div>       
                                 <div className="button-menu--dashboard" id="selected-button" onClick={()=>{navigate("/documents");}}><span>Documents</span></div>  
                                 <div className="button-menu--dashboard"  onClick={()=>{navigate("/profile");}}><span>Profile</span></div>
                                 <div className="button-menu--dashboard" onClick={()=>{navigate("/pricing");}}><span>Pricing</span></div>           
                             </div>
                             <div className="profile-holder--menu component-menu--dashboard">
                                 <div className="profile-container--menu">
                                    <div className="profile-block--menu"></div>
                                 </div>
                            </div> 
                            
                        </div>
                        
                        <div className="content-holder--dashboard component-content--dashboard">
                            <div className="section-content-holder--dashboard conversion-banner-section--dashboard">
                                    <div className="component-banner-section--dashboard banner-text--dashboard"><span>Get access to SOP Writer and other premium features at just INR 570</span></div>
                            </div>
                        
                            <div className="section-content-holder--dashboard documents-section--dashboard">
                                    <div className="component-documents-section--dashboard documents-section-title--dashboard"><span className="title-documents--section">Your Documents</span><span className="viewall-documents--section"></span></div>
                                    <div className="component-documents-section--dashboard documents-buttons--dashboard">
                                         <div className="buttons-documents-component" id="selected-button-document"><span>All</span></div>
                                         <div className="buttons-documents-component"><span>Resumes</span></div>
                                         <div className="buttons-documents-component"><span>SOPs</span></div>
                                         <div className="buttons-documents-component"><span>Cover Letters</span></div>

                                    </div>
                                    <div className="component-documents-section--dashboard documents-display-section--dashboard">
                                    {documentComp()}
                                    {documentComp()}
                                    {documentComp()}
                                    {documentComp()}
                                    <div className="documents-loading--dashboard"><span>Loading...</span></div>
                                     </div>
                            </div>
              
                        </div>
                  </div> 
                  <div className="foobar-general--dashboard">
                        <div className="foobar-component-container--dashboard"></div>
                </div>            
</div>);



}

export default Documents;