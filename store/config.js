var configNamespace = configNamespace || {};

configNamespace.CLICKLISTENER = {
	dochart: "dochart"
};

configNamespace.HTML_IDS = {
	mychart: "myChart"
};

configNamespace.HTML_TYPES = {
	g: "g",
	svg: "svg"
};

configNamespace.FILE_PATHES = {	
	jsonpath: "./store/crimes.json",
	mappath: "./store/states.json",
	crimeCorrelations : "./store/crimeCorrelations.csv",
};

configNamespace.CONSTANTS = {
	states : ["TEXAS"],
	crimeCategories : {Crimes : { propertyCrime : ["Burglary", "Larcenytheft", "Motorvehicletheft"], violentCrime : ["Aggravatedassault", "MurderManslaughter", "Rape", "Robbery"]}},
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
	minYear : 2000
};

configNamespace.STATE_MACHINE = {	
	MAP: "MAP",
	LINE_CHART: "LINE_CHART",
	CRIME_CORRELATION: "CRIME_CORRELATION",
	UNIVERSE: "UNIVERSE",
	STATES: [this.MAP, this.LINE_CHART, this.CRIME_CORRELATION, this.UNIVERSE]
};

configNamespace.JSON_OBJECT = false;

configNamespace.MAP_JSON_OBJECT = false;

configNamespace.CRIME_CORRELATIONS = false;

configNamespace.SCRIPT_PATHES = [
	"./libs/d3/d3.js",
	"./libs/d3/d3.tip.js",
	"./libs/topoJson/topojson.v1.min.js", 
	"./store/config.js", 
	"./store/dynamics.js",
	"./htmlelements/htmlelements.js",
	"./store/commonfunctions.js", 
	"./classes/lama.js",
	"./classes/linechart.js", 
	"classes/magicCircle.js",
	"./classes/force.js",
	"./classes/universe.js",
	"./classes/map.js",
	"./classes/infoBox.js", 
	"./classes/crimeCorrelation.js",
	"./classes/dropDownMenu.js",
	"./classes/closeButton.js",
	"./pages/parentPage.js", 
	"./pages/crimeCorrelationPage.js", 
	"./pages/lineChartPage.js", 
	"./pages/mapPage.js", 
	"./pages/universePage.js",
	"./pages/popUpPage.js",
	"./logic/stateMachine.js",
	"./components/components.js", 
	"./actions/actions.js", 
	"./listener/listener.js"];

configNamespace.FIRST_SCRIPTS = [
	"./libs/d3/d3.js", 
	"./libs/d3/d3.tip.js",
	"./libs/topoJson/topojson.v1.min.js",
	"./store/config.js",
	"./store/dynamics.js",
	"./store/commonfunctions.js", 
	"./htmlelements/htmlelements.js"];

configNamespace.SECOND_SCRIPTS = [
	"./classes/lama.js", 
	"./classes/magicCircle.js", 
	"./classes/map.js",
	"./classes/sunburst.js", 
	"./classes/linechart.js",
	"./classes/force.js",
	"./classes/universe.js",
	"./classes/infoBox.js",
	"./classes/crimeCorrelation.js",
	"./classes/closeButton.js",
	"./pages/parentPage.js",  
	"./pages/crimeCorrelationPage.js",
	"./classes/dropDownMenu.js", 
	"./pages/lineChartPage.js", 
	"./pages/mapPage.js", 
	"./pages/universePage.js",
	"./pages/popUpPage.js",
	"./logic/stateMachine.js",
	"./components/components.js", 
	"./actions/actions.js", 
	"./listener/listener.js"];
