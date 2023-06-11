import {useState,useEffect,useContext,createContext,useRef} from "react";
import "../stylesheets/purchasepopup.css";
import Loadericon from "../../icons/Loadericon";
import PartyPopper from "../../icons/PartyPopper";
import PurchaseFail from "../../icons/PurchaseFail";
import { useNavigate } from "react-router-dom";
import { authContext} from "../../pages/Router";


function PurchasePopUp({status}){
    const navigate = useNavigate();
    const {setPaymentStatus} = useContext(authContext);


    useEffect(()=>{
        if(status==="loading"){
        console.log("payment Status changed");
        }
    });

  const closePopUp=()=>{
    setPaymentStatus("");
    navigate("/dashboard");
  }

return (<div className="popup-container-scrim" style={status?{}:{"display":"none"}}>
                     <div className="purchase-success-popup-holder" style={status==="success"?{}:{"display":"none"}}>
                        <div className="closebutton-holder"></div>
                      <PartyPopper wi="140px" hi="140px"/>
                        <h2>Your purchase is complete!</h2>
                        <p>You will recieve a confirmation email with the order details</p>
                        <button onClick={closePopUp}>Go to dashboard</button>
                        <br></br>
                    </div>    
                    <div className="purchase-success-popup-holder" style={status==="failed"?{}:{"display":"none"}}>
                        <div className="closebutton-holder"></div>
                        <PurchaseFail wi="140px" hi="140px"/>
                        <h2>Your purchase has failed!</h2>
                        <p>Any amount debited will be refunded back to your account</p>
                        <button>Retry Purchase</button>
                    </div>                  
                    <div className="purchase-success-popup-holder" style={status==="loading"?{}:{"display":"none"}}>
                        <div className="closebutton-holder"></div>
                        <h2>We are verifying your purchase!</h2>
                        <Loadericon wi="85" hi="85"/>
                        <p></p>
                    </div> 
            </div>);
    }

export default PurchasePopUp;