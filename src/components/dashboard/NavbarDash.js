import {useState,useEffect,useContext,createContext,useRef} from "react";
import {authContext} from "../../pages/Router";
import { useNavigate } from "react-router-dom";
import "./stylesheets/navbardash.css";

function NavbarDash() {
const [checked,setchecked] = useState(false);
const {handleSignout,loginWithGoogle,setLoading} = useContext(authContext);
const navigate = useNavigate();

const signOut=()=>{
    setLoading(true); 
    
    setTimeout(()=>{
        handleSignout();
    },300)
    
}


return (     <div className="navbar-general--dashboard">
<div className="navbar-component-container--dashboard">
    <div className="navbar-logo--holder" onClick={()=>{navigate("/dashboard");}}></div>

    <div className="navbar-buttons-holder"><div className="signout-button--navbardash" onClick={signOut}>Signout</div></div>
</div>
</div>
);



}

export default NavbarDash;