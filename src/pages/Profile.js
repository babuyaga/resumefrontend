import "./stylesheets/dashboard.css";
import "./stylesheets/profile.css";
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
import NavbarDash from "../components/dashboard/NavbarDash.js";
import BannerDash from "../components/dashboard/BannerDash";

function Profile() {
const [checked,setchecked] = useState(false);
const {handleSignout,loginWithGoogle} = useContext(authContext);
const navigate = useNavigate();
const [tab,setTab] = useState("Profile");
const tabs =["Profile","Security","Billing","Info"];


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
              
                        <NavbarDash/>
                <div className="container-content--dashboard">
                        {/* <div className="menu-faux--dashboard component-content--dashboard"></div> */}
                        <MenuDash item="3"/>
                        
                        <div className="content-holder--dashboard component-content--dashboard">
                        <BannerDash/>
                            <br></br>
                            <div className="section-content-holder--dashboard documents-section--dashboard">
                                    <div className="component-documents-section--dashboard documents-section-title--dashboard"><span className="title-documents--section">{tab}</span><span className="viewall-documents--section"></span></div>
                                    <div className="component-documents-section--dashboard documents-buttons--dashboard">
                                         <div className="buttons-documents-component" id={tab===tabs[0]?"selected-button-document":""} onClick={()=>{setTab(tabs[0]);}}><span>{tabs[0]}</span></div>
                                         <div className="buttons-documents-component" id={tab===tabs[1]?"selected-button-document":""} onClick={()=>{setTab(tabs[1]);}}><span>{tabs[1]}</span></div>
                                         <div className="buttons-documents-component" id={tab===tabs[2]?"selected-button-document":""} onClick={()=>{setTab(tabs[2]);}}><span>{tabs[2]}</span></div>
                                         <div className="buttons-documents-component" id={tab===tabs[3]?"selected-button-document":""} onClick={()=>{setTab(tabs[3]);}}><span>{tabs[3]}</span></div>

                                    </div>
                                    <div className="component-documents-section--dashboard documents-display-section--dashboard">
                                           <div className="personal-form-holder--profile" id={tab===tabs[0]?"selected-tab--profile":""}>
                                                        <form className="personal-form--profile" >
                                                                <div><span><b>Name:</b></span>
                                                                        <input type="text" name="name" />
                                                                </div>
                                                                <div> <span><b>Email:</b></span>                                                                        
                                                                        <input type="email"/>
                                                                </div>
                                                                <div><span><b>Phone No:</b></span>                                                                        
                                                                        <input type="number"/>
                                                                </div>

                                                        </form>
                                           </div>
                                           <div className="personal-form-holder--profile" id={tab===tabs[1]?"selected-tab--profile":""}>
                                                        <form className="personal-form--profile" >
                                                                <div><span><b>Current Password:</b></span>
                                                                        <input type="text" name="name" />
                                                                </div>
                                                                <div> <span><b>New Password:</b></span>                                                                        
                                                                        <input type="text"/>
                                                                </div>
                                                                <div><span><b>Confirm Password:</b></span>                                                                        
                                                                        <input type="text"/>
                                                                </div>

                                                        </form>
                                           </div>
                                           <div className="personal-form-holder--profile" id={tab===tabs[2]?"selected-tab--profile":""}>
                                                        <div className="billing-info--profile">
                                                                    
                                                                        <table>
                                                                                <tbody>
                                                                                  <tr>
                                                                                        <th>Current Plan:</th>
                                                                                        <td>Regular</td>
                                                                                 </tr>
                                                                                 <tr>
                                                                                        <th>Expires on:</th>
                                                                                        <td>12-06-2024</td>
                                                                                 </tr>
                                                                                 <tr>
                                                                                        <th>Renews on:</th>
                                                                                        <td>13-06-2024</td>
                                                                                 </tr>
                                                                                 <tr>
                                                                                        <th>Renews with:</th>
                                                                                        <td>Regular 1 Month</td>
                                                                                 </tr>
                                                                                 <tr>
                                                                                        <th>Renews at:</th>
                                                                                        <td>INR 1500</td>
                                                                                 </tr>
                                                                                 <tr>
                                                                                        <th>Payment mode:</th>
                                                                                        <td>UPI</td>
                                                                                 </tr>
                                                                                 </tbody>
                                                                        </table>
                                                        </div>
                                           </div>
                                           <div className="personal-form-holder--profile" id={tab===tabs[3]?"selected-tab--profile":""}>
                                                         <form className="personal-form--profile" >
                                                                <div><span><b>Name on resume:</b></span>
                                                                        <input type="text" name="name" />
                                                                </div>
                                                                <div> <span><b>Email on resume:</b></span>                                                                        
                                                                        <input type="text"/>
                                                                </div>
                                                                <div><span><b>Number on resume:</b></span>                                                                        
                                                                        <input type="text"/>
                                                                </div>

                                                        </form>
                                           </div>
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