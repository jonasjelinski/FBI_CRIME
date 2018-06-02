var htmlelementsNamespace = htmlelementsNamespace || {};

htmlelementsNamespace.MAGIC_CIRCLE = { //Elternelement aller anderen HTML-Elemente
	rootclassname: "magicCircle", //im html-Element class="magicCircle"
	rootid: "magicCircle", //im html-Element id="magicCircle"
	width:1000,
	height:100,
	type: "g"
};

htmlelementsNamespace.SUN_BURST = {
	parentElement: htmlelementsNamespace.MAGIC_CIRCLE,
	rootclassname: "sunburst",
	rootid: "sunburst",
	width:500,
	height:500,
	type: "g",
	fontColor: "black"
};

htmlelementsNamespace.LINE_DIAGRAM = {
	parentElement: htmlelementsNamespace.MAGIC_CIRCLE,
	rootclassname: "linediagram",
	rootid: "linediagram",
	width:650,
	height:400,
	type: "g"
};

htmlelementsNamespace.THE_FORCE = {
	parentElement: htmlelementsNamespace.MAGIC_CIRCLE,
	rootclassname: "theforce",
	rootid: "theforce",
	width:3000,
	height:3000,
	type: "g"
};

htmlelementsNamespace.THE_UNIVERSE = {
	parentElement: htmlelementsNamespace.MAGIC_CIRCLE,
	rootclassname: "universe",
	rootid: "universe",
	width:3000,
	height:3000,
	type: "g"
};

htmlelementsNamespace.THE_MAP = {
	parentElement: htmlelementsNamespace.MAGIC_CIRCLE,
	rootclassname: "map",
	rootid: "map",
	width: 3000,
	height: 3000,
	type: "g"
};

htmlelementsNamespace.INFO_BOX = {
	parentElement: htmlelementsNamespace.MAGIC_CIRCLE,
	rootclassname: "infobox",
	rootid: "infobox",
	width: 1000,
	height: 1000,
	type: "svg"
};
