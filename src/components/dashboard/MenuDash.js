import {useState,useEffect,useContext,createContext,useRef} from "react";
import {Link} from "react-router-dom";
import {authContext} from "../../pages/Router";
import NavBar from "../NavBar.js";
import { useNavigate } from "react-router-dom";


function MenuDash({item}) {
const [checked,setchecked] = useState(false);
const {handleSignout,loginWithGoogle} = useContext(authContext);
const navigate = useNavigate();


return (    <div className="menu-general--dashboard component-content--dashboard" style={{"marginTop":"20px"}}>
<div className="component-menu--dashboard"><p>Menu</p></div>
<div className="button-holder--menu component-menu--dashboard">
    <div className="button-menu--dashboard"  id={item==="1"?"selected-button":""} onClick={()=>{navigate("/dashboard");}}><span>Dashboard</span></div>       
    <div className="button-menu--dashboard"  id={item==="2"?"selected-button":""} onClick={()=>{navigate("/documents");}}><span>Documents</span></div>  
    <div className="button-menu--dashboard" id={item==="3"?"selected-button":""} onClick={()=>{navigate("/profile");}}><span>Profile</span></div>
    <div className="button-menu--dashboard" id={item==="4"?"selected-button":""} onClick={()=>{navigate("/profile/pricing");}}><span>Pricing</span></div>           
</div>
<div className="profile-holder--menu component-menu--dashboard">
    <div className="profile-container--menu">
       <div className="profile-block--menu"></div>
    </div>
</div> 

</div>
);



}

export default MenuDash;