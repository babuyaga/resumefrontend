import Cookies from "js-cookie";
import {useState,useEffect,createContext,useContext} from "react";
import getdataformat from "./DataHolder.js";
import {appuiContext} from "../pages/App.js";
import {authContext} from "../pages/Router.js";
import "./stylesheets/navbar.css";
import Switch from "react-switch";


function NavBar({buttonsLeft,buttonsRight,logo}) {
const {handleSignout,setLoading} = useContext(authContext);
const {showset,setshowset,appval,addAppval,theme,settheme} = useContext(appuiContext);

const [flagstate,setflag] = useState((theme==="dark")?false:true);
const openSetting=(e)=>{e.preventDefault();
  setshowset({"display":true,"index":appval.length,"navbar":true}); //if settings pop up is opened via the navbar and add section is clicked. Add the section at the very end by setting index as appval.length
}



const toggleTheme = ()=>{
  if(!flagstate){
    Cookies.set("theme","light");
    settheme("light");
  }
  else{
    Cookies.set("theme","dark");
    settheme("dark");
  }
}
const toggleChange = ()=>{
setflag(!flagstate);
toggleTheme();
}
  return (
  <div className="navbar_holder">
     <div className="logo"></div>
     <div className="nav_left_button__holder navbar_button__holder"><div className="add_section_button"> </div></div>
      
        <div className="nav_right_button__holder navbar_button__holder">
         <div className="add_section_button"> <Switch id="material-switch" height={15} width={30}  handleDiameter={12} uncheckedIcon={false} checkedIcon={false} onChange={toggleChange} checked={flagstate}/></div>
         <div className="add_section_button"><button onClick={openSetting} >Add Section</button></div>       
         <div className="add_section_button"><button onClick={handleSignout} >Sign Out</button></div>  
        </div>
  </div>
  );
}

export default NavBar;
