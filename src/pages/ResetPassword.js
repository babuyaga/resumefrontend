import "./resetlink.css";
import Eyeopen from "../icons/Eyeopen.js";
import {useState,useEffect,useContext,createContext,useRef} from "react";
import {Link} from "react-router-dom";
import {authContext} from "./Router.js";
import { useNavigate,useParams } from "react-router-dom";
import axios from 'axios';
const passwordValidator = require('password-validator');


function ResetPassword() {
const [loading,setloading] = useState(true);
const [posturl,setUrl] = useState("");
const navigate = useNavigate();
const [userPassword,setUserPass] = useState("");
const [cnfPassword,setCnfPass] = useState("");
const [passwordError,setPassError] = useState({message:"",code:false,color:"black"});
const [cnfpasswordError,setcnfPassError] = useState({message:"",code:false,color:"black"});
const { linkid } = useParams();
const [submitStatus,setSubmitStatus] = useState({message:"",code:false,color:"Red"});



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
            return item.map((e,i)=><li>{(e.message)}</li>);
        }
    }

const onPasswordChange=(e)=>{
        setUserPass(e.target.value);
        var details = validatePassword(e.target.value,true);
        if(validatePassword(e.target.value)){
            setPassError({message:"This works",details:details,code:false,color:"green"});   
                if((cnfPassword===e.target.value)&&(cnfPassword!="")){
                   setSubmitStatus({message:"Can submit",code:true,color:"Green"});
                   setcnfPassError({message:"Passwords match",code:false,color:"red"}); 
                }else{
                    setSubmitStatus({message:"Can't submit",code:false,color:"Red"});
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
        setcnfPassError({message:"Passwords match",code:false,color:"red"});   
        setSubmitStatus({message:"Can submit",code:true,color:"Green"});
  
     
    }else{
        setSubmitStatus({message:"Can't submit",code:false,color:"Red"});

        if((e.target.value!=userPassword)){
            setcnfPassError({message:"Passwords don't match",code:false,color:"red"});   
         }else{
             setSubmitStatus({message:"Can't submit",code:false,color:"Red"});
             setcnfPassError({message:"Passwords match",code:false,color:"red"}); 
         }

         if(e.target.value===""){
            setcnfPassError({message:"Field cannot be empty",code:false,color:"red"});
        } 

     }

}






useEffect(()=>{

    setTimeout(()=>{
        getResetDetails();    
    },1000)
 
},[linkid]);




async function getResetDetails(){
   await axios.get(`http://localhost:5000/api/getresetpassword/${linkid }`).then((res)=>{console.log(res);
   if(res.data.status===200){
    setloading("Success");
    console.log(res.data.url);
   }else if(res.data.status===404){
    setloading("Failure");
   }
});
   }



async function resetPassword(){
if(!submitStatus.code){
submitStatus({message:"Could not submit password change request",code:false,color:"red"})
}
 
}

return (  <div className="login-page"> 
                    <div className="login-box">
                    
                        <div className="login-box-partition" style={!(loading==="Success")?{display:"none",margin:"auto"}:{margin:"auto"}}>
                            <div className="login-box-partition--section partition-logo"><h2></h2></div>
                                <div className="login-box-partition--section partition-top">
                             
                                </div>

                                 <div className="login-box-partition--section partition-bottom" style={{justifyContent:"flex-end"}}> 
                                     <div className="login-box-partition--section-holder">
                                        <form className="form-login"> 
                                        <input style={(passwordError.code)?{borderBottom:"1px solid red",color:"red"}:{borderBottom:"1px solid #39FF14",color:"#39FF14"}} className="inputbox-login" type="password" value={userPassword} onChange={onPasswordChange}  name="password" placeholder="New Password"/><span className="error-text-style">{passwordError.message}</span>
                                        <input style={(cnfpasswordError.code)?{color:"red"}:{borderBottom:"1px solid #39FF14",color:"#39FF14"}}  className="inputbox-login" type="password" value={cnfPassword} onChange={onCnfPasswordChange}  name="password" placeholder="Confirm Password"/><span className="error-text-style" style={!(cnfpasswordError.code)?{color:"red"}:{color:"#39FF14"}}>{cnfpasswordError.message}</span>
                                       
                                        </form>
                                        
                                        <button className="loginwithEmail-button" onClick={resetPassword}> Submit</button>
                                        <span>{submitStatus?submitStatus.message:""}</span>
                                        <ul style={{height:"200px"}}>{displayValidation(passwordError.details)}</ul>
                                        <div className="finaltext--holder"><span className="Signuptext-login"> <Link to="/login">{submitStatus?submitStatus.action:""}</Link></span></div>
                                    </div>
                               
                                    <br></br>
                                
                                </div>
                        
                        </div>

                        <div className="login-box-partition" style={loading===true?{margin:"auto"}:{display:"none",margin:"auto"}}>Loading...</div>
                        
                        <div className="login-box-partition" style={(loading==="Failure")?{margin:"auto"}:{display:"none",margin:"auto"}}><h1>Page does not exist</h1></div>
                        {/* <div className="login-box-partition" >
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
                        </div>  */}

                    </div>
</div>);



}

export default ResetPassword;