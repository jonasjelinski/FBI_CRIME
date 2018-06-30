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
	width:1000,
	height:1000,
	type: "svg",
	fontColor: "black",
	highlightLinkColor: "yellow",
	ignoreLinkColor: "gray",
};

htmlelementsNamespace.SUN_BURST = {
	parentElement: htmlelementsNamespace.MAGIC_CIRCLE,
	htmlclassname: "sunburst",
	htmlid: "sunburst",
	width:500,
	height:500,
	type: "svg",
	fontColor: "black",
	fontSize:"20px",
};

htmlelementsNamespace.LINE_DIAGRAM = {
	parentElement: htmlelementsNamespace.MAGIC_CIRCLE,
	htmlclassname: "linediagram",
	htmlid: "linediagram",
	width:500,
	height:500,
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
	width:1200,
	height:500,
	type: "svg",
	labelColor: "pink",
	labelSize : "10px",
};

htmlelementsNamespace.BUBBLE_MENU = {
	parentElement: htmlelementsNamespace.MAGIC_CIRCLE,
	htmlclassname: "bubblemenu",
	htmlid: "bubblemenu",
	width:100,
	height:100,
	type: "svg",
	unselectedColor: "rgb(128, 128, 128)",
	fontSize : "10px"
};

htmlelementsNamespace.COLOR_LEGEND = {
	parentElement: htmlelementsNamespace.MAGIC_CIRCLE,
	htmlclassname: "colorlegend",
	htmlid: "colorlegend",
	width:2000,
	height:1000,
	type: "svg",
	sliceNumbers: 50,
	sliceHeight: 10,
	sliceWidth: 10,
	sliceY: 20,
	sliceX: 10,
	sliceClass: "legendslice",
	sliceType: "g",
	titleY: 35,
	titleX: 150,
	titleSize: "15px",
	titleClass: "legendtitle",
	titleType: "g",
	labelY: 35,
	labelX: 9,
	labeSize: "10px",
	labelClass: "legendlabel",
	labelType: "g",
};

htmlelementsNamespace.THE_MAP = {
	parentElement: htmlelementsNamespace.MAGIC_CIRCLE,
	htmlclassname: "map",
	htmlid: "map",
	width: 0,
	height: 0,
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
	margin: {top:15, right:20, bottom:0, left:20},
	classSlider: "slider",
};

htmlelementsNamespace.TREE = {
	parentElement: htmlelementsNamespace.MAGIC_CIRCLE,
	rootclassname: "tree",
	htmlid: "tree",
	width:300,
	height:380,
	type: "g",
	margin: {top:20, bottom:20, left: 140, right: 140},
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
	width: 15,
	height: 15,
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
	startColor: configNamespace.CRIME_CORRELATION.lowCorrelationColor,
	endColor: configNamespace.CRIME_CORRELATION.highCorrelationColor,
	colorLegendTitle: "Correlation between Crime Types",
	colorLegendStartLabel: "No Correlation",
	colorLegendEndLabel: "High Correlation",
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
