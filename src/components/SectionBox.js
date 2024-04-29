import Uparrow from "../icons/Uparrow.js";
import Downarrow from "../icons/Downarrow.js";
import Settingsicon from "../icons/Settingsicon.js";
import Addicon from "../icons/Addicon.js";
import SectionboxItem from "./sectionboxes/SectionboxItem.js";
import SectionboxItemskill from "./sectionboxes/SectionboxItemskill.js";
import SectionboxItemfixed from "./sectionboxes/SectionboxItemfixed.js";
import SectionboxItemunfix from "./sectionboxes/SectionboxItemunfix.js";
import SectionboxItemref from "./sectionboxes/SectionboxItemref.js";
import SectionboxItemobjtwo from "./sectionboxes/SectionboxItemobjtwo.js";
import {useState,useEffect,useContext,createContext,useRef} from "react";
import {getdataformat} from "./DataHolder.js";

import Switch from "react-switch";
import {appuiContext} from "../pages/App.js";


function SectionBox({sectionid,compData,index,reorder}) {

const {saveThis,showset,setshowset,updateAppVal,swaporder,hoverindex,appval,setappval} = useContext(appuiContext);

const item_ = parseInt(compData.idno)-1; //converts the variable item into an integer using parseInt() and then subtracts one from it to get index. 

const sampe = getdataformat(); //has a sample array with all the possible data objects

const [sectionval, setsectionval] = useState([sampe[item_]]); //state variable to keep track of the updated value of the component

const [uistate,setuistate] =useState([1]); //state variable to keep track of the updated ui state of the component 0 for minimized and 1 for maximized
 //state to keep track of whether the component has been updated or not if updated it's 1 and if not updated its 0
 const sectionbox = useRef();




const [comptitle,settitle] = useState(compData.title);
let update_message = {value:`Autosaved`,display:"block", messagetype:2};
const [clickY,setclicky] = useState(0);

const [togglestate,settoggle] = useState(compData.include);


useEffect(() => {
  if ((sectionbox.current)&&(showset.scroll)) {
    sectionbox.current.scrollIntoView({ behavior: 'smooth' });
  }
}, []);




useEffect(()=>{
updateComponentData();
},[appval]);


// const MINUTE_MS = 10000;

// useEffect(() => {
//   const interval = setInterval(() => {
//     updateParent();
//     console.log("client updated by component ",index);
//   }, MINUTE_MS);

//   return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
// }, [])


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
    settitle(temptitle);
    settoggle(tempinclude);
    }
}

//function to add a new item to the section
const addchild =(e) =>{
  e.preventDefault();
  let temparr = sectionval.map((x)=>(x));
 
    

 if((temparr.length>=5)){
  let error = {value:`Max 5 inputs allowed. Try removing a previous input`,display:"block", messagetype:1};
 console.log("Call error here");
 }
 else{
  temparr.push(sampe[item_]);
  setsectionval(temparr);   //update the section value
  updatestate();   //call the function to update UI state of all the children and then add an element to the state keeping array; this function minimizes all children other than the last one.
  updateParent(temparr);
 }

//  else if((sum!==(temparr.length))){
//   let error = {value:`Why leave it empty? Fill it up`,display:"block", messagetype:1};

//  }


}

//function to add a state element for the last added child and then update the state of the instance UI
const updatestate =()=>{
  let tempuistate = [...uistate];
  tempuistate.forEach((e,i)=>{tempuistate[i] = 0});
  tempuistate.push(1);
  setuistate(tempuistate);
}





//Function to update the parent object
const updateParent = (temparr) =>{  

updateAppVal(temparr,index,comptitle,togglestate);

makeToast(update_message);
}



const makeToast =(error)=>{
  //if calling this function directly via a button, use e.preventDefault() to handle error.  
console.log("call error here");
}


const toggleChange = ()=>{
var temptoggle = togglestate;
temptoggle = !temptoggle;
settoggle(temptoggle);
updateAppVal(sectionval,index,comptitle,temptoggle);
}



const moveup =(e)=>{
  e.preventDefault();
  console.log("Clicked Move up");
  reorder(index,true);
}
const movedown = (e)=>{
  e.preventDefault();
  reorder(index,false);
}

const showsetting = (e)=>{
  e.preventDefault();
  setshowset({"display":true,"index":index});
}
const [stylezz,setstylezz]=useState({"opacity":"1","order":index});

