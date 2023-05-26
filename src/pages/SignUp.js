import "./stylesheets/signup.css";
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
const [emailError,setEmailError] = useState({message:"",code:true,color:"black",backgroundcolor:""});
const [userPassword,setUserPass] = useState("");
const [cnfPassword,setCnfPass] = useState("");
const [passwordError,setPassError] = useState({message:"",code:true,color:"black",backgroundcolor:""});
const [cnfpasswordError,setcnfPassError] = useState({message:"",code:true,color:"black",backgroundcolor:""});
const [userName,setUserName] = useState("");
const [userNameError,setUserNameError] = useState({message:"",code:true,color:"black",backgroundcolor:""});
const [submitStatus,setSubmitStatus] = useState({message:"",code:false,color:"Red"});
const [showChild, setshowChild] = useState(false);
const [loading,setLoading]= useState(false);

const navigate = useNavigate();
    
const validateEmail = (email)=>{
    const flag= /\S+@\S+\.\S+/.test(email);
    if(!flag){
         setEmailError({message:"Please enter a valid email",code:true,backgroundcolor:"#FFCCCB"});
    }else{
        setEmailError({message:"Valid Email",code:false,backgroundcolor:""});
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
        return item.map((e,i)=><span style={{display:"flex",flexDirection:"row"}}><li></li>{(e.message)}</span>);
    }
}

const postStatus= ()=>{

    if((emailError.code)||(passwordError.code)||(cnfpasswordError.code)||(userNameError.code)){

        setSubmitStatus({message:"",code:false,color:""});
        console.log("status");
    console.log((userNameError.code));
    console.log((emailError.code))
    console.log((passwordError.code))
    console.log((cnfpasswordError.code))
    
    }else{
        setSubmitStatus({message:"",code:true,color:""});
        console.log("status");
        console.log("status");
        console.log((userNameError.code));
        console.log((emailError.code))
        console.log((passwordError.code))
        console.log((cnfpasswordError.code))

    }
}


const onUserNameChange=(e)=>{
    setUserName(e.target.value);
    if(e.target.value===""){
        setUserNameError({message:"Name cannot be empty",code:true,color:"",backgroundcolor:"#FFCCCB"});
    }else{
        setUserNameError({message:"",code:false,color:"",backgroundcolor:""});
    }

    }



const onEmailChange=(e)=>{
    setUserEmail(e.target.value);
    console.log(userEmail);
   
        validateEmail(e.target.value);
   
    console.log(emailError);

   
    }
    


const onPasswordChange=(e)=>{
        setUserPass(e.target.value);
        var details = validatePassword(e.target.value,true);
        if(validatePassword(e.target.value)){
            setPassError({message:"This password works",details:details,code:false,color:"green",backgroundcolor:""});   
                if((cnfPassword===e.target.value)&&(cnfPassword!="")){
                 
                   setcnfPassError({message:"Passwords match",code:false,color:"Green",backgroundcolor:""}); 
                }else{
                    setcnfPassError({message:"Passwords don't match",code:true,backgroundcolor:"#FFCCCB"}); 
                 
                }

                

            }else{
                setPassError({message:"Weak Password",details:details,code:true,color:"red",backgroundcolor:"#FFCCCB"});  
                if(e.target.value===""){
                    setPassError({message:"Password cannot be empty",details:details,code:true,color:"red",backgroundcolor:"#FFCCCB"});
                } 
                 }
               
                }


