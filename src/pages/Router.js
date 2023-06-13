import Cookies from 'js-cookie';
import { BrowserRouter, Routes, Route,Navigate} from "react-router-dom";
import {useEffect,useState,createContext} from "react";
import Login from "./Login.js";
import App from "./App.js";
import SignUp from "./SignUp.js";
import Error404 from "./Error404.js";
import Loaderscreen from './Loaderscreen.js';
import axios from "axios";
import {initializeApp} from 'firebase/app';
import {getAuth,GoogleAuthProvider,signInWithPopup,signInWithEmailAndPassword,signOut,createUserWithEmailAndPassword,updateProfile} from "firebase/auth";
import Landingpage from './Landingpage.js';
import Dashboard from './Dashboard.js';
import Documents from './Documents.js';
import Profile from './Profile.js';
import Pricing from './Pricing.js';
import ResetLink from './Resetlink.js';
import ResetPassword from './Resetpassword.js';
import Loadericon from '../icons/Loadericon.js';
import ToastMessage from '../components/ToastMessage.js';
import PurchasePopUp from '../components/pricing/PurchasePopUp.js';
import SopApp from './SopApp.js';
import NavbarDash from '../components/dashboard/NavbarDash.js';
import SopPopUp from '../components/dashboard/SopPopUp.js';


export const authContext = createContext();




function Router() {
 
  const provider = new GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  provider.setCustomParameters({
    'login_hint': 'user@example.com'
  });



  const [token,setToken] = useState( Cookies.get("tokenhhs") || false);
  const [authe,setAuth] = useState( (Cookies.get("authe")==="true")?true:false);
  const [userData,setUser] = useState( Cookies.get("user") || false);
  
  useEffect(()=>{if(Cookies.get("user")){
    setUser(JSON.parse(Cookies.get("user")));
  }},[]);

  console.log(userData);
  const [SignInerror,setSignInError] = useState("");
  const [SignUperror,setSignUpError] = useState("");
  const [loading,setLoading] = useState(false);
  const [toaststate,settoast] = useState([]);
const [paymentStatus,setPaymentStatus] = useState("");
const [showSop,setShowSOP] = useState("");


const verifytoken_URL = "http://localhost:5000/api/login";
const sessionEnd_URL = "http://localhost:5000/api/logout";

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId:  process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID 
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  auth.languageCode = 'it';



function verifyTokenAPI(tok,user){
  axios.post(verifytoken_URL,{userDetails:user},
    {
      headers: {
        'authorization': `${tok}` 
      }})
  .then((res)=>{
    if(res.data.status===200){
          console.log("response from server is",res.data);
        setToken(tok);
        setAuth(true);
        setUser(res.data.userData);
        Cookies.set("tokenhhs",tok,{ expires: 1 });
        Cookies.set("authe",true,{ expires: 1 });
        Cookies.set("user",JSON.stringify(res.data.userData),{ expires: 1 });
    } else{
      setToken(false);
      setAuth(false);
      setUser(false);
      Cookies.set("tokenhhs",false,{ expires: 1 });
      Cookies.set("authe",false,{ expires: 1 });
      Cookies.set("user",false,{ expires: 1 });
      setLoading(false);
    }
      }).catch((err)=>{
        console.log("Error Verifying Token By the backend",err);
        setLoading(false);
      })
}


  const loginWithGoogle = ()=>{
   setLoading(true);
    signInWithPopup(auth, provider)
    .then((result) => 
            {
               // This gives you a Google Access Token. You can use it to access the Google API.
               const credential = GoogleAuthProvider.credentialFromResult(result);
              // The signed-in user info.
      
               const user = result.user;
                 console.log("Google user is", user);
               user.getIdToken().then((tokenn)=>
                {
                  verifyTokenAPI(tokenn,user);
                })
            
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      settoast({value:`Login Failed ${errorMessage}`});
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode);
     
      // ...
    });
  
  }


  const loginWithEmailAndPassword = (userEmail,userPassword)=>{

    signInWithEmailAndPassword(auth,userEmail,userPassword)
    .then((userCredential) => 
            {const user = userCredential.user;
              console.log("User Credentials are",user);
              user.getIdToken().then((tokenn)=>
              {
                verifyTokenAPI(tokenn,user);
              })            
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      settoast([{value:`Login Failed ${errorMessage}`}]);
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode);
    });
  
  }


const createUserEmail = (userName,userEmail,userPassword)=>{

  createUserWithEmailAndPassword(auth,userEmail,userPassword)
  .then((userCredential) => 
  { 
    const user = userCredential.user;
    console.log("User Credentials are",user);
    user.getIdToken().then((tokenn)=>
    {
      verifyTokenAPI(tokenn,user);
    })       

    updateProfile(user,{
      displayName:userName
    }).then(()=>{console.log("Profile Updated");});

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message; 
    if(errorCode==="auth/email-already-in-use"){
      setSignUpError("Email already in use, try signing in.")
      
    }
  });

}



const sessionSignOut = ()=> {
  axios.post(sessionEnd_URL)
  .then((res)=>{
          console.log("response from server is",res);            
      }).catch((err)=>{
        console.log("Error Verifying Token By the backend",err);
      })
}

  const handleSignout = ()=>{


    console.log("Signing Out");
    signOut(auth).then(()=>{
      
      console.log("Signout called");
      Cookies.set("tokenhhs",false,{ expires: 7 });
      Cookies.set("user",false,{ expires: 7 });
      Cookies.set("authe",false,{ expires: 7 });
      setAuth(false);
      setUser(false);
      setToken(false);
    sessionSignOut();
        }).catch((error)=>{
      console.log("Error Signing Out: ",error);
    });
    
  }


  useEffect(()=>{
    setLoading(true);

    return ()=>{
        setTimeout(()=>{setLoading(false)},50);
    }
    
    },[authe]);
  
return (  <BrowserRouter>

    <div style={loading?{display:""}:{display:"none"}}><Loaderscreen/></div>
    
    <div className="toastmessage_holder">{toaststate.map((e,i)=><ToastMessage toastobject={e} key={Math.random()} index={i} type={e.messagetype}/>)}</div>
<authContext.Provider value={{handleSignout,loginWithGoogle,authe,setAuth,loginWithEmailAndPassword,createUserEmail,SignUperror, loading,setLoading,userData,settoast,setPaymentStatus,showSop,setShowSOP}}>
<PurchasePopUp status={paymentStatus}/>
<NavbarDash/>
<SopPopUp/>
    <Routes>
  
    {/* <Route index element={<Error404 />} />  */}
    <Route path="/login" element={<Login/>}>
    
        <Route path="profile" element={<App />} />
    </Route>
    <Route path="/builder/resume" element={authe?<App />:<Navigate to="/login"/>} />
    <Route path="/statement-of-purpose-writing" element={<Landingpage />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/resetpassword" element={<ResetLink />} />
    <Route path="/resetpassword/:linkid" element={<ResetPassword/>} />
    <Route path="/dashboard" element={authe?<Dashboard />:<Navigate to="/login"/>} />
    <Route path="/documents" element={authe?<Documents />:<Navigate to="/login"/>} />
    <Route path="/profile" element={authe?<Profile />:<Navigate to="/login"/>} />
    <Route path="/profile/pricing" element={authe?<Pricing />:<Navigate to="/login"/>} />
    <Route path="/SOpwriter" element={authe?<SopApp/>:<Navigate to="/login"/>} />
    <Route path="*" element={<Navigate to="/login"/>}/>
    
    </Routes>
</authContext.Provider>
  </BrowserRouter>);



}

export default Router;


