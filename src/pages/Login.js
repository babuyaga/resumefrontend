import "./stylesheets/login.css";
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


function Login() {
const [checked,setchecked] = useState(false);
const {loginWithGoogle,authe,loginWithEmailAndPassword} = useContext(authContext);
const navigate = useNavigate();
const [displayName,setUserName] = useState( Cookies.get("displayName") || false);
const [userEmail,setUserEmail] = useState("");
const [userPassword,setUserPass] = useState("");
const [passwordError,setPassError] = useState("");
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


const onPasswordChange=(e)=>{
    setUserPass(e.target.value);
}


useEffect(()=>{
    if(authe){
        navigate("/dashboard");
    }
},[authe]);

const loginWithEandP =() =>{
loginWithEmailAndPassword(userEmail,userPassword);
}

return (  <div className="login-page"> 
                    <div className="login-box">
                    
                        <div className="login-box-partition">
                            <div className="login-box-partition--section partition-logo"><h2></h2></div>
                                <div className="login-box-partition--section partition-top">
                                    <div className="login-box-partition--section-holder">
                                        <span style={displayName?{}:{"display":"none"}}><h2>Hey {displayName},</h2>
                                        <p> Welcome back! Please enter your details.</p> 
                                        </span>
                                        <span style={displayName?{"display":"none"}:{}}><h2>Hey There!</h2>
                                        <p> Let's get started!</p> 
                                        </span>
                                        <button className="google-login--button" onClick={loginWithGoogle}> <Googleicon/> <span>Log in with Google</span> </button>
                                     
                                    </div>
                                </div>
<div className="or-holder"><hr></hr><p>or</p><hr></hr></div>
                                 <div className="login-box-partition--section partition-bottom"> 
                                     <div className="login-box-partition--section-holder">
                                        <form className="form-login"> 
                                        <input className="inputbox-login" type="email" value={userEmail} onBlur={validateEmail}  onChange={onEmailChange} name="email" placeholder="Email"/><span className="error-text-style">{emailError}</span>
                                        <input className="inputbox-login" type="password" value={userPassword} onChange={onPasswordChange}  name="password" placeholder="Password"/>
                                        <div className="checkboxholder-login"><div onClick={()=>{console.log("checked"); setchecked(!checked);}} className="login-checkbox--component"><input type="checkbox" name="remember me" checked={checked} className="checkbox-login"/><p>Remember me</p></div><span><p><Link to="/resetpassword">Forgot password</Link></p></span></div>
                                        </form>
                                        
                                        <button className="loginwithEmail-button" onClick={loginWithEandP}> Log in</button>
                                        <div className="finaltext--holder"><span>Don't have an account?</span><span className="Signuptext-login"> <Link to="/signup">Sign up for free</Link></span></div>
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

export default Login;