import Closeicon from "./icons/Closeicon.js";
import Saveicon from "./icons/Saveicon.js";
import Trashicon from "./icons/Trashicon.js";
import {useRef,useState,useEffect} from "react";
import Uparrow from "./icons/Uparrow.js";
import Downarrow from "./icons/Downarrow.js";
import Minimizeicon from "./icons/Minimizeicon.js";
import Maximizeicon from "./icons/Maximizeicon.js";


var styles = {display:""};
var stylez = {display:""};


var options = ["Beginner","Intermediate","Skilfull","Experienced","Expert"];
var opthtml = options.map((item,i) => (<option value={i} key={i}>{item}</option>));

function SectionboxItemskill({ secstate, compid, secname,secvalue, updatesecvalue,updateuistate,isupdateval,isupdatefunc}) {

const compref_id = secname + compid;
const top = secstate[compid];
const objValue = secvalue[compid];
objValue.name = objValue.name?objValue.name:"";
objValue.level = objValue.level?objValue.level:1;


let skillref = useRef();
let levelref = useRef();

const changeobjval = ()=>{
  objValue.name = skillref.current.value;
  objValue.level= levelref.current.value;


  updatesection();
}


const updatesectione = (e) =>{
e.preventDefault();
updatesection();
};

const updatesection =() =>{
  const tempupvalue = [...secvalue];
  tempupvalue[compid] = objValue;
  updatesecvalue(tempupvalue);
  if(objValue.name===""){
   secupdateflag(0);
  }else {secupdateflag(1);}
}

const secupdateflag =(flag) =>{
  const iscompup = [...isupdateval]; //below code sets a flag that the component has been updated.
  iscompup[compid]=flag;
  isupdatefunc(iscompup);
}

const moveup = (e)=>{
  e.preventDefault();
const tempmoveupvalue =[...secvalue];
const tempmoveupuistate = [...secstate];
if(compid>0){
tempmoveupvalue[compid-1] = secvalue[compid];
tempmoveupvalue[compid] = secvalue[compid-1];
tempmoveupuistate[compid-1] = secstate[compid];
tempmoveupuistate[compid] = secstate[compid-1];
updatesecvalue(tempmoveupvalue);
updateuistate(tempmoveupuistate);
}};

const movedown = (e)=> {  e.preventDefault();
const tempmovedownvalue =[...secvalue];
const tempmovedownuistate = [...secstate];
if(compid<(secvalue.length-2)){
tempmovedownvalue[compid+1] = secvalue[compid];
tempmovedownvalue[compid] = secvalue[compid+1];
tempmovedownuistate[compid+1] = secstate[compid];
tempmovedownuistate[compid] = secstate[compid+1];
updatesecvalue(tempmovedownvalue);
updateuistate(tempmovedownuistate);
}};

const remuistate =(e) =>{
  e.preventDefault();
  const tempuistate = [...secstate];
  tempuistate[compid] = (tempuistate[compid]===1)?0:1;
  updateuistate(tempuistate);
};

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


const secupdateflagdel = () =>{
  const iscompup = [...isupdateval]; //below code sets a flag that the component has been updated.
  iscompup.splice(compid,1);
  isupdatefunc(iscompup);
}


  return (

            <div className="section_box__item section_form__holder">
              <div className="top_button__holder" style={(top===1)?stylez:{display:"none"}}><button onClick={remuistate} className="minimize-icon--button"><Minimizeicon/></button></div>
                  <div className="section_box__item section_form__holder_container" style={(top===1)?stylez:{display:"none"}}>
                      <div className="section_form__item section_item__title"><span>Skill</span>      <div className="inputbox_component" ><input value={objValue.name} onChange={changeobjval} ref={skillref}></input></div>    </div>
                      <div className="section_form__item section_item__location"><span>Level</span> <div className="inputbox_component"><select name="cars" id="cars" ref={levelref} value={objValue.level} onChange={changeobjval}>{opthtml.map(item=>item)}</select></div> </div>

                      <div className="section_form__item section_item__buttonholder"><button className="section_buttonholder__button" onClick={updatesectione}> <Saveicon/><span>Save</span> </button><button className="section_buttonholder__button" onClick={deletesec_comp}><Trashicon/><span>Delete</span></button></div>
                  </div>

                  <div className="section_form__minimized" style={(top===1)?{display:"none"}:styles}><div className="minimized_section__title"><span>{objValue.name?`${objValue.name} - `:`Skill ${compid+1}`}{objValue.level?options[objValue.level]:""}</span></div> <div className="section_heading__item section_heading__buttons"><button className="up-arrow--button sectionbox--button" onClick={moveup}><Uparrow/></button><button className="down-arrow--button sectionbox--button" onClick={movedown}><Downarrow/></button><button className="down-arrow--button sectionbox--button" onClick={remuistate} ><Maximizeicon/></button></div></div>



          </div>

  );
}

export default SectionboxItemskill;
