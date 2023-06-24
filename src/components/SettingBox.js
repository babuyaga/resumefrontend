import "./stylesheets/SettingBox.css";
import {useState,useEffect,useContext} from "react";
import {appuiContext} from "../pages/App.js";
import Switch from "react-switch";

function SettingBox() {
const {showset,setshowset,deleteAppval,addAppval,appval,updateappvalWhole} = useContext(appuiContext);
const [value,setValue] = useState(true);

useEffect(()=>{
  
  if(showset.index===appval.length){
    setValue(false)
  }else{
    setValue(appval[showset.index].includeSOP);
  }

},[]);




const changestate = (e)=>{
  e.preventDefault();
  setshowset({"display":false,"index":showset.index});
}




const deleteSection = (e)=>{
  e.preventDefault();
  if((!showset.navbar)||(showset.navbar==="delete")){
  deleteAppval(showset.index);
  setshowset({"display":false,"index":showset.index});
 }
}


const addSection = (e)=>{
  e.preventDefault();
  addAppval(showset.index,value);
  
  setshowset({"display":false,"index":showset.index,scroll:true});
  console.log("Add app val",showset.index,value,appval.length);
}

const changeVal=()=>{
 
 if(showset.index===appval.length){
  setValue(value=>!value)
}else{
  let tempval = [...appval];
  tempval[showset.index].includeSOP = !value;
  console.log("Tempvalthing",tempval[showset.index].includeSOP);
  updateappvalWhole(tempval);
 setValue(value=>!value);
}

}


const onDelete = ()=>{
  setshowset({"display":true,"index":showset.index,navbar:"delete"});
}


  return (
    <div className="delete-popup-container-scrim" >
   <div className="setting_box_scrim" onClick={changestate} ></div>
   <div className="setting_box" style={((showset.navbar)&&(showset.navbar!=="delete"))?{}:{"display":"none"}}>   
   <div className="setting_box_item"><h2>Add Section</h2></div>  
  <div className="setting_box_item  setting_box_select_holder"><span>Type of Section</span><select><option value="1">Description</option>
                                              <option value="2">Skill</option>                                
                                                                              </select></div>
                                                                              <div className="setting_box_item"><span> Include in SOP?</span><Switch id="material-switch" height={15} width={30}  handleDiameter={12} uncheckedIcon={false} checkedIcon={false} onChange={changeVal} checked={value}/></div>
  <div className="setting_box_item"><button className="setting_box-button" onClick={(addSection)}>Add New Section </button></div>
   </div>

   <div className="setting_box"  style={(showset.navbar)?{"display":"none"}:{}}>

   <div className="setting_box_item"><h2> Section settings</h2></div>  
                                                                              <div className="setting_box_item"><span> Include in SOP?</span><Switch id="material-switch" height={15} width={30}  handleDiameter={12} uncheckedIcon={false} checkedIcon={false} onChange={changeVal} checked={value}/></div>
   
   
  <div className="setting_box_item" ><button className="setting_box-button" onClick={onDelete}>Delete Section</button></div>
   </div>

   <div className="setting_box"  style={showset.navbar==="delete"?{}:{"display":"none"}}>

<div className="setting_box_item"><h2> Permanent Action</h2></div>  

<div className="setting_box_item"><h4> {showset.navbar==="delete"?appval[showset.index].title:""} Section will be permanently deleted</h4></div>  
<div className="setting_box_item" ><button className="setting_box-button" onClick={(deleteSection)}>Delete Section</button><button className="setting_box-button" onClick={()=>{setshowset({"display":true,"index":showset.index,navbar:false});}}>Discard</button></div>

</div>



            
    </div>
  );
}

export default SettingBox;
 