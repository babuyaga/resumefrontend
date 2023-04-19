import "./landingpage.css";
import Googleicon from "../icons/Googleicon.js";
import Downarrow from "../icons/Downarrow.js";
import Uparrow from "../icons/Uparrow.js";
import Staricon from "../icons/Staricon.js";
import {useState,useEffect,useContext,createContext,useRef} from "react";
import {Link} from "react-router-dom";



function Landingpage() {
const [frame,setframe] = useState("frame-one");
const [pause,setpause] = useState(false);
const [index,setindex]= useState(0);
const frames = ["frame-one","frame-two","frame-three","frame-two"];

useEffect(() => {
    let i = index;
    const intervalId = setInterval(() => {
        if(!pause){
      setframe(frames[i]);
      console.log(frames[i]);
      i++;
      if(i===4){
        i=0;
      }
      setindex(i);
    }
    }, 2000);
    return () => clearInterval(intervalId);
  }, [pause]);




return (  
<div className="landing-page"> 
<div className="landing-page--section navbar"> </div>
    <div className="landing-page--container">
 
            <div className="landing-page--section hero-section section-flex--row">
                   <div className="hero-section--component hero-comp-one section-flex-col">
                     <span>
                    <h1>Building Digital Products,Brands & Experience</h1>
                     <p> Digital Agency is Your Online Team Management Tool That is Easy and Prompt</p>
                     
                     <button>Contact Us</button>
                     </span>
                   </div>
                   <div className="hero-section--component hero-comp-two section-flex-col"></div>
            </div> 
            <div className="landing-page--section trusted-brands--section section-flex--col">
                   <div className="brands-section--component brands-comp-one section-flex-col">
                      <div className="brands-section--title col-grow-box section-flex-row"><p>Trusted by 10,000+ Students across multiple agencies</p></div>
                      <div className="brands-section--icon  col-grow-box section-flex-row">
                                    <div className="brand-icons"></div>
                                    <div className="brand-icons"></div>
                                    <div className="brand-icons"></div>
                                    <div className="brand-icons"></div>
                                    <div className="brand-icons"></div>
                      </div>
                   </div>
                   
            </div> 
            <div className="landing-page--section services-section section-flex-col">
                <div className="services-section--maincomponent services-buttons"><button className={frame===frames[0]?"selected-button":""} onClick={()=>{setframe(frames[0]);}}></button><button className={frame===frames[1]?"selected-button":""}></button><button className={frame===frames[2]?"selected-button":""}></button></div>
                <div className="service-track-holder services-section--maincomponent">
                <div className={`carousel-track ${frame} ${pause}`} onMouseEnter={()=>{setpause(true)}} onMouseLeave={()=>{setpause(false)}}>
                       <div className="section-flex-row sop-writing--service services-section--component animation">
                           <div className="services-section-text">SOP WRiting Services1</div>
                           <div className="services-section-image sop-image"></div>                        
                        </div>
                       <div className="section-flex-row resume-generation-service services-section--component animation">
                           <div className="services-section-text">SOP WRiting Services2</div>
                           <div className="services-section-image resume-image"></div>                        
                        </div>
                       <div className="section-flex-row coverletter-generation-service services-section--component animation"> 
                           <div className="services-section-text">SOP WRiting Services3</div>
                           <div className="services-section-image cover-letter-image"></div>                        
                        </div>
                </div>
            </div> 
            </div> 
            <div className="landing-page--section testimonials-section section-flex-col">
            <div className="testimonial-section--component testimonial-title"><span><p>Read What Others Have To Say</p></span></div>
                        <div className="testimonial-section--component">
                                <div className="testimonial-box"></div>
                                <div className="testimonial-box"></div>
                                <div className="testimonial-box"></div>
                        </div>

            </div> 
            <div className="landing-page--section getstarted-section section-flex-col">
                         <div className="getstarted-section--component getstarted-image">

                        </div>
                
                        <div className="getstarted-section--component getstarter-text">
                            <div className="getstarted-section--subcomponent getstarted-title"><span><p>Be a part of the next big thing</p></span></div>
                            <div className="getstarted-section--subcomponent getstarted-subtitle"><span><p>We work with brands, startups, to SMEs. Colaborate for more impact and growth</p></span></div>
                            <button className="getstarted-section--subcomponent getstarted-button"> CONTACT US</button>
                        </div>
                       
            </div> 
            <div className="landing-page--section footer-section section-flex-col">
                        <div className="section-flex-row">
                        <div className="section-flex-col"></div>
                        <div className="section-flex-col"></div>
                        <div className="section-flex-col"></div>
                        </div>
                        <div className="section-flex-row"></div>

            </div> 
          
    </div>


    <div className="landing-page--section foobar"> </div>


</div>);



}

export default Landingpage;