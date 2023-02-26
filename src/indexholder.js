
import {useState,useEffect,createContext,useContext} from "react";
import {appuiContext} from "./App.js";
import "./indexholder.css";



function IndexHolder({itemindex}) {
const {hoveron,sethover} = useContext(appuiContext);
return <div className={`index_holder ${hoveron?"hoveron":""}`} onDragOver={()=>{sethover(true);}}>
<div className="index_highlight">{itemindex}</div>


</div> ;
}

export default IndexHolder;
