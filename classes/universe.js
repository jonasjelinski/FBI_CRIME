class Universe extends MagicCircle{
	constructor(){
		super();
		this.state = dynamics_namespace.currentState;
		this.htmlelement = htmlel_namespace.THE_UNIVERSE; 
		this.htmlElementID = this.htmlelement.rootid;
		this.rootElement = this.getRootElement();
		this.width = this.htmlelement.width;
		this.height = this.htmlelement.height;
		this.year = 2008;
		this.violenceGroup = 0;
		this.propertyGroup = 1;
		this.violencePos= 0.75;
		this.propertyPos= 0.25;
		this.groupSplitter = 0.5;
		this.standards = {
			standardRadius: this.width/180,
			minRadius: this.width/200,
			standardDistanceToSun: this.width/10,
			minDistanceToSun: this.width/30,
			violenceSunX: this.width*this.violencePos,
			violenceSunY: this.height/2,
			propertySunX: this.width*this.propertyPos,
			propertySunY: this.height/2,
			standardSpeed: 1,
			minSpeed: 1
		}
	}

	doChart(){
		console.log("A lama creates the universe");
		this.drawForceChart();
	}

	drawForceChart(){
		let data = this.createD3Data();
		this.drawForceNodes(data);
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

	calculateStatesQuotient(statename){
		let violentCrimesObject = commonfunctions_namespace.getViolentCrimes(this.year, statename, this.data),
			propertyCrimesObject = commonfunctions_namespace.getPropertyCrimes(this.year, statename, this.data),	
			violentCrimes = this.calculateAverage(violentCrimesObject),
			propertyCrimes = this.calculateAverage(propertyCrimesObject);
		return this.calculateQuotient(violentCrimes, propertyCrimes);
	}

	calculateAverage(crimes){
		let sum = 0,
			keys = Object.keys(crimes),
			size = keys.length;
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
		let minValue = sortedArray[0].quotient,
			maxValue = sortedArray[sortedArray.length-1].quotient,
			delta = maxValue - minValue,
			newArray = [];
		sortedArray.forEach(function(stateObject){
			let newQuotient = {},
				oldQuotient = stateObject.quotient,
				percentage = (oldQuotient-minValue)/delta;
			newQuotient.state = stateObject.state;
			newQuotient.quotient = percentage;
			newArray.push(newQuotient);

		});			
		return newArray;
	}

	createUniverse(sortedQuotients){
		let universe = [],
			that = this,		
			planetNumber = 1,
			numberOfViolenceStates = this.getNumberOfViolencePlanets(sortedQuotients),
			numberOfPropertyStates = sortedQuotients.length - numberOfViolenceStates,
			lastRadius = 0;
		universe = this.createSuns(universe);
		sortedQuotients.forEach(function(stateObject){
			let maxPlanets = stateObject.quotient > that.groupSplitter? numberOfViolenceStates : numberOfPropertyStates,
				newNode = {};
			newNode.id = that.createId(stateObject.state);
			newNode.quotient = stateObject.quotient;
			newNode = that.createPlanet(newNode, maxPlanets, planetNumber, lastRadius);
			lastRadius = newNode.radius;
			universe.push(newNode);
			planetNumber++;
			if(planetNumber>maxPlanets){
				planetNumber = 0;
			}
		});
		return universe;
	}
	
	getNumberOfViolencePlanets(sortedQuotients){
		let numberOfViolenceObjects = 0,
			that =this;
		sortedQuotients.forEach(function(stateObject){
			if(stateObject.quotient > that.groupSplitter){
				numberOfViolenceObjects++;
			}
		});		
		return numberOfViolenceObjects;		
	}

	createPlanet(node, maxPlanets, planetNumber, lastRadius){
		let factor = node.quotient,
			speedFactor = (1/(factor+1)),	
			fullCircle = 360,			
			radiusFactor = 0,
			halfCircle = 180;
		node.group = node.quotient > this.groupSplitter ? this.violenceGroup: this.propertyGroup;			
		node.color = this.getRGBColor(factor);
		radiusFactor = node.group === this.violenceGroup ? factor : factor*2;
		node.radius = this.standards.standardRadius*radiusFactor + this.standards.minRadius;
		node.distanceToSun = this.standards.standardDistanceToSun/maxPlanets*planetNumber+2*lastRadius+this.standards.minDistanceToSun;
		node.speed = this.standards.standardSpeed*speedFactor+this.standards.minSpeed;
		node.startAngle = Math.floor((Math.random() * fullCircle) + 1)* Math.PI/halfCircle;
		node.xSun = node.group === this.violenceGroup ? this.standards.violenceSunX: this.standards.propertySunX;
		node.ySun = node.group === this.violenceGroup ? this.standards.violenceSunY: this.standards.propertySunY;
		node.x = node.xSun + node.distanceToSun*Math.cos(node.startAngle);
		node.y = node.ySun + node.distanceToSun*Math.sin(node.startAngle);
		return node;
	}

	getRGBColor(factor){
		let maxColor = 255,
			minColor = 0,
			red = maxColor - maxColor * factor,
			green = minColor, 
		 	blue = maxColor*factor;
		return "rgb(" + red + "," + green + "," + blue+ ")";  
	}

	createId(statename){
		let maxChars = 8,	
			id =  statename.substring(0,maxChars);
		return id;
	}

	createCenterNodes(newArray){
		let quotientProp = 2,
			quotientVio = 2,
			distanceToSun = 0,
			propertyNode = {},
			violenceNode = {};
		propertyNode.id = "Property";
		propertyNode.group = this.propertyGroup;
		propertyNode.quotient = quotientProp;		
		violenceNode.id = "Violence";
		violenceNode.group = this.violenceGroup;
		violenceNode.quotient = quotientVio;
		newArray.push(propertyNode, violenceNode);
		return newArray;
	}

	createSuns(suns){
		let propertyNode = {},
			violenceNode = {};
		propertyNode.id = "Property";
		violenceNode.id = "Violence";
		propertyNode = this.createSun(propertyNode);
		violenceNode = this.createSun(violenceNode);
		suns.push(propertyNode);
		suns.push(violenceNode);
		return suns;	
	}

	createSun(node){
		let factor = 2;	
		node.quotient = factor;
		node.distanceToSun =0;
		node.speed = 0;
		node.startAngle = 0;
		node.radius = this.standards.standardRadius*factor + this.standards.minRadius;
		if(node.id === "Violence"){
			node.group = this.violenceGroup;
			node.color = "red";		
			node.xSun = this.standards.violenceSunX;
			node.ySun = this.standards.violenceSunY;
			node.x = node.xSun;
			node.y = node.ySun;
		}
		else if(node.id === "Property"){
			node.group = this.propertyGroup;
			node.color = "blue";		
			node.xSun = this.standards.propertySunX;
			node.ySun = this.standards.propertySunY;
			node.x = node.xSun;
			node.y = node.ySun;
		}
		else{
			console.log("couldnt create centernode: ", node);
		}
		return node;
	}	

	createLinks(sortedQuotients){		
		let links = [],
			that = this;
		// {"source": "Napoleon", "target": "Myriel", "value": 1},
		sortedQuotients.forEach(function(stateObject){
			let newLink = {};
			newLink.source = that.createId(stateObject.state);
			newLink.target = stateObject.quotient > this.groupSplitter ? "Violence" : "Property";
			links.push(newLink);
		});		
		return links;
	}

	//source: https://bl.ocks.org/mbostock/4062045
	drawForceNodes(data){
		let sortedQuotients = data,	
			that = this,		
			universe = this.createUniverse(sortedQuotients),
			width = this.width,
			height = this.height,
			rootElement,
			node,
			label,
			link;
		
		prepareRootNode();
		initNode();
		initLabel();
		initLink();
		setUniverseDataAndDrawBehaviour();
		drawUniverse();
		animateRotation();

		function prepareRootNode(){
			rootElement = that.rootElement.attr("width", width).attr("height", height);
		}

		function initNode(){
			node = rootElement.attr("class", "nodes")
				.selectAll("circle")
				.data(universe);
		}

		function initLabel(){
			label = rootElement.attr("class", "lables")
				.selectAll(".lables")
				.data(universe);
		}

		function initLink(){
			link = rootElement      	 	
				.attr("class", "links").attr("width",width).attr("height",height)
				.selectAll("line")
				.data(universe);
		}

		function setUniverseDataAndDrawBehaviour(){
			node.data(universe);
			exitNode();			
			enterNode();

			label.data(universe);
			exitLabel();			
			enterLabel();

			//link.data(universe);
			//exitLink();			
			//enterLink();
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
			node = node.enter().append("circle");			
		}
		
		function enterLabel(){
			label = label.enter().append("text")
				.text(function(d){return d.id;})
				.attr("fill","green" )
				.style("opacity", "0.5")
				.style("font-size", "20px")			
				.on("mouseover", function(d){changeFont(d, this);});
		}		

		function enterLink(){
			link = link.enter().append("line")
				.attr("stroke-width", 2)
				.style("stroke", "black");
		}

		function drawUniverse(){ 	  		
			
			node.attr("cx", function(d){return d.x;})      			
				.attr("cy", function(d){return d.y;})			
				.attr("r", function(d){return d.radius;})
				.attr("fill", function(d){return d.color;}); 

			label
				.attr("x", function(d){return d.x;})    		
				.attr("y", function(d){return d.y;});

			link
				.attr("x1", function(d, i) {return d.xSun })
				.attr("y1", function(d) { return d.ySun; })
				.attr("x2", function(d) { return d.x; })
				.attr("y2", function(d) { return d.y; });
		}

		function changeFont(d, that){
			let n = d3.select(that).node(),
				opacity = n.style.opacity,
				fontSize = n.style.fontSize,
				durationTime = 500;									
			opacity = opacity === "1" ? "0.1": "1";	
			fontSize = opacity === "1" ? "30px" : "20px"; 			
			d3.select(that).transition().duration(durationTime).style("opacity", opacity).style("font-size", fontSize);
		}

		//keine Transition sonst funktioniert Kreisbwegung nicht!
		function updatePlanetPositions(angle){
			node
				.attr("cx",function(d, i){
					calculateNextPlanetPosition(d,i, angle);
					return d.x;	}) 	
				.attr("cy", function(d){return d.y;});
			label
				.attr("x",function(d, i){
					calculateNextPlanetPosition(d,i, angle);
					return d.x;	}) 	
				.attr("y", function(d){return d.y;});
		}

		function calculateNextPlanetPosition(d, i, angle){
			let halfCircle = 180,        
				newAngel = (d.startAngle/Math.PI*halfCircle+angle)*Math.PI/halfCircle;
			newAngel =  newAngel*d.speed;        
			d.y = d.ySun + Math.sin(newAngel)*d.distanceToSun;
			d.x = d.xSun + Math.cos(newAngel)*d.distanceToSun;		
			return d;
		}

		function animateRotation(){
			let angle = 0,
				delay = 100,
				time = 100,	
				t = d3.interval(function(elapsed) {				
					updatePlanetPositions(angle);
					angle++; 				 			
				}, delay, time);			
		}	
	}  

}