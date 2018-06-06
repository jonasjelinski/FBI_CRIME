var config_namespace = config_namespace || {};

config_namespace.CLICKLISTENER = {
    dochart: "dochart"
};

config_namespace.HTML_IDS = {
    mychart: "myChart"
};

config_namespace.HTML_TYPES = {
    g: "g",
    svg: "svg"
};

config_namespace.FILE_PATHES = {
	csvpath: "./store/elements-by-episode.csv",
	jsonpath: "./store/crimes.json",
	mappath: "./store/states.json"
};

config_namespace.CONSTANTS = {
	states : ['ALABAMA','ALASKA','ARIZONA','ARKANSAS','CALIFORNIA','COLORADO','CONNECTICUT','DELAWARE','COLUMBIA','FLORIDA','GEORGIA','HAWAII','IDAHO','ILLINOIS','INDIANA','IOWA','KANSAS','KENTUCKY','LOUISIANA','MAINE','MARYLAND','MASSACHUSETTS','MICHIGAN','MINNESOTA','MISSISSIPPI','MISSOURI','MONTANA','NEBRASKA','NEVADA','NEW HAMPSHIRE','NEW JERSEY','NEW MEXICO','NEW YORK','NORTH CAROLINA','NORTH DAKOTA','OHIO','OKLAHOMA','OREGON','PENNSYLVANIA','PUERTO RICO','RHODE ISLAND','SOUTH CAROLINA','SOUTH DAKOTA','TENNESSEE','TEXAS','UTAH','VERMONT','VIRGINIA','WASHINGTON','WEST VIRGINIA','WISCONSIN','WYOMING'],
	crimeCategories : {Crimes : { propertyCrime : ['Burglary', 'Larcenytheft', 'Motorvehicletheft'], violentCrime : ['Aggravatedassault', 'MurderManslaughter', 'Rape', 'Robbery']}},
  crimeCategoriesAsText : {Crimes : { propertyCrime : [{crimeType:'Burglary',crimeText:'Burglary'}, {crimeType:'Larcenytheft',crimeText:'Larceny Theft'}, {crimeType:'Motorvehicletheft',crimeText: 'Motor Vehicle Theft'}], violentCrime : [{crimeType:'Aggravatedassault',crimeText:'Aggravate Assault'}, {crimeType:'MurderManslaughter',crimeText:'Murder/Manslaughter'}, {crimeType:'Rape',crimeText:'Rape'}, {crimeType: 'Robbery', crimeText:'Robbery'}]}},
	crimeTypesProperty : ['Burglary', 'Larcenytheft', 'Motorvehicletheft'],
	crimeTypesViolence : ['Aggravatedassault', 'MurderManslaughter', 'Rape', 'Robbery'],
	crimeColors :{
		Crimes: [22,22,22],
		violentCrime: [33,65,221],
		propertyCrime : [221, 64, 33],
		Burglary: [255,255,255],
		Larcenytheft: [0,255,0],
		Motorvehicletheft : [0,0,255],
		Aggravatedassault : [255,0,255],
		MurderManslaughter : [255, 0, 0],
		Rape: [255,255,0],
		Robbery:[125,0,125]
	},
	maxYear : 2016,
	minYear : 2000
};

config_namespace.JSON_OBJECT = false;

config_namespace.MAP_JSON_OBJECT = false;

config_namespace.SCRIPT_PATHES = [
  "./libs/d3/d3.js",
  "./libs/d3/d3.tip.js",
  "./libs/topoJson/topojson.v1.min.js",
  "./libs/d3/d3.queue.js",
  "./store/config.js",
  "./store/dynamics.js",
  "./htmlelements/htmlelements.js",
  "./store/commonfunctions.js",
  "./classes/lama.js",
  "./classes/linechart.js",
  "./classes/magicCircle.js",
  "./classes/force.js",
  "./classes/universe.js",
  "./classes/map.js",
  "./classes/timeLine.js",
  "./classes/dropDown.js",
  "./components/components.js",
  "./actions/actions.js",
  "./listener/listener.js"
];

config_namespace.FIRST_SCRIPTS = [
  "./libs/d3/d3.js",
  "./libs/d3/d3.tip.js",
  "./libs/d3/d3.queue.js",
  "./libs/topoJson/topojson.v1.min.js",
  "./store/config.js",
  "./store/dynamics.js",
  "./store/commonfunctions.js",
  "./htmlelements/htmlelements.js"
];

config_namespace.SECOND_SCRIPTS = [
  "./classes/lama.js",
  "./classes/magicCircle.js",
  "./classes/map.js",
  "./classes/timeLine.js",
  "./classes/dropDown.js",
  "./classes/sunburst.js",
  "./classes/linechart.js",
  "./classes/force.js",
  "./classes/universe.js",
  "./components/components.js",
  "./actions/actions.js",
  "./listener/listener.js"
];
