import {useState,useEffect,useContext,createContext,useRef} from "react";
import "../stylesheets/purchasepopup.css";
import Loadericon from "../../icons/Loadericon";


function PurchasePopUp({status}){
    

    useEffect(()=>{
        if(status==="loading"){
        console.log("payment Status changed");
        }
    });

return (<div className="popup-container-scrim" style={status?{}:{"display":"none"}}>
                     <div className="purchase-success-popup-holder" style={status==="success"?{}:{"display":"none"}}>
                        <div className="closebutton-holder"></div>
                        <h2>Your purchase is complete!</h2>
                        <p>You will recieve a confirmation email with the order details</p>
                        <button>Go to dashboard</button>
                    </div>    
                    <div className="purchase-success-popup-holder" style={status==="failed"?{}:{"display":"none"}}>
                        <div className="closebutton-holder"></div>
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