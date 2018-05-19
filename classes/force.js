class TheForce extends MagicCircle{
	constructor(){
		super();
		this.state = dynamics_namespace.currentState;
		this.htmlelement = htmlel_namespace.THE_FORCE; 
        this.htmlElementID = this.htmlelement.rootid;
        this.rootElement = this.getRootElement();
        this.width = this.htmlelement.width;
        this.height = this.htmlelement.height;
        this.year = 2008;
        this.violenceGroup = 0;
        this.propertyGroup = 1;
        this.violencePos= 0.75;
        this.propertyPos= 0.25;
	}

	doChart(){
		console.log("A lama uses the force");
		this.drawForceChart();
	}

	drawForceChart(){
		let data = this.createD3Data();
		this.drawForceNodes(data);
	}

	createD3Data(){
		let quotients = [];
		let sortedArray = [];
		let percentageAarray = [];
		let statesObject = this.data.years[this.year].states;
		let statesArray = Object.keys(statesObject);
		for(let i = 0; i < statesArray.length; i++){
			let state = statesArray[i];
			let newQuotient = {};
			let q = this.calculateStatesQuotient(state);
			newQuotient.state = state;
			newQuotient.quotient = q;
			quotients.push(newQuotient);
		}
		sortedArray = this.sortArray(quotients);
		percentageAarray = this.transformQuotientToPercentages(sortedArray);
		return percentageAarray;	 
	}

	calculateStatesQuotient(statename){
		let violentCrimesObject = commonfunctions_namespace.getViolentCrimes(this.year, statename, this.data);
		let propertyCrimesObject = commonfunctions_namespace.getPropertyCrimes(this.year, statename, this.data);		
		let violentCrimes = this.calculateAverage(violentCrimesObject);
		let propertyCrimes = this.calculateAverage(propertyCrimesObject);
		return this.calculateQuotient(violentCrimes, propertyCrimes);
	}

	calculateAverage(crimes){
		let sum = 0;
		let keys = Object.keys(crimes);
		let size = keys.length;
		keys.forEach(function(key){
			sum = sum + parseFloat(crimes[key]);	
		});
		return sum / size;
	}	

	calculateQuotient(violentCrimes, propertyCrimes){
		let quotient = violentCrimes/propertyCrimes;
		return quotient;
	}

	sortArray(array){
		let sortedArray = array.sort(function(state1,state2){
			return state1.quotient - state2.quotient;
		});
		return sortedArray;
	}

	transformQuotientToPercentages(sortedArray){
		let minValue = sortedArray[0].quotient;
		let maxValue = sortedArray[sortedArray.length-1].quotient;
		let delta = maxValue - minValue;
		let newArray = [];
		sortedArray.forEach(function(stateObject){
			let newQuotient = {};
			let oldQuotient = stateObject.quotient;
			let percentage = (oldQuotient-minValue)/delta;
			newQuotient.state = stateObject.state;
			newQuotient.quotient = percentage;
			newArray.push(newQuotient);

		});
			
		return newArray;
	}

	createNodes(sortedQuotients){
		let newArray = [];
		let that = this;
		newArray = this.createCenterNodes(newArray);
		sortedQuotients.forEach(function(stateObject){
			let newNode = {};
			let statename = stateObject.state;			
			newNode.id = that.createId(statename);
			newNode.quotient = stateObject.quotient;
			newNode.group = stateObject.quotient > 0.5 ?  that.violenceGroup :  that.propertyGroup;
			newArray.push(newNode);
		});
		return newArray;
	}

	createId(statename){	
		let id =  statename.substring(0,8);
		return id;
	}

	createCenterNodes(newArray){
		let quotientProp = 2;
		let quotientVio = 2;
		let propertyNode = {};
		propertyNode.id = "Property";
		propertyNode.group = this.propertyGroup;
		propertyNode.quotient = quotientProp;
		let violenceNode = {};
		violenceNode.id = "Violence";
		violenceNode.group = this.violenceGroup;
		violenceNode.quotient = quotientVio;
		newArray.push(propertyNode, violenceNode);
		return newArray;
	}

	createLinks(sortedQuotients){		
		let links = [];
		let that = this;
		// {"source": "Napoleon", "target": "Myriel", "value": 1},
		sortedQuotients.forEach(function(stateObject){
			let newLink = {};
			newLink.source = that.createId(stateObject.state);
			newLink.target = stateObject.quotient > 0.5 ? "Violence" : "Property";
			links.push(newLink);
		});		
		return links;
	}

	//source: https://bl.ocks.org/mbostock/4062045
	drawForceNodes(data){
		let that =this;
		let sortedQuotients = data;
		let links = this.createLinks(sortedQuotients);
		let nodes = this.createNodes(sortedQuotients);
		//console.log(links," ",nodes);
		let width = this.width;
		let height = this.height;
		let rootElement = this.rootElement.attr("width", width).attr("height", height);
		let radius = 5;
		let strokeWidth = 2;
		let centerX = 0
		let centerY = height/2;
		let center = [centerX, centerY];
		let distance = width/10
		let violenceX = width*this.violencePos;
		let propertyX = width*this.propertyPos;
		let foci = [{x: violenceX, y: centerY}, {x: propertyX, y: centerY}];
		let dutationtime = 500;

		let simulation = d3.forceSimulation()
			.nodes(nodes)		   
		    .force("charge", d3.forceManyBody())
		    .force("center", d3.forceCenter(centerX, centerY))
		    .force("collision", d3.forceCollide().radius(radius))
		    .force("link", d3.forceLink().links(links).id(linkId).distance(linkDistance))
		    .on('tick', updatePos);

		

		let node = rootElement.attr("class", "nodes")
    			.selectAll("circle")
    			.data(nodes);
      			

      	let label = rootElement.attr("class", "lables")
    			.selectAll(".lables")
    			.data(nodes);
    			

      	 var link = rootElement      	 	
			    .attr("class", "links").attr("width",width).attr("height",height)
			    .selectAll("line")
			    .data(links);
		
		updateForceNodes();

      	function updatePos(){
      		
      		node.transition()
				.duration(dutationtime)
				.attr("cx", function(d){return calculateNodeXPos(d);})      			
      			.attr("cy", function(d){return calculateYPos(d);});  

      		label.transition()
				.duration(dutationtime)
				.attr("x", function(d){return calculateNodeXPos(d);})    			
      			.attr("y", function(d,i){return calculateYPos(d);});

	   	 	link.transition()
				.duration(dutationtime)
        		.attr("x1", function(d, i) {return calculateLinkXPos(d, 0); })
        		.attr("y1", function(d) { return d.source.y; })
        		.attr("x2", function(d) { return calculateLinkXPos(d,1); })
        		.attr("y2", function(d) { return d.target.y; }); 
        }

        function xCenter(d){ 

        	return centerX;
        }


        function linkId(d){
        	return d.id;
        }


		function linkDistance(d){
			let factor = d.source.quotient+1;
			return distance*1/2*factor; 
		}

		function calculateLinkXPos(d, index){
			let xPositions = [];
			let source = d.source;
			let target = d.target;
			let group = target.id == "Property" ? that.propertyGroup : that.violenceGroup;
			let sourceX = translateXPosDependingOnGroup(source.x, group);
			let targetX = translateXPosDependingOnGroup(target.x, group);
			xPositions.push(sourceX, targetX);
			xPositions[sourceX, targetX];		
			return xPositions[index];
		}

		function calculateNodeXPos(d) {
			//console.log(d);
      		let xPos =d.x;
      		let group = d.group;      		
      		return translateXPosDependingOnGroup(xPos, group);      	
        }

		function translateXPosDependingOnGroup(x, group){
			let xPos;      	
      		
      		if(group === that.violenceGroup){
      			xPos = foci[that.violenceGroup].x+x;
      		}

      		else if(group === that.propertyGroup){
      		 	xPos = foci[that.propertyGroup].y+x
      		}      		 
      		return xPos;
		}

		function calculateYPos(d){
        	return d.y;
        }


		function updateForceNodes(){
			node.data(nodes);
			node.exit().remove();
			updateNode();

			label.data(nodes);
			label.exit().remove();
			updateLabel();

			link.data(links);
			link.exit().remove();	
			updateLink();
		}

		function updateNode(){
			node = node.enter().append("circle")				
      			.attr("r", function(d){return radius*(1+d.quotient*2);})
      			.attr("fill", function(d){return d.group === that.propertyGroup ? "red": "blue"; })
		}

		function updateLabel(){
			label = label.enter().append("text")
      			.text(function(d){return d.id;})
      			.attr("fill","green" )
      			.attr("x", calculateNodeXPos)    			
      			.attr("y", calculateYPos); 
		}

		function updateLink(){
			link = link.enter().append("line")
			    .attr("stroke-width", strokeWidth)
                //.attr("stroke", "black");
		}

        
	}

}