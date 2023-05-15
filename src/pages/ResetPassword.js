import "./resetlink.css";
import Eyeopen from "../icons/Eyeopen.js";
import {useState,useEffect,useContext,createContext,useRef} from "react";
import {Link} from "react-router-dom";
import {authContext} from "./Router.js";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const passwordValidator = require('password-validator');


function ResetPassword() {
const [checked,setchecked] = useState(false);
const {authe} = useContext(authContext);
const navigate = useNavigate();
const [userPassword,setUserPass] = useState("");
const [cnfPassword,setCnfPass] = useState("");
const [passwordError,setPassError] = useState("");
const [cnfpasswordError,setcnfPassError] = useState("");



const [statusMessage,setStatusmessage] = useState({message:false,action:false,code:false});

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

const onPasswordChange=(e)=>{
    setUserPass(e.target.value);
    
if(!validatePassword(e.target.value)){
var details = validatePassword(e.target.value,true);
    setPassError({message:"Password not upto mark",details:details});
   
}else{
    setPassError("All good");
}

if(statusMessage){
    setStatusmessage({message:false,action:false,code:false});
}

}



const onCnfPasswordChange=(e)=>{
    setUserPass(e.target.value);


if(statusMessage){
    setStatusmessage({message:false,action:false,code:false});
}

}



useEffect(()=>{
    if(authe){
        navigate("/dashboard");
    }
},[authe])

async function sendResetEmail(){

if(true){


try{
axios.get("http://localhost:5000/api/sendresetrequest").then((res)=>{
    if(res.data.code==="auth/user-not-found"){
        setStatusmessage({message:"User not found",action:"Sign up",code:false});
    }else if(res.data.code==="Success"){
        setStatusmessage({message:"Password reset email sent",action:"Login",code:true});
    }else if(res.data.code===11000){
        setStatusmessage({message:"Password reset link already sent.",action:"Login",code:false});
    }else{
        setStatusmessage({message:"Could not reset password.",action:"",code:false});
    }
});

}catch(e){
    setStatusmessage(e);
}


}

}

return (  <div className="login-page"> 
                    <div className="login-box">
                    
                        <div className="login-box-partition" style={{margin:"auto"}}>
                            <div className="login-box-partition--section partition-logo"><h2></h2></div>
                                <div className="login-box-partition--section partition-top">
                             
                                </div>

                                 <div className="login-box-partition--section partition-bottom"> 
                                     <div className="login-box-partition--section-holder">
                                        <form className="form-login"> 
                                        <input className="inputbox-login" type="password" value={userPassword} onChange={onPasswordChange}  name="password" placeholder="Password"/><span className="error-text-style">{passwordError.message}</span>
                                        <input className="inputbox-login" type="password" value={cnfPassword} onChange={onCnfPasswordChange}  name="password" placeholder="Confirm Password"/><span className="error-text-style">{cnfpasswordError}</span>
                                       
                                        </form>
                                        
                                        <button className="loginwithEmail-button" onClick={sendResetEmail}> Submit</button>
                                        <ul></ul>
                                        <div className="finaltext--holder"><span style={(!statusMessage.code)?{color:"red"}:""}>{statusMessage.message}</span><span className="Signuptext-login"> <Link to="/login">{statusMessage?statusMessage.action:""}</Link></span></div>
                                    </div>
                                    <br></br>
                                </div>
                        </div>
                        <div className="login-box-partition" >
                        <div className="login-box-partition--section partition-logo"><h2></h2></div>
                                <div className="login-box-partition--section partition-top">
                             
                                </div>

                                 <div className="login-box-partition--section partition-bottom"> 
                                     <div className="login-box-partition--section-holder">
                                        <div className="form-login"> 
                                       <span>Password succesfully reset!</span>
                                       
                                        </div>
                                        
                                        <button className="loginwithEmail-button" onClick={()=>{}}> Login</button>
                                        <div className="finaltext--holder"><span style={(!statusMessage.code)?{color:"red"}:""}>{statusMessage.message}</span><span className="Signuptext-login"> <Link to="/login">{statusMessage?statusMessage.action:""}</Link></span></div>
                                    </div>
                                    <br></br>
                                </div>
                        </div> 

                    </div>
</div>);



}

export default ResetPassword;