import Uparrow from "./icons/Uparrow.js";
import Downarrow from "./icons/Downarrow.js";
import Settingsicon from "./icons/Settingsicon.js";
import Addicon from "./icons/Addicon.js";
import {useState,useEffect} from "react";
import getdataformat from "./DataHolder.js";
import "./navbar.css";

function NavBar({buttonsLeft,buttonsRight,logo}) {


  return (
    <div className="navbar_holder">
        <div className="logo"></div>
        <div className="left_button__holder">

        </div>
        <div className="right_button__holder">

        </div>
    </div>
  );
}

export default NavBar;
