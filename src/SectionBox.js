import Uparrow from "./icons/Uparrow.js";
import Downarrow from "./icons/Downarrow.js";
import Settingsicon from "./icons/Settingsicon.js";
import Addicon from "./icons/Addicon.js";
import SectionboxItem from "./SectionboxItem.js";
import SectionboxItemskill from "./SectionboxItemskill.js";
import SectionboxItemfixed from "./SectionboxItemfixed.js";
import SectionboxItemunfix from "./SectionboxItemunfix.js";
import SectionboxItemref from "./SectionboxItemref.js";
import SectionboxItemobjtwo from "./SectionboxItemobjtwo.js";
import {useState,useEffect} from "react";
import {getdataformat} from "./DataHolder.js";
import Switch from "react-switch";



function SectionBox({classname,compData,index,errorFunc,updateParentVal,reorder}) {



const item_ = parseInt(compData.idno)-1; //converts the variable item into an integer using parseInt() and then subtracts one from it. 

const sampe = getdataformat(); //has a sample array with all the possible data objects

const [sectionval, setsectionval] = useState([sampe[item_]]); //state variable to keep track of the updated value of the component

const [uistate,setuistate] =useState([1]); //state variable to keep track of the updated ui state of the component 0 for minimized and 1 for maximized
const [compupdate,setcompup] = useState([0]); //state to keep track of whether the component has been updated or not if updated it's 1 and if not updated its 0

const [comptitle,settitle] = useState(compData.title);
let update_message = {value:`Autosaved`,display:"block", messagetype:2};


const [togglestate,settoggle] = useState(compData.include);

let sum = compupdate.reduce((accumulator, value) => {
return accumulator + value;
}, 0);  //sums up the value 


useEffect(()=>{
 sum = compupdate.reduce((accumulator, value) => {
return accumulator + value;
}, 0);  },[compupdate]);

useEffect(()=>{
updateComponentData();
},[]);

// useEffect(()=>{updateComponentData();
// },[compData.value]);



const updateComponentData = ()=>{ //check if data was passed from parent, if yes, then change state value of this item.
    if(compData.value){
    const gotdata = compData.value;
    let tempui = [];
    let tempupdate=[];
    let tempinclude = compData.include;
    let temptitle = compData.title;

    gotdata.forEach(()=>{
   tempui.push(0);
   tempupdate.push(1);
    });
    
    setsectionval(gotdata);
    setuistate(tempui);
    setcompup(tempupdate);
    settitle(temptitle);
    settoggle(tempinclude);
    }
}

//function to add a new item to the section
const addchild =(e) =>{
  e.preventDefault();
  let temparr = sectionval.map((x)=>(x));
  if((sum===(temparr.length))&&(temparr.length<6)){
    temparr.push(sampe[item_]);
  setsectionval(temparr);   //update the section value
  updatestate();   //call the function to update UI state of all the children and then add an element to the state keeping array; this function minimizes all children other than the last one.
}

else if((sum===(temparr.length))&&(temparr.length>=6)){
  let error = {value:`Max 5 inputs allowed. Try removing a previous input`,display:"block", messagetype:1};
  errorFunc(error);  
 }

 else if((sum!==(temparr.length))){
  let error = {value:`Why leave it empty? Fill it up`,display:"block", messagetype:1};
  errorFunc(error);  
 }


}

//function to add a state element for the last added child and then update the state of the instance UI
const updatestate =()=>{
  let tempuistate = [...uistate];
  tempuistate.forEach((e,i)=>{tempuistate[i] = 0});
  tempuistate.push(1);
  setuistate(tempuistate);
}





//Function to update the parent object
const updateParent = (e) =>{  
if(e){e.preventDefault();}
updateParent_(comptitle,togglestate);
makeToast(update_message);
}

const updateParent_ = (titleval,toggleval)=>{

    let tempparentval = sectionval.map((x)=>(x));

  if(compupdate[(tempparentval.length-1)]!=1){ //check if the last component added was updated, if not, remove it from temparray and then only update the db
  tempparentval.pop();
  } //if the last component is just added and not updated, then don't add it to the database

updateParentVal(tempparentval,index,titleval,toggleval);

}

const makeToast =(error)=>{
  //if calling this function directly via a button, use e.preventDefault() to handle error.  
errorFunc(error);
}


const toggleChange = ()=>{
var temptoggle = togglestate;
temptoggle = !temptoggle;
settoggle(temptoggle);
updateParent_(comptitle,temptoggle);}



const moveup =(e)=>{
  e.preventDefault();
  console.log("Clicked Move up");
  reorder(index,true);
}
const movedown = (e)=>{
  e.preventDefault();
  reorder(index,false);
}


const animate = ()=>{
 
}

function contentmaker(item_id){

switch(item_id){
  case 1:
  return (sectionval.map((e, i) => <SectionboxItemref        secstate={uistate} updateuistate={setuistate} secvalue={sectionval} updatesecvalue={setsectionval} isupdateval={compupdate} isupdatefunc={setcompup} key={i} compid={i} secname = {compData.title} />));
  break;
  case 2:
  return (sectionval.map((e, i) => <SectionboxItemskill      secstate={uistate} updateuistate={setuistate} secvalue={sectionval} updatesecvalue={setsectionval} isupdateval={compupdate} isupdatefunc={setcompup} key={i} compid={i} secname = {compData.title}  />));
  break;
  case 3:
  return (sectionval.map((e, i) => <SectionboxItemfixed      secstate={uistate} updateuistate={setuistate} secvalue={sectionval} updatesecvalue={setsectionval} isupdateval={compupdate} isupdatefunc={setcompup} key={i} compid={i} secname = {compData.title} />));
  break;
  case 4:
  return (sectionval.map((e, i) => <SectionboxItem           secstate={uistate} updateuistate={setuistate} secvalue={sectionval} updatesecvalue={setsectionval} isupdateval={compupdate} isupdatefunc={setcompup} key={i} compid={i} secname = {compData.title} />));
  break;
  case 5:
  return (sectionval.map((e, i) => <SectionboxItemobjtwo     secstate={uistate} updateuistate={setuistate} secvalue={sectionval} updatesecvalue={setsectionval} isupdateval={compupdate} isupdatefunc={setcompup} key={i} compid={i} secname = {compData.title} />));
  break;
  case 6:
  return (sectionval.map((e, i) => <SectionboxItemunfix      secstate={uistate} updateuistate={setuistate} secvalue={sectionval} updatesecvalue={setsectionval} isupdateval={compupdate} isupdatefunc={setcompup} key={i} compid={i} secname = {compData.title} />));
  break;
  default:
  return "";
  break;
}
}




  return (
    <div className={classname}>

            <div className="section_box__item section_box__heading"><div className="section_heading__item section_heading__text"><span className="hover-track"><span className="onhover-message">Show this on resume?</span><Switch id="material-switch" height={15} width={30}  handleDiameter={12} uncheckedIcon={false} checkedIcon={false} onChange={toggleChange} checked={togglestate}/></span><input style={{"fontWeight":"bold","minWidth":"fit-content"}} onChange={(e)=>{settitle(e.target.value);}} value={comptitle}></input></div> <div className="section_heading__item section_heading__buttons"><button className="up-arrow--button sectionbox--button" onClick={moveup}><Uparrow/></button><button className="down-arrow--button sectionbox--button" onClick={movedown}><Downarrow/></button><button className="settings-arrow--button sectionbox--button" ><Settingsicon/></button></div> </div>
         
          {contentmaker(compData.idno)}

           <div className="section_form__item section_item__nextbutton" style={compData.addmore?{}:{display:"none"}}><button className="section_nextbutton__button" onClick={addchild}><Addicon/><span>Add another {compData.title}</span></button></div>
       
    </div>
  );
}

export default SectionBox;
 