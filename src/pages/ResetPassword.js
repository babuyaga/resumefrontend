import "./resetpassword.css";
import Googleicon from "../icons/Googleicon.js";
import Downarrow from "../icons/Downarrow.js";
import Uparrow from "../icons/Uparrow.js";
import Staricon from "../icons/Staricon.js";
import Eyeopen from "../icons/Eyeopen.js";
import {useState,useEffect,useContext,createContext,useRef} from "react";
import {Link} from "react-router-dom";
import {authContext} from "./Router.js";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';

function ResetPassword() {
const [checked,setchecked] = useState(false);
const {loginWithGoogle,authe,loginWithEmailAndPassword} = useContext(authContext);
const navigate = useNavigate();
const [userEmail,setUserEmail] = useState("");
const [emailError,setEmailError] = useState(false);


const onEmailChange=(e)=>{
setUserEmail(e.target.value);
console.log(userEmail);
if(emailError){
    validateEmail();
}

}


const validateEmail = ()=>{
    const flag= /\S+@\S+\.\S+/.test(userEmail);
    if(!flag&&(userEmail)){
         setEmailError("Please enter a valid email");
    }else{
        setEmailError(false);
    }
}


useEffect(()=>{
    if(authe){
        navigate("/dashboard");
    }
},[authe])

const sendResetEmail =()=>{

}

return (  <div className="login-page"> 
                    <div className="login-box">
                    
                        <div className="login-box-partition">
                            <div className="login-box-partition--section partition-logo"><h2></h2></div>
                                <div className="login-box-partition--section partition-top">
                             
                                </div>

                                 <div className="login-box-partition--section partition-bottom"> 
                                     <div className="login-box-partition--section-holder">
                                        <form className="form-login"> 
                                        <input className="inputbox-login" type="email" value={userEmail} onBlur={validateEmail}  onChange={onEmailChange} name="email" placeholder="Email"/><span className="error-text-style">{emailError}</span>

                                       
                                        </form>
                                        
                                        <button className="loginwithEmail-button" onClick={sendResetEmail}> Reset Password</button>
                                        <div className="finaltext--holder"><span>Password reset email sent!</span><span className="Signuptext-login"> <Link to="/login">Login</Link></span></div>
                                    </div>
                                    <br></br>
                                </div>
                        </div>
                        <div className="login-box-partition">
                            <div className="imageside">
                                <div className="login-box-partition--section reviewtext">
                                    <span>
                                        <h2>ResumoGusthi helped masdf asdfa asdfa sdfa a fasdfas df adsfadsf dafasd afdsfads</h2>
                                        <div className="name-credential--arrows-login">
                                            <div className="review-stars--login"><span className="reviewer-name">Sophie Hall</span> <span className="reviewer-cred">Student, Canada</span></div>
                                            <div className="review-stars--login"><div className="stars-buttons--login-item stars--loginpage" ><Staricon/><Staricon/><Staricon/><Staricon/><Staricon/></div> <div className="stars-buttons--login-item"><button className="carousel-scroll--button"><Downarrow/></button><button className="carousel-scroll--button"><Uparrow/></button></div></div>
                                      
                                        </div>
                                    </span>
                                </div>
                            </div>    
                        </div>

                    </div>
</div>);



}

export default ResetPassword;