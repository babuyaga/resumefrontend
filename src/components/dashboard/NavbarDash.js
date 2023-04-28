import {useState,useEffect,useContext,createContext,useRef} from "react";
import {authContext} from "../../pages/Router";
import { useNavigate } from "react-router-dom";
import "./stylesheets/navbardash.css";

function NavbarDash() {
const [checked,setchecked] = useState(false);
const {handleSignout,loginWithGoogle} = useContext(authContext);
const navigate = useNavigate();


return (     <div className="navbar-general--dashboard">
<div className="navbar-component-container--dashboard">
    <div className="navbar-logo--holder" onClick={()=>{navigate("/dashboard");}}></div>

    <div className="navbar-buttons-holder"><div className="signout-button--navbardash" onClick={(e)=>{e.preventDefault(); handleSignout();}}>Signout</div></div>
</div>
</div>
);



}

export default NavbarDash;