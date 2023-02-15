import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './texteditor.css';
import Saveicon from "./icons/Saveicon.js";
import Trashicon from "./icons/Trashicon.js";
import Addicon from "./icons/Addicon.js";
import {useRef,useState,useEffect} from "react";
import Uparrow from "./icons/Uparrow.js";
import Downarrow from "./icons/Downarrow.js";
import Minimizeicon from "./icons/Minimizeicon.js";
import Maximizeicon from "./icons/Maximizeicon.js";
import {moveup_,movedown_, deletechild_, secupdateflag_} from "./UIstates.js";

var styles = {display:""};
var stylez = {display:""};

//COMPID is 6

function SectionboxItemunfix({ secstate, compid, secname,secvalue, updatesecvalue,updateuistate,isupdateval,isupdatefunc}) {


  const compidsol = compid;
  const top = secstate[compid];
  const objValue = secvalue[compid];
  objValue.description = objValue.description?objValue.description:"";



  const changeobjdesc =(e)=>{ //Function to update inputbox of component
  objValue.description = e;
  updatesection();
  };


const updatesection =() =>{ 
    
   const tempupvalue = [...secvalue];
   tempupvalue[compid] = objValue;
   updatesecvalue(tempupvalue);

  if(objValue.description===""){
   secupdateflag(0);
  }else {secupdateflag(1);}

  }

const updatesectione = (e) =>{ //function to update section
  e.preventDefault();
  updatesection();
  };

const secupdateflag =(flag) =>{   //set flag to show that the current component has been updated
 secupdateflag_(flag,isupdatefunc,isupdateval,compid);
  }



  const deletesec_comp = (e)=>{ //call this function to delete the current instance of the component
 e.preventDefault();
 if(secstate.length>1){
deletechild_(secvalue,secstate,updatesecvalue,updateuistate,compid,isupdatefunc,isupdateval);
  }}

  const remuistate = (e)=>{  //call this function to toggle min-max of the current instance of the component
    e.preventDefault();
    const tempuistate = [...secstate];
    tempuistate[compid] = (tempuistate[compid]===1)?0:1;
   updateuistate(tempuistate);

  }


  const moveup = (e) =>{ //code to move the instance of component up
    e.preventDefault();
moveup_(secvalue,secstate,updatesecvalue,updateuistate,compid);
}

  const movedown = (e) =>{ //code to move the instance of the component down
    e.preventDefault();
    movedown_(secvalue,secstate,updatesecvalue,updateuistate,compid);
  }


  return (                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   

            <div className="section_box__item section_form__holder">
            <div className="top_button__holder" style={(top===1)?stylez:{display:"none"}}><button onClick={remuistate} className="minimize-icon--button"><Minimizeicon/></button></div>
                  <div className="section_box__item section_form__holder_container" style={(top===1)?stylez:{display:"none"}}>
                      <div className="section_form__item section_item__description"><span>Description</span><ReactQuill  theme="snow" value={objValue.description} onChange={changeobjdesc}/></div>
                      <div className="section_form__item section_item__buttonholder"><button className="section_buttonholder__button" onClick={updatesectione}> <Saveicon/><span>Save</span> </button><button className="section_buttonholder__button" onClick={deletesec_comp} ><Trashicon/><span>Delete</span></button></div>
                  </div>

                  <div className="section_form__minimized" style={(top===1)?{display:"none"}:styles}><div className="minimized_section__title"><span>{objValue.description?`${objValue.description.replace(/<[^>]+>/g, '').slice(0, 20)}..... `:`${secname} ${compidsol+1}`}</span></div> <div className="section_heading__item section_heading__buttons"><button className="up-arrow--button sectionbox--button" onClick={moveup}><Uparrow/></button><button className="down-arrow--button sectionbox--button" onClick={movedown}><Downarrow/></button><button className="down-arrow--button sectionbox--button" onClick={remuistate} ><Maximizeicon/></button></div></div>



          </div>

  );
}

export default SectionboxItemunfix;


