import Cookies from 'js-cookie';
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import {useEffect,useState,createContext} from "react";
import Login from "./Login.js";
import App from "./App.js";
import SignUp from "./SignUp.js";
import Error404 from "./Error404.js";
import axios from "axios";
import {initializeApp} from 'firebase/app';
import {getAuth,GoogleAuthProvider,signInWithPopup,signOut} from "firebase/auth";
import Landingpage from './Landingpage.js';


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
   
  const firebaseConfig = {
    apiKey: "AIzaSyDklzqovWelTnf1ihgLQ24LdiH-MSz6E3g",
    authDomain: "hosting-ac30c.firebaseapp.com",
    projectId: "hosting-ac30c",
    storageBucket: "hosting-ac30c.appspot.com",
    messagingSenderId: "926611148467",
    appId: "1:926611148467:web:43e0b5f1a7d388c86baac6"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  auth.languageCode = 'it';

  const loginWithGoogle = ()=>{

    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
     // The signed-in user info.
      
      const user = result.user;
  
    user.getIdToken().then((tokenn)=>{
      setToken(tokenn);
      setAuth(true);
      setUser(user);
      Cookies.set("tokenhhs",tokenn,{ expires: 1 });
      Cookies.set("authe",true,{ expires: 1 });
      Cookies.set("user",user,{ expires: 1 });
      window.location.reload(false);
  
    })
    
    
      })
  
  .catch((error) => {
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


  const handleSignout = (e)=>{
    e.preventDefault();
    signOut(auth).then(()=>{
      console.log("Signout called");
      Cookies.set("tokenhhs",false,{ expires: 7 });
      Cookies.set("user",false,{ expires: 7 });
      Cookies.set("authe",false,{ expires: 7 });
      setAuth(false);
      setUser(false);
      setToken(false);
      // window.location.reload(false);
        }).catch((error)=>{
      console.log("Error Signing Out");
    });
    
  }


  
return (  <BrowserRouter>
<authContext.Provider value={{handleSignout,loginWithGoogle}}>
    <Routes>
    {/* <Route index element={<Error404 />} />  */}
    <Route path="/login" element={authe?<App/>:<Login/>}>
    
        <Route path="profile" element={<App />} />
    </Route>
    <Route path="/builder/resume" element={authe?<App />:<Navigate to="/login"/>} />
    <Route path="/statement-of-purpose-writing" element={<Landingpage />} />
    <Route path="/signup" element={<SignUp />} />

    <Route path="/account" element={<App />} />
    <Route path="*" element={<Navigate to="/login"/>}/>
    
    </Routes>
</authContext.Provider>
  </BrowserRouter>);



}

export default Router;


