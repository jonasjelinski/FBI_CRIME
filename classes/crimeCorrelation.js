//This class creates a d3.forceSimulation
//it shows the correlations between different crimetypes
//if the correlation is bigger then the line between the nodes is bigger

class CrimeCorrelation extends MagicCircle{
	constructor(pageId){
		super(pageId);		
		this.htmlelement = htmlelementsNamespace.CRIME_CORRELATION; 
		this.htmlElementID = this.htmlelement.htmlid;
		this.width = this.htmlelement.width;
		this.height = this.htmlelement.height;
		this.year = 2008;
		this.violenceGroup = 0;
		this.propertyGroup = 1;
		this.violencePos= 0.75;
		this.propertyPos= 0.25;
		this.nodesIndex = 0;
		this.linksIndex = 1;
	}

	doChart(){
		console.log("A lama creates crime correlation");
		this.drawForceChart();
	}

	//receives nodes and links and gives them as paramater to drawCorrelation()
	drawForceChart(){
		let data = this.getNodesAndLinks();		
		this.drawCorrelation(data);
	}	

	//transforms a csv table which contains the correlations between crimetypes
	//to nodes which represent the crimetype and links, which connect the nodes
	getNodesAndLinks(){
		let csvData = configNamespace.CRIME_CORRELATIONS, 
			nodesAndLinks = this.createnNodesAndLinks(csvData);		
		return nodesAndLinks;	
	}

	//receives a table and
	//returns an array with links and nodes
	createnNodesAndLinks(data){		
		let nodesAndLinks = [],
			crimeNames = data.columns,
			nodes = this.createNodes(crimeNames),
			links = this.createLinks(data);	
		nodesAndLinks[this.nodesIndex] = nodes;
		nodesAndLinks[this.linksIndex] = links;						
		return nodesAndLinks;
	}	

	//receives the array crimeNames which contains the names of the crimetype
	//transforms this crimetypes into node obejects and saves them into an array
	//returns an array full of node-object 
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

	//receives a table and

	//returns an array with links by reading each row of the table
	createLinks(data){		
		let	links = [];			
		for(let i = 0; i < data.length; i++){
			let row = data[i];
			links = links.concat(this.createLinksForEachRow(row));
		}	
		return links;
	}

	//returns an array with links by calling createLinkForEachCrime
	createLinksForEachRow(row){
		let source = row.CRIME,
			crimes = Object.keys(row),
			links = this.createLinkForEachCrime(row, source, crimes);				
		return links;	
	}

	//creates links between target amd source and saves them into an array
	//prevents that links are created where target and source are the same
	//returns an array with links 
	createLinkForEachCrime(row, source, crimes){
		let links = [];
		for(let j = 0; j < crimes.length; j++){
			let target = crimes[j]; 					
			if(this.sourceIsNotTheSameAsTarget(source, target) && this.targetIsACrimeType(target) ){
				let link = this.createLinkBetweenTargetAndSource(row, target, source);				
				links.push(link);						
			}					
		}		
		return links;
	}

	sourceIsNotTheSameAsTarget(source, target){
		return source !== target;
	}

	targetIsACrimeType(target){
		return target !== "CRIME";
	}

	//creates a linkobject
	//target and source are the nodes which are connected
	//correlation is the correlation of the two crimetypes
	//returns a link object
	createLinkBetweenTargetAndSource(row, target, source){
		let link = {};
		link.source = source;
		link.target = target;
		link.correlation = row[target];
		return link;
	}

