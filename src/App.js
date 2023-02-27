import SectionBox from './SectionBox.js';
import './SectionBox.css';
import './App.css';
import ToastMessage from './ToastMessage.js';
import {useState,useEffect,createContext} from "react";
import './ToastMessage.css';
import NavBar from "./NavBar.js";
import {getServer,saveData} from "./DataHolder.js";
import SettingBox from "./SettingBox.js";
import IndexHolder from './indexholder.js';
import  "./light.css";
import  "./dark.css";
export const appuiContext = createContext();


function App() {


  let getDataurl = "http://localhost:5000/getresume";
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
const [theme,settheme] = useState("light");
const [hoveron,sethover] = useState(false);
const [appval, setappval] = useState(["init"]);
const [hoverindex,sethovindex] = useState(0);


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
setappval(tempval);
saveData(tempval,saveUrl);
}


const swaporder = (i,j)=>{

  let apparray = appval.map(e=>e);
  let temparray = appval.map(e=>e);
  let length = appval.length;
   if((j>=0)&&(j<=length)&&((i+1)!=j)){
 if(j<i){ 
temparray.splice(i,1);
temparray.splice(j,0,apparray[i]);
 }else if(j>i){
  temparray.splice(j+1,0,apparray[i]);
  temparray.splice(i,1);
 }
 console.log("apparrayog",apparray);
console.log("temparray",temparray);
setappval(temparray);
   }
}



const swaporder2 = (i,j)=>{

  let apparrayog = [0,1,2,3,4,5,6,7];
  let apparray = apparrayog.map(e=>e);
  let temparray = apparrayog.map(e=>e);
  let length = apparrayog.length;


  if((j>=0)&&(j<=length)&&((i+1)!=j)){
 if(j<i){ 
temparray.splice(i,1);
temparray.splice(j,0,apparray[i]);
 }else if(j>i){
  temparray.splice(j+1,0,apparray[i]);
  temparray.splice(i,1);
 }
}
console.log("apparrayog",apparrayog);
console.log("temparray",temparray);
}

const buttonclick = (e)=>{
  e.preventDefault();
  swaporder2(1,8);
}


const contentMaker = (value)=>{
 return value.map((e,i)=> <div><IndexHolder itemindex={i}/>   <SectionBox compData={e} reorder={reorder} item={e.idno} key={e.uniqueid} /*{e.key}*/ index={i}  updateParentVal={pushAppValclient}  errorFunc={(y)=>{updateToast(y)}} classname="section_box" /> </div>)
}

  


return (<appuiContext.Provider value={{showset,setshowset,deleteAppval,addAppval,appval,theme,settheme,hoveron,sethover,pushAppValclient,swaporder,hoverindex,sethovindex}}>
  <div>   <SettingBox/> 
    <div className={`App ${theme}`}>
       
   <NavBar/>
<button onClick={buttonclick}> Swap</button>
      <div  className="toastmessage_holder">  {toaststate.map((e,i)=><ToastMessage toastobject={e} key={i} index={i} type={e.messagetype}/>)} </div>
     
    <form>
         <div style={{"display":"flex","flexDirection":"column","gap":"15px"}}>

              {contentMaker(appval)}

          </div>
</form>
    </div></div>
    </appuiContext.Provider>);



}

export default App;


