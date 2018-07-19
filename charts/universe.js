//This class creates a UniverseChart
//it shows in which states the relation between violentCrimes and propertycrimes  
//quotient = violentCrimes/propertycrimes 
//is bigger or smaller then this.groupSplitter

class Universe extends MagicCircle{
	constructor(pageId){
		super(pageId);		
		this.htmlelement = htmlelementsNamespace.theUniverse; 
		this.htmlElementID = this.htmlelement.htmlid;
		this.width = this.htmlelement.width;
		this.height = this.htmlelement.height;
		this.year = configNamespace.STATES_AND_CRIMES.minYear;
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
			standardSpeed: 0.55,
			minSpeed: 0.25,
		};		
		this.animateRotation;
		this.stopRotation;
		this.isRotating = false;
		this.rotationAngle = 0;
		this.rotationTimer = undefined;
		this.labelColor = this.htmlelement.labelColor;
		this.labelSize = this.htmlelement.labelSize;
		this.hoverOutSize = this.htmlelement.hoverOutLabelSize;
		this.hoverInSize = this.htmlelement.hoverInLabelSize;
	}

	//draws the universe
	doChart(){
		console.log("A lama creates the universe");
		this.drawUniverseChart();
	}

	killsHimself(){
		super.killsHimself();
		this.stopRotationTimer();
		
	}

	stopRotationTimer(){
		if(this.rotationTimer!==undefined){
			this.rotationTimer.stop();
		}
	}

	setYear(year){
		this.year = year;
	}

	rotateOrStop(){
		if(this.isRotating){
			this.stopRotation();			
		}
		else{
			this.animateRotation();			
		}
	}

	//converts the data so it is usable and then draws the Universe	
	drawUniverseChart(){
		let universeNodes = this.getUniverseNodes();
		this.drawTheWholeUniverse(universeNodes);
	}

	//converts the data so it is usable for the universe
	//receives the crimes of this.year and all states
	//and creates an array in which states are ordered 
	//by percentage according to the relation violentCrimes/propertyCrimes
	//returns this ordered array 
	getUniverseNodes(){
		let statesObject = this.data.years[this.year].states,
			allstates = Object.keys(statesObject),
			quotientsPerStateArray = this.createViolentCrimeQuotientForEachState(allstates),
			universeNodes = this.transformQuotientToNodeStructure(quotientsPerStateArray);	
		return universeNodes;	 
	}

	transformQuotientToNodeStructure(quotientsPerStateArray){
		let sortedQuotientsPerStateArray = this.sortArray(quotientsPerStateArray),
			percentageArray = this.transformQuotientToPercentages(sortedQuotientsPerStateArray),
			universeNodes = this.createUniverse(percentageArray);
		return universeNodes;
	}

	createViolentCrimeQuotientForEachState(statesArray){
		let quotientsPerState = [];
		for(let i = 0; i < statesArray.length; i++){
			let state = statesArray[i],
				newQuotientObject = this.createQuotientPerStateObject(state);		
			quotientsPerState.push(newQuotientObject);
		}
		return quotientsPerState;
	} 

	createQuotientPerStateObject(state){
		let newQuotient = {};			
		newQuotient.state = state;
		newQuotient.quotient = this.calculateStatesQuotient(state);
		return newQuotient;	
	}

	//returns the quotient violentCrimes/propertyCrimes for a single state
	calculateStatesQuotient(statename){
		let violentCrimesObject = commonfunctionsNamespace.getViolentCrimes(this.year, statename, this.data),
			propertyCrimesObject = commonfunctionsNamespace.getPropertyCrimes(this.year, statename, this.data),	
			violentCrimes = this.calculateAverage(violentCrimesObject),
			propertyCrimes = this.calculateAverage(propertyCrimesObject);
		return this.calculateQuotient(violentCrimes, propertyCrimes);
	}

	//returns the average of a crimetype e.g. violentCrimes
	calculateAverage(crimes){
		let sum = 0,
			keys = Object.keys(crimes),
			size = keys.length;
		keys.forEach(function(key){
			sum = sum + parseFloat(crimes[key]);	
		});
		return sum / size;
	}	

	//calculates the quotient of violentCrimes/propertyCrimes
	calculateQuotient(violentCrimes, propertyCrimes){
		let quotient = violentCrimes/propertyCrimes;
		return quotient;
	}

	//sorts the array according to the quotients violentCrimes/propertyCrimes
	//of the states in the array
	sortArray(array){
		let sortedArray = array.sort(function(state1,state2){
			return state1.quotient - state2.quotient;
		});
		return sortedArray;
	}

	//transforms the floatnumber quotient= violentCrimes/propertyCrimes
	//to percentage so that states are comparable
	transformQuotientToPercentages(sortedArray){
		let minValue = sortedArray[0].quotient,
			maxValue = sortedArray[sortedArray.length-1].quotient,
			delta = maxValue - minValue,
			newArray = [],
			that = this;
		sortedArray.forEach(function(stateObject){
			let newQuotient = {};				
			newQuotient.state = stateObject.state;
			newQuotient.quotient = that.calculatePercentage(stateObject, minValue, delta);
			newArray.push(newQuotient);
		});			
		return newArray;
	}

	//calculates the percentage of a quotitent
	//100% is the maximum quotient-value of all planets
	//0% is the minimum quotient-value of all planets
	calculatePercentage(stateObject, minValue, delta){
		let oldQuotient = stateObject.quotient,
			percentage = (oldQuotient-minValue)/delta;
		return percentage;
	}

	//create a universe node object with the given array
	//each universe consists of sunnodes and their childnodes planets
	createUniverse(sortedQuotientsPerStateArray){
		let universe = [],		
			suns = this.createSuns(),
			planets = this.createPlanets(sortedQuotientsPerStateArray);
		universe = suns.concat(planets);
		return universe;
	}

	//creates all planets
	//each planet is an object with data for drawing
	createPlanets(sortedQuotientsPerStateArray){
		let planets = [],
			that = this,
			planetNumber = 1,
			lastRadius = 0,
			numberOfViolenceStates = this.getNumberOfViolencePlanets(sortedQuotientsPerStateArray),
			numberOfPropertyStates = sortedQuotientsPerStateArray.length - numberOfViolenceStates;
		sortedQuotientsPerStateArray.forEach(function(stateObject){
			let maxPlanets = that.getMaxPlanets(stateObject, numberOfViolenceStates, numberOfPropertyStates),
				newPlanet = that.createNewPlanet(stateObject, lastRadius, maxPlanets, planetNumber);			
			planets.push(newPlanet);			
			lastRadius = newPlanet.radius;			
			planetNumber++;
			if(planetNumber>maxPlanets){
				planetNumber = 0;
			}
		});
		return planets;
	}

	//returns max number of planets
	getMaxPlanets(stateObject, numberOfViolenceStates, numberOfPropertyStates){
		return stateObject.quotient > this.groupSplitter? numberOfViolenceStates : numberOfPropertyStates;
	}

	//creates a new planet
	createNewPlanet(stateObject, lastRadius, maxPlanets, planetNumber){
		let newPlanet = {};
		newPlanet.id = this.createId(stateObject.state);
		newPlanet.quotient = stateObject.quotient;
		newPlanet = this.createDrawingDataForPlanet(newPlanet, maxPlanets, planetNumber, lastRadius);
		return newPlanet;			
	}
	
	//returns how many planets have more violentCrimes then propertyCrimes
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

	//appends the data to the node which are important for drawing the planet correct
	createDrawingDataForPlanet(node, maxPlanets, planetNumber, lastRadius){
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

	//returns a rgb color
	//it get less red if factor is bigger
	getRGBColor(factor){
		let maxColor = 255,
			minColor = 0,
			red = maxColor * factor,
			green = minColor, 
			blue = maxColor- maxColor * factor;
		return "rgb(" + red + "," + green + "," + blue+ ")";  
	}

	//creates an id for the node
	createId(statename){
		return statename;
	}

	//creates two suns which are objects
	createSuns(){
		let propertyNode = {},
			violenceNode = {},
			suns = [];
		propertyNode.id = "Property";
		violenceNode.id = "Violence";
		propertyNode = this.createSun(propertyNode);
		violenceNode = this.createSun(violenceNode);
		suns.push(propertyNode);
		suns.push(violenceNode);
		return suns;	
	}

	//creates a single suns which is an object
	createSun(node){
		let factor = 2,
			sun = node;	
		sun.quotient = factor;
		sun.distanceToSun =0;
		sun.speed = 0;
		sun.startAngle = 0;
		sun.radius = this.standards.standardRadius*factor + this.standards.minRadius;
		if(node.id === "Violence"){
			sun = this.createViolenceSun(sun);
		}
		else if(node.id === "Property"){
			sun = this.createPropertySun(sun);
		}
		else{
			console.log("couldnt create sun: ", sun);
		}
		return sun;
	}	

	//creates a sun for the violence
	createViolenceSun(node){
		node.group = this.violenceGroup;
		node.color = "red";		
		node.xSun = this.standards.violenceSunX;
		node.ySun = this.standards.violenceSunY;
		node.x = node.xSun;
		node.y = node.ySun;
		return node;
	}

	//creates a sun for the properties
	createPropertySun(node){
		node.group = this.propertyGroup;
		node.color = "blue";		
		node.xSun = this.standards.propertySunX;
		node.ySun = this.standards.propertySunY;
		node.x = node.xSun;
		node.y = node.ySun;
		return node;
	}

	//creates links which connect the planets with the sun
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

	//draws the universe with the given data
	//source: https://bl.ocks.org/mbostock/4062045
	drawTheWholeUniverse(universeNodes){
		let that = this,		
			universe = universeNodes,
			container = this.container,
			width = this.width,
			height = this.height,
			durationTime = 1000,
			zoomContainer,
			hoverContainer,
			minZoom = 0.5,
			maxZoom = 5,
			node,
			label,
			link,
			canvas;		
		this.animateRotation = animateRotation;
		this.stopRotation = stopRotation;
		
		initZoomContainer();
		initHoverContainer();	
		initNode();
		initLabel();
		initLink();		
		setEnterAndExitBehaviour();
		drawUniverse();	

		function initZoomContainer(){
			zoomContainer =  container
				.append("svg")
				.attr("class", "zoomContainer")
				.call(d3.zoom()
					.scaleExtent([minZoom, maxZoom])
					.translateExtent([[0, 0], [width, height]])
					.extent([[0, 0], [width, height]])
					.on("zoom", function () {					
    					zoomContainer.attr("transform", d3.event.transform);
 				}));
		}

		//hoverContainer is nearly invisible so it
		//still recveis events but cant be seen
		function initHoverContainer(){
			let opacity = 0.001;
			hoverContainer = zoomContainer
				.append("rect")
				.attr("class", "hoverContainer")
				.attr("width", width)
				.attr("height", height)
				.attr("fill", "gray")
				.attr("x", 0)
				.attr("y", 0)
				.attr("opacity", opacity)
				.on("mouseover", commonfunctionsNamespace.disableScroll)
				.on("mouseout", commonfunctionsNamespace.enableScroll);
		}	
		
		//sets width and height of the container for the nodes which are small circles
		//and gives it the data
		function initNode(){
			node = zoomContainer.append("g").attr("class", "nodes")
				.attr("width",width).attr("height",height)
				.selectAll("circle")
				.data(universe);		
		}

		//sets width and height of the container for the labels
		//and gives it the data
		function initLabel(){
			label = zoomContainer.append("g").attr("class", "lables")
				.attr("width",width).attr("height",height)
				.selectAll(".lables")
				.data(universe);
		}

		//sets width and height of the container for the links
		//and gives it the data
		function initLink(){
			link = zoomContainer.append("g").attr("class", "links")
				.attr("width",width).attr("height",height)
				.selectAll("line")
				.data(universe);
		}
	
		//sets the data to the node, the labels and the lines and how it should be drawn
		//if new data is given to the sunburst or if data is taken away
		function setEnterAndExitBehaviour(){
			node.data(universe);
			exitNode();			
			enterNode();

			label.data(universe);
			exitLabel();			
			enterLabel();

			link.data(universe);
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
				.attr("fill", that.labelColor )
				.style("opacity", "0.5")
				.style("font-size", that.labelSize)			
				.on("mouseover", function(d){changeFont(d, this);})
				.on("mouseout", function(d){resetFont(d, this)});
		}		

		function enterLink(){
			link = link.enter().append("line")
				.attr("stroke-width", 2)
				.style("stroke", "black");
		}

		//draws the universe
		function drawUniverse(){ 	  		
			
			node	
				.attr("cx", function(d){return d.x;})      			
				.attr("cy", function(d){return d.y;})
				.attr("r", function(d){return 0;})
				.attr("fill", function(d){return "black";})
				.transition()
				.ease(d3.easeLinear)
				.duration(durationTime)  			
				.attr("r", function(d){return d.radius;})
				.attr("fill", function(d){return d.color;}); 

			label
				.attr("x", function(d){return d.x;})    		
				.attr("y", function(d){return d.y;});

			link
				.attr("x1", function(d) {return d.xSun })
				.attr("y1", function(d) { return d.ySun; })
				.attr("x2", function(d) { return d.x; })
				.attr("y2", function(d) { return d.y; });
		}

		//changes the font so labels get less visible
		//if the label d is actived
		function changeFont(d, selection){
			let label = d3.select(selection).node(),
				opacity = label.style.opacity,
				fontSize = label.style.fontSize,
				durationTime = 500;									
			opacity = "1";	
			fontSize = that.hoverInSize; 			
			d3.select(selection).transition().duration(durationTime).style("opacity", opacity).style("font-size", fontSize);
		}


		function resetFont(d, selection){
			console.log("reset");
			let label = d3.select(selection).node(),
				opacity = label.style.opacity,
				fontSize = label.style.fontSize,
				durationTime = 500;									
			opacity = "0.1"
			fontSize = that.hoverOutSize; 			
			d3.select(selection).transition().duration(durationTime).style("opacity", opacity).style("font-size", fontSize);
		}

		//updates the positions of the planets 
		//keine Transition sonst funktioniert Kreisbwegung nicht!
		function updatePlanetPositions(angle){
			node
				.attr("cx",function(d, i){
					calculateNextPlanetPosition(d,i, angle);
					return d.x;	}) 	
				.attr("cy", function(d){return d.y;});
			
		}		

		//updates the positions of the labels
		function updateLabelPositions(angle){
			label
				.attr("x",function(d, i){
					calculateNextPlanetPosition(d,i, angle);
					return d.x;	}) 	
				.attr("y", function(d){return d.y;});
		}

		//updates the positions of the planets and labels
		function updatePositionsInUniverse(angle){
			updatePlanetPositions(angle);
			updateLabelPositions(angle);

		}

		//calculates the planetposition
		//planets move in a circle, depending on the distance to their sun
		function calculateNextPlanetPosition(d, i, angle){
			let halfCircle = 180,        
				newAngel = (d.startAngle/Math.PI*halfCircle+angle)*Math.PI/halfCircle;
			newAngel =  newAngel*d.speed;        
			d.y = d.ySun + Math.sin(newAngel)*d.distanceToSun;
			d.x = d.xSun + Math.cos(newAngel)*d.distanceToSun;		
			return d;
		}

		//sets an timeinterval
		//updates the planet positions on each tick
		function animateRotation(){
			let delay = 100,
				time = 100;
			that.rotationTimer = d3.interval(function() {							
				updatePositionsInUniverse(that.rotationAngle);
				that.rotationAngle++;					 			
			}, delay, time);
			that.isRotating = true;			
		}

		function stopRotation(){
			that.isRotating = false;			
			that.rotationTimer.stop();		
		}	
	}  

}