const onCnfPasswordChange=(e)=>{
    setCnfPass(e.target.value);

    if((e.target.value===userPassword)&&(e.target.value!="")&&validatePassword(userPassword)){
        setcnfPassError({message:"Passwords match",code:false,color:"Green",backgroundcolor:"#FFCCCB"});   
    }else{
       

        if((e.target.value!=userPassword)){
            setcnfPassError({message:"Passwords don't match",code:true,backgroundcolor:"#FFCCCB"});   
         }else{
           
             setcnfPassError({message:"Passwords match",code:false,backgroundcolor:""}); 
         }

         if(e.target.value===""){
            setcnfPassError({message:"Password cannot be empty",code:true,backgroundcolor:"#FFCCCB"});
        } 

     }
  
}


    useEffect(()=>{
        if(authe){
            navigate("/dashboard");
        }
    },[authe])


 const SignupWithEandP =()=>{

if(userName===""){
    setUserNameError({message:"Name cannot be empty",code:true,color:"",backgroundcolor:"#FFCCCB"});
} else if(userEmail===""){
    setEmailError({message:"Email cannot be empty",code:true,backgroundcolor:"#FFCCCB"});
} else if((userPassword==="")){
    setPassError({message:"Password cannot be empty",code:true,color:"red",backgroundcolor:"#FFCCCB"});
} else if((cnfPassword==="")){
    setcnfPassError({message:"Confirm your password",code:true,backgroundcolor:"#FFCCCB"});
}else{

    

    if((emailError.code)||(passwordError.code)||(cnfpasswordError.code)||(userNameError.code)){
        console.log("Error");
    }
    else {
    setLoading(true);
    
    try{
    axios.post("http://localhost:5000/api/createnewuser",{useremail:userEmail,username:userName,userpassword:userPassword}).then((res)=>{
  console.log(res);
  setLoading(false);
    });
    
    }catch(e){
        setSubmitStatus({message:"Could not create new user",error:e,action:"Login",code:true,status:"loaded"});
        setLoading(false);
    }
    
    
 


}
}
        }

return (  <div className="signup-page"> 
                    <div className="signup-box signup-box">
                    
                        <div className="signup-box-partition">
                        <div className="signup-box-partition--section partition-logo"><h2></h2></div>
                                <div className="signup-box-partition--section partition-top">
                                    <div className="signup-box-partition--section-holder">
        
                                        <p> We need some of your details.</p> 
                                        <button className="google-login--button" onClick={loginWithGoogle}> <Googleicon/> <span>Sign up with Google</span> </button>
                                     
                                    </div>
                                </div>
<div className="or-holder"><hr></hr><p>or</p><hr></hr></div>

                                 <div className="signup-box-partition--section partition-bottom"> 
                                     <div className="signup-box-partition--section-holder">

                                        <form className="form-signup" onFocus={()=>{console.log("Focused")}} onBlur={()=>{console.log("Blurred")}}> 
                                        <input className="inputbox-signup"   style={userNameError.code?{backgroundColor:userNameError.backgroundcolor}:{}} type="text" name="username" value={userName} onChange={onUserNameChange} placeholder="Legal Name"/><span className="error-text-style">{userNameError.message}</span>
                                        <input className="inputbox-signup"  style={emailError.code?{backgroundColor:emailError.backgroundcolor}:{}} type="email" value={userEmail} onChange={onEmailChange} name="email" placeholder="Email"/>
                                        <input className="inputbox-signup" style={passwordError.code?{backgroundColor:passwordError.backgroundcolor}:{}} type="password" value={userPassword} onChange={onPasswordChange} onFocus={()=>{setshowChild(true)}} onBlur={()=>{setshowChild(false)}} name="password" placeholder="Password"/><span className="error-text-style" style={!(cnfpasswordError.code)?{color:passwordError.color}:{}}>{passwordError.message}<span style={showChild?{display:"block"}:{display:"none"}} >{displayValidation(passwordError.details)}</span></span>
                                        <input className="inputbox-signup" style={cnfpasswordError.code?{backgroundColor:cnfpasswordError.backgroundcolor}:{}} type="password" value={cnfPassword} onChange={onCnfPasswordChange}  name="cnfPassword" placeholder="Confirm Password"/><span className="error-text-style" style={!(cnfpasswordError.code)?{color:cnfpasswordError.color}:{}}>{cnfpasswordError.message}</span>
                                        </form>

                                        <button className="loginwithEmail-button" onClick={SignupWithEandP} style={loading?{display:"none"}:{display:"flex"}}> Sign up</button><span style={loading?{display:"flex",justifyContent:"center",margin:"8px 0"}:{display:"none"}}><Loadericon/></span>
                                        
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