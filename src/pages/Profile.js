import "./stylesheets/dashboard.css";
import "./stylesheets/profile.css";
import {useState,useEffect,useContext,createContext,useRef} from "react";
import {authContext} from "./Router.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MenuDash from "../components/dashboard/MenuDash.js";
import NavbarDash from "../components/dashboard/NavbarDash.js";
import BannerDash from "../components/dashboard/BannerDash";

function Profile() {
const [checked,setchecked] = useState(false);
const {handleSignout,loginWithGoogle,userData} = useContext(authContext);
const navigate = useNavigate();
const [tab,setTab] = useState("Profile");
const tabs =["Profile","Security","Billing","Info"];
const [userInfo,setuserInfo] = useState();


useEffect(()=>{
        axios.get("http://localhost:5000/api/login/user").then((res)=>{
            console.log(res.data.userData);
            setuserInfo(res.data.userData);
            });
    },[tab])
    



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
                                    <div className="component-documents-section--dashboard profile-display-section--dashboard">
                                           <div className="personal-form-holder--profile" id={tab===tabs[0]?"selected-tab--profile":""}>
                                                        <form className="personal-form--profile" >
                                                                <div><span><b>Name:</b></span>
                                                                        <input type="text" name="name" value={userInfo?userInfo.name:""} />
                                                                </div>
                                                                <div> <span><b>Email:</b></span>                                                                        
                                                                        <input type="email" value={userInfo?userInfo.email:""}/>
                                                                </div>
                                                                <div><span><b>Phone No:</b></span>                                                                        
                                                                        <input type="number" value={userInfo?userInfo.phoneNumber:""}/>
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
                                                                                        <td>{userInfo?userInfo.plan.planName:""}</td>
                                                                                 </tr>
                                                                                 <tr>
                                                                                        <th>Expires on:</th>
                                                                                        <td>{userInfo?userInfo.plan.endDate.split("T")[0]:""}</td>
                                                                                 </tr>
                                                                                 <tr>
                                                                                        <th>Renews on:</th>
                                                                                        <td>{userInfo?userInfo.plan.endDate.split("T")[0]:""}</td>
                                                                                 </tr>
                                                                                 <tr>
                                                                                        <th>Renews with:</th>
                                                                                        <td>{userInfo?userInfo.plan.renewalPlan:""}</td>
                                                                                 </tr>
                                                                                 <tr>
                                                                                        <th>Renews at:</th>
                                                                                        <td>INR {userInfo?userInfo.plan.renewalPrice:""}</td>
                                                                                 </tr>
                                                                                 <tr>
                                                                                        <th>Payment mode:</th>
                                                                                        <td>{userInfo?userInfo.plan.paymentMode:""}</td>
                                                                                 </tr>
                                                                                 </tbody>
                                                                        </table>
                                                        </div>
                                           </div>
                                           <div className="personal-form-holder--profile" id={tab===tabs[3]?"selected-tab--profile":""}>
                                                         <form className="personal-form--profile" >
                                                                <div><span><b>Name on resume:</b></span>
                                                                        <input type="text" name="name" value={userData.name?userData.name:""}/>
                                                                </div>
                                                                <div> <span><b>Email on resume:</b></span>                                                                        
                                                                        <input type="text" name="email" value={userData.email?userData.email:""}/>
                                                                </div>
                                                                <div><span><b>Number on resume:</b></span>                                                                        
                                                                        <input type="text" name="phone" value={userData.phoneNumber?userData.phoneNumber:""}/>
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