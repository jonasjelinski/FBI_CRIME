var configNamespace = configNamespace || {};

configNamespace.FILE_PATHES = {
	jsonpath: "./store/crimes.json",
	mappath: "./store/states.json",
	crimeCorrelations : "./store/crimeCorrelations.csv",
};

configNamespace.STATES_AND_CRIMES = {
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
		violentCrime: [175, 50, 0],
		propertyCrime : [7, 13, 125],
		Burglary: [0, 93, 89],
		Larcenytheft: [1, 91, 112],
		Motorvehicletheft : [4, 54, 118],
		Aggravatedassault : [108, 118, 0],
		MurderManslaughter : [120, 34, 0],
		Rape: [175, 104, 0],
		Robbery: [175, 145, 0],
	},
	maxYear : 2016,
	minYear : 2000,
};

configNamespace.REALCRIMENAMES = {
	realCrimeNames: {
		["propertyCrime"]: "Property crime",
		["Property crime"]: "propertyCrime",
		["Burglary"]: "Burglary ",
		["Burglary "]: "Burglary",
		["Larcenytheft"]: "Larency theft",
		["Larency theft"]: "Larcenytheft",
		["Motorvehicletheft"]: "Motor vehicle theft",
		["Motor vehicle theft"]: "Motorvehicletheft",
		["violentCrime"]: "Violent crime",
		["Violent crime"]: "violentCrime",
		["Aggravatedassault"]: "Aggravated assault",
		["Aggravated assault"]: "Aggravatedassault",
		["MurderManslaughter"]: "Murder manslaughter",
		["Murder manslaughter"]: "MurderManslaughter",
		["Rape"]: "Rape ",
		["Rape "]: "Rape",
		["Robbery"]: "Robbery ",
		["Robbery "]: "Robbery",
	},
};

configNamespace.STATE_MACHINE = {
	START : "START",
	MAP: "MAP",
	LINE_CHART: "LINE_CHART",
	CRIME_CORRELATION: "CRIME_CORRELATION",
	UNIVERSE: "UNIVERSE",
	IMPRESSUM: "IMPRESSUM",
	DATA_REGULATION: "DATA_REGULATION",
	STATES: [this.START, this.MAP, this.LINE_CHART, this.CRIME_CORRELATION, this.UNIVERSE],
};

configNamespace.CRIME_CORRELATION = {
	high: [0.5,1],
	moderate:[0.5, 0.3],
	weak:[0.3, 0.1],
	none: [0.1,0],
	highCorrelationRed : 255,
	highCorrelationGreen : 1,
	highCorrelationBlue : 1,
	highCorrelationColor : "rgb(255,1,1)",
	lowCorrelationRed : 1,
	lowCorrelationGreen : 1,
	lowCorrelationBlue : 255,
	lowCorrelationColor: "rgb(1,1,255)",
	negativeCorrelationRedHigh : 0,
	negativeCorrelationGreenHigh : 255,
	negativeCorrelationBlueHigh : 0,
	negativeCorrelationColorHigh : "rgb(0,255,0)",
	negativeCorrelationRedLow : 0,
	negativeCorrelationGreenLow : 0,
	negativeCorrelationBlueLow : 0,
	negativeCorrelationColorLow : "rgb(0,0,0)",
};

configNamespace.JSON_OBJECT = false;

configNamespace.MAP_JSON_OBJECT = false;

configNamespace.CRIME_CORRELATIONS = false;
