import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './texteditor.css';
import Saveicon from "./icons/Saveicon.js";
import Trashicon from "./icons/Trashicon.js";
import Addicon from "./icons/Addicon.js";

var styles = {display:""};
var stylez = {display:""};
var top =1;

function SectionboxItemobjtwo({ secstate, compid, secname,secvalue, updatesecvalue,updateuistate,isupdateval,isupdatefunc}) {


  return (

            <div className="section_box__item section_form__holder">
                  <div className="section_box__item section_form__holder_container" style={(top=="1")?stylez:{display:"none", height:"0px", transition:  "height 0.2s ease-in-out"}}>
                      <div className="section_form__item section_item__place"> <span> School </span> <div className="inputbox_component"><input></input></div> </div>
                      <div className="section_form__item section_item__description"><span>Description</span><ReactQuill/></div>
                      <div className="section_form__item section_item__buttonholder"><button className="section_buttonholder__button"> <Saveicon/><span>Save</span> </button><button className="section_buttonholder__button"><Trashicon/><span>Clear</span></button></div>
                  </div>

                <div className="section_form__minimized" style={(top=="1")?{display:"none", height:"0px", transition: "height 0.2s ease-in-out"}:styles}><span>Minimized</span></div>


          </div>

  );
}

export default SectionboxItemobjtwo;
