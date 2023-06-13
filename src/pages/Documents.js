import "./stylesheets/dashboard.css";
import {useState,useEffect,useContext,createContext,useRef} from "react";
import {authContext} from "./Router.js";
import { useNavigate } from "react-router-dom";
import MenuDash from "../components/dashboard/MenuDash.js";
import NavbarDash from "../components/dashboard/NavbarDash.js";
import BannerDash from "../components/dashboard/BannerDash";
import Document from "../components/dashboard/Document";
import axios from "axios";


function Documents() {
const [checked,setchecked] = useState(false);
const {handleSignout,loginWithGoogle} = useContext(authContext);
const navigate = useNavigate();

const [docs,setdocs] = useState(["loading"]);
const contentMaker = (value)=>{
const html =  value.map((e,i)=> <Document resumename={e.resumename} updatedAt={e.updatedAt} tags={e.tags}/> );
return html;   
}


useEffect(()=>{
    axios.get("http://localhost:5000/api/getsops").then((res)=>{
        console.log("resumes",res.data.resumes);
        setdocs(res.data.resumes);
        });
},[])




return (  <div className="dashboard-page">
        
                <NavbarDash/>
                <div className="container-content--dashboard">
                        {/* <div className="menu-faux--dashboard component-content--dashboard"></div> */}
                        <MenuDash item="2"/>
                        
                        <div className="content-holder--dashboard component-content--dashboard">
                            <BannerDash/>
                        <br></br>
                            <div className="section-content-holder--dashboard documents-section--dashboard">
                                    <div className="component-documents-section--dashboard documents-section-title--dashboard"><span className="title-documents--section">Your Documents</span><span className="viewall-documents--section"></span></div>
                                    <div className="component-documents-section--dashboard documents-buttons--dashboard">
                                         <div className="buttons-documents-component" id="selected-button-document"><span>All</span></div>
                                         <div className="buttons-documents-component"><span>Resumes</span></div>
                                         <div className="buttons-documents-component"><span>SOPs</span></div>
                                         <div className="buttons-documents-component"><span>Cover Letters</span></div>

                                    </div>
                                    <div className="component-documents-section--dashboard documents-display-section--dashboard">
                                    {
                                       contentMaker(docs)
                                       }  
                                           
                                    <div className="documents-loading--dashboard"><span>Loading...</span></div>
                                     </div>
                            </div>
              
                        </div>
                  </div> 
                  <div className="foobar-general--dashboard">
                        <div className="foobar-component-container--dashboard"></div>
                </div>            
</div>);



}

export default Documents;