	var htmlel_namespace = htmlel_namespace || {};

htmlel_namespace.MAGIC_CIRCLE = { //Elternelement aller anderen HTML-Elemente
	rootclassname: "magicCircle", //im html-Element class="magicCircle"
	rootid: "magicCircle", //im html-Element id="magicCircle"
	type: "g",
	class: "class"
};

htmlel_namespace.SUN_BURST = {
	parentElement: htmlel_namespace.MAGIC_CIRCLE,
	rootclassname: "sunburst",
	rootid: "sunburst",
	width:400,
	height:400,
	type: "g"
};

htmlel_namespace.LINE_DIAGRAM = {
	parentElement: htmlel_namespace.MAGIC_CIRCLE,
	rootclassname: "linediagram",
	rootid: "linediagram",
	width:600,
	height:400,
	type: "g"
}

htmlel_namespace.THE_FORCE = {
	parentElement: htmlel_namespace.MAGIC_CIRCLE,
	rootclassname: "theforce",
	rootid: "theforce",
	width:3000,
	height:3000,
	type: "g"
}

htmlel_namespace.THE_MAP = {
	parentElement: htmlel_namespace.MAGIC_CIRCLE,
	rootclassname: "map",
	rootid: "map",
	width:960,
	height:520,
	type: "g"
}

htmlel_namespace.TIME_LINE = {
	parentElement: htmlel_namespace.MAGIC_CIRCLE,
	rootclassname: "timeLine",
	childElement: "play-button",
	rootid: "timeLine",
	width:360,
	height:160,
	type: "g",
	margin: {top:15, right:15, bottom:15, left:15},
	classSlider: "slider"
}

htmlel_namespace.DROP_DOWN = {
	parentElement: htmlel_namespace.MAGIC_CIRCLE,
	rootclassname: "dropDown",
	rootid: "dropDown",
	width:120
}
