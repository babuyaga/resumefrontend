import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './texteditor.css';
import Closeicon from "./icons/Closeicon.js";
import Saveicon from "./icons/Saveicon.js";
import Trashicon from "./icons/Trashicon.js";
import {useRef,useState,useEffect} from "react";
import Uparrow from "./icons/Uparrow.js";
import Downarrow from "./icons/Downarrow.js";
import Minimizeicon from "./icons/Minimizeicon.js";
import Maximizeicon from "./icons/Maximizeicon.js";
import {moveup_,movedown_, deletechild_, secupdateflag_} from "./UIstates.js";


var styles = {display:""};
var stylez = {display:""};


function SectionboxItem({ secstate, compid, secname,secvalue, updatesecvalue,updateuistate,isupdateval,isupdatefunc,errorFunc}) {

useEffect(()=>{ objValue.description = "Kindly update description...";
 updatesectione();},[]
 );

const compref_id = secname + compid;
const top = secstate[compid];
const objValue = secvalue[compid];
objValue.startDate = objValue.startDate?objValue.startDate:"2022-09";
objValue.endDate = objValue.endDate?objValue.endDate:"2022-09";

let designationref = useRef();
let cityref = useRef();
let schoolref= useRef();
let sdateref = useRef();
let edateref = useRef();
let descripref = useRef();


const changeobjdesc =(e)=>{
  if(e){e.preventDefault()};
objValue.description = descripref.current.value;
updatesection();
};

const changeobjval = ()=>{
  objValue.place = schoolref.current.value;
  objValue.location = cityref.current.value;
  objValue.designation = designationref.current.value;
  objValue.website="";
  objValue.startDate= sdateref.current.value;
  objValue.endDate = edateref.current.value;
  objValue.description = descripref.current.value;
  updatesection();
}


const updatesectione = (e) =>{
if(e){e.preventDefault();}
updatesection();
};

const updatesection =() =>{
 const tempupvalue = [...secvalue];
 tempupvalue[compid] = objValue;
 updatesecvalue(tempupvalue);

if((objValue.designation==="")||(objValue.description==="Kindly enter a description")||(objValue.description==="<p><br/><p>")||(objValue.description==="")){
 secupdateflag(0);
}else {secupdateflag(1);}

}

const secupdateflag =(flag) =>{
  const iscompup = [...isupdateval]; //below code sets a flag that the component has been updated.
  iscompup[compid]=flag;
  isupdatefunc(iscompup);
}


const deletesec_comp = (e)=>{
e.preventDefault();
const tempdelvalue =[...secvalue];
const tempdeluistate = [...secstate];
if(tempdelvalue.length>1){
tempdelvalue.splice(compid,1);
tempdeluistate.splice(compid,1);
updatesecvalue(tempdelvalue);
updateuistate(tempdeluistate);
secupdateflagdel();
}
}

const remuistate = (e)=>{
  e.preventDefault();
  const tempuistate = [...secstate];
  tempuistate[compid] = (tempuistate[compid]===1)?0:1;
 updateuistate(tempuistate);
}

const secupdateflagdel = () =>{
  const iscompup = [...isupdateval]; //below code sets a flag that the component has been updated.
  iscompup.splice(compid,1);
  isupdatefunc(iscompup);
}

const moveup = (e) =>{
  e.preventDefault();
  moveup_(secvalue,secstate,updatesecvalue,updateuistate,compid);
}

const movedown = (e) =>{
  e.preventDefault();
  movedown_(secvalue,secstate,updatesecvalue,updateuistate,compid);}

const viewval =()=>{

}

  return (

            <div className="section_box__item section_form__holder">
                  <div className="top_button__holder" style={(top===1)?stylez:{display:"none"}}><button onClick={remuistate} className="minimize-icon--button"><Minimizeicon/></button></div>
                  <div className="section_box__item section_form__holder_container" style={(top===1)?stylez:{display:"none"}}>
                      <div className="section_form__item section_item__title"><span>Title</span>      <div className="inputbox_component"><input ref={designationref} value={objValue.designation} onChange={changeobjval} ></input></div>    </div>
                      <div className="section_form__item section_item__location"><span>city/town</span> <div className="inputbox_component"><input ref={cityref} value={objValue.location} onChange={changeobjval}></input></div> </div>
                      <div className="section_form__item section_item__place"> <span> School </span> <div className="inputbox_component"><input ref={schoolref} value={objValue.place} onChange={changeobjval}></input></div> </div>
                      <div className="section_form__item section_item__dates">
                            <div className="section_item__startd section_item__dateinput"><span>Start Date</span><div className="inputbox_component"><input ref={sdateref} value={objValue.startDate} onChange={changeobjval} type="month" placeholder="Start Date" id="startdate" name="startdate"></input></div></div>
                            <div className="section_item__endd section_item__dateinput"><span> End Date </span><div className="inputbox_component"><input ref={edateref} value={objValue.endDate} onChange={changeobjval} type="month" id="enddate" name="enddate"></input></div></div>
                      </div>
                      <div className="section_form__item section_item__description"><span>Description</span> <div  className="textdescription_holder" onClick={viewval}><ReactQuill  theme="snow" value={objValue.description} onChange={changeobjval} ref={descripref}></ReactQuill></div></div>
                      <div className="section_form__item section_item__buttonholder"><button className="section_buttonholder__button" onClick={updatesectione}> <Saveicon/><span>Save</span> </button><button className="section_buttonholder__button" onClick={deletesec_comp}><Trashicon/><span>Delete</span></button></div>
                  </div>

                <div className="section_form__minimized" style={(top===1)?{display:"none"}:styles}><div className="minimized_section__title"><span>{objValue.designation?`${objValue.designation} - `:`Work Experience ${compid+1}`}{objValue.place?objValue.place:""}</span></div> <div className="section_heading__item section_heading__buttons"><button className="up-arrow--button sectionbox--button" onClick={moveup}><Uparrow/></button><button className="down-arrow--button sectionbox--button" onClick={movedown}><Downarrow/></button><button className="down-arrow--button sectionbox--button" onClick={remuistate} ><Maximizeicon/></button></div></div>


          </div>

  );
}

export default SectionboxItem;
