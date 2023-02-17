
import {useState,useEffect,createContext,useContext} from "react";
import getdataformat from "./DataHolder.js";
import {appuiContext} from "./App.js";
import "./navbar.css";
import Switch from "react-switch";


function NavBar({buttonsLeft,buttonsRight,logo}) {

const {showset,setshowset,appval,addAppval,theme,settheme} = useContext(appuiContext);
const [flagstate,setflag] = useState(true);
const openSetting=(e)=>{e.preventDefault();
  setshowset({"display":true,"index":appval.length,"navbar":true}); //if settings pop up is opened via the navbar and add section is clicked. Add the section at the very end by setting index as appval.length
}



const toggleTheme = ()=>{
  if(!flagstate){
    settheme("light");
  }
  else{
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
        </div>
  </div>
  );
}

export default NavBar;
