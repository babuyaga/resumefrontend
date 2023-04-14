import Cookies from 'js-cookie';
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import {useEffect,useState,createContext} from "react";
import Login from "./Login.js";
import App from "./App.js";
import Error404 from "./Error404.js";
import axios from "axios";

export const authContext = createContext();

function Router() {
  

  const [token,setToken] = useState( Cookies.get("tokenhhs") || false);
  const [authe,setAuth] = useState( Cookies.get("authe") || false);
  const [user,setUser] = useState( Cookies.get("user") || false);
  const [data,setdata] = useState("");
  
return (  <BrowserRouter>
<authContext.Provider value={{token,authe,user,data,setToken,setAuth,setUser,setdata}}>
    <Routes>
    <Route path="/" element={ user?<App/>:<Login/>}>
    <Route index element={<App />} /> 
    <Route path="contact" element={<App />} />
    </Route>
    <Route path="/resume" element={user?<App />:<Navigate to="/"/>} />

    <Route path="/res" element={<App />} />
    <Route path="*" element={<Error404 />} />
    
    </Routes>
</authContext.Provider>
  </BrowserRouter>);



}

export default Router;


