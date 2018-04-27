var commonfunctions_namespace = commonfunctions_namespace || {};

commonfunctions_namespace.loadCSV = function(){

	try{
        data = d3.csv(config_namespace.FILE_PATHES.csvpath, 
                      function(csvdata){
                            return csvdata;
                      }
                );
                   
        
            return data;

  }

   catch(err){
        console.log("couldn't load csv "+err);   
  } 
};

commonfunctions_namespace.getRootElement = function(environment){
          rootElement = d3.selectAll("#"+environment.htmlElementID).attr("width",environment.width).attr("height",environment.height);
          return rootElement;        
};

commonfunctions_namespace.getStatesAndDataByYear = function(year, jsondata){
  let yearAsString = year.toString();
  return json.years[yearasstring];
};

commonfunctions_namespace.getCrimesAndDataByYearAndState = function(year, statename, jsondata){
  let statesData = commonfunctions_namespace.getStatesAndDataByYear(year, jsondata);
  let crimeData = statesData.statename;
  return crimeData; 

};

commonfunctions_namespace.getViolentCrimes = function(year, statename, jsondata){
  let crimeData = commonfunctions_namespace.getCrimesAndDataByYearAndState(year, statename, jsondata);
  let violentCrimes = crimeData.violentCrime;
  return violentCrimes;
};

commonfunctions_namespace.getPropertyCrimes = function(year, statename, jsondata){
  let crimeData = commonfunctions_namespace.getCrimesAndDataByYearAndState(year, statename, jsondata);
  let propertyCrimes = crimeData.propertyCrimes;
  return propertyCrimes;
};

commonfunctions_namespace.getAllCategories = function(){
  let categories = 
};



