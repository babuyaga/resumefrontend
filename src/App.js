import SectionBox from './SectionBox.js';
import './SectionBox.css';
import './App.css';
import ToastMessage from './ToastMessage.js';
import {useState,useEffect,createContext} from "react";
import './ToastMessage.css';
import NavBar from "./NavBar.js";
import {getServer,saveData} from "./DataHolder.js";
import SettingBox from "./SettingBox.js";

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
const [showset,setshowset] = useState(false);
const [appval, setappval] = useState([]); //saves the data used for each of the components in the app



useEffect(()=>{
  getServer(setappval,getDataurl);
},[]); 

const pushAppVal= (updatevalue,i,title,include)=>{

  console.log(include);
let tempval = [...appval];
tempval[i].value = updatevalue;
tempval[i].title= title;
tempval[i].include=include;
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


const updateSettingUI = (flag)=>{
setshowset(flag);
}



const contentMaker = (value)=>{
 return value.map((e,i)=> <SectionBox compData={e} reorder={reorder} item={e.idno} key={e.uniqueid} /*{e.key}*/ index={i}  updateParentVal={pushAppVal}  errorFunc={(y)=>{updateToast(y)}} classname="section_box" /> )
}

  


return (<appuiContext.Provider value={{showset,setshowset}}>
  <div>   <SettingBox/> 
    <div className="App">
       
   <NavBar/>

      <div  className="toastmessage_holder">  {toaststate.map((e,i)=><ToastMessage toastobject={e} key={i} index={i} type={e.messagetype}/>)} </div>
     
    <form>

{contentMaker(appval)}
</form>

    </div></div>
    </appuiContext.Provider>);



}

export default App;


