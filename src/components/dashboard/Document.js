import {useState,useEffect,useContext,createContext,useRef} from "react";
import {authContext} from "../../pages/Router";
import { useNavigate } from "react-router-dom";
import Trashicon from "../../icons/Trashicon";



function Document({docname,updatedAt,tags,docid,doctype}) {
const {showDelete,setShowDelete} = useContext(authContext);
const navigate= useNavigate();
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

const openDoc = ()=>{

if(doctype==="resume"){
        navigate(`/builder/resume/${docid}`);
}else{
        navigate(``);
}

}


console.log("Document called");
return (    <div className="item-documents-section--dashboard" onClick={openDoc}>
<div className="image-item-documents--dashboard"></div>
<div>
<div className="title-item-documents--dashboard"><span>{docname?docname:""}</span></div>
<div className="subtitle-item-documents--dashboard"><span>Last updated at {formattedTime?formattedTime:""}<br></br> {connector?connector:""} {formattedDate?formattedDate:""}</span></div>
<div className="tag-holder-item-documents--dashboard">
        {tags.length>1?tags.slice(0,2).map((e,i)=><div key={i} className="tags-document--dashboard"><span>{e}</span></div>):""}{tags.length>2?<div className="tags-left-document--dashboard"><span>+{tags.length-2}</span></div>:""}
        <div className="trashicon-documents--dashboard-desktop" onClick={()=>{setShowDelete({id:docid,name:docname,type:doctype})}}><Trashicon wi="19" hi="19"/></div>
</div>

</div>
<div className="trashicon-documents--dashboard-mobile" onClick={()=>{setShowDelete({id:docid,name:docname,type:doctype})}}><Trashicon/></div>
</div>
);



}

export default Document;