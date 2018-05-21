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
		let that = this;
		let sortedQuotients = data;
		let links = this.createLinks(sortedQuotients);
		let nodes = this.createNodes(sortedQuotients);
		//console.log(links," ",nodes);
		let width = this.width;
		let height = this.height;
		let rootElement = this.rootElement.attr("width", width).attr("height", height);
		let radius = 5;
		let strokeWidth = 2;
		let centerX = 0;
		let centerY = height/2;
		let center = [centerX, centerY];
		let distance = width/30;
		let violenceX = width*this.violencePos;
		let propertyX = width*this.propertyPos;
		let foci = [{x: violenceX, y: centerY}, {x: propertyX, y: centerY}];
		let durationtime = 1000;
		let sizeFactor = 5;
		

		let simulation = d3.forceSimulation()
			.nodes(nodes)		   
		    .force("charge", d3.forceManyBody())
		    .force("center", d3.forceCenter(centerX, centerY))
		    .force("collision", d3.forceCollide().radius(radius))
		    .force("link", d3.forceLink().links(links).id(linkId).distance(linkDistance))
		    .on('tick', updatePos)
		   .on('end', animateRotation);

		

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
		
		setForceNodesSettings();


      	function updatePos(){ 	  		
      		
      		node.attr("cx", calculateNodeXPos)      			
      			.attr("cy", calculateNodeYPos)			
      			.attr("r", calculateCircleRadius)
      			.attr("fill", fillCircle); 

      		label
				.attr("x", function(d){
					return d.startPositionX;})    		
      			.attr("y", calculateNodeYPos);

	   	 	link
        		.attr("x1", function(d, i) {return calculateLinkXPos(d, 0); })
        		.attr("y1", function(d) { return d.source.y; })
        		.attr("x2", function(d) { return calculateLinkXPos(d,1); })
        		.attr("y2", function(d) { return d.target.y; });
        }

		function setForceNodesSettings(){
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
      			.attr("r", calculateCircleRadius)
      			.attr("fill", fillCircle);
		}

		function enterLabel(){
			label = label.enter().append("text")
      			.text(function(d){return d.id;})
      			.attr("fill","green" );      			 
		}

		function enterLink(){
			link = link.enter().append("line")
			    .attr("stroke-width", strokeWidth);
		}

        function linkId(d){
        	return d.id;
        }	


		function linkDistance(d){
			let factor = d.source.quotient+1;
			return distance*sizeFactor*factor; 
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
			let xPos = d.x;
			if(d.positionChanged === undefined){
				let group = d.group;      		
      			xPos = translateXPosDependingOnGroup(xPos, group);
      			d.x = xPos;
      			d.positionChanged = true;
      			d.startPositionX = xPos;      			
			}
			else {xPos = d.startPositionX;}     		
      				
      		return xPos;    	
        }

		function translateXPosDependingOnGroup(x, group){
			let xPos;      	
      		
      		if(group === that.violenceGroup){
      			xPos = foci[that.violenceGroup].x+x;
      		}

      		else if(group === that.propertyGroup){
      		 	xPos = foci[that.propertyGroup].x+x;
      		}      		 
      		return xPos;
		}

        function calculateCircleRadius(d){
        	return radius*(1+d.quotient*sizeFactor);
        }

        function fillCircle(d){
        	return d.group === that.propertyGroup ? "red": "blue"; 
        }

		function calculateNodeYPos(d){
			if(d.id ==="Property"){				
				return foci[that.propertyGroup].y;
			}
			else if(d.id === "Violence"){
				return foci[that.violenceGroup].y;
			}
        	return d.y;
        }

		function calculateNextPlanetStep(d, i, angle){

			if(d.id === "Property"){
				d.x = d.startPositionX;
				foci[that.propertyGroup].x = d.x;
				d.y = calculateNodeYPos(d);
				foci[that.propertyGroup].y = d.y;
				//console.log("Prop", d.x);
				return null;
			}
			else if(d.id === "Violence"){
				d.x = d.startPositionX;
				foci[that.violenceGroup].x = d.x;
				d.y = calculateNodeYPos(d);
				foci[that.violenceGroup].y = d.y;
				return null;
			}

			let startingPointX;			
			if(startingPointX === undefined){
				startingPointX = d.startPositionX;
			}		

			let group = d.group;
			let xSun = group === that.propertyGroup ? foci[that.propertyGroup].x : foci[that.violenceGroup].x;
			let ySun = group === that.propertyGroup ? foci[that.propertyGroup].y : foci[that.violenceGroup].y;
			ySun = ySun;
			let xOld = startingPointX;
			let yOld = d.y;
        	let deltaX = xOld - xSun;
        	let deltaY = yOld - ySun;
        	
        	if(d.startRadians === undefined){
        		d.startRadians = Math.atan2(deltaY, deltaX)* 180 / Math.PI;
        	}
        	let startRadians = d.startRadians;
        	let angleRad = startRadians+(angle)* Math.PI/180; 
        	let xSquare = deltaX*deltaX;
        	let ySquare = deltaY*deltaY;

       
        	if(d.circleRadius === undefined){
        		d.circleRadius = Math.sqrt(xSquare+ySquare);
        	}       	      	

        	//let stepSize = deltaY+deltaX;
        	//let xStep = deltaX*Math.cos(angleRad);
        	//let yStep = deltaY*Math.sin(angleRad); 
        	let cos = Math.cos(angleRad);
        	let sin = Math.sin(angleRad);
           	
        	//let newX = xSun + xStep+yStep;
        	let xStep = d.circleRadius*cos;
        	let yStep = d.circleRadius*sin;
        	//let newY = ySun + xStep+yStep; //Math.sin(angle)*radius;
        	let newX = xSun + xStep;  
			let newY = ySun + yStep;

        	//https://math.stackexchange.com/questions/1384994/rotate-a-point-on-a-circle-with-known-radius-and-position
        	//ohne radius: A(x,y): kreiszentrum, B Alter Punkt, C neuer punkt 
        	/*Cx=Ax+(Bx−Ax)cosα−(By−Ay)sinα
			Cy=Ay+(Bx−Ax)sinα+(By−Ay)cosα*/			

        	d.x = newX;
        	d.y = newY;        	
        	if(i===6){
        		//console.log("r", d.circleRadius, "deltaY",deltaY," startRadians",startRadians," angleRad ", angleRad);
        		//console.log("xStep ", xStep, "newX", newX," sunX ",xSun, " ySun ", ySun, " newY ", newY, " angle ",angle );
        		//console.log("d", d, "xSun", xSun,  " ySun", ySun, " xOld ", xOld, "  yOld ",yOld, "deltaX", deltaX,"deltaY", deltaY, " yOld :", yOld, "angleRad:", angleRad);
        		//console.log("yStep", newY); 
        		//console.log("ySun", d); 
        		/*console.log("angle", angleRad);   
        		console.log("deltaX", deltaX);   
        		console.log("deltaY", deltaY);   
        		console.log("yOld", yOld);   
        		console.log("ySun", ySun);   
        		  
        		console.log("xOld", xOld);   
        		
        		console.log("newX", newX, "  D  ", d.x);*/
        	} 
                	
        	
        }

		function rotatePlanets(angle){
			
			node.transition()
				.duration(durationtime)
				//.attr("transform", function(d,i){
				//	calculateNextPlanetStep(d,i, angle);
				//	return "translate(" + d.x + ",-" + d.y + ")";
				//})				
				.attr("cx",function(d, i){
				calculateNextPlanetStep(d,i, angle);
				return d.x;				 	
				 	}) 	
				.attr("cy", function(d,i){
					return d.y});

      		}
      			

		function animateRotation(){
			let angle = 0;	
			var t = d3.interval(function(elapsed) {
			
				rotatePlanets(angle);
				angle++; 
				if(angle>360){
					//console.log("neue Runde");
					angle = 0;
				}

				 			
			}, 100, 100);
			
		}
		var start = Date.now();

		function startAnimation() {
  
        d3.timer(function() {
            var angle = (Date.now() - start);
            var transform = function() {
                //return "rotate(" + angle + ", 0, 0)";
               // console.log("angle", angle);
            };
           node.attr("transform", transform);

           });
    
    	}

	}

        
	

}