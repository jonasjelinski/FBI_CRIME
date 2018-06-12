class CrimeCorrelation extends MagicCircle{
	constructor(){
		super();
		this.state = dynamicsNamespace.currentState;
		this.htmlelement = htmlelementsNamespace.CRIME_CORRELATION; 
		this.htmlElementID = this.htmlelement.htmlid;
		this.page = this.getRootElement();
		this.width = this.htmlelement.width;
		this.height = this.htmlelement.height;
		this.year = 2008;
		this.violenceGroup = 0;
		this.propertyGroup = 1;
		this.violencePos= 0.75;
		this.propertyPos= 0.25;
		this.standards = {
			standardRadius: this.width/50,
			minRadius: this.width/55,
			standardDistanceToSun: this.width/10,
			minDistanceToSun: this.with/10,
			violenceSunX: this.width*this.violencePos,
			violenceSunY: this.height/2,
			propertySunX: this.width*this.propertyPos,
			propertySunY: this.height/2 
		};
		this.nodesIndex = 0;
		this.linksIndex = 1;
	}

	doChart(){
		console.log("A lama creates crime correlation");
		this.drawForceChart();
	}

	drawForceChart(){
		let data = this.getNodesAndLinks();		
		this.drawCorrelation(data);
	}

	getNodesAndLinks(){
		let csvData = configNamespace.CRIME_CORRELATIONS, 
			nodesAndLinks = this.createnNodesAndLinks(csvData);		
		return nodesAndLinks;	
	}

	createnNodesAndLinks(data){		
		let nodesAndLinks = [],
			crimeNames = data.columns,
			nodes = this.createNodes(crimeNames),
			links = this.createLinks(data);	
		nodesAndLinks[this.nodesIndex] = nodes;
		nodesAndLinks[this.linksIndex] = links;						
		return nodesAndLinks;
	}	

	createNodes(crimeNames){
		let nodes = [];	

		for(let i = 1; i < crimeNames.length; i++){
			let crime = crimeNames[i],
				newNode = {};			
			newNode.id = crime;					
			nodes.push(newNode);
		}

		return nodes;
	}

	createLinks(data){		
		let crimeNames = data.columns,
			links = [];			
		for(let i = 0; i < data.length; i++){
			let row = data[i],
				source = row.CRIME,
				crimes = Object.keys(row);				
				for(let j = 0; j < crimes.length; j++){
					let target = crimes[j]; 					
					if(source !== target && target !== "CRIME"){
						let link = {};
						link.source = source;
						link.target = target;
						link.correlation = row[target];
						links.push(link);						
					}					
				}	

		}
		return links;
	}

	//source: https://bl.ocks.org/mbostock/4062045
	drawCorrelation(data){
		let that = this,
			nodesAndLinks = makeDeepCopyOfArray(data),			
			nodes = nodesAndLinks[this.nodesIndex],
			links = nodesAndLinks[this.linksIndex],	
			width = this.width,
			height = this.height,		
			radius = width/100,
			linkDistance = width/10,
			strokeWidth = 4,
			centerX = width/2,
			centerY = height/2,
			center = [centerX, centerY],
			distance = width/30,		
			draggedAlpha = 0.3,
			dragendedAlpha = 0,
			rootElement = this.container,
			simulation,
			node,
			link,
			label;
		
		initSimulation();
		initNodes();
		initLinks();
		initLabels();		
		setNodeDataAndEnterAndExitSettings();		

		function initSimulation(){
			simulation = d3.forceSimulation()
				.nodes(nodes)		   
				.force("charge", d3.forceManyBody())
				.force("center", d3.forceCenter(centerX, centerY))
				.force("collision", d3.forceCollide().radius(radius))
				.force("link", d3.forceLink().links(links).id(linkId).distance(calculatelinkDistance))
				.on("tick", updatePos);
				
		}

		function initNodes(){
			node = rootElement
				.append("svg")
				.attr("class", "nodes")
				.selectAll("circle")
				.data(nodes);			
				
		}

		function initLinks(){
			link = rootElement 
				.append("svg")     	 	
				.attr("class", "links").attr("width",width).attr("height",height)
				.selectAll("line")
				.data(links);
		}

		function initLabels(){
			label = rootElement
				.append("svg")
				.attr("class", "lables")
				.selectAll(".lables")
				.data(nodes);
		}

		function updatePos(){ 	  		
			
			node.attr("cx", function(d) {return d.x; })      			
				.attr("cy", function(d) {return d.y; }); 

			label
				.attr("x", function(d) {return d.x; })    		
				.attr("y", function(d) {return d.y; });

			link
				.attr("x1", function(d) {return d.source.x; })
				.attr("y1", function(d) { return d.source.y; })
				.attr("x2", function(d) { return d.target.x; })
				.attr("y2", function(d) { return d.target.y; });
		}

		function setNodeDataAndEnterAndExitSettings(){
			node.data(nodes);
			exitNode();			
			enterNode();

			label.data(nodes);
			exitLabel();			
			enterLabel();

			link.data(links);
			exitLink();			
			enterLink();
		}

		function exitNode(){
			node.exit().remove();
		}

		function exitLabel(){
			label.exit().remove();
		}

		function exitLink(){
			link.exit().remove();	
		}

		function enterNode(){
			node = node.enter()
				.append("circle")						
				.attr("r", radius)
				.attr("fill", fillCircle)				
				.call(d3.drag()				
					.on("start", startDragging)
					.on("drag", dragNode)
					.on("end", endDragging)
				);		
		}

		function enterLabel(){
			label = label.enter().append("text")
				.text(function(d){return d.id;})
				.attr("fill","green" );      			 
		}

		function enterLink(){
			link = link.enter().append("line")
				.attr("stroke-width", calculateStrokeWidth)
				.attr("fill", "black")
				.style("stroke", "black");
		}

		function linkId(d){			
			return d.id;
		}

		function calculateStrokeWidth(d){			
			return strokeWidth*d.correlation;
		}

		function calculatelinkDistance(d){			
			return linkDistance*d.correlation; 
		}

		function startDragging(d) {			
			if (!d3.event.active) simulation.alphaTarget(draggedAlpha).restart();
			d.fx = d.x;
			d.fy = d.y;
		}

		function dragNode(d) {
			d.fx = d3.event.x;
			d.fy = d3.event.y;
		}

		function endDragging(d) {
			if (!d3.event.active) simulation.alphaTarget(dragendedAlpha);
			d.fx = null;
			d.fy = null;
		}

		function makeDeepCopyOfArray(data){
			return JSON.parse(JSON.stringify(data));
		}

		function fillCircle(d){			
			return commonfunctionsNamespace.getCrimeColor(d.id);
		}

	}

}