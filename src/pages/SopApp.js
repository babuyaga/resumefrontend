import "./stylesheets/sopapp.css";
import Downarrow from "../icons/Downarrow";
import { useNavigate } from "react-router-dom";

function SopApp() {
const navigate = useNavigate();


return (  <div className="sop-app-page"> 
<div className="sop-app-holder">
    <div className="sop-app-navbar">
    <div className="dashboard-back-button-holder--sop"><div className="dashboard-back-button-sop" onClick={()=>{navigate("/dashboard")}}><div><Downarrow/></div><span>Dashboard</span></div></div>
     <span><input value="Untitled SOP"></input></span>
     <div className="right-buttons--navbar">
     <button id="save-button-sopapp">Save</button>
     
     <button>Regenerate</button>
     <button>Download</button>
     </div>
    </div>
<textarea/>
 <div className="sop-app-footbar sop-app-navbar">
    <div className="right-buttons--navbar-footer">
         <button id="save-button-sopapp">Save</button>
     
         <button>Regenerate</button>
         <button>Download</button>
     </div>
 </div>
</div>
</div>);



}

export default SopApp;


