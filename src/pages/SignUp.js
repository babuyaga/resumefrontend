import "./signup.css";
import Googleicon from "../icons/Googleicon.js";

import {useState,useEffect,useContext,createContext,useRef} from "react";
import {Link} from "react-router-dom";
import {authContext} from "./Router.js";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loadericon from "../icons/Loadericon.js";

axios.defaults.withCredentials = true;
const passwordValidator = require('password-validator');


function SignUp() {
const {createUserEmail,authe,loginWithGoogle,SignUperror} = useContext(authContext);
const [userEmail,setUserEmail] = useState("");
const [emailError,setEmailError] = useState(true);
const [userPassword,setUserPass] = useState("");
const [cnfPassword,setCnfPass] = useState("");
const [passwordError,setPassError] = useState({message:"",code:false,color:"black"});
const [cnfpasswordError,setcnfPassError] = useState({message:"",code:false,color:"black"});
const [userName,setUserName] = useState("");
const [submitStatus,setSubmitStatus] = useState({message:"",code:false,color:"Red"});


const navigate = useNavigate();

const onEmailChange=(e)=>{
    setUserEmail(e.target.value);
    console.log(userEmail);
   
        validateEmail(e.target.value);
   
    
    if(submitStatus){
       setSubmitStatus({message:false,action:false,code:false});
    }
    console.log(emailError);
    }
    
    
    const validateEmail = (email)=>{
        const flag= /\S+@\S+\.\S+/.test(email);
        if(!flag){
             setEmailError("Please enter a valid email");
        }else{
            setEmailError(false);
        }
    }


const validatePassword= (pswd,flag)=>{
    var passwordSchema = new passwordValidator();    
    passwordSchema
    .is().min(8,"Password should contain atleast 8 characters")
    .is().max(70,"Password can't be more than 70 characters")
    .is().uppercase(1,"Password should contain atleast ONE uppercase letter")
    .is().lowercase(1,"Password should contain atleast ONE lowercase letter")
    .is().digits(1,"Password should contain atleast 1 number")
    if(flag){
        return passwordSchema.validate(pswd,{details:true});
    }
    return passwordSchema.validate(pswd);
    }

    const displayValidation = (item)=>{
        if(item){
            return item.map((e,i)=><span>{(e.message)}</span>);
        }
    }

const onPasswordChange=(e)=>{
        setUserPass(e.target.value);
        var details = validatePassword(e.target.value,true);
        if(validatePassword(e.target.value)){
            setPassError({message:"This works",details:details,code:false,color:"green"});   
                if((cnfPassword===e.target.value)&&(cnfPassword!="")){
                   setSubmitStatus({message:"",code:true,color:"Green"});
                   setcnfPassError({message:"Passwords match",code:false,color:"Green"}); 
                }else{
                    setSubmitStatus({message:"",code:false,color:"Red"});
                }

                

            }else{
                setPassError({message:"Weak Password",details:details,code:true,color:"red"});  
                if(e.target.value===""){
                    setPassError({message:"Field cannot be empty",details:details,code:true,color:"red"});
                } 
                 }
    }


const onCnfPasswordChange=(e)=>{
    setCnfPass(e.target.value);

    if((e.target.value===userPassword)&&(e.target.value!="")&&validatePassword(userPassword)){
        setcnfPassError({message:"Passwords match",code:false,color:"Green"});   
        setSubmitStatus({message:"",code:true,color:"Green"});
  
     
    }else{
        setSubmitStatus({message:"",code:false,color:"Red"});

        if((e.target.value!=userPassword)){
            setcnfPassError({message:"Passwords don't match",code:false,color:"red"});   
         }else{
             setSubmitStatus({message:"",code:false,color:"Red"});
             setcnfPassError({message:"Passwords match",code:false,color:"Green"}); 
         }

         if(e.target.value===""){
            setcnfPassError({message:"Field cannot be empty",code:false,color:"red"});
        } 

     }

}



const onUserNameChange=(e)=>{
    setUserName(e.target.value);
    }











    useEffect(()=>{
        if(authe){
            navigate("/dashboard");
        }
    },[authe])


 const SignupWithEandP =()=>{
console.log("Clicked");
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
<Loadericon/>
                                 <div className="signup-box-partition--section partition-bottom"> 
                                     <div className="signup-box-partition--section-holder">

                                        <form className="form-signup"> 
                                        <input className="inputbox-signup" type="text" name="username" value={userName} onChange={onUserNameChange} placeholder="Name"/>
                                        <input className="inputbox-signup"  type="email" value={userEmail} onChange={onEmailChange} name="email" placeholder="Email"/>{emailError}
                                        <input className="inputbox-signup" type="password" value={userPassword} onChange={onPasswordChange}  name="password" placeholder="Password"/><span className="error-text-style" style={!(cnfpasswordError.code)?{color:passwordError.color}:{}}>{passwordError.message}</span>
                                        <input className="inputbox-signup" type="password" value={cnfPassword} onChange={onCnfPasswordChange}  name="cnfPassword" placeholder="Confirm Password"/><span className="error-text-style" style={!(cnfpasswordError.code)?{color:cnfpasswordError.color}:{}}>{cnfpasswordError.message}</span>
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
                                        
                                    </span>
                                </div>
                            </div>    
                        </div>

                    </div>
</div>);



}

export default SignUp;