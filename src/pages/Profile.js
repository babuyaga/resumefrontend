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

function Profile() {
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
                        <MenuDash item="3"/>
                        
                        <div className="content-holder--dashboard component-content--dashboard">
                            <div className="section-content-holder--dashboard conversion-banner-section--dashboard">
                                    <div className="component-banner-section--dashboard banner-text--dashboard"><span>Get access to SOP Writer and other premium features at just INR 570</span></div>
                            </div>
                        
                            <div className="section-content-holder--dashboard documents-section--dashboard">
                                    <div className="component-documents-section--dashboard documents-section-title--dashboard"><span className="title-documents--section">Profile</span><span className="viewall-documents--section"></span></div>
                                    <div className="component-documents-section--dashboard documents-buttons--dashboard">
                                         <div className="buttons-documents-component" id="selected-button-document"><span>Profile</span></div>
                                         <div className="buttons-documents-component"><span>Security</span></div>
                                         <div className="buttons-documents-component"><span>Billing</span></div>
                                         <div className="buttons-documents-component"><span>Support</span></div>

                                    </div>
                                    <div className="component-documents-section--dashboard documents-display-section--dashboard">
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

export default Profile;