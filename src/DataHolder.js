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
  if(!url){
    url = 'http://localhost:5000/postrequest';
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
  method:'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
});

const json = await res.json();
setstate(json);
}



export async function saveData(dataSave,url){
  if(!url){
    url = 'http://localhost:5000/saveresume';
  }
  
  var sectiondata = [ {
    "description": "First Description"
  }, {
    "description": "Second Descriptiotn"
  }, {
    "description": "Third description"
  },
];


const res = await fetch(url,{
  method:'POST',
  headers : { 
    'Content-Type': 'application/json',
    'Accept': 'application/json'
   },
  body: JSON.stringify(dataSave)
});

const json = res.json();
console.log(json);
}
// {"Resume Objective":[{"description":"<p>First Description</p>"},{"description":"<p>First Description</p>"},{"description":"<p>First Description</p>"}]}