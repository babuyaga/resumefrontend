export function moveup_(secval,secstat,updatesecval,updateuistat,componentid){
  const tempmoveupvalue =[...secval];
  const tempmoveupuistate = [...secstat];

  if(componentid>0){
    tempmoveupvalue[componentid-1] = secval[componentid];
    tempmoveupvalue[componentid] = secval[componentid-1];
    tempmoveupuistate[componentid-1] = secstat[componentid];
    tempmoveupuistate[componentid] = secstat[componentid-1];

    updatesecval(tempmoveupvalue);
    updateuistat(tempmoveupuistate);
  }
}


export function  movedown_(secval,secstat,updatesecval,updateuistat,componentid){ //code to move the instance of the component down
const tempmovedownvalue =[...secval];
const tempmovedownuistate = [...secstat];

if(componentid<(secval.length-1)){  
  tempmovedownvalue[componentid+1] = secval[componentid];
  tempmovedownvalue[componentid] = secval[componentid+1];
  tempmovedownuistate[componentid+1] = secstat[componentid];
  tempmovedownuistate[componentid] = secstat[componentid+1];
  updatesecval(tempmovedownvalue);
  updateuistat(tempmovedownuistate);
 }
}







export function deletechild_(secval,secstat,updatesecval,updateuistat,componentid){

  var tempdelvalue =[...secval];
  var tempdeluistate = [...secstat];
  if(tempdelvalue.length>1){
  tempdelvalue.splice(componentid,1);
  tempdeluistate.splice(componentid,1);
  updatesecval(tempdelvalue);
  updateuistat(tempdeluistate);
 
  }

  if(tempdelvalue.length===1){
    tempdelvalue = [];
    tempdeluistate = [];
    updatesecval(tempdelvalue);
    updateuistat(tempdeluistate);

  }

}

