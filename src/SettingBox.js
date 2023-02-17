import "./SettingBox.css";
import {useState,useEffect,useContext,createContext} from "react";
import Closeicon from "./icons/Closeicon.js";
import {appuiContext} from "./App.js";
import Switch from "react-switch";

function SettingBox() {
const {showset,setshowset,deleteAppval,addAppval,appval} = useContext(appuiContext);
const value = appval[showset.index];
console.log(value);
const changestate = (e)=>{
  e.preventDefault();
  setshowset({"display":false,"index":showset.index});
}
 const deleteSection = (e)=>{
  e.preventDefault();
  if(!showset.navbar){
  deleteAppval(showset.index);
  setshowset({"display":false,"index":showset.index});
 }}


const addSection = (e)=>{
  e.preventDefault();
  addAppval(showset.index);
  setshowset({"display":false,"index":showset.index});
}

console.log("Appval");


  return (
    <div className="setting_box_container" style={showset.display?{}:{"display":"none"}}>
   <div className="setting_box_scrim" onClick={changestate} ></div>
   <div className="setting_box" > 
   <div className="setting_box_item setting_box_top">   <div className="settings_closebutton" onClick={changestate}><Closeicon /></div></div>
  
  <div className="setting_box_item" style={showset.navbar?{"display":"none"}:{}}><button onClick={(deleteSection)}>Delete Section {showset.index}</button></div>
  <div className="setting_box_item  setting_box_select_holder"><span>Type of Section</span><select><option value="1">Description</option>
                                              <option value="2">Skill</option>                                
                                                                              </select></div>
                                                                              <div className="setting_box_item"><span> Include in SOP?</span><Switch id="material-switch" height={15} width={30}  handleDiameter={12} uncheckedIcon={false} checkedIcon={false} onChange={()=>{}} checked={value}/></div>
  <div className="setting_box_item "><button onClick={(addSection)}>Add Section {showset.index}</button></div>
   </div>
            
    </div>
  );
}

export default SettingBox;
 