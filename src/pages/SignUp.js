import "./signup.css";
import Googleicon from "../icons/Googleicon.js";
import Staricon from "../icons/Staricon.js";
import {useState,useEffect,useContext,createContext,useRef} from "react";
import {Link} from "react-router-dom";
import {authContext} from "./Router.js";
import Downarrow from "../icons/Downarrow.js";
import Uparrow from "../icons/Uparrow.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function SignUp() {
const [checked,setchecked] = useState(false);
const {createUserEmail,authe,loginWithGoogle,SignUperror} = useContext(authContext);
const [userEmail,setUserEmail] = useState("");
const [userPassword,setUserPass] = useState("");
const [userName,setUserName] = useState("");

const navigate = useNavigate();

const onUserNameChange=(e)=>{
    setUserName(e.target.value);
    }

const onEmailChange=(e)=>{
    setUserEmail(e.target.value);
    }
    
    const onPasswordChange=(e)=>{
        setUserPass(e.target.value);
    }

    useEffect(()=>{
        if(authe){
            navigate("/dashboard");
        }
    },[authe])


 const SignupWithEandP =()=>{
   axios.post("http://localhost:5000/api/newuser",{
    userDetails:{email:userEmail,
    password:userPassword,
    username:userName
 }}).then(()=>{
     navigate("/login")}
   );
        }

return (  <div className="signup-page"> 
                    <div className="signup-box signup-box">
                    
                        <div className="signup-box-partition">
                        <div className="signup-box-partition--section partition-logo"><h2></h2></div>
                                <div className="signup-box-partition--section partition-top">
                                    <div className="signup-box-partition--section-holder">
                                        <h2>Hey there,</h2>
                                        <p> We need some of your details.</p> 
                                        <button className="google-login--button" onClick={loginWithGoogle}> <Googleicon/> <span>Sign up with Google</span> </button>
                                     
                                    </div>
                                </div>
<div className="or-holder"><hr></hr><p>or</p><hr></hr></div>
                                 <div className="signup-box-partition--section partition-bottom"> 
                                     <div className="signup-box-partition--section-holder">
                                        <form className="form-signup"> 
                                        <input className="inputbox-signup" type="text" name="username" value={userName} onChange={onUserNameChange} placeholder="Name"/>
                                        <input className="inputbox-signup"  type="email" value={userEmail} onChange={onEmailChange} name="email" placeholder="Email"/>
                                        <input className="inputbox-signup" type="password" value={userPassword} onChange={onPasswordChange}  name="password" placeholder="Password"/>
                                        </form>
                                        
                                        <button className="loginwithEmail-button" onClick={SignupWithEandP}> Sign up</button>
                                        <span>{SignUperror}</span>
                                        <div className="finaltext--holder"><span>Already have an account?</span><span className="Signuptext-login"> <Link to="/login">Click here to log in</Link></span></div>
                                   <br></br>
                                    </div>
                                </div>
                        </div>
                        <div className="signup-box-partition ">
                            <div className="imageside-signup">
                                <div className="signup-box-partition--section reviewtext ">
                                <span>
                                        <h2>ResumoGusthi helped masdf asdfa asdfa sdfa a fasdfas df adsfadsf dafasd afdsfads</h2>
                                        <div className="name-credential--arrows-signup">
                                            <div className="review-stars--signup"><span className="reviewer-name">Sophie Hall</span> <span className="reviewer-cred">Student, Canada</span></div>
                                            <div className="review-stars--signup"><div className="stars-buttons--signup-item stars--signuppage" ><Staricon/><Staricon/><Staricon/><Staricon/><Staricon/></div> <div className="stars-buttons--signup-item"><button className="carousel-scroll--button"><Downarrow/></button><button className="carousel-scroll--button"><Uparrow/></button></div></div>
                                        </div>
                                    </span>
                                </div>
                            </div>    
                        </div>

                    </div>
</div>);



}

export default SignUp;