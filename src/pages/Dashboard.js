import "./stylesheets/dashboard.css";
import Googleicon from "../icons/Googleicon.js";
import Downarrow from "../icons/Downarrow.js";
import Uparrow from "../icons/Uparrow.js";
import Staricon from "../icons/Staricon.js";
import {useState,useEffect,useContext,createContext,useRef} from "react";
import {authContext} from "./Router.js";

import { useNavigate } from "react-router-dom";
import MenuDash from "../components/dashboard/MenuDash.js";
import BannerDash from "../components/dashboard/BannerDash";



function Dashboard() {
const [checked,setchecked] = useState(false);
const {setLoading,userData,showSop,setShowSOP} = useContext(authContext);
const navigate = useNavigate();

useEffect(()=>{


return ()=>{
    setTimeout(()=>{setLoading(false)},1000);
}

},[]);

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

return (  
<div className="dashboard-page" >

                <div className="container-content--dashboard">
                        {/* <div className="menu-faux--dashboard component-content--dashboard"></div> */}
                        <MenuDash item="1"/>
                        
                        <div className="content-holder--dashboard component-content--dashboard">
                        <BannerDash/>
                            <div className="section-content-holder--dashboard main-buttons-section--dashboard">
                                <div className="component-buttons-sections--dashboard buttons-section-title--dashboard"><span className="username-buttons-section--dashboard">Hello {userData.name?userData.name.split(" ")[0]:","}</span><span className="subtitle-buttons-section--dashboard">Let's get you started</span></div>
                                <div className="container-buttons-sections--dashboard">
                                    {console.log()}
                                    <div className="component-buttons-sections--dashboard"> 
                                        <div className="feature-button--dashboard" id="feature-button-one"  onClick={()=>{navigate("/builder/resume");}}>
                                            <div className="icon-feature-button"></div>
                                            <div><span className="title-feature-button">Resume</span><span className="subtitle-feature-button">Create from scratch</span></div>
                                        </div> 
                                    </div>
                                    <div className="component-buttons-sections--dashboard"> 
                                        <div className="feature-button--dashboard" id="feature-button-two" onClick={()=>{setShowSOP(true)}}>
                                            <div className="icon-feature-button"></div>
                                            <div><span className="title-feature-button">SOP</span><span className="subtitle-feature-button">Generate custom SOP</span></div>
                                        </div> 
                                    </div>
                                    <div className="component-buttons-sections--dashboard"> 
                                        <div className="feature-button--dashboard" id="feature-button-three">
                                            <div className="icon-feature-button"></div>
                                            <div><span className="title-feature-button">Cover Letter</span><span className="subtitle-feature-button">Auto-write cover letter</span></div>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        
                            <div className="section-content-holder--dashboard horizontal-rule--holder">
                                <div className="horizontal-rule"><hr></hr></div>
                            </div>
                            <div className="section-content-holder--dashboard documents-section--dashboard">
                                    <div className="component-documents-section--dashboard documents-section-title--dashboard"><span className="title-documents--section">Your Documents</span><span className="viewall-documents--section"  onClick={()=>{navigate("/documents");}}>View all</span></div>
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
                            <div className="section-content-holder--dashboard callback-section--dashboard">
                                        <div className="component-callback-section--dashboard component-desktop"><span className="title-documents--section expert-help--maintitle">Get Expert Help</span></div>
                                        <div className="component-callback-section--dashboard text-callback-section--dashboard component-desktop">
                                            <div className="component-expert-help expert-help-image--dashboard ">image</div>
                                            <div className="component-expert-help expert-help-text--dashboard">
                                                <div className="expert-help--title"><span>Schedule a one-on-one</span></div>
                                                <div className="expert-help--subtitle"><span>Get on a call and fine tune your SOP to your specific needs</span></div>
                                                <div className="expert-help--button"><span>Schedule</span></div>
                                            </div>
                                        </div>
                                        <div className="component-callback-section--dashboard component-mobile expert-help--component-mobile"> 
                                            <div className="component-expert-help expert-help-image--dashboard ">image</div>
                                            <div className="component-expert-help expert-help-text--dashboard">
                                                <div className="expert-help--title"><span>Schedule a one-on-one</span></div>
                                                <div className="expert-help--subtitle"><span>Get on a call and fine tune your SOP to your specific needs</span></div>
                                                <div className="expert-help--button"><span>Schedule</span></div>
                                            </div>
                                        </div>
                            </div>


                        </div>
                  </div> 
                  <div className="foobar-general--dashboard">
                        <div className="foobar-component-container--dashboard"></div>
                </div>            
</div>);



}

export default Dashboard;