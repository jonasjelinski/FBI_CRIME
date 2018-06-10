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
	width:500,
	height:500,
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
	width:3000,
	height:3000,
	type: "svg",
};

htmlelementsNamespace.THE_MAP = {
	parentElement: htmlelementsNamespace.MAGIC_CIRCLE,
	htmlclassname: "map",
	htmlid: "map",
	width: 3000,
	height: 3000,
	type: "svg",
};

htmlelementsNamespace.DROP_DOWN = {
	parentElement: htmlelementsNamespace.MAGIC_CIRCLE,
	htmlclassname: "dropDown",
	htmlid: "dropDown",
	width: 3000,
	height: 3000,
	type: "div",
	selectedColor : "green",
	unselectedColor : "gray", 
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
