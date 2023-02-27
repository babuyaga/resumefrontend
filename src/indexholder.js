
import {useState,useEffect,createContext,useContext} from "react";
import {appuiContext} from "./App.js";
import "./indexholder.css";



function IndexHolder({itemindex}) {
const {hoveron,sethover,sethovindex} = useContext(appuiContext);
const [showon,setshowon] = useState(false);
return <div className={`index_holder ${showon?"hoveron":""}`} onMouseOver={()=>{}} onMouseLeave={()=>{setshowon(false);}} onDragOver={(e)=>{e.preventDefault(); setshowon(true);sethovindex(itemindex);}} onDragLeave={(e)=>{e.preventDefault();setshowon(false);}}  onDrop={(e)=>{e.preventDefault();setshowon(false);}}>
<div className={`index_highlight ${showon?"index_highlight2":""}`} ></div>


</div> ;
}

export default IndexHolder;
