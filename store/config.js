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
	states : ['TEXAS'],
	crimeCategories : {Crimes : { propertyCrime : ['Burglary', 'Larcenytheft', 'Motorvehicletheft'], violentCrime : ['Aggravatedassault', 'MurderManslaughter', 'Rape', 'Robbery']}},
	crimeTypesProperty : ['Burglary', 'Larcenytheft', 'Motorvehicletheft'],
	crimeTypesViolence : ['Aggravatedassault', 'MurderManslaughter', 'Rape', 'Robbery'],
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
	minYear : 2000
};

config_namespace.STATE_MACHINE = {	
	MAP: "MAP",
	LINE_CHART: "LINE_CHART",
	FORCE: "FORCE",
	UNIVERSE: "UNIVERSE",
	STATES: [this.MAP, this.LINE_CHART, this.FORCE, this.UNIVERSE]
};

config_namespace.JSON_OBJECT = false;

config_namespace.MAP_JSON_OBJECT = false;

config_namespace.SCRIPT_PATHES = ["./libs/d3/d3.js","./libs/d3/d3.tip.js","./libs/topoJson/topojson.v1.min.js", "./store/config.js", "./store/dynamics.js",
"./htmlelements/htmlelements.js","./store/commonfunctions.js", "./classes/lama.js",
"./classes/linechart.js", "classes/magicCircle.js","./classes/force.js","./classes/universe.js","./classes/map.js","./classes/infoBox.js",
  "./components/components.js", "./actions/actions.js", "./listener/listener.js"];

config_namespace.FIRST_SCRIPTS = ["./libs/d3/d3.js", "./libs/d3/d3.tip.js","./libs/topoJson/topojson.v1.min.js","./store/config.js",
"./store/dynamics.js","./store/commonfunctions.js", "./htmlelements/htmlelements.js"];
config_namespace.SECOND_SCRIPTS = ["./classes/lama.js", "./classes/magicCircle.js", "./classes/map.js",
"./classes/sunburst.js", "./classes/linechart.js","./classes/force.js","./classes/universe.js","./classes/infoBox.js",
"./components/components.js", "./actions/actions.js", "./listener/listener.js"];
