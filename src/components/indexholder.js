
import {useState,useEffect,createContext,useContext,useRef} from "react";
import {appuiContext} from "../pages/App.js";
import "./stylesheets/indexholder.css";



function IndexHolder({itemindex,sectionid}) {
const {hoveron,sethover,sethovindex} = useContext(appuiContext);
const [showon,setshowon] = useState(false);
const indexref = useRef();
return <div id={sectionid} ref={indexref} className={`index_holder ${showon?"hoveron":""}`} onMouseOver={()=>{}} onMouseLeave={()=>{setshowon(false);}} onDragOver={(e)=>{e.preventDefault(); setshowon(true);sethovindex(itemindex);}} onDragLeave={(e)=>{e.preventDefault();setshowon(false);}}  onDrop={(e)=>{e.preventDefault(); setshowon(false);}}>
<div className={`index_highlight ${showon?"index_highlight2":""}`} ></div>


</div> ;
}

export default IndexHolder;
