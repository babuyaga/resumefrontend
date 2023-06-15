import SectionBox from '../components/SectionBox.js';
import '../components/stylesheets/SectionBox.css';
import './stylesheets/App.css';
import ToastMessage from '../components/ToastMessage.js';
import {useState,useEffect,createContext} from "react";
import NavBar from "../components/NavBar.js";
import {getServer,saveData} from "../components/DataHolder.js";
import SettingBox from "../components/SettingBox.js";
import IndexHolder from '../components/indexholder.js';
import  "../stylesheets/light.css";
import  "../stylesheets/dark.css";
import Cookies from "js-cookie";
import { useNavigate,useParams } from "react-router-dom";
import Downarrow from '../icons/Downarrow.js';



export const appuiContext = createContext();


function App() {
//   const { linkid } = useParams();
// console.log(linkid);

  let getDataurl = "http://localhost:5000/newresume";
  let saveUrl = 'http://localhost:5000/saveresume'; 
// const forlater=[
// {"title":"Work Experience","idno":4,"addmore":true},
// {"title":"Skills","idno":2,"addmore":true},
// {"title":"References","idno":1,"addmore":true},
// {"title":"Personal Projects","idno":5,"addmore":true},
// {"title":"Licenses and Certifications","idno":5,"addmore":true}];
const navigate = useNavigate();  

const [toaststate,settoast] = useState([]); //saves the state of the toast message
const [showset,setshowset] = useState({"display":false,"index":1});
 //saves the data used for each of the components in the app
const [theme,settheme] = useState(Cookies.get("theme") ||"light");
const [hoveron,sethover] = useState(false);
const [appval, setappval] = useState(["init"]);
const [hoverindex,sethovindex] = useState(0);
const openSetting=(e)=>{e.preventDefault();
  setshowset({"display":true,"index":appval.length,"navbar":true}); //if settings pop up is opened via the navbar and add section is clicked. Add the section at the very end by setting index as appval.length
}

useEffect(()=>{
  getServer(setappval,getDataurl);
},[]); 

const pushAppValclient = (updatevalue,i,title,include)=>{
  console.log(include);
let tempval = [...appval];
tempval[i].value = updatevalue;
tempval[i].title= title;
tempval[i].include=include;
saveData(tempval,saveUrl);
setappval(tempval); 
console.log("Client pushed Appval", appval);
}

const blanksave= (updatedarray)=>{
  saveData(updatedarray,saveUrl);
  setappval(updatedarray); 
  
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
 }else if(j>i){
  temparray.splice(j,0,apparray[i]);
  temparray.splice(i,1);
  element = document.getElementById(`sectionbox_${j-1}`);
 }
 console.log("apparrayog",apparray);
console.log("temparray",temparray);

   }

   saveData(temparray,saveUrl); 
   setappval(temparray);
   console.log("element",element);
   element.scrollIntoView();
}


// const swaporder2 = (i,j)=>{

//   let apparrayog = [0,1,2,3,4,5,6,7];
//   let apparray = apparrayog.map(e=>e);
//   let temparray = apparrayog.map(e=>e);
//   let length = apparrayog.length;


//   if((j>=0)&&(j<=length)&&((i+1)!=j)){
//  if(j<i){ 
// temparray.splice(i,1);
// temparray.splice(j,0,apparray[i]);
//  }else if(j>i){
//   temparray.splice(j+1,0,apparray[i]);
//   temparray.splice(i,1);
//  }
// }



// }



const contentMaker = (value)=>{
 return value.map((e,i)=> <div><IndexHolder sectionid={`indexholder_${i}`} itemindex={i}/>   <SectionBox sectionid={`sectionbox_${i}`} compData={e} reorder={reorder} item={e.idno} key={e.uniqueid} /*{e.key}*/ index={i}  updateParentVal={pushAppValclient}  errorFunc={(y)=>{updateToast(y)}} classname="section_box" /> {i===(appval.length-1)?<IndexHolder sectionid={`indexholder_${i+1}`} itemindex={i+1}/>:""}</div>)
}

const navBar = ()=>{
  return (   <div className="sop-app-navbar">
  <div className="dashboard-back-button-holder--sop"><div className="dashboard-back-button-sop" onClick={()=>{navigate("/dashboard")}}><div><Downarrow/></div><span>Dashboard</span></div></div>
   <span><input value="Untitled SOP"></input></span>
   <div className="right-buttons--navbar">
   <button id="save-button-sopapp">Save</button>
   
   <button onClick={openSetting}>Add section</button>
   <button>Download</button>
   </div>
  </div>);
}


return (<appuiContext.Provider value={{showset,setshowset,deleteAppval,addAppval,appval,theme,settheme,hoveron,sethover,pushAppValclient,swaporder,hoverindex,sethovindex}}>
  <div>   <SettingBox/> 
    <div className={`App ${theme}`}>

  
      <div  className="toastmessage_holder">  {toaststate.map((e,i)=><ToastMessage toastobject={e} key={i} index={i} type={e.messagetype}/>)} </div>
     
    <form>
         <div style={{"display":"flex","flexDirection":"column","gap":"15px"}}>
<div className="dashboard-back-button-holder--app">
  
{navBar()}

  </div>

              {contentMaker(appval)}

          </div>
</form>
    </div>
    
    
    <div className="dashboard-back-button-holder--app">
  
{navBar()}

  </div>
    
    </div>
    
    </appuiContext.Provider>);



}

export default App;


