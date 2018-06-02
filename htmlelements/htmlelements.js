	var htmlel_namespace = htmlel_namespace || {};

htmlel_namespace.MAGIC_CIRCLE = { //Elternelement aller anderen HTML-Elemente
	rootclassname: "magicCircle", //im html-Element class="magicCircle"
	rootid: "magicCircle", //im html-Element id="magicCircle"
	width:1000,
	height:100,
	type: "g"
}

htmlel_namespace.SUN_BURST = {
	parentElement: htmlel_namespace.MAGIC_CIRCLE,
	rootclassname: "sunburst",
	rootid: "sunburst",
	width:500,
	height:500,
	type: "g",
	fontColor: "black"
}

htmlel_namespace.LINE_DIAGRAM = {
	parentElement: htmlel_namespace.MAGIC_CIRCLE,
	rootclassname: "linediagram",
	rootid: "linediagram",
	width:650,
	height:400,
	type: "g"
};

htmlel_namespace.THE_FORCE = {
	parentElement: htmlel_namespace.MAGIC_CIRCLE,
	rootclassname: "theforce",
	rootid: "theforce",
	width:300,
	height:3000,
	type: "g"
};

htmlel_namespace.THE_UNIVERSE = {
	parentElement: htmlel_namespace.MAGIC_CIRCLE,
	rootclassname: "universe",
	rootid: "universe",
	width:3000,
	height:3000,
	type: "g"
};

htmlel_namespace.THE_MAP = {
	parentElement: htmlel_namespace.MAGIC_CIRCLE,
	rootclassname: "map",
	rootid: "map",
	width: 3000,
	height: 3000,
	type: "g"
};

htmlel_namespace.INFO_BOX = {
	parentElement: htmlel_namespace.MAGIC_CIRCLE,
	rootclassname: "infobox",
	rootid: "infobox",
	width: 1000,
	height: 1000,
	type: "svg"
};
