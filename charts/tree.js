/*---TREE--*/

//This class creates an interactive Tree-Chart
//The tree includes all crimeNumbers by state and year
//This template was used: https://bl.ocks.org/mbostock/4339083

class Tree extends MagicCircle{
	constructor(pageId, state = configNamespace.STATES_AND_CRIMES.states[0], year = configNamespace.STATES_AND_CRIMES.minYear){
		super(pageId);
		this.htmlelement = htmlelementsNamespace.tree;
		this.htmlElementID = this.htmlelement.htmlid;
		this.rootElement = this.getRootElement();
		this.width = this.htmlelement.width;
		this.height = this.htmlelement.height;
		this.year=year;
		this.state=state;
	}

	getData(){
		return configNamespace.JSON_OBJECT;
	}

	doChart(){
		this.drawTree();
	}

	drawTree(){

		let hierarchyData = this.createHierarchyData(),
			width = this.width - this.htmlelement.margin.left - this.htmlelement.margin.right,
			height = this.height - this.htmlelement.margin.top - this.htmlelement.margin.bottom,
			svg = this.container.attr("width", width + this.htmlelement.margin.right + this.htmlelement.margin.left).attr("height", height + this.htmlelement.margin.top + this.htmlelement.margin.bottom).append("g").attr("transform", "translate("+this.htmlelement.margin.left + "," + this.htmlelement.margin.top+ ")"),
			increaseNode = 0,
			duration = 750,
			root = d3.hierarchy(hierarchyData[0].children[0], function(d) { return d.children; }),
			path = 0,
			treemap = d3.tree().size([height, width]),
			scaleHeight;

		root.x0 = height / scaleHeight;
		root.y0 = 0;
		root.children.forEach(collapse);

		update(root);

		// Collapse the node and all it's children
		function collapse(d) {
			if(d.children) {
				d._children = d.children
				d._children.forEach(collapse)
				d.children = null
			}
		}

		//Creates the text for nodes
		function nodeText(nodeEnter){
			let marginLeft = 13,
				marginRight = 13;

			nodeEnter.append("text")
				.attr("dy", ".35em")
				.attr("x", function(d) {
					return d.children || d._children ? -marginLeft : marginRight;
				})
				.attr("text-anchor", function(d) {
					return d.children || d._children ? "end" : "start";
				})
				.text(function(d) { return d.data.name; });
		}

		//Transition from up to down
		function nodeTransition(nodeUpdate){
			nodeUpdate.transition()
				.duration(duration)
				.attr("transform", function(d) {
					return "translate(" + d.y + "," + d.x + ")";
				});
		}

		//Creates Nodecircle
		function nodeCircle(nodeUpdate){
			let radiusNode = 10;
			console.log(nodeUpdate);

			nodeUpdate.select('circle.node')
				.attr("r", radiusNode)
				.style("fill", function(d, i) {
					if(i===0){
						return;
					}
					function hasNumber(myString) {
  					return /\d/.test(myString);
					}


					let name = d.data.name;
					if(hasNumber(name)){
						return;
					}
					let	crime = name.replace(/\s/g, '');
						crime = crime.replace(/[:]/g, '');
					console.log(typeof crime);
						let color = commonfunctionsNamespace.getCrimeColor(crime);
						return color;
















					return d._children ? "lightsteelblue" : "white";
				})
				.attr("cursor", "pointer");
		}

		//Make back old state
		function nodeOnExit(nodeExit,node,source){
			return node.exit().transition()
				.duration(duration)
				.attr("transform", function(d) {
					return "translate(" + source.y + "," + source.x + ")";
				})
				.remove();
		}

		//Prepares old state
		function nodeLeave(nodeExit){
			let eulerNum = 1e-6;
			nodeExit.select("circle")
				.attr("r", eulerNum);
			nodeExit.select("text")
				.style("fill-opacity", eulerNum);
		}

		//Creates connection to the nodes
		function nodeLink(links){
			return svg.selectAll("path.link")
				.data(links, function(d) { return d.id; });
		}

		//Draw the connection-lines as wave
		function diagonal(s, d) {
			path = `M ${s.y} ${s.x}
			C ${(s.y + d.y) / 2} ${s.x},
			${(s.y + d.y) / 2} ${d.x},
			${d.y} ${d.x}`
			return path
		}

		//Connect two nodes together
		function nodeOnLinkEnter(link,source){
			return link.enter().insert("path", "g")
				.attr("class", "link")
				.attr("d", function(d){
					let o = {x: source.x0, y: source.y0}
					return diagonal(o, o)
				});
		}

		function linkTransition(linkUpdate){
			linkUpdate.transition()
				.duration(duration)
				.attr("d", function(d){ return diagonal(d, d.parent);});
		}

		//Prepares old state
		function linkOnExit(link,source){
			return link.exit().transition()
				.duration(duration)
				.attr("d", function(d) {
					var o = {x: source.x, y: source.y}
					return diagonal(o, o)
				})
				.remove();
		}

		function click(d) {
			if (d.children) {
				d._children = d.children;
				d.children = null;
			}else {
				d.children = d._children;
				d._children = null;
			}
			update(d);
		}

		//Prepares every node on click
		function nodeEnter(node,source){
			let nodeEnter,
				eulerNum = 1e-6;

			nodeEnter= node.enter().append("g")
				.attr("class", "node")
				.attr("transform", function(d) {
					return "translate(" + source.y0 + "," + source.x0 + ")";
				})
				.on("click", click);

			nodeEnter.append("circle")
				.attr("class", "node")
				.attr("r", eulerNum)
				.style("fill", function(d) {
					return d._children ? "lightsteelblue" : "#fff";
				});
			return nodeEnter;
		}

		//After every click make new tree
		function update(source) {
			let treeData = treemap(root),
				degree=180,
				nodes = treeData.descendants(),
				links = treeData.descendants().slice(1),
				node = svg.selectAll("g.node").data(nodes, function(d) {return d.id || (d.id = ++increaseNode); }),
				nodeEnterNode,
				nodeUpdate,
				nodeExit,
				link,
				linkEnter,
				linkUpdate,
				linkExit;

			nodes.forEach(function(d){ d.y = d.depth * degree;});
			nodeEnterNode=nodeEnter(node,source);
			nodeText(nodeEnterNode);
			nodeUpdate = nodeEnterNode.merge(node);
			nodeTransition(nodeUpdate);
			nodeCircle(nodeUpdate);
			nodeExit=nodeOnExit(nodeExit,node,source)
			nodeLeave(nodeExit);

			link = nodeLink(links);
			linkEnter = nodeOnLinkEnter(link,source);
			linkUpdate = linkEnter.merge(link);
			linkTransition(linkUpdate);
			linkExit = linkOnExit(link,source);

			nodes.forEach(function(d){d.x0 = d.x; d.y0 = d.y;});
		}
	}

//This is the Data for Tree with three Levels
//-->"firstNode"-->treeData with "state" as rootNode
//-->"secondNode"-->treeData with "crime-type" as second-Level
//-->"lastNode"-->treeData with all crimenames and number
createHierarchyData(){
		let crimedata = commonfunctionsNamespace.getCrimesAndDataByYearAndState(this.year, this.state, this.data),
			treeData=firstNode(this.year),
			treeDataState=secondNode(treeData,this.state),
			treeDataCrimes=lastNode(treeDataState);

		function firstNode(year){
			let treeData =[];
			treeData.push({
				"name": year,
				"type": "black",
				"level": "red",
				"children": []
			});
			return treeData;
		}

		function secondNode(treeData,state){
			treeData[treeData.length-1].children=[];
			treeData[treeData.length-1].children.push({
				"name": state,
				"type": "black",
				"level": "red",
				"children":[]
			});
			return treeData;
		}

		function childNodeMurderManslaughter(){
			return [{
				"name": ""+crimedata.crimes.violentCrime.MurderManslaughter,
				"type": "black",
				"level": "red",
				"children": null
			}]
		}

		function childNodeRape(){
			return [{
				"name": ""+crimedata.crimes.violentCrime.Rape,
				"type": "black",
				"level": "red",
				"children": null
			}]
		}

		function childNodeRobbery(){
			return [{
				"name": ""+crimedata.crimes.violentCrime.Robbery,
				"type": "black",
				"level": "red",
				"children": null
			}]
		}

		function childNodeAggravatedassault(){
			return [{
				"name": ""+crimedata.crimes.violentCrime.Aggravatedassault,
				"type": "black",
				"level": "red",
				"children": null
			}]
		}

		function childNodeBuglary(){
			return [{
				"name": ""+crimedata.crimes.propertyCrime.Burglary,
				"type": "black",
				"level": "red",
				"children": null
			}]
		}

		function childNodeLarencytheft(){
			return [{
				"name": ""+crimedata.crimes.propertyCrime.Larcenytheft,
				"type": "black",
				"level": "red",
				"children": null
			}]
		}

		function childNodeMotorvehicletheft(){
			return [{
				"name": " "+crimedata.crimes.propertyCrime.Motorvehicletheft,
				"type": "black",
				"level": "red",
				"children": null
			}]
		}


		function childNodeViolentCrime(){
			return [{
				"name": "MurderManslaughter: ",
				"type": "black",
				"level": "red",
				"children": childNodeMurderManslaughter()
			},
			{
				"name": "Rape: ",
				"type": "black",
				"level": "red",
				"children": childNodeRape()
			},
			{
				"name": "Robbery: ",
				"type": "black",
				"level": "red",
				"children": childNodeRobbery()
			},
			{
				"name": "Aggravatedassault: ",
				"type": "black",
				"level": "red",
				"children": childNodeAggravatedassault()
			}]
		}

		function childNodePropertyCrime(){
			return [{
				"name": "Burglary: ",
				"type": "black",
				"level": "red",
				"children": childNodeBuglary()
			},
			{
				"name": "Larcenytheft: ",
				"type": "black",
				"level": "red",
				"children": childNodeLarencytheft()
			},
			{
				"name": "Motorvehicletheft: ",
				"type": "black",
				"level": "red",
				"children": childNodeMotorvehicletheft()
			}]
		}

		function lastNode(treeDataState){
			treeDataState[treeDataState.length-1].children[0].children.push(
				{
					"name": "violentCrime",
					"type": "black",
					"level": "red",
					"children": childNodeViolentCrime()
				},
				{
					"name": "propertyCrime",
					"type": "black",
					"level": "red",
					"children": childNodePropertyCrime()
				})
		}
		return treeData;
	}
}
