/*---HTML ELEMENTS--*/

//htmlelementsNamespace contains all details of the charts and pages
//each object (e.g. htmlelementsNamespace.magicCircle)
//is used in a class of charts or pages

var htmlelementsNamespace = htmlelementsNamespace || {};

htmlelementsNamespace.magicCircle = {
	htmlclassname: "magicCircle",
	htmlid: "magicCircle",
	width:1000,
	height:1000,
	type: "svg",
};

htmlelementsNamespace.crimeCorrelation = {
	parentElement: htmlelementsNamespace.magicCircle,
	htmlclassname: "crimecorrelation",
	htmlid: "crimecorrelation",
	width:800,
	height:440,
	margin: {x: 20, y: 20},
	labelPositionX : 22 ,
	labelPositionY : 5 ,
	type: "svg",
	labelFontSize : "14px",
	correlationFontColor : "#CACACB",
	correlationFontSize : "14px",
	highlightLinkColor: "yellow",
	ignoreLinkColor: "#7C7C7D",
	hoverContainerColor : "rgb(63, 63, 66)",
};

htmlelementsNamespace.sunBurst = {
	parentElement: htmlelementsNamespace.magicCircle,
	htmlclassname: "sunburst",
	htmlid: "sunburst",
	width:500,
	height:500,
	type: "svg",
	fontColor: "black",
	fontSize:"12px",
};

htmlelementsNamespace.lineDiagramm = {
	parentElement: htmlelementsNamespace.magicCircle,
	htmlclassname: "linediagram",
	htmlid: "linediagram",
	width:700,
	height:400,
	type: "svg",
	xAxisLabelX : -20,
	xAxisLabelY : 35,
	yAxisLabelX : 130,
	yAxisLabelY : -55,
};

htmlelementsNamespace.theUniverse = {
	parentElement: htmlelementsNamespace.magicCircle,
	htmlclassname: "universe",
	htmlid: "universe",
	width:1200,
	height:800,
	type: "svg",
	labelColor: "#3F3F42",
	labelSize : "5px",
	hoverInLabelSize: "20px",
	hoverOutLabelSize: "5px",
	translateX : 150,
	translateY : -125,
};

htmlelementsNamespace.bubbleMenu = {
	parentElement: htmlelementsNamespace.magicCircle,
	htmlclassname: "bubblemenu",
	htmlid: "bubblemenu",
	width:180,
	height:200,
	type: "svg",
	unselectedColor: "rgb(124, 124, 125)",
	fontSize : "12px",
};

htmlelementsNamespace.colorLegend = {
	parentElement: htmlelementsNamespace.magicCircle,
	htmlclassname: "colorlegend",
	htmlid: "colorlegend",
	smallWidth:200,
	smallHeight:25,
	bigWidth: 400,
	bigHeight: 50,
	type: "svg",
	sliceNumbers: 50,
	sliceHeight: 10,
	sliceWidth: 7,
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
	labelX: 6,
	labeSize: "10px",
	labelClass: "legendlabel",
	labelType: "g",
};

htmlelementsNamespace.theMap = {
	parentElement: htmlelementsNamespace.magicCircle,
	htmlclassname: "map",
	htmlid: "map",
	width: 0,
	height: 0,
	type: "svg",
};

htmlelementsNamespace.timeLine = {
	parentElement: htmlelementsNamespace.magicCircle,
	rootclassname: "timeLine",
	childElement: "play-button",
	htmlid: "timeLine",
	width:300,
	height:80,
	type: "g",
	margin: {top:0, right:15, bottom:0, left:20},
	classSlider: "slider",
};

htmlelementsNamespace.tree = {
	parentElement: htmlelementsNamespace.magicCircle,
	rootclassname: "tree",
	htmlid: "tree",
	width:250,
	height:380,
	type: "g",
	margin: {top:20, bottom:20, left: 140, right: 140},
};

htmlelementsNamespace.dropDown = {
	parentElement: htmlelementsNamespace.magicCircle,
	htmlclassname: "dropDown",
	htmlid: "dropDown",
	width: 100,
	height: 100,
	type: "div",
	selectedColor : "green",
	unselectedColor : "gray",
};

htmlelementsNamespace.closeButton = {
	parentElement: htmlelementsNamespace.magicCircle,
	htmlclassname: "closeButton",
	htmlid: "closeButton",
	width: 15,
	height: 15,
	type: "svg",
	strokeColor : "#3F3F42",
	fillColor : "#CACACB",
	strokeWidth :2,
};

