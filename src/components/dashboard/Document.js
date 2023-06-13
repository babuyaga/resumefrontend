import {useState,useEffect,useContext,createContext,useRef} from "react";
import {authContext} from "../../pages/Router";
import { useNavigate } from "react-router-dom";
import "./stylesheets/navbardash.css";

function Document({resumename,updatedAt,tags}) {
const dateTimeObj = new Date(updatedAt);
const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
let today = new Date();
today = today.toLocaleDateString();

let formattedDate = dateTimeObj.toLocaleDateString(options);
let connector = "on";

const formattedTime = dateTimeObj.toLocaleTimeString(options);
// if(formattedDate===today){
//         formattedDate= "Today";
//         connector="";

// }

console.log("Documetn called");
return (    <div className="item-documents-section--dashboard">
<div className="image-item-documents--dashboard"></div>
<div>
<div className="title-item-documents--dashboard"><span>{resumename?resumename:""}</span></div>
<div className="subtitle-item-documents--dashboard"><span>Last updated at {formattedTime?formattedTime:""}<br></br> {connector?connector:""} {formattedDate?formattedDate:""}</span></div>
<div className="tag-holder-item-documents--dashboard">
        {tags?tags.forEach((e,i)=>{<div className="tags-document--dashboard"><span>{e}</span></div>}):""}
</div>
</div>
</div>
);



}

export default Document;