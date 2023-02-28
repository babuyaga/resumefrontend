
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.js";
import Error404 from "./Error404.js";

function Router() {



return (  <BrowserRouter>
    <Routes>
    <Route path="/" element={ <App />}>
    <Route index element={<App />} />
    <Route path="blogs" element={<App />} />
    <Route path="contact" element={<App />} />
    </Route>
    <Route path="*" element={<Error404 />} />
    
    </Routes>
  </BrowserRouter>);



}

export default Router;


