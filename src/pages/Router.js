import Cookies from 'js-cookie';
import { BrowserRouter, Routes, Route,Navigate} from "react-router-dom";
import {useEffect,useState,createContext} from "react";
import Login from "./Login.js";
import App from "./App.js";
import SignUp from "./SignUp.js";
import Error404 from "./Error404.js";
import axios from "axios";
import {initializeApp} from 'firebase/app';
import {getAuth,GoogleAuthProvider,signInWithPopup,signOut} from "firebase/auth";
import Landingpage from './Landingpage.js';
import Dashboard from './Dashboard.js';
import Documents from './Documents.js';
import Profile from './Profile.js';
import Pricing from './Pricing.js';


export const authContext = createContext();

function Router() {
  
  const provider = new GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  provider.setCustomParameters({
    'login_hint': 'user@example.com'
  });


 

  const [token,setToken] = useState( Cookies.get("tokenhhs") || false);
  const [authe,setAuth] = useState( (Cookies.get("authe")==="true")?true:false);
  const [user,setUser] = useState( Cookies.get("user") || false);
  const [data,setdata] = useState("");
const verifytoken_URL = "http://localhost:5000/api/login";

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
          console.log("response from server is",res);
        setToken(tok);
        setAuth(true);
        setUser(user);
        Cookies.set("tokenhhs",tok,{ expires: 1 });
        Cookies.set("authe",true,{ expires: 1 });
        Cookies.set("user",user,{ expires: 1 });
             
      }).catch((err)=>{
        console.log("Error Verifying Token By the backend",err);
      })
}


  const loginWithGoogle = ()=>{

    signInWithPopup(auth, provider)
    .then((result) => 
            {
               // This gives you a Google Access Token. You can use it to access the Google API.
               const credential = GoogleAuthProvider.credentialFromResult(result);
              // The signed-in user info.
      
               const user = result.user;
  
               user.getIdToken().then((tokenn)=>
                {
                  verifyTokenAPI(tokenn,user);
                })
            
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode);
     
      // ...
    });
  
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
    
        }).catch((error)=>{
      console.log("Error Signing Out: ",error);
    });
    
  }


  
return (  <BrowserRouter>
<authContext.Provider value={{handleSignout,loginWithGoogle,authe,setAuth}}>
    <Routes>
    {/* <Route index element={<Error404 />} />  */}
    <Route path="/login" element={<Login/>}>
    
        <Route path="profile" element={<App />} />
    </Route>
    <Route path="/builder/resume" element={authe?<App />:<Navigate to="/login"/>} />
    <Route path="/statement-of-purpose-writing" element={<Landingpage />} />
    <Route path="/signup" element={<SignUp />} />

    <Route path="/dashboard" element={authe?<Dashboard />:<Navigate to="/login"/>} />
    <Route path="/documents" element={authe?<Documents />:<Navigate to="/login"/>} />
    <Route path="/profile" element={authe?<Profile />:<Navigate to="/login"/>} />
    {/* <Route path="/profile/pricing" element={!authe?<Pricing />:<Navigate to="/login"/>} /> */}
    <Route path="/profile/pricing" element={<Pricing />} />
    <Route path="*" element={<Navigate to="/login"/>}/>
    
    </Routes>
</authContext.Provider>
  </BrowserRouter>);



}

export default Router;


