var commonfunctionsNamespace = commonfunctionsNamespace || {};

commonfunctionsNamespace.loadCSV = function(){
	"use strict"
	try{
		let data; 
		d3.csv(configNamespace.FILE_PATHES.csvpath, function(csvdata){
			data = csvdata;
		}
		);
		return data;
	}
	catch(err){
		console.log("couldn't load csv "+err);   
	} 
};

commonfunctionsNamespace.loadJson = function(callback){
	"use strict"
	try{        
				d3.json(configNamespace.FILE_PATHES.jsonpath, function(jsondata) {         
														configNamespace.JSON_OBJECT = jsondata;
														callback(null);                            
													}                          
										);    
	}
	catch(err){
		console.log("couldn't load json "+err);   
	}

};

commonfunctionsNamespace.loadMapJsonObject = function(callback){
	try{        
				d3.json(configNamespace.FILE_PATHES.mappath, function(jsondata) {         
														configNamespace.MAP_JSON_OBJECT = jsondata;
														callback(null);                            
													}                          
										);    
	}
	catch(err){
		console.log("couldn't load json "+err);   
	}

};

commonfunctionsNamespace.setJsonObject = function(){
	"use strict"; 
	var q=d3.queue();
	q.defer(commonfunctionsNamespace.loadJson);  
	q.await(function(error) {
		if (error) throw error;
		commonfunctionsNamespace.setChartsCanBeBuild(true);
	}); 
};

commonfunctionsNamespace.setMapJsonObject = function(){
	"use strict"; 
	var q=d3.queue();
	q.defer(commonfunctionsNamespace.loadMapJsonObject);  
	q.await(function(error) {
		if (error) throw error;	
	}); 
}

commonfunctionsNamespace.setChartsCanBeBuild = function(trueOrFalse){	
	dynamicsNamespace.chartsCanBeBuild = trueOrFalse;
};

commonfunctionsNamespace.getJsonObject = function(){
		return configNamespace.CONSTANTS.jsonObject;
};

commonfunctionsNamespace.getRootElement = function(environment){
					rootElement = d3.selectAll("#"+environment.pageId);
					return rootElement;        
};

commonfunctionsNamespace.getPageById = function(pageId){
					let id = "#"+ pageId,					
					page = d3.selectAll(id);
					return page;        
};

commonfunctionsNamespace.getStatesAndDataByYear = function(year, jsondata){
	let yearAsString = year.toString();

	return jsondata.years[yearAsString];
};

commonfunctionsNamespace.getCrimesAndDataByYearAndState = function(year, statename, jsondata){
	let statesData = commonfunctionsNamespace.getStatesAndDataByYear(year, jsondata); 
	let crimeData = statesData.states[statename];
	//console.log("year ",year, " statesData ",statesData, " crimeData ", crimeData, "statename", statename, "type", typeof(statename)); 
	return crimeData; 
};

//returns violent crimes object
commonfunctionsNamespace.getViolentCrimes = function(year, statename, jsondata){
	let crimeData = commonfunctionsNamespace.getCrimesAndDataByYearAndState(year, statename, jsondata);
	let violentCrimes = crimeData.crimes.violentCrime;
 //console.log("getVC ", crimeData, " violentCrimes", violentCrimes);
	return violentCrimes;
};

//returns property crimes object
commonfunctionsNamespace.getPropertyCrimes = function(year, statename, jsondata){
	let crimeData = commonfunctionsNamespace.getCrimesAndDataByYearAndState(year, statename, jsondata);
	//console.log(year, statename);
	//console.log("gPC ",crimeData);
	let propertyCrimes = crimeData.crimes.propertyCrime;
	//console.log("getPC ", crimeData, " propCrimes", propertyCrimes);
	return propertyCrimes;
};

//returns the crimerate per 100 0000 people
commonfunctionsNamespace.getCrimerateByCrimeType = function(year, statename, crime, jsondata){
	let propertyCrimes = configNamespace.CONSTANTS.crimeTypesProperty;
	let violentCrimes = configNamespace.CONSTANTS.crimeTypesViolence;
	let errorValue = 0;


	if (propertyCrimes.includes(crime)){
		let propCrimes = commonfunctionsNamespace.getPropertyCrimes(year, statename, jsondata);
		let crimeString = ''+crime+'';
		
		let crimerate = propCrimes[crimeString];
		//console.log("prop ",propCrimes," crime", crimeString," crimerate", crimerate);  
		return crimerate;

	}

	else if(violentCrimes.includes(crime)){
		let vioCrimes = commonfunctionsNamespace.getViolentCrimes(year, statename, jsondata);
		let crimeString = ''+crime+'';
		let crimerate = vioCrimes[crimeString];
		return crimerate;
	}

	else{    
		console.log("given crime not in crimes crime: ",crime, "crimes propertyCrimes", propertyCrimes, "violentCrimes", violentCrimes);
		return errorValue;
	}
}; 

//returns an object
commonfunctionsNamespace.getAllCategories = function(){
	let categories = configNamespace.CONSTANTS.crimecategories;
	return categories;
};

//returns an array
commonfunctionsNamespace.getAllStates = function(){
	let states = configNamespace.CONSTANTS.states;
	return states;
};

commonfunctionsNamespace.getAllYears = function(){
	let maxYear = configNamespace.CONSTANTS.maxYear;
	let minYear = configNamespace.CONSTANTS.minYear;
	let allYears = [];
	for(let year= minYear; year <= maxYear; year++){
		allYears.push(year);
	}
	return allYears;
};

commonfunctionsNamespace.getCrimeColor = function(crimename){
	try{


	let colorArray = configNamespace.CONSTANTS.crimeColors[crimename];
	
	let r = colorArray[0];
	let g = colorArray[1];
	let b = colorArray[2];  
	let color = 'rgb(' + r + ',' + g + ',' + b + ')';
	
	return color;
	}

	catch(error){
	 // console.log("getCrimeColor ",error);
	}  

};

//returns a rgb color depending on the paramter 'multipiler'
// 0 is red, 100 is  green
//source: https://stackoverflow.com/questions/17525215/calculate-color-values-from-green-to-red
commonfunctionsNamespace.getSingleColor = function(multipiler){
	let degree = 1.2;
	let fullCircle = 360;
	let hueColor = multipiler * degree/fullCircle;
	let saturation = 1;
	let brightness  = 0.5;
	let rgbColor = commonfunctionsNamespace.HSVtoRGB(hueColor, saturation, brightness);
	console.log(multipiler, rgbColor);
	return 'rgb(' + rgbColor.r + ',' + rgbColor.g + ',' + rgbColor.b + ')'; 
};

//converts hsv to rgb values
//source: https://stackoverflow.com/questions/17242144/javascript-convert-hsb-hsv-color-to-rgb-accurately
commonfunctionsNamespace.HSVtoRGB = function(h, s, v) {
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