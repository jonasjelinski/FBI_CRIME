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
	jsonpath: "./store/crimes.json"
};

config_namespace.CONSTANTS = {
	states : ['TEXAS'],
	crimeCategories : {Crimes : { propertyCrime : ['Burglary', 'Larcenytheft', 'Motorvehicletheft'], violentCrime : ['Aggravatedassault', 'MurderManslaughter', 'Rape', 'Robbery']}},
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

config_namespace.SCRIPT_PATHES = ["./libs/d3/d3.js", "./store/config.js", "./store/dynamics.js",
"./htmlelements/magicCircle.js","./store/commonfunctions.js", "./classes/lama.js",
"./classes/linechart.js", "classes/magicCircle.js","./classes/force.js",
  "./components/components.js", "./actions/actions.js", "./listener/listener.js"];  

config_namespace.FIRST_SCRIPTS = ["./libs/d3/d3.js", "./store/config.js", 
"./store/dynamics.js","./store/commonfunctions.js", "./htmlelements/magicCircle.js"];
config_namespace.SECOND_SCRIPTS = ["./classes/lama.js", "./classes/magicCircle.js", 
"./classes/sunburst.js", "./classes/linechart.js","./classes/force.js",
  "./components/components.js", "./actions/actions.js", "./listener/listener.js"];