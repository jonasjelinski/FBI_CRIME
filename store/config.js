var configNamespace = configNamespace || {};

configNamespace.CLICKLISTENER = {
	dochart: "dochart",
};

configNamespace.HTML_IDS = {
	mychart: "myChart",
};

configNamespace.HTML_TYPES = {
	g: "g",
	svg: "svg",
};

configNamespace.FILE_PATHES = {
	jsonpath: "./store/crimes.json",
	mappath: "./store/states.json",
	crimeCorrelations : "./store/crimeCorrelations.csv",
};

configNamespace.CONSTANTS = {
	states : ['ALABAMA','ALASKA','ARIZONA','ARKANSAS','CALIFORNIA','COLORADO','CONNECTICUT','DELAWARE','COLUMBIA','FLORIDA','GEORGIA','HAWAII','IDAHO','ILLINOIS','INDIANA','IOWA','KANSAS','KENTUCKY','LOUISIANA','MAINE','MARYLAND','MASSACHUSETTS','MICHIGAN','MINNESOTA','MISSISSIPPI','MISSOURI','MONTANA','NEBRASKA','NEVADA','NEW HAMPSHIRE','NEW JERSEY','NEW MEXICO','NEW YORK','NORTH CAROLINA','NORTH DAKOTA','OHIO','OKLAHOMA','OREGON','PENNSYLVANIA','PUERTO RICO','RHODE ISLAND','SOUTH CAROLINA','SOUTH DAKOTA','TENNESSEE','TEXAS','UTAH','VERMONT','VIRGINIA','WASHINGTON','WEST VIRGINIA','WISCONSIN','WYOMING'],
	crimeCategories : {
		Crimes : { 
			propertyCrime : ["Burglary", "Larcenytheft", "Motorvehicletheft"], 
			violentCrime : ["Aggravatedassault", "MurderManslaughter", "Rape", "Robbery"],
		},
	},
	crimeTypesProperty : ["Burglary", "Larcenytheft", "Motorvehicletheft"],
	crimeTypesViolence : ["Aggravatedassault", "MurderManslaughter", "Rape", "Robbery"],
	crimeColors :{
		Crimes: [22,22,22],
		violentCrime: [214, 20, 0],
		propertyCrime : [12, 67, 206],
		Burglary: [0, 209, 114],
		Larcenytheft: [0, 195, 195],
		Motorvehicletheft : [7, 117, 201],
		Aggravatedassault : [255, 113, 0],
		MurderManslaughter : [255, 211, 85],
		Rape: [255, 188, 0],
		Robbery: [255, 154, 0],
	},
	maxYear : 2016,
	minYear : 2000,
};

configNamespace.STATE_MACHINE = {
	MAP: "MAP",
	LINE_CHART: "LINE_CHART",
	CRIME_CORRELATION: "CRIME_CORRELATION",
	UNIVERSE: "UNIVERSE",
	STATES: [this.MAP, this.LINE_CHART, this.CRIME_CORRELATION, this.UNIVERSE],
};

configNamespace.CRIME_CORRELATION = {
	high: [0.5,1],
	moderate:[0.5, 0.3],
	weak:[0.3, 0.1],
	none: [0.1,0],
	highCorrelationRed : 255,
	highCorrelationGreen : 255,
	highCorrelationBlue : 255,
	highCorrelationColor : "rgb(255,255,255)",
	lowCorrelationColor: "rgb(0,0,0)",
};

configNamespace.DROP_DOWN_IDS = {
	dropDownIdCrimes :"crimes",
	dropDownIdStates : "states",
	dropDownIdMap : "map",
};

configNamespace.JSON_OBJECT = false;

configNamespace.MAP_JSON_OBJECT = false;

configNamespace.CRIME_CORRELATIONS = false;

