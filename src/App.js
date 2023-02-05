import SectionBox from './SectionBox.js';
import './SectionBox.css';
import './App.css';
import ToastMessage from './ToastMessage.js';
import {useState,useEffect} from "react";
import './ToastMessage.css';
import NavBar from "./NavBar.js";
import {getdataformat,sectionData,getServer,saveData} from "./DataHolder.js";

function App() {

  let getDataurl = "http://localhost:5000/getresume";
  let saveUrl = 'http://localhost:5000/saveresume';
  let error = {value:"This is the first error message",display:"block", messagetype:2};


const withhead = {"title":"Licenses and Certifications","idno":5,"addmore":true};
const withouthead = {"title":"Licenses and Certifications","idno":3,"addmore":true};


// const forlater=[
// {"title":"Work Experience","idno":4,"addmore":true},
// {"title":"Skills","idno":2,"addmore":true},
// {"title":"References","idno":1,"addmore":true},
// {"title":"Personal Projects","idno":5,"addmore":true},
// {"title":"Licenses and Certifications","idno":5,"addmore":true}];
  

const [toaststate,settoast] = useState([]); //saves the state of the toast message
const [appval, setappval] = useState([]); //saves the data used for each of the components in the app

useEffect(()=>{
  getServer(setappval,getDataurl);
},[]);

const pushAppVal= (compvalue,i)=>{
let tempval = [...appval];
tempval[i].value = compvalue;
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

console.log(appval);
console.log(appval);
return (
    <div className="App">
      <button onClick={()=>{console.log(typeof(appval));}}>View Parent Value</button>
   <NavBar/>
      <div  className="toastmessage_holder">  {toaststate.map((e,i)=><ToastMessage toastobject={e} key={i} index={i} type={e.messagetype}/>)} </div>
     
    <form>
{appval.map((e,i)=> <SectionBox compData={e} item={e.idno} key={i} /*{e.key}*/ index={i} parentvaluepass={setappval} updateParentVal={pushAppVal} errorFunc={(y)=>{updateToast(y)}}/> )}
</form>
{console.log("appval",appval)}
    </div>
  );
}

export default App;


