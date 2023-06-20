import axios from "axios";

export function getdataformat() {
  
   const sample = [{
    "compname": "",
    "contactperson": "",
    "phonenumber": "",
    "emailadd": ""
  },
  {
    "name": "",
    "level": ""
  }, {
    "description": ""
  }, {
    "place": "",
    "location": "",
    "designation": "",
    "website": "",
    "startDate": "",
    "endDate": "",
    "description": ""
  }, {
    "description": ""
  }, {
    "description": ""
  }
];
return sample;
}

export function _options(){ 
  var options = ["Beginner","Intermediate","Skilfull","Experienced","Expert"];
  return options;
}


export function sectionData(){ 
  var sectiondata = [ {
    "description": "First Description"
  }, {
    "description": "Second Description"
  }, {
    "description": "Third description"
  },
];
  return sectiondata;
}


export async function getServer(setstate,url){
  if(url){
    url = `http://localhost:5000/newresume`;
  }
  
  var sectiondata = [ {
    "description": "First Description"
  }, {
    "description": "Second Descriptiotn"
  }, {
    "description": "Third description"
  },
];

  const data = [...sectiondata];

const res = await fetch(url,{
  method:'GET'
});

const json = await res.json();
console.log("new resume data from server",json.resumeObj);
const data_ = JSON.parse(json.resumeObj.value)

setstate(data_);
}



export async function saveData(dataSave,url,resumeid){

  const saveData = JSON.stringify(dataSave);
  console.log("datasave", saveData);
  axios.post("http://localhost:5000/api/saveresume",{updateObj:saveData,rid:resumeid}).then((res)=>{

    console.log(res);
  })



}
// {"Resume Objective":[{"description":"<p>First Description</p>"},{"description":"<p>First Description</p>"},{"description":"<p>First Description</p>"}]}