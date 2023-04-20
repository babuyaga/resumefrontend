import Cookies from "js-cookie";
import {useState,useEffect,createContext,useContext} from "react";

import "./stylesheets/testimonial.css";



function Testimonial({name,pic,testimonial}) {

  return (
    <div className="testimonial-box">
      <div className="testimonial-pic"></div>
      <span>
        <h3>{name}</h3>
      <p>{testimonial}</p>
      </span>
  </div>
  );
}

export default Testimonial;