	//draws all nodes and links which are in data
	//by using d3.forceSimulation 
	//source: https://bl.ocks.org/mbostock/4062045
	drawCorrelation(data){
		let that = this,
			nodesAndLinks = makeDeepCopyOfArray(data),			
			nodes = nodesAndLinks[this.nodesIndex],
			links = nodesAndLinks[this.linksIndex],	
			width = this.width,
			height = this.height,
			radius = width/50,
			fontSize =	radius+"px",
			linkDistance = width/2,
			strokeWidth = width/100,
			centerX = width/2,
			centerY = height/2,
			center = [centerX, centerY],
			distance = width/2,		
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

		//inits the d3.forceSimulation 
		//gives it the nodes and links
		//determines nodes gravitiy behaviour
		//and updatebehaviour on a tick 
		function initSimulation(){
			simulation = d3.forceSimulation()
				.nodes(nodes)		   
				.force("charge", d3.forceManyBody())
				.force("center", d3.forceCenter(centerX, centerY))
				.force("collision", d3.forceCollide().radius(radius))
				.force("link", d3.forceLink().links(links).id(linkId).distance(calculatelinkDistance))
				.on("tick", updatePos);				
		}

		//creates circles with data nodes
		function initNodes(){
			node = rootElement
				.append("svg")
				.attr("class", "nodes")
				.selectAll("circle")
				.data(nodes);				
		}

		//creates lines with data links
		function initLinks(){
			link = rootElement 
				.append("svg")     	 	
				.attr("class", "links").attr("width",width).attr("height",height)
				.selectAll("line")
				.data(links);
		}

		//creates labels with data nodes
		function initLabels(){
			label = rootElement
				.append("svg")
				.attr("class", "lables")
				.selectAll(".lables")
				.data(nodes);
		}

		//determines the updatebehaviour of circles, links and labels
		function updatePos(){ 	  		
			
			node.attr("cx", function(d) {return d.x; })      			
				.attr("cy", function(d) {return d.y; }); 

			link
				.attr("x1", function(d) {return d.source.x; })
				.attr("y1", function(d) { return d.source.y; })
				.attr("x2", function(d) { return d.target.x; })
				.attr("y2", function(d) { return d.target.y; });

			label
				.attr("x", function(d) {return d.x; })    		
				.attr("y", function(d) {return d.y; });
		}

		//determines how nodes, label and circle 
		//behave if there is new data or data removed
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

		//removes unnecessary nodes
		function exitNode(){
			node.exit().remove();
		}

		//removes unnecessary labels
		function exitLabel(){
			label.exit().remove();
		}

		//removes unnecessary links
		function exitLink(){
			link.exit().remove();	
		}

		//creates a circle if there is new data
		//determines drag behaviour
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

		//creates a link if there is new data
		function enterLink(){
			link = link.enter().append("line")
				.attr("stroke-width", calculateStrokeWidth)
				.attr("fill", "black")
				.style("stroke", "black");
		}

		//creates a label if there is new data
		function enterLabel(){
			label = label.enter().append("text")
				.text(function(d){return d.id;})
				.attr("fill","green" )      			 
				.style("font-size", fontSize);     			 
		}

		//returns the link id
		function linkId(d){			
			return d.id;
		}

		//returns stroke-width depending on the correlation
		function calculateStrokeWidth(d){			
			return strokeWidth*d.correlation;
		}

		//returns linkDistance depending on the correlation
		function calculatelinkDistance(d){			
			return linkDistance*d.correlation; 
		}

		//calculates draggingbehaviour
		function startDragging(d) {			
			if (!d3.event.active) simulation.alphaTarget(draggedAlpha).restart();
			d.fx = d.x;
			d.fy = d.y;
		}

		//calculates draggingbehaviour
		function dragNode(d) {
			d.fx = d3.event.x;
			d.fy = d3.event.y;
		}

		//calculates draggingbehaviour
		function endDragging(d) {
			if (!d3.event.active) simulation.alphaTarget(dragendedAlpha);
			d.fx = null;
			d.fy = null;
		}

		//returns color depending on crimetype
		function fillCircle(d){			
			return commonfunctionsNamespace.getCrimeColor(d.id);
		}

		//transform data into a readable json object
		function makeDeepCopyOfArray(data){
			return JSON.parse(JSON.stringify(data));
		}
	}

}