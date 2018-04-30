var commonfunctions_namespace = commonfunctions_namespace || {};

commonfunctions_namespace.loadCSV = function(){

	try{
        let data; 

        d3.csv(config_namespace.FILE_PATHES.csvpath, function(csvdata){
                          data = csvdata;
                        }
                  );
                   
        
        return data;

  }
   catch(err){
        console.log("couldn't load csv "+err);   
  } 
};

commonfunctions_namespace.loadJson = function(callback){
  try{        
        d3.json(config_namespace.FILE_PATHES.jsonpath, function(jsondata) {         
                            config_namespace.JSON_OBJECT = jsondata;
                            callback(null);                            
                          }                          
                    );    
  }
  catch(err){
    console.log("couldn't load json "+err);   
  }

};

commonfunctions_namespace.setJsonObject = function(){
  "use strict"; 
  var q=d3.queue();
  q.defer(commonfunctions_namespace.loadJson);  
  q.await(function(error) {
    if (error) throw error;
    commonfunctions_namespace.setChartsCanBeBuild(true);
  }); 
};

commonfunctions_namespace.setChartsCanBeBuild = function(trueOrFalse){
  console.log("load js", config_namespace.JSON_OBJECT);
  dynamics_namespace.chartsCanBeBuild = trueOrFalse;
};

commonfunctions_namespace.getJsonObject = function(){
    return config_namespace.CONSTANTS.jsonObject;
};

commonfunctions_namespace.getRootElement = function(environment){
          rootElement = d3.selectAll("#"+environment.htmlElementID).attr("width",environment.width).attr("height",environment.height);
          return rootElement;        
};

commonfunctions_namespace.getStatesAndDataByYear = function(year, jsondata){
  let yearAsString = year.toString();

  return jsondata.years[yearAsString];
};

commonfunctions_namespace.getCrimesAndDataByYearAndState = function(year, statename, jsondata){
  let statesData = commonfunctions_namespace.getStatesAndDataByYear(year, jsondata); 
  let crimeData = statesData.states[statename]; 
  return crimeData; 
};

//returns violent crimes object
commonfunctions_namespace.getViolentCrimes = function(year, statename, jsondata){
  let crimeData = commonfunctions_namespace.getCrimesAndDataByYearAndState(year, statename, jsondata);
  let violentCrimes = crimeData.violentCrime;
  return violentCrimes;
};

//returns property crimes object
commonfunctions_namespace.getPropertyCrimes = function(year, statename, jsondata){
  let crimeData = commonfunctions_namespace.getCrimesAndDataByYearAndState(year, statename, jsondata);
  let propertyCrimes = crimeData.propertyCrimes;
  return propertyCrimes;
};

//returns the crimerate per 100 0000 people
commonfunctions_namespace.getCrimerateByCrimeType = function(year, statename, crime, jsondata){
  let propertyCrimes = config_namespace.CONSTANTS.crimeTypesProperty;
  let violentCrimes = config_namespace.CONSTANTS.crimeTypesViolence;
  let errorValue = 0;
  
  if (propertyCrimes.includes(crime)){
    let propertyCrimes = commonfunctions_namespace.getPropertyCrimes(year, statename, jsondata);
    let crimerate = propertyCrimes.crime;
    return crimerate;

  }

  else if(violentCrimes.includes(crime)){
    let violentCrimes = commonfunctions_namespace.getViolentCrimes(year, statename, jsondata);
    let crimerate = violentCrimes.crime;
    return crimerate;
  }

  else{    
    console.log("given crime not in crimes crime: ",crime, "crimes propertyCrimes", propertyCrimes, "violentCrimes", violentCrimes);
    return errorValue;
  }
}; 

//returns an object
commonfunctions_namespace.getAllCategories = function(){
  let categories = config_namespace.CONSTANTS.crimecategories;
  return categories;
};

//returns an array
commonfunctions_namespace.getAllStates = function(){
  let states = config_namespace.CONSTANTS.states;
  return states;
};

commonfunctions_namespace.getAllYears = function(){
  let maxYear = config_namespace.CONSTANTS.maxYear;
  let minYear = config_namespace.CONSTANTS.minYear;
  let allYears = [];
  for(let year= minYear; year <= maxYear; year++){
    allYears.push(year);
  }
  return allYears;
};

//returns a rgb color depending on the paramter 'multipiler'
// 0 is red, 100 is  green
//source: https://stackoverflow.com/questions/17525215/calculate-color-values-from-green-to-red
commonfunctions_namespace.getSingleColor = function(multipiler){
  let degree = 1.2;
  let fullCircle = 360;
  let hueColor = multipiler * degree/fullCircle;
  let saturation = 1;
  let brightness  = 0.5;
  let rgbColor = commonfunctions_namespace.hsvToRGB(hueColor, saturation, brightness);
  return 'rgb(' + rgbColor[0] + ',' + rgbColor[1] + ',' + rgbColor[2] + ')'; 
};

//converts hsv to rgb values
//source: https://stackoverflow.com/questions/17242144/javascript-convert-hsb-hsv-color-to-rgb-accurately
commonfunctions_namespace.HSVtoRGB = function(h, s, v) {
    let r, g, b, i, f, p, q, t;
    let maxLength = 1;
    let multipiler = 6;
    let maxValue = 255;

    if (arguments.length === maxLength) {
        s = h.s, v = h.v, h = h.h;
    }
    
    i = Math.floor(h * multipiler);
    f = h * multipiler - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % multipiler) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }

    return {      
        r: Math.round(r * maxValue),
        g: Math.round(g * maxValue),
        b: Math.round(b * maxValue)
    };
};