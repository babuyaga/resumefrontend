import SectionBox from '../components/SectionBox.js';
import '../components/stylesheets/SectionBox.css';
import './stylesheets/App.css';
import ToastMessage from '../components/ToastMessage.js';
import {useState,useEffect,createContext,useContext,useRef} from "react";
import {getServer,saveData} from "../components/DataHolder.js";
import SettingBox from "../components/SettingBox.js";
import IndexHolder from '../components/indexholder.js';
import  "../stylesheets/light.css";
import  "../stylesheets/dark.css";
import Cookies from "js-cookie";
import { useParams } from 'react-router-dom';
import Downarrow from '../icons/Downarrow.js';
import {authContext} from "./Router.js";
import Trashicon from '../icons/Trashicon.js';
import axios from 'axios';
import SaveDoc from '../components/dashboard/SaveDoc.js';

export const appuiContext = createContext();


function App() {



const divRef = useRef(null);
const scrollRef = useRef(null);

useEffect(() => {
  const observer = new MutationObserver((mutations) => {
    // Handle changes to the div or its children here
    setChange(true);

  });

  if (divRef.current) {
    observer.observe(divRef.current, { subtree: true, childList: true });
 
  }

  return () => {
    observer.disconnect();
  };
}, [divRef]);






let getDataurl = "http://localhost:5000/newresume";
let saveUrl = 'http://localhost:5000/saveresume'; 





// const forlater=[
// {"title":"Work Experience","idno":4,"addmore":true},
// {"title":"Skills","idno":2,"addmore":true},
// {"title":"References","idno":1,"addmore":true},
// {"title":"Personal Projects","idno":5,"addmore":true},
// {"title":"Licenses and Certifications","idno":5,"addmore":true}];

const {showSave,setShowSave,setShowDelete,settoast} = useContext(authContext);
const [showset,setshowset] = useState({"display":false,"index":1});
 //saves the data used for each of the components in the app
const [theme,settheme] = useState(Cookies.get("theme") ||"light");
const [hoveron,sethover] = useState(false);
const [appval, setappval] = useState(false);
const [hoverindex,sethovindex] = useState(0);
const {resumeid} = useParams();
const  [resumetitle,settitle] = useState("Untitled Resume");
const [validTitle,setValid] = useState("Untitled Resume");
const [changed,setChange] = useState(false);
const openSetting=(e)=>{e.preventDefault();
  setshowset({"display":true,"index":appval.length,"navbar":true}); //if settings pop up is opened via the navbar and add section is clicked. Add the section at the very end by setting index as appval.length
}

useEffect(()=>{
 axios.get(`http://localhost:5000/api/getresume?r=${resumeid}`).then((res)=>{
  const data = JSON.parse(res.data.resume.value);
   setappval(data); 
   settitle(res.data.resume.resumename);
   setValid(res.data.resume.resumename);
})

},[]); 


const updateAppVal = (updatevalue,i,title,include)=>{

let tempval = [...appval];
tempval[i].value = updatevalue;
tempval[i].title= title;
tempval[i].include=include;
saveData(tempval,saveUrl,resumeid,resumetitle);
setappval(tempval); 
}


const updateappvalWhole = (updatevalue)=>{
  saveData(updatevalue,saveUrl,resumeid,resumetitle);
  setappval(updatevalue); 
}

const saveThis = ()=>{
  updateappvalWhole(appval);
}


const deleteAppval = (index) => {
let tempval = [...appval];
tempval.splice(index,1);
saveData(tempval,saveUrl,resumeid);
setappval(tempval);
}

const addAppval = (index,includeSOP) =>{
    let tempval = [...appval];
  
   const generateKey = (pre) => {

      function between(min, max) {  
       return Math.floor(
         Math.random() * (max - min + 1) + min
       )
      }
      return `${ pre }_${between(1,99999999)}_${ new Date().getTime() }`;
  }
   const resumeobj = {
      "title":"Added Section",
     "idno":6,
      "uniqueid":"",
     "addmore":false,
     "include":true,
     "includeSOP":includeSOP,
     "value":[{"description": "First Description"}]
     };

   resumeobj.uniqueid = generateKey(resumeobj.title);
   
  
      if(tempval.length<15){
            tempval.splice(index,0,resumeobj);
          }
           saveData(tempval,saveUrl,resumeid,resumetitle);
          setappval(tempval);
}
// const updateToast = (error)=>{ 
//         let tempmessage = toaststate.map((e)=>e);
//       if(tempmessage.length>3){
//              tempmessage = [];
//         }
//         tempmessage.push(error);
//         settoast(tempmessage);
//         } 


const reorder = (i,flag)=>{
  let tempval = appval.map((x)=>(x));


  if((flag)&&(i>0)){

    tempval[i-1] = appval[i];
  tempval[i]=appval[i-1];
  }
  else if ((!flag)&&(i<appval.length-1)){
  
    tempval[i+1] = appval[i];
    tempval[i]=appval[i+1];
  }


  saveData(tempval,saveUrl,resumeid);
  setappval(tempval);
}


const swaporder = (i,j)=>{

  let apparray = appval.map(e=>e);
  let temparray = appval.map(e=>e);
  let length = appval.length;
 
  let element;

     if((j>=0)&&(j<=length)&&((i+1)!=j)){
  if(j<i){ 
  temparray.splice(i,1);
  temparray.splice(j,0,apparray[i]);
  element = document.getElementById(`indexholder_${j}`);
  } else if(j>i){
    temparray.splice(j,0,apparray[i]);
    temparray.splice(i,1);
  element = document.getElementById(`sectionbox_${j-1}`);
  }
 }

   saveData(temparray,saveUrl,resumeid); 
   setappval(temparray);
   element.scrollIntoView();
}

const showDiscard = ()=>{
  if(changed){
    console.log(changed);
    setShowSave({name:resumetitle,type:"Resume"})
  }else{
    
  }
}

const contentMaker = (value)=>{
 return value.map((e,i)=> <div key={`div_${e.uniqueid}`}><IndexHolder sectionid={`indexholder_${i}`} itemindex={i} key={`index_${e.uniqueid}`} />   <SectionBox sectionid={`sectionbox_${i}`} compData={e} reorder={reorder} item={e.idno} key={e.uniqueid} /*{e.key}*/ index={i}  updateParentVal={updateAppVal} classname="section_box" /> {i===(appval.length-1)?<IndexHolder sectionid={`indexholder_${i+1}`}  key={`index_${e.uniqueid}_last`} itemindex={i+1}/>:""}</div>)
}



const deleteDoc=(e)=>{
  e.preventDefault();
  setShowDelete({id:resumeid,name:resumetitle,type:`resume`});
}



const titleChange = (e)=>{
  setValid(resumetitle);
  settitle(e.target.value);
}

const onTitleBlur = ()=>{
  if(resumetitle<6){
    settitle(validTitle);
  }else if(resumetitle>20){
    settitle(validTitle);
  }else{
    saveThis()
  }
}

const navBar = (type)=>{


if(type==="header"){

  return (   <div className="sop-app-navbar">
  <div className="dashboard-back-button-holder--sop"><div className="dashboard-back-button-sop" onClick={showDiscard}><div><Downarrow/></div><span>Dashboard</span></div></div>
   <span><input value={resumetitle} onChange={titleChange} onBlur={onTitleBlur}></input></span>
   <div className="right-buttons--navbar">
   <button id="save-button-sopapp" onClick={(e)=>{e.preventDefault(); saveThis()}}>Save</button>
   
   <button onClick={openSetting}>Add section</button>
   <button>Download</button>
   <button style={{"minWidth":"0"}} onClick={deleteDoc}><Trashicon/></button>
   </div>
  </div>);

}else if(type==="footer") {
  return <div className="sop-app-footbar sop-app-navbar">
  <div className="right-buttons--navbar-footer">
       <button id="save-button-sopapp">Save</button>
       <button>Download</button>
       <button style={{"minWidth":"0"}} onClick={deleteDoc}><Trashicon/></button>
   </div>
</div>  
}

}


return (<appuiContext.Provider value={{scrollRef,saveThis,updateappvalWhole,showset,setshowset,deleteAppval,addAppval,updateAppVal,appval,hoveron,sethover,swaporder,hoverindex,sethovindex,reorder}}>
  <div>   
  <SaveDoc/>
  {showset.display?<SettingBox/>:""} 


    <div className={`App ${theme}`} ref={divRef}>
     
    <form>
  
         <div style={{"display":"flex","flexDirection":"column","gap":"15px"}}>
<div className="dashboard-back-button-holder--app">
  
{navBar("header")}

  </div>
<div ><button onClick={(e)=>{e.preventDefault();console.log(appval);}}>Show app val</button>
  
              {appval?contentMaker(appval):""}

              </div>
          </div>
</form>
    </div>
    
    
    <div className="dashboard-back-button-holder--app">
  
{navBar("footer")}

  </div>
    
    </div>
    
    </appuiContext.Provider>);



}

export default App;


