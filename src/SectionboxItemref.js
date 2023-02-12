import {useState,useRef,useEffect} from "react";
import TextEditor from './TextEditor.js';
import Saveicon from "./icons/Saveicon.js";
import Trashicon from "./icons/Trashicon.js";
import Addicon from "./icons/Addicon.js";
import Uparrow from "./icons/Uparrow.js";
import Downarrow from "./icons/Downarrow.js";
import Minimizeicon from "./icons/Minimizeicon.js";
import Maximizeicon from "./icons/Maximizeicon.js";
import {moveup_,movedown_, deletechild_, secupdateflag_} from "./UIstates.js";

var styles = {display:""};
var stylez = {display:""};

function SectionboxItemref({secstate, compid,secvalue, updatesecvalue,updateuistate,isupdateval,isupdatefunc}) {

  const top = secstate[compid];
  const objValue = secvalue[compid];

  objValue.compname = objValue.compname?objValue.compname:"";
  objValue.contactperson = objValue.contactperson?objValue.contactperson:"";
  objValue.phonenumber = objValue.phonenumber?objValue.phonenumber:"";
  objValue.emailadd = objValue.emailadd?objValue.emailadd:"";



  let companyref = useRef();
  let contactref = useRef();
  let phoneref = useRef();
  let emailref = useRef();

  const changeobjval = ()=>{
    objValue.compname = companyref.current.value;
    objValue.contactperson = contactref.current.value;
    objValue.phonenumber = phoneref.current.value;
    objValue.emailadd = emailref.current.value;
    updatesection();
  }

  const updatesectione = (e) =>{ //function to update section
    e.preventDefault();
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

   const secupdateflag =(flag) =>{   //set flag to show that the current component has been updated
    secupdateflag_(flag,isupdatefunc,isupdateval,compid);
     }

     
  const deletesec_comp = (e)=>{ //call this function to delete the current instance of the component
    e.preventDefault();
   deletechild_(secvalue,secstate,updatesecvalue,updateuistate,compid,isupdatefunc,isupdateval);
     }

const moveup = (e) =>{ //code to move the instance of component up
      e.preventDefault();
  moveup_(secvalue,secstate,updatesecvalue,updateuistate,compid);
  }

const movedown = (e) =>{ //code to move the instance of the component down
    e.preventDefault();
    movedown_(secvalue,secstate,updatesecvalue,updateuistate,compid);
  }

  const remuistate = (e)=>{  //call this function to toggle min-max of the current instance of the component
    e.preventDefault();
    const tempuistate = [...secstate];
    tempuistate[compid] = (tempuistate[compid]===1)?0:1;
   updateuistate(tempuistate);

  }



  return (

            <div className="section_box__item section_form__holder">
                  <div className="top_button__holder" style={(top===1)?stylez:{display:"none"}}><button onClick={remuistate} className="minimize-icon--button"><Minimizeicon/></button></div>
                  <div className="section_box__item section_form__holder_container" style={(top=="1")?stylez:{display:"none"}}>
                      <div className="section_form__item section_item__title"><span>Company Name</span>      <div className="inputbox_component"><input value={objValue.compname} onChange={changeobjval} ref={companyref} ></input></div>    </div>
                      <div className="section_form__item section_item__location"><span>Contact Person</span> <div className="inputbox_component"><input value={objValue.contactperson} onChange={changeobjval} ref={contactref}></input></div> </div>
                      <div className="section_form__item section_item__place"> <span> Phone Number </span> <div className="inputbox_component"><input value={objValue.phonenumber} onChange={changeobjval} ref={phoneref}></input></div> </div>
                      <div className="section_form__item section_item__place"> <span> Email Address </span> <div className="inputbox_component"><input value={objValue.emailadd} onChange={changeobjval} ref={emailref}></input></div> </div>
                      <div className="section_form__item section_item__buttonholder"><button className="section_buttonholder__button" onClick={updatesectione}> <Saveicon/><span>Save</span> </button><button className="section_buttonholder__button" onClick={deletesec_comp}><Trashicon/><span>Delete</span></button></div>
                  </div>

                  <div className="section_form__minimized" style={(top===1)?{display:"none"}:styles}><div className="minimized_section__title"><span>{objValue.contactperson?`${objValue.contactperson} - `:`Reference ${compid+1}`}{objValue.compname?objValue.compname:""}</span></div> <div className="section_heading__item section_heading__buttons"><button className="up-arrow--button sectionbox--button" onClick={moveup}><Uparrow/></button><button className="down-arrow--button sectionbox--button" onClick={movedown}><Downarrow/></button><button className="down-arrow--button sectionbox--button" onClick={remuistate} ><Maximizeicon/></button></div></div>

          </div>

  );
}

export default SectionboxItemref;
