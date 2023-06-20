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
export const appuiContext = createContext();


function App() {

const {showSave,setShowSave} = useContext(authContext);

const divRef = useRef(null);

useEffect(() => {
  const observer = new MutationObserver((mutations) => {
    // Handle changes to the div or its children here
    console.log('Changes detected:', mutations);
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


const [toaststate,settoast] = useState([]); //saves the state of the toast message
const [showset,setshowset] = useState({"display":false,"index":1});
 //saves the data used for each of the components in the app
const [theme,settheme] = useState(Cookies.get("theme") ||"light");
const [hoveron,sethover] = useState(false);
const [appval, setappval] = useState(["init"]);
const [hoverindex,sethovindex] = useState(0);
const {resumeid} = useParams();

const openSetting=(e)=>{e.preventDefault();
  setshowset({"display":true,"index":appval.length,"navbar":true}); //if settings pop up is opened via the navbar and add section is clicked. Add the section at the very end by setting index as appval.length
}

useEffect(()=>{
 axios.get(`http://localhost:5000/api/getresume?r=${resumeid}`).then((res)=>{
  console.log(res.data.resume.value);
  const data = JSON.parse(res.data.resume.value);
   setappval(data); 
})

},[]); 

const updateAppVal = (updatevalue,i,title,include)=>{
  console.log(include);
let tempval = [...appval];
tempval[i].value = updatevalue;
tempval[i].title= title;
tempval[i].include=include;
saveData(tempval,saveUrl);
setappval(tempval); 
console.log("Client pushed Appval", appval);
}


const deleteAppval = (index) => {
let tempval = [...appval];
tempval.splice(index,1);
saveData(tempval,saveUrl);
setappval(tempval);
}

const addAppval = (index) =>{
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
      "uniqueid":"adfasdfasdfasdfasdf",
     "addmore":false,
     "include":true,
     "value":[{"description": "First Description"}]
     };

   resumeobj.uniqueid = generateKey(resumeobj.title);
   
      console.log("function called at ", index );
      if(tempval.length<15){
            tempval.splice(index,0,resumeobj);
          }
           saveData(tempval,saveUrl);
          setappval(tempval);
}

const updateToast = (error)=>{ 
        let tempmessage = toaststate.map((e)=>e);
      if(tempmessage.length>3){
             tempmessage = [];
        }
        tempmessage.push(error);
        settoast(tempmessage);
        } 


const reorder = (i,flag)=>{
  let tempval = appval.map((x)=>(x));
  console.log("before reorder",appval);

  if((flag)&&(i>0)){
    console.log("Up");
    tempval[i-1] = appval[i];
  tempval[i]=appval[i-1];
  }
  else if ((!flag)&&(i<appval.length-1)){
    console.log("Down");
    tempval[i+1] = appval[i];
    tempval[i]=appval[i+1];
  }

  console.log("after reorder",tempval);
  saveData(tempval,saveUrl);
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

   saveData(temparray,saveUrl); 
   setappval(temparray);
   console.log("element",element);
   element.scrollIntoView();
}



const contentMaker = (value)=>{
 return value.map((e,i)=> <div><IndexHolder sectionid={`indexholder_${i}`} itemindex={i}/>   <SectionBox sectionid={`sectionbox_${i}`} compData={e} reorder={reorder} item={e.idno} key={e.uniqueid} /*{e.key}*/ index={i}  updateParentVal={updateAppVal} classname="section_box" /> {i===(appval.length-1)?<IndexHolder sectionid={`indexholder_${i+1}`} itemindex={i+1}/>:""}</div>)
}

const navBar = (type)=>{


if(type==="header"){

  return (   <div className="sop-app-navbar">
  <div className="dashboard-back-button-holder--sop"><div className="dashboard-back-button-sop" onClick={()=>{setShowSave(true)}}><div><Downarrow/></div><span>Dashboard</span></div></div>
   <span><input value="Untitled SOP"></input></span>
   <div className="right-buttons--navbar">
   <button id="save-button-sopapp">Save</button>
   
   <button onClick={openSetting}>Add section</button>
   <button>Download</button>
   <button style={{"min-width":"0"}}><Trashicon/></button>
   </div>
  </div>);

}else if(type==="footer") {
  return <div className="sop-app-footbar sop-app-navbar">
  <div className="right-buttons--navbar-footer">
       <button id="save-button-sopapp">Save</button>
   
       <button>Regenerate</button>
       <button>Download</button>
       <button style={{"min-width":"0"}}><Trashicon/></button>
   </div>
</div>  
}

}


return (<appuiContext.Provider value={{showset,setshowset,deleteAppval,addAppval,updateAppVal,appval,hoveron,sethover,swaporder,hoverindex,sethovindex,reorder}}>
  <div>   <SettingBox/> 

    <div className={`App ${theme}`}>
     
    <form>
    <button onClick={(e)=>{e.preventDefault();console.log(appval)}}>Show App Val</button>
         <div style={{"display":"flex","flexDirection":"column","gap":"15px"}}>
<div className="dashboard-back-button-holder--app">
  
{navBar("header")}

  </div>
<div ref={divRef}>
  
              {contentMaker(appval)}
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