const dragstartfunc=(e)=>{
setstylezz({"opacity":"0.5"});
setclicky(e.clientY);
}

const ondragfunc = (e)=>{
let j = hoverindex;

console.log("This is offset left",sectionbox.current.offsetLeft);
let x = sectionbox.current.offsetLeft;
let diff= e.clientY-sectionbox.current.offsetTop;
let y= e.clientY-30;
setstylezz({"opacity":"0.3"});


if (e.clientY < (clickY-100)){
  window.scrollTo(0, window.scrollY - 150); // Scroll up
} else if (e.clientY > (clickY+100)) {
  window.scrollTo(0, window.scrollY + 150); // Scroll down
}



}


const dragendfunc=()=>{
  let j = hoverindex;
  console.log(index,j);
  setstylezz({"opacity":"1"});

  swaporder(index,j);
}


function contentmaker(item_id){

switch(item_id){
  case 1:
  return (sectionval.map((e, i) => <SectionboxItemref        uistate={uistate} updateuistate={setuistate} secvalue={sectionval} updatesecvalue={setsectionval}  key={`${i}+${compData.title}_1`} compid={i} secname = {compData.title} sectionindex={index}/>));
  break;
  case 2:
  return (sectionval.map((e, i) => <SectionboxItemskill      uistate={uistate} updateuistate={setuistate} secvalue={sectionval} updatesecvalue={setsectionval}  key={`${i}+${compData.title}_2`} compid={i} secname = {compData.title}  sectionindex={index} />));
  break;
  case 3:
  return (sectionval.map((e, i) => <SectionboxItemfixed      uistate={uistate} updateuistate={setuistate} secvalue={sectionval} updatesecvalue={setsectionval}  key={`${i}+${compData.title}_3`} compid={i} secname = {compData.title} sectionindex={index} />));
  break;
  case 4:
  return (sectionval.map((e, i) => <SectionboxItem           uistate={uistate} updateuistate={setuistate} secvalue={sectionval} updatesecvalue={setsectionval}  key={`${i}+${compData.title}_4`} compid={i} secname = {compData.title} sectionindex={index} />));
  break;
  case 5:
  return (sectionval.map((e, i) => <SectionboxItemobjtwo     uistate={uistate} updateuistate={setuistate} secvalue={sectionval} updatesecvalue={setsectionval}  key={`${i}+${compData.title}_5`} compid={i} secname = {compData.title} sectionindex={index} />));
  break;
  case 6:
  return (sectionval.map((e, i) => <SectionboxItemunfix      uistate={uistate} updateuistate={setuistate} secvalue={sectionval} updatesecvalue={setsectionval}  key={`${i}+${compData.title}_6`} compid={i} secname = {compData.title} sectionindex={index} />));
  break;
  default:
  return "";
  break;
}
}




  return (<div  id={sectionid}>


    <div className="section_box" style={stylezz} ref={sectionbox}>

            <div className="section_box__item section_box__heading"><div className="section_heading__item section_heading__text"><span className="hover-track"><span className="onhover-message">Show this on resume?</span><Switch id="material-switch" height={15} width={30}  handleDiameter={12} uncheckedIcon={false} checkedIcon={false} onChange={toggleChange} checked={togglestate}/></span> <input style={{"fontWeight":"bold","minWidth":"fit-content"}} onChange={(e)=>{settitle(e.target.value);}} value={comptitle}></input></div> <div className="section_heading__item heading_move_div" draggable="true" onDragStart={dragstartfunc} onDrag={ondragfunc} onDragEnd={dragendfunc}></div><div className="section_heading__item section_heading__buttons"><button className="up-arrow--button sectionbox--button" onClick={moveup}><Uparrow/></button><button className="down-arrow--button sectionbox--button" onClick={movedown}><Downarrow/></button><button className="settings-arrow--button sectionbox--button settings_icon" onClick={showsetting}><Settingsicon/></button></div> </div>
         
          {contentmaker(compData.idno)}

           <div className="section_form__item section_item__nextbutton" style={compData.addmore?{}:{display:"none"}}><button className="section_nextbutton__button" onClick={addchild}><Addicon/><span>Add another {compData.title}</span></button></div>
       {/* <button onClick={updateParent}>Save</button> */}
    </div></div>
  );
}

export default SectionBox;
 