import {useState,useEffect,useContext,createContext,useRef} from "react";
import {authContext} from "../../pages/Router";
import { useNavigate } from "react-router-dom";


function BannerDash() {
const [checked,setchecked] = useState(false);
const {handleSignout,loginWithGoogle} = useContext(authContext);
const navigate = useNavigate();


return (     <div className="section-content-holder--dashboard conversion-banner-section--dashboard">
<div className="component-banner-section--dashboard banner-text--dashboard"  onClick={()=>{navigate("/profile/pricing");}}><span>Get access to SOP Writer and other premium features at just INR 570</span></div>
</div>
);



}

export default BannerDash;