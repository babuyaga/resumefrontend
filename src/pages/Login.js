import "./login.css";
import {initializeApp} from 'firebase/app';
import {getAuth,GoogleAuthProvider,signInWithPopup,signOut} from "firebase/auth";
import {useState,useEffect,useContext,createContext,useRef} from "react";
import Cookies from 'js-cookie';
import {authContext} from "./Router.js";


function Login() {

    const {token,authe,user,data,setToken,setAuth,setUser,setdata} = useContext(authContext);




    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    provider.setCustomParameters({
      'login_hint': 'user@example.com'
    });
    
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
          Cookies.set("tokenhhs",tokenn,{ expires: 7 });
          Cookies.set("authe",true,{ expires: 7 });
          Cookies.set("user",user,{ expires: 7 });
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

      const handleSignout = ()=>{
        signOut(auth).then(()=>{
          console.log("Signout called");
          Cookies.set("tokenhhs",false,{ expires: 7 });
          Cookies.set("user",false,{ expires: 7 });
          Cookies.set("authe",false,{ expires: 7 });
          setAuth(false);
          setUser(false);
          setToken(false);
          window.location.reload(false);
            }).catch((error)=>{
          console.log("Error Signing Out");
        });
        
      }


return (  <div className="login-page"> 
<div className="login-box">
<div className="google-login"><button className="google-login--button" onClick={loginWithGoogle}> Sign in with Google </button>

</div>

</div>
</div>);



}

export default Login;