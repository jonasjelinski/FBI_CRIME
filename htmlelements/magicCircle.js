var htmlel_namespace = htmlel_namespace || {};

htmlel_namespace.MAGIC_CIRCLE = {
    rootclassname: "magicCircle", //im html-Element class="magicCircle"
    rootid: "magicCircle", //im html-Element id="magicCircle"
    width:1000,
    height:1000,
    type: "g"
};

htmlel_namespace.SUN_BURST = {
	parentElement: htmlel_namespace.MAGIC_CIRCLE,
	rootclassname: "sunburst",
	rootid: "sunburst",
	width:400,
    height:400,
    type: "g"
};