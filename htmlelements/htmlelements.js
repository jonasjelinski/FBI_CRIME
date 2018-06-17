//htmlelementsNamespace contains all details of the charts and pages
//each object (e.g. htmlelementsNamespace.MAGIC_CIRCLE) 
//is used in a class of classes or pages

var htmlelementsNamespace = htmlelementsNamespace || {};

htmlelementsNamespace.MAGIC_CIRCLE = { //Elternelement aller anderen HTML-Elemente
	htmlclassname: "magicCircle", //im html-Element class="magicCircle"
	htmlid: "magicCircle", //im html-Element id="magicCircle"
	width:1000,
	height:1000,
	type: "svg",
};

htmlelementsNamespace.CRIME_CORRELATION = {
	parentElement: htmlelementsNamespace.CRIME_CORRELATION,
	htmlclassname: "crimecorrelation",
	htmlid: "crimecorrelation",
	width:3000,
	height:3000,
	type: "svg",
	fontColor: "black",
};

htmlelementsNamespace.SUN_BURST = {
	parentElement: htmlelementsNamespace.MAGIC_CIRCLE,
	htmlclassname: "sunburst",
	htmlid: "sunburst",
	width:500,
	height:500,
	type: "svg",
	fontColor: "black",
};

htmlelementsNamespace.LINE_DIAGRAM = {
	parentElement: htmlelementsNamespace.MAGIC_CIRCLE,
	htmlclassname: "linediagram",
	htmlid: "linediagram",
	width:650,
	height:400,
	type: "svg",
};

htmlelementsNamespace.THE_FORCE = {
	parentElement: htmlelementsNamespace.MAGIC_CIRCLE,
	htmlclassname: "theforce",
	htmlid: "theforce",
	width:3000,
	height:3000,
	type: "svg",
};

htmlelementsNamespace.THE_UNIVERSE = {
	parentElement: htmlelementsNamespace.MAGIC_CIRCLE,
	htmlclassname: "universe",
	htmlid: "universe",
	width:2000,
	height:1000,
	type: "svg",
};

htmlelementsNamespace.COLOR_LEGEND = {
	parentElement: htmlelementsNamespace.MAGIC_CIRCLE,
	htmlclassname: "colorlegend",
	htmlid: "colorlegend",
	width:2000,
	height:1000,
	type: "svg",	
	sliceNumbers: 50,
	sliceHeight: 100,
	sliceWidth: 10,
	sliceY: 20,
	sliceX: 10,
	sliceClass: "legendslice",
	sliceType: "g",
	titleY: 100,
	titleX: 50,
	titleSize: "20px",
	titleClass: "legendtitle",
	titleType: "g",
	labelY: 220,
	labelX: 10,
	labeSize: "20px",
	labelClass: "legendlabel",
	labelType: "g",
};

htmlelementsNamespace.THE_MAP = {
	parentElement: htmlelementsNamespace.MAGIC_CIRCLE,
	htmlclassname: "map",
	htmlid: "map",
	width: 3000,
	height: 3000,
	type: "svg",
};

htmlelementsNamespace.TIME_LINE = {
	parentElement: htmlelementsNamespace.MAGIC_CIRCLE,
	rootclassname: "timeLine",
	childElement: "play-button",
	htmlid: "timeLine",
	width:360,
	height:160,
	type: "g",
	margin: {top:15, right:15, bottom:15, left:15},
	classSlider: "slider",
};

htmlelementsNamespace.TREE = {
	parentElement: htmlelementsNamespace.MAGIC_CIRCLE,
	rootclassname: "tree",
	htmlid: "tree",
	width:960,
	height:520,
	type: "g",
	margin: {top:20, right:120, bottom:20, left:120}
};

htmlelementsNamespace.DROP_DOWN = {
	parentElement: htmlelementsNamespace.MAGIC_CIRCLE,
	htmlclassname: "dropDown",
	htmlid: "dropDown",
	width: 100,
	height: 100,
	type: "div",
	selectedColor : "green",
	unselectedColor : "gray",
};

htmlelementsNamespace.CLOSE_BUTTON = {
	parentElement: htmlelementsNamespace.MAGIC_CIRCLE,
	htmlclassname: "closeButton",
	htmlid: "closeButton",
	width: 50,
	height: 50,
	type: "svg",
	strokeColor : "black",
	fillColor : "gray",
	strokeWidth :2,
};

htmlelementsNamespace.PLAY_BUTTON = {
	parentElement: htmlelementsNamespace.MAGIC_CIRCLE,
	htmlclassname: "playButton",
	htmlid: "playButton",
	width: 100,
	height: 100,
	type: "button",
};

htmlelementsNamespace.INFO_BOX = {
	parentElement: htmlelementsNamespace.MAGIC_CIRCLE,
	htmlclassname: "infobox",
	htmlid: "infobox",
	width: 1000,
	height: 1000,
	type: "svg",
};

htmlelementsNamespace.PARENT_PAGE = {
	width: 2000,
	height: 1000,
};

htmlelementsNamespace.CRIME_CORRELATION_PAGE = {
	htmlclassname: "correlationPage",
	htmlid: "correlationPage",
};

htmlelementsNamespace.LINE_CHART_PAGE = {
	htmlclassname: "lineChartPage",
	htmlid: "lineChartPage",
	dropDownClassName: "dropDown crimetypes linechart",
	dropDownid: "dropDown crimetypes linechart",
};

htmlelementsNamespace.MAP_PAGE = {
	htmlclassname: "mapPage",
	htmlid: "mapPage",
};

htmlelementsNamespace.UNIVERSE_PAGE = {
	htmlclassname: "universePage",
	htmlid: "universePage",
	timeLineClassName: "timeLine universe",
	timeLineClassid: "timeLine universe",
};

htmlelementsNamespace.POPUP_PAGE = {
	htmlclassname: "popupPage",
	htmlid: "popupPage",
	sunburstclassname: "popupPage sunburst",
	sunburstid: "popupPage sunburst",
	textclassname: "popupPage text",
	textid: "popupPage text",
	treeClassName: "popupPage tree",
	treeid: "popupPage tree",
	deleteButtonName: "deleteButton popUp",
	deleteButtonid: "deleteButton popUp",
	width: 1000,
	height: 500,
};

htmlelementsNamespace.INFO_PAGE = {
	htmlclassname: "infoPage",
	htmlid: "infoPage",	
	textid: "popupPage text",	
	deleteButtonName: "deleteButton popUp",
	deleteButtonid: "deleteButton popUp",
	width: 1000,
	height: 500,
};

