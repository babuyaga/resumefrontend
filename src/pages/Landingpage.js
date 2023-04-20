import "./landingpage.css";
import Googleicon from "../icons/Googleicon.js";
import Downarrow from "../icons/Downarrow.js";
import Uparrow from "../icons/Uparrow.js";
import {useState,useEffect,useContext,createContext,useRef} from "react";
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Testimonial from "../components/Testimonial";


function Landingpage() {
const [frame,setframe] = useState("frame-one");
const [Tframe,setTframe] = useState("")
const [pause,setpause] = useState(false);
const [index,setindex]= useState(0);
const tframes = ["","t-frame-one","t-frame-two","t-frame-three","t-frame-four","t-frame-zero"];
const frames = ["frame-one","frame-two","frame-three","frame-two"];
const navigate = useNavigate();

const getStarted = ()=>{
  navigate('/signup');
}
const resumeBuilder = ()=>{
  navigate('/resumeBuilder');
}
const sopWriter = ()=>{
  navigate('/sopWriting');
}

const coverLetter = ()=>{
  navigate('/coverLetter');
}

useEffect(() => {
    let i = index;
    const intervalId = setInterval(() => {
        if(!pause){
      setframe(frames[i]);
     
      i++;
      if(i===4){
        i=0;
      }
      setindex(i);
    }
    }, 2000);
    return () => clearInterval(intervalId);
  }, [pause]);


const moveright = ()=>{
  console.log(Tframe);
if(Tframe===tframes[0]){
  setTframe(tframes[1]);
} else if(Tframe===tframes[1]){
  setTframe(tframes[2]);
} else if(Tframe===tframes[2]){
  setTframe(tframes[3]);
  setTimeout(() => {
    setTframe(tframes[0]);  
  }, 950);
}else if(Tframe===tframes[3]){
  setTframe(tframes[0]);
}
console.log(Tframe);
}

const moveleft = ()=>{
  console.log(Tframe);
  if(Tframe===tframes[0]){
    setTframe(tframes[4]);
    setTimeout(() => {
      setTframe(tframes[2]);  
    }, 1);   
  } else if(Tframe===tframes[2]){
    setTframe(tframes[1]);
  } else if(Tframe===tframes[1]){
    setTframe(tframes[5]);
    setTimeout(() => {
      setTframe(tframes[0]);  
    }, 1000); 
  }
  console.log(Tframe);
  }
  


return (  
<div className="landing-page"> 
<div className="landing-page--section navbar"> </div>
    <div className="landing-page--container">
 
            <div className="landing-page--section hero-section section-flex--row">
                   <div className="hero-section--component hero-comp-one section-flex-col">
                     <span className="hero-section-span">
                    <h1>Expert SOPs & Resumes for VISA Application</h1>
                    
                     <h3>Instant SOP generation or schedule <br></br>a one-on-one call. Get started now!</h3>
                     
                     <button className="hero-get-started" onClick={getStarted}>Get Started</button>
                     <p> Get expertly crafted SOPs for VISA applications, along with professional resumes, cover letters, and a 3-day trial to create and download a resume. </p>
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
            <div className="services-section--maincomponent"><h1>Our Services</h1></div>
            <div className="service-track-holder services-section--maincomponent">
                <div className={`carousel-track ${frame} ${pause}`} >
                       <div className="section-flex-row sop-writing--service services-section--component animation">
                           <div className="services-section-text" onMouseEnter={()=>{setpause(true)}} onMouseLeave={()=>{setpause(false)}}>
                              <span>
                                <h1>Statement Of Purpose</h1>
                                <p> Commonly Used in the Graphic, Print & Publishing Industries for previewing Visual layout and Mockup for previewing Visual layout and Mockup</p>
                              </span>
                            </div>
                           
                           <div className="services-section-image sop-image" onMouseEnter={()=>{setpause(true)}} onMouseLeave={()=>{setpause(false)}}></div>                        
                        </div>
                       <div className="section-flex-row resume-generation-service services-section--component animation">
                           <div className="services-section-text" onMouseEnter={()=>{setpause(true)}} onMouseLeave={()=>{setpause(false)}}> <span>
                                <h1>Resume Making</h1>
                                <p> Commonly Used in the Graphic, Print & Publishing Industries for previewing Visual layout and Mockup for previewing Visual layout and Mockup</p>
                              </span>
                            </div>
                           <div className="services-section-image resume-image" onMouseEnter={()=>{setpause(true)}} onMouseLeave={()=>{setpause(false)}}></div>                        
                        </div>
                       <div className="section-flex-row coverletter-generation-service services-section--component animation"> 
                           <div className="services-section-text" onMouseEnter={()=>{setpause(true)}} onMouseLeave={()=>{setpause(false)}}> <span>
                                <h1>Cover Letter Writting</h1>
                                <p> Commonly Used in the Graphic, Print & Publishing Industries for previewing Visual layout and Mockup for previewing Visual layout and Mockup</p>
                              </span>
                            </div>
                           <div className="services-section-image cover-letter-image" onMouseEnter={()=>{setpause(true)}} onMouseLeave={()=>{setpause(false)}}></div>                        
                        </div>
                </div>
            </div> 
            <div className="services-section--maincomponent services-buttons"><button className={frame===frames[0]?"selected-button":""} onMouseEnter={()=>{setpause(true)}} onMouseLeave={()=>{setpause(false)}} onClick={()=>{setframe(frames[0]);}}></button><button onMouseEnter={()=>{setpause(true)}} onMouseLeave={()=>{setpause(false)}} className={frame===frames[1]?"selected-button":""} onClick={()=>{setframe(frames[1]);}}></button><button onMouseEnter={()=>{setpause(true)}} onMouseLeave={()=>{setpause(false)}} className={frame===frames[2]?"selected-button":""} onClick={()=>{setframe(frames[2]);}}></button></div>
            </div> 
            <div className="landing-page--section testimonials-section section-flex-col">
            <div className="testimonial-section--component testimonial-title"><span><p>Testimonials</p></span></div>
                        <div className="three-card-carousel">
                        <div className="round-carousel-button testimonial-button-left" onClick={()=>{moveleft();}}><Downarrow/></div>       
                        <div className="testimonial-section--component">
                            <div className={`testimonial-carousel-track ${Tframe}`}>
                                <div>
                                <Testimonial name="Parvathy9" testimonial="Helloooooo"/>
                                <Testimonial name="Parvathy1" testimonial="Helloooooo"/>
                                <Testimonial name="Parvathy2" testimonial="Helloooooo"/>
                                <Testimonial name="Parvathy3" testimonial="Helloooooo"/>
                                </div> 
                                <div>
                                <Testimonial name="Parvathy4" testimonial="Helloooooo"/>
                                <Testimonial name="Parvathy5" testimonial="Helloooooo"/>
                                <Testimonial name="Parvathy6" testimonial="Helloooooo"/>
                                </div>
                                <div>
                                <Testimonial name="Parvathy7" testimonial="Helloooooo"/>
                                <Testimonial name="Parvathy8" testimonial="Helloooooo"/>
                                <Testimonial name="Parvathy9" testimonial="Helloooooo"/>
                                </div>
                                <div>
                                <Testimonial name="Parvathy1" testimonial="Helloooooo"/>
                                <Testimonial name="Parvathy2" testimonial="Helloooooo"/>
                                <Testimonial name="Parvathy3" testimonial="Helloooooo"/>
                                <Testimonial name="Parvathy4" testimonial="Helloooooo"/>
                                </div>
                            </div>
                           
                        </div>
                        <div className="round-carousel-button testimonial-button-right" onClick={()=>{moveright();}}><Uparrow/></div>      
                    </div>

            </div> 
            <div className="landing-page--section getstarted-section section-flex-col">
                         <div className="getstarted-section--component getstarted-image">

                        </div>
                
                        <div className="getstarted-section--component getstarter-text">
                            <div className="getstarted-section--subcomponent getstarted-title"><span><p>We'll help you migrate!</p></span></div>
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