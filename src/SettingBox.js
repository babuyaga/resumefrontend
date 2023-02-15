import "./SettingBox.css";
import {useState,useEffect,useContext,createContext} from "react";
import Closeicon from "./icons/Closeicon.js";
import {appuiContext} from "./App.js";

function SettingBox() {
const {showset,setshowset} = useContext(appuiContext);

const changestate = (e)=>{
  e.preventDefault();
  setshowset(false);
}

console.log("State",showset);

  return (
    <div className="setting_box_container" style={showset?{}:{"display":"none"}}>
   <div className="setting_box_scrim" onClick={changestate} ></div>
   <div className="setting_box" > 
   <div className="setting_box_top">   <div className="settings_closebutton" onClick={changestate}><Closeicon /></div></div>


   </div>
            
    </div>
  );
}

export default SettingBox;
 