htmlelementsNamespace.playButton = {
	parentElement: htmlelementsNamespace.magicCircle,
	htmlclassname: "playButton",
	htmlid: "playButton",
	width: 100,
	height: 100,
	type: "div",
};

htmlelementsNamespace.infoBox = {
	parentElement: htmlelementsNamespace.magicCircle,
	htmlclassname: "infobox",
	htmlid: "infobox",
	width: 1000,
	height: 1000,
	type: "div",
};

htmlelementsNamespace.infoText = {
	parentElement: htmlelementsNamespace.magicCircle,
	htmlclassname: "infotext",
	htmlid: "infotext",
	width: 1000,
	height: 1000,
	type: "div",
};

htmlelementsNamespace.startContainer = {
	parentElement: htmlelementsNamespace.magicCircle,
	htmlclassname: "startContainer",
	width: 1000,
	height: 1000,
	type: "div",
};

htmlelementsNamespace.PARENT_PAGE = {
	width: 2000,
	height: 1000,
};

htmlelementsNamespace.crimeCorrelationPage = {
	htmlclassname: "correlationPage",
	htmlid: "correlationPage",
	positiveStartColor: configNamespace.CRIME_CORRELATION.lowCorrelationColor,
	positiveEndColor: configNamespace.CRIME_CORRELATION.highCorrelationColor,
	negativeStartColor:configNamespace.CRIME_CORRELATION.negativeCorrelationColorLow,
	negativeEndColor: configNamespace.CRIME_CORRELATION.negativeCorrelationColorHigh,
	positiveColorLegendTitle: "Positive Correlation",
	negativeColorLegendTitle: "Negative Correlation",
	colorLegendStartLabel: "Low Correlation",
	colorLegendEndLabel: "High Correlation",
	positivecColorLegendId : "CorrelationsPositive",
	negativeColorLegendId : "CorrelationsNegative",
	colorLegendValueDescription : " correlation: ",
};

htmlelementsNamespace.lineChartPage = {
	htmlclassname: "lineChartPage",
	htmlid: "lineChartPage",
	dropDownClassName: "dropDown crimetypes linechart",
	dropDownid: "dropDown crimetypes linechart",
	firstContainerId : "firstHalfLineChartPage",
	secondContainerId : "secondHalfLineChartPage",
	containerType: "div",
	containerWidth: 450,
	containerHeight: 200,
	firstDropDownIdStates : "firstLineChartHalf",
	firstBubbleMenuId : "firstLineChartHalf",
	secondDropDownIdStates : "secondLineChartHalf",
	secondBubbleMenuId : "secondLineChartHalf",
	firstLineChartId : "firstLineChart",
	secondLineChartId : "secondLineChart",
};

htmlelementsNamespace.mapPage = {
	htmlclassname: "mapPage",
	htmlid: "mapPage",
	mapVictimInhabitants: "victims per 100.000 inhabitants",
	mapNotClickableHint: "not clickable",
	mapInfoLabel: "Click on map",
	playButtonText: "show development over years",
	colorLegendStartLabel: "lowest crime rate",
	colorLegendEndLabel: "highest crime rate",
	colorLegendTitle: "",
	colorLegendValueDescription: "crimes per 100k:  ",
};

htmlelementsNamespace.universePage = {
	htmlclassname: "universePage",
	htmlid: "universePage",
	timeLineClassName: "timeLine universe",
	timeLineClassid: "timeLine universe",
	playButtonText: "rotate planets",
	colorLegendValueDescription: "percentage:  ",
};

htmlelementsNamespace.popupPage = {
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

htmlelementsNamespace.infoPage = {
	htmlclassname: "infoPage",
	htmlid: "infoPage",
	textid: "popupPage text",
	deleteButtonName: "deleteButton popUp",
	deleteButtonid: "deleteButton popUp",
	width: 1000,
	height: 500,
};

htmlelementsNamespace.startPage = {
	htmlclassname: "startPage",
	htmlid: "startPage",
	textid: "startPageText",
	infoTextId: "StartPage",
};

htmlelementsNamespace.impressumPage = {
	htmlclassname: "impressumPage",
	htmlid: "impressumPage",
	textid: "impressumText",
	infoTextId: "ImpressumPage",
};

htmlelementsNamespace.dataRegulationPage = {
	htmlclassname: "dataRegulationPage",
	htmlid: "dataRegulationPage",
	textid: "dataRegulationText",
	infoTextId: "dataRegulationPage",
};
