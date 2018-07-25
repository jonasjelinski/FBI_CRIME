/*---CRIME CORRELATION--*/

//This class creates a d3.forceSimulation
//it shows the correlations between different crimetypes
//if the correlation is bigger then the line between the nodes is bigger

class CrimeCorrelation extends MagicCircle{
	constructor(pageId){
		super(pageId);		
		this.htmlelement = htmlelementsNamespace.crimeCorrelation; 
		this.htmlElementID = this.htmlelement.htmlid;
		this.width = this.htmlelement.width;
		this.height = this.htmlelement.height;
		this.margin = this.htmlelement.margin;
		this.violenceGroup = 0;
		this.propertyGroup = 1;
		this.violencePos= 0.75;
		this.propertyPos= 0.25;
		this.nodesIndex = 0;
		this.linksIndex = 1;
		this.ignoreLinkColor = this.htmlelement.ignoreLinkColor;
		this.highlightLinkColor = this.htmlelement.highlightLinkColor;
		this.labelFontSize = this.htmlelement.labelFontSize;
		this.labelPositionX = this.htmlelement.labelPositionX;
		this.labelPositionY = this.htmlelement.labelPositionY;
		this.correlationFontColor = this.htmlelement.correlationFontColor;
		this.correlationFontSize = this.htmlelement.correlationFontSize;
		this.hoverContainerColor =  this.htmlelement.hoverContainerColor;
	}

