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







export function deletechild_(secval,secstat,updatesecval,updateuistat,componentid,isupdatefunc,updateval){

  const tempdelvalue =[...secval];
  const tempdeluistate = [...secstat];
  if(tempdelvalue.length>1){
  tempdelvalue.splice(componentid,1);
  tempdeluistate.splice(componentid,1);
  updatesecval(tempdelvalue);
  updateuistat(tempdeluistate);
  secupdateflagdel_(updateval,isupdatefunc,componentid);
  }

  if(tempdelvalue.length==1){
    tempdelvalue = [];
    tempdeluistate = [];
    updatesecval(tempdelvalue);
    updateuistat(tempdeluistate);
    secupdateflagdel_(updateval,isupdatefunc,componentid);
  }

}

export function secupdateflagdel_(updateval,isupdatefunc,componentid){

const tempcomp = [...updateval];
tempcomp.splice(componentid,1);
isupdatefunc(tempcomp);
}

export function secupdateflag_(flag,isupdatefunc,isupdateval,componentid){

  const iscompup = [...isupdateval]; //below code sets a flag that the component has been updated.
  iscompup[componentid]=flag;
  isupdatefunc(iscompup);
}
