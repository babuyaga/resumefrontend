import "./SettingBox.css";
import {useState,useEffect} from "react";
import Closeicon from "./icons/Closeicon.js";

function SettingBox(state,statefunction) {

const [showsetting,setsetting] = useState(false);

const changestate = (e)=>{
e.preventDefault();
setsetting(false);
statefunction(false);
}

  return (
    <div className="setting_box_container" style={showsetting?{}:{"display":"none"}}>
   <div className="setting_box_scrim" onClick={changestate} ></div>
   <div className="setting_box" > 
   <div className="setting_box_top">   <div className="settings_closebutton" onClick={changestate}><Closeicon /></div></div>


   </div>
            
    </div>
  );
}

export default SettingBox;
 