	doChart(){
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

	//receives the array commonfunctionsNamespace which contains the names of the crimetype
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
			linkDistance = width/2,
			strokeWidth = width/100,
			centerX = width/2+this.margin.x,
			centerY = height/2+this.margin.y,
			draggedAlpha = 0.3,
			dragendedAlpha = 0,
			rootElement = this.container,
			simulation,
			zoomContainer,
			hoverContainer,
			node,
			link,
			label,
			correlationLabel;
		
		initSimulation();
		initZoomContainer();
		initHoverContainer();	
		initLinks();
		initNodes();							
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

		//returns the link id
		function linkId(d){			
			return d.id;
		}

		function initZoomContainer(){
			let minSize = 1,
				maxSize = 10;

			zoomContainer =  rootElement				
				.append("svg")
				.attr("class", "zoomContainer")
				.attr("width", width)
				.attr("height", height)
				.call(d3.zoom()
					.scaleExtent([minSize, maxSize])
					.on("zoom", function () {						
						zoomContainer.attr("transform", d3.event.transform);
					}));

		}

		//hoverContainer is nearly invisible so it
		//still receives events but cant be seen
		function initHoverContainer(){
			let opacity = 0.001;
			hoverContainer = zoomContainer
				.append("rect")
				.attr("class", "hoverContainer")
				.attr("width", width)
				.attr("height", height)
				.attr("fill", that.hoverContainerColor)
				.attr("x", that.margin.x)
				.attr("y", that.margin.y)
				.attr("opacity", opacity)
				.on("mouseover", commonfunctionsNamespace.disableScroll)
				.on("mouseout", commonfunctionsNamespace.enableScroll);
		}

		//creates circles with data nodes
		function initNodes(){
			node = zoomContainer
				.append("svg")
				.attr("class", "nodes")
				.selectAll("circle")
				.data(nodes);				
		}

		//creates lines with data links
		function initLinks(){
			link = zoomContainer 
				.append("svg")     	 	
				.attr("class", "links")
				.selectAll("line")
				.data(links);

		}

		//creates labels with data nodes
		function initLabels(){
			label = zoomContainer
				.append("svg")
				.attr("class", "lables")
				.selectAll(".lables")
				.data(nodes);

			correlationLabel = zoomContainer
				.append("svg")
				.attr("class", "correlationLabel")
				.selectAll(".correlationLabel")
				.data(links);		
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

			correlationLabel
				.attr("x", function(d, i) { return calculatePoint(i,d.source.x, d.source.y, d.target.x, d.target.y)[0]; })
				.attr("y", function(d, i) { return calculatePoint(i,d.source.x, d.source.y, d.target.x, d.target.y)[1]; });				
				
			label
				.attr("x", function(d) {return d.x +that.labelPositionX; })    		
				.attr("y", function(d) {return d.y +that.labelPositionY; });
		}

		function calculatePoint(i,x1,y1,x2,y2){
			let middleX = (x1+x2)/2,
				middleY = (y1+y2)/2,
				middlePoint = [middleX, middleY];			
			return middlePoint;
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

			correlationLabel.data(links);
			exitCorrelationLabel();
			enterCorrelationLabel();

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

		function exitCorrelationLabel(){
			correlationLabel.exit().remove();
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
				.attr("class", "correlationNode")						
				.attr("r", radius)
				.attr("fill", fillCircle)				
				.call(d3.drag()				
					.on("start", startDragging)
					.on("drag", dragNode)
					.on("end", endDragging)
				)
				.on("mouseover", ingoreNotConnectedLLinks)
				.on("mouseout", resetConnectedLinksColor);
			
		}		

		//creates a label if there is new data
		function enterLabel(){
			label = label.enter().append("text")
				.text(function(d){return d.id;})
				.attr("fill", getLabelColor)      			 
				.style("font-size", that.labelFontSize);     			 
		}

		function getLabelColor(d){
			return commonfunctionsNamespace.getCrimeColor(d.id);
		}

		function enterCorrelationLabel(){
			correlationLabel = correlationLabel.enter().append("text")
				.attr("id", getCorrLabelId)
				.text(function(d){return "correlation "+ d.correlation;})
				.attr("fill",that.correlationFontColor )      			 
				.style("font-size", that.correlationFontSize)
				.style("opacity", "0");     
		}

		function getCorrLabelId(d){
			return "corrid"+d.index;
		}

		//creates a link if there is new data
		function enterLink(){
			link = link.enter().append("line")
				.attr("stroke-width", calculateStrokeWidth)
				.attr("class", "link")
				.attr("id", getCorrLabelId)
				.attr("source", getSource)
				.attr("target", getLabel)
				.attr("resetColor", getRGBColor)
				.style("stroke",  getRGBColor)
				.on("mouseover", showLabelAndChangeLineColor)
				.on("mouseout", function(d){hideLabelAndColor(d, this)});			
		}		

		//returns stroke-width depending on the correlation
		function calculateStrokeWidth(d){			
			return strokeWidth*d.correlation;
		}

		//
		function getSource(d){
			return d.source.id;
		}

		function getLabel(d){
			return d.target.id;
		}

		//returns a rgb color
		//depending on correlation
		//if the correlation is positive color is from red(high correlation) to blue(low correlation)
		//else
		function getRGBColor(d){
			if(d.correlation >= 0){
				return getPositiveRGB(d.correlation);
			}
			return getNegativeRGB(d.correlation);			
		}

		//returns a rgb color
		//it get less red if factor is bigger
		function getPositiveRGB(correlation){
			let factor = correlation,
				red = configNamespace.CRIME_CORRELATION.highCorrelationRed * factor,
				green = configNamespace.CRIME_CORRELATION.highCorrelationGreen * factor, 
				blue = configNamespace.CRIME_CORRELATION.lowCorrelationBlue - configNamespace.CRIME_CORRELATION.lowCorrelationBlue* factor;
			return "rgb(" + red + "," + green + "," + blue+ ")"; 
		}

		function getNegativeRGB(correlation){
			let factor = correlation,
				red = configNamespace.CRIME_CORRELATION.negativeCorrelationRedHigh,
				green = configNamespace.CRIME_CORRELATION.negativeCorrelationGreenHigh * factor, 
				blue = configNamespace.CRIME_CORRELATION.negativeCorrelationBlueHigh;
			return  "rgb(" + red + "," + green + "," + blue+ ")"; 
		}		

		//returns linkDistance depending on the correlation
		function calculatelinkDistance(d){						
			return linkDistance*d.correlation; 
		}

		//returns color depending on crimetype
		function fillCircle(d){			
			return commonfunctionsNamespace.getCrimeColor(d.id);
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
		function endDragging(d){
			if (!d3.event.active) simulation.alphaTarget(dragendedAlpha);
			d.fx = null;
			d.fy = null;
		}

		function ingoreNotConnectedLLinks(d){
			let source = d.id;
			changeLinksColorBySource(source, false);		
		}

		function changeLinksColorBySource(source, reset){
			let linksWithThisSource = d3.selectAll(".link").filter(function(d){
					return d.source.id !== source && d.target.id !==source; 
				});
				if(reset){
					resetLinksColor(linksWithThisSource);
				}
				else{
					changeLinksColor(linksWithThisSource);
				}				
						
		}

		function resetLinksColor(links){
			links.style("stroke",getRGBColor);
		}

		function changeLinksColor(links){
			links.style("stroke", that.ignoreLinkColor);
		}

		function resetConnectedLinksColor(d){
			let source = d.id;					
			changeLinksColorBySource(source, true);
		}

		function showLabelAndChangeLineColor(event){		
			showLabel(this);
			changeLineColor(this);		
		}

		function showLabel(that){
			let link = d3.select(that).node(),
				linkId = link.getAttribute("id"),				
				id = "[id="+linkId+"]",        
				corrlabel = d3.selectAll(".correlationLabel").selectAll(id);								
			corrlabel.style("opacity", "1");
		}

		function changeLineColor(selection){
			d3.select(selection).transition().style("stroke", that.highlightLinkColor);			
		}

		function hideLabelAndColor(d, that){
			hideLabel(that);
			restLineColor(that);		
		}

		function hideLabel(that){
			let link = d3.select(that).node(),
				linkId = link.getAttribute("id"),
				id = "[id="+linkId+"]",        
				corrlabel = d3.selectAll(".correlationLabel").selectAll(id);								
			corrlabel.style("opacity", "0");
		}

		function restLineColor(that){
			d3.select(that).transition().style("stroke", function(d){
				return getRGBColor(d);
			});
		}	

		//transform data into a readable json object
		function makeDeepCopyOfArray(data){
			return JSON.parse(JSON.stringify(data));
		}
	}

}