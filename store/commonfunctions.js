var commonfunctionsNamespace = commonfunctionsNamespace || {};

commonfunctionsNamespace.setCrimeCorrelationCSV= function(){
	"use strict"; 
	var q=d3.queue();
	q.defer(commonfunctionsNamespace.loadCrimeCorrelationsCSV);  
	q.await(function(error) {
		if(error){
			throw error;
		}		
	}); 
};

commonfunctionsNamespace.loadCrimeCorrelationsCSV = function(){
	"use strict";
	try{
		let data; 
		d3.csv(configNamespace.FILE_PATHES.crimeCorrelations, function(csvdata){
			configNamespace.CRIME_CORRELATIONS = csvdata;
		});
		return data;	
	}
	catch(error){
		throw error; 
	} 
};

commonfunctionsNamespace.loadJson = function(callback){
	"use strict";
	try{        
		d3.json(configNamespace.FILE_PATHES.jsonpath, function(jsondata) {         
			configNamespace.JSON_OBJECT = jsondata;
			callback(null);                            
		});    
	}
	catch(error){
		throw error;
	}

};

commonfunctionsNamespace.loadMapJsonObject = function(callback){
	"use strict";
	try{        
		d3.json(configNamespace.FILE_PATHES.mappath, function(jsondata) {         
			configNamespace.MAP_JSON_OBJECT = jsondata;
			callback(null);                            
		});    
	}
	catch(error){
		throw error;
	}
};

commonfunctionsNamespace.setJsonObject = function(){
	"use strict"; 
	var q=d3.queue();
	q.defer(commonfunctionsNamespace.loadJson);  
	q.await(function(error) {
		if(error){
			throw error;
		}		
	}); 
};

commonfunctionsNamespace.setMapJsonObject = function(){
	"use strict"; 
	var q=d3.queue();
	q.defer(commonfunctionsNamespace.loadMapJsonObject);  
	q.await(function(error) {
		if (error) throw error;	
	}); 
};

commonfunctionsNamespace.getJsonObject = function(){
	"use strict";
	return configNamespace.STATES_AND_CRIMES.jsonObject;
};

commonfunctionsNamespace.getRootElement = function(environment){
	"use strict";
	let rootElement = d3.selectAll("#"+environment.pageId);
	return rootElement;        
};

commonfunctionsNamespace.getPageById = function(pageId){
	"use strict";	
	let id = "#"+ pageId,					
		page = d3.selectAll(id);
	return page;        
};

commonfunctionsNamespace.getStatesAndDataByYear = function(year, jsondata){
	"use strict";
	let yearAsString = year.toString();
	return jsondata.years[yearAsString];
};

commonfunctionsNamespace.getCrimesAndDataByYearAndState = function(year, statename, jsondata){
	"use strict";
	let statesData = commonfunctionsNamespace.getStatesAndDataByYear(year, jsondata),	
		crimeData = statesData.states[statename];	 
	return crimeData; 
};

//returns violent crimes object
commonfunctionsNamespace.getViolentCrimes = function(year, statename, jsondata){
	"use strict";
	let crimeData = commonfunctionsNamespace.getCrimesAndDataByYearAndState(year, statename, jsondata),
		violentCrimes = crimeData.crimes.violentCrime;
	return violentCrimes;
};

//returns property crimes object
commonfunctionsNamespace.getPropertyCrimes = function(year, statename, jsondata){
	"use strict";
	let crimeData = commonfunctionsNamespace.getCrimesAndDataByYearAndState(year, statename, jsondata),
		propertyCrimes = crimeData.crimes.propertyCrime;	
	return propertyCrimes;
};

//returns the crimerate per 100 0000 people
commonfunctionsNamespace.getCrimerateByCrimeType = function(year, statename, crime, jsondata){
	"use strict";
	let propertyCrimes = configNamespace.STATES_AND_CRIMES.crimeTypesProperty,
		violentCrimes = configNamespace.STATES_AND_CRIMES.crimeTypesViolence,
		errorValue = 0;

	if (propertyCrimes.includes(crime)){
		let propCrimes = commonfunctionsNamespace.getPropertyCrimes(year, statename, jsondata),
			crimeString = ''+crime+'',		
			crimerate = propCrimes[crimeString]; 
		return crimerate;

	}
	else if(violentCrimes.includes(crime)){
		let vioCrimes = commonfunctionsNamespace.getViolentCrimes(year, statename, jsondata),
			crimeString = ''+crime+'',
			crimerate = vioCrimes[crimeString];
		return crimerate;
	} 	
	return errorValue;	
};

commonfunctionsNamespace.getAllCrimeTypes = function(){
	"use strict";
	let crimeTypesArray = configNamespace.STATES_AND_CRIMES.crimeTypesProperty.concat(configNamespace.STATES_AND_CRIMES.crimeTypesViolence);
	return crimeTypesArray;
};

//returns an object
commonfunctionsNamespace.getAllCategories = function(){
	"use strict";
	let categories = configNamespace.STATES_AND_CRIMES.crimecategories;
	return categories;
};

//returns an array
commonfunctionsNamespace.getAllStates = function(){
	"use strict";
	let states = configNamespace.STATES_AND_CRIMES.states;
	return states;
};

commonfunctionsNamespace.getAllYears = function(){
	"use strict";
	let maxYear = configNamespace.STATES_AND_CRIMES.maxYear,
		minYear = configNamespace.STATES_AND_CRIMES.minYear,
		allYears = [];
	for(let year= minYear; year <= maxYear; year++){
		allYears.push(year);
	}
	return allYears;
};

commonfunctionsNamespace.getCrimeColor = function(crimename){
	"use strict";	
	let colorArray = configNamespace.STATES_AND_CRIMES.crimeColors[crimename],	
		r = colorArray[0],
		g = colorArray[1],
		b = colorArray[2],  
		color = "rgb(" + r + "," + g + "," + b + ")";	
	return color;
};

commonfunctionsNamespace.disableScroll = function(){
	"use strict";	
	window.addEventListener("scroll", commonfunctionsNamespace.freezeScroll);
};

commonfunctionsNamespace.enableScroll = function(){
	"use strict";		
	window.removeEventListener("scroll", commonfunctionsNamespace.freezeScroll);
};

commonfunctionsNamespace.freezeScroll = function(){
	"use strict";	
	let x, y = 0;
	window.scrollTo( x, y );
};
