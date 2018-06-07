	class CrimeCorrelation extends MagicCircle{
	constructor(){
		super();
		this.state = dynamicsNamespace.currentState;
		this.htmlelement = htmlelementsNamespace.THE_FORCE; 
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
	}

	doChart(){
		console.log("A lama uses the force");
		this.drawForceChart();
	}

	drawForceChart(){
		let data = this.createD3Data();
		this.drawCorrelation(data);
	}

	createD3Data(){
		let quotients = [],
			sortedArray = [],
			percentageAarray = [],
			statesObject = this.data.years[this.year].states,
			statesArray = Object.keys(statesObject);
		for(let i = 0; i < statesArray.length; i++){
			let state = statesArray[i],
				newQuotient = {},
				q = this.calculateStatesQuotient(state);
			newQuotient.state = state;
			newQuotient.quotient = q;
			quotients.push(newQuotient);
		}
		sortedArray = this.sortArray(quotients);
		percentageAarray = this.transformQuotientToPercentages(sortedArray);
		return percentageAarray;	 
	}	

	createNodes(sortedQuotients){
		let newArray = [],
			that = this;
		newArray = this.createCenterNodes(newArray);
		sortedQuotients.forEach(function(stateObject){
			let newNode = {},
				statename = stateObject.state;			
			newNode.id = that.createId(statename);
			newNode.quotient = stateObject.quotient;
			newNode.group = stateObject.quotient > 0.5 ?  that.violenceGroup :  that.propertyGroup;
			newArray.push(newNode);
		});
		return newArray;
	}

	createLinks(sortedQuotients){		
		let links = [],
			that = this;
		sortedQuotients.forEach(function(stateObject){
			let newLink = {};
			newLink.source = that.createId(stateObject.state);
			newLink.target = stateObject.quotient > 0.5 ? "Violence" : "Property";
			links.push(newLink);
		});		
		return links;
	}

	//source: https://bl.ocks.org/mbostock/4062045
	drawCorrelation(data){
		let that = this,
			sortedQuotients = data,
			links = this.createLinks(sortedQuotients),
			nodes = this.createNodes(sortedQuotients),	
			height = this.height,		
			radius = 5,
			strokeWidth = 2,
			centerX = width/2,
			centerY = height/2,
			center = [centerX, centerY],
			distance = width/30,		
			draggedAlpha = 0.3,
			dragendedAlpha = 0,
			rootElement,
			simulation,
			node,
			link,
			label;

		prepareRootElement();		
		initSimulation();
		initNodes();
		initLinks();
		initLabels();		
		setNodeDataAndEnterAndExitSettings();

		function prepareRootElement(){
			rootElement = this.page.attr("width", width).attr("height", height);
		}

		function initSimulation(){
			simulation = d3.forceSimulation()
				.nodes(nodes)		   
				.force("charge", d3.forceManyBody())
				.force("center", d3.forceCenter(centerX, centerY))
				.force("collision", d3.forceCollide().radius(radius))
				.force("link", d3.forceLink().links(links).id(linkId).distance(linkDistance))
				.on("tick", updatePos)
				.on("start", startDragging)
				.on("drag", dragNode)
				.on("end", endDragging);
		}

		function initNodes(){
			node = rootElement.attr("class", "nodes")
				.selectAll("circle")
				.data(nodes)
				.attr("r", radius)
				.attr("fill", fillCircle);
		}

		function initLinks(){
			link = rootElement      	 	
				.attr("class", "links").attr("width",width).attr("height",height)
				.selectAll("line")
				.data(links);
		}

		function initLabels(){
			label = rootElement.attr("class", "lables")
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
			node = node.enter().append("circle")						
				.attr("r", radius);
				
		}

		function enterLabel(){
			label = label.enter().append("text")
				.text(function(d){return d.id;})
				.attr("fill","green" );      			 
		}

		function enterLink(){
			link = link.enter().append("line")
				.attr("stroke-width", strokeWidth)
				.attr("fill", "black")
				.style("stroke", "black");
		}

		function linkId(d){
			return d.id;
		}

		function linkDistance(d){
			let factor = d.source.quotient+1,
				sizeFactor = 5;
			return distance*sizeFactor*factor; 
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

	}

}