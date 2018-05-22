class Universe extends MagicCircle{
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

	createUniverse(sortedQuotients){
		let universe = [];
		universe = this.createSuns(universe);
		let that = this;
		sortedQuotients.forEach(function(stateObject){
			let newNode = {};
			newNode.id = that.createId(stateObject.state);
			newNode.quotient = stateObject.quotient;
			newNode = that.createPlanet(newNode);
			universe.push(newNode);
		});
		return universe;
	}

	createPlanet(node){
		let factor = node.quotient;
		let speedFactor = factor/2;		
		let fullCircle = 360;
		node.group = node.quotient > 0.5 ? this.violenceGroup: this.propertyGroup;
		node.color = node.group === this.violenceGroup ? "red": "blue";
		let distanceFactor = node.group === this.violenceGroup ? (factor-0.5)*2 : (factor+0.5)*2;
		let radiusFactor = node.group === this.violenceGroup ? factor : factor*2;
		node.radius = this.standards.standardRadius*radiusFactor + this.standards.minRadius;
		node.distanceToSun = this.standards.standardDistanceToSun*distanceFactor+this.standards.minDistanceToSun;
		node.speed = this.standards.standardSpeed*speedFactor+this.standards.minSpeed;
		node.startAngle = Math.floor((Math.random() * fullCircle) + 1)* Math.PI/180;
		node.xSun = node.group === this.violenceGroup ? this.standards.violenceSunX: this.standards.propertySunX;
		node.ySun = node.group === this.violenceGroup ? this.standards.violenceSunY: this.standards.propertySunY;
		node.x = node.xSun + node.distanceToSun*Math.cos(node.startAngle);
		node.y = node.ySun + node.distanceToSun*Math.sin(node.startAngle);
		return node;
	}

	createId(statename){	
		let id =  statename.substring(0,8);
		return id;
	}

	createCenterNodes(newArray){
		let quotientProp = 2;
		let quotientVio = 2;
		let distanceToSun = 0;
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

	createSuns(suns){
		let propertyNode = {};
		let violenceNode = {};
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
		let universe = this.createUniverse(sortedQuotients);
		let width = this.width;
		let height = this.height;
		let rootElement = this.rootElement.attr("width", width).attr("height", height);	
		let strokeWidth = 2;
		let durationtime = 1000;
		
		let node = rootElement.attr("class", "nodes")
    			.selectAll("circle")
    			.data(universe);
      			

      	let label = rootElement.attr("class", "lables")
    			.selectAll(".lables")
    			.data(universe);
    			

      	 var link = rootElement      	 	
			    .attr("class", "links").attr("width",width).attr("height",height)
			    .selectAll("line")
			    .data(universe);
		
		setForceNodesSettings();
		drawUniverse();
		animateRotation();


		function setForceNodesSettings(){
			node.data(universe);
			exitNode();			
			enterNode();

			label.data(universe);
			exitLabel();			
			enterLabel();

			link.data(universe);
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
			node = node.enter().append("circle");			
      	}

		function enterLabel(){
			label = label.enter().append("text")
      			.text(function(d){return d.id;})
      			.attr("fill","green" );      			 
		}

		function enterLink(){
			//link = link.enter().append("line")
			  //  .attr("stroke-width", strokeWidth)
			  //  .style("stroke", "black");
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

        //keine Transition sonst funktioniert Kreisbwegung nicht!
        function updatePlanetPositions(angle){

        		node
				.attr("cx",function(d, i){
					calculateNextPlanetPosition(d,i, angle);
					return d.x;	}) 	
				.attr("cy", function(d,i){return d.y});
				label
				.attr("x",function(d, i){
					calculateNextPlanetPosition(d,i, angle);
					return d.x;	}) 	
				.attr("y", function(d,i){return d.y});
        }

        function calculateNextPlanetPosition(d, i, angle){        
            let newAngel = (d.startAngle/Math.PI*180+angle)*Math.PI/180;
            newAngel =  newAngel*d.speed;        
			d.y = d.ySun + Math.sin(newAngel)*d.distanceToSun;
			d.x = d.xSun + Math.cos(newAngel)*d.distanceToSun;
			if(i === 6){
				console.log("sin",Math.sin(newAngel), "cos",Math.cos(newAngel));
			}
			return d;

        }

		function animateRotation(){
			let angle = 0;	
			var t = d3.interval(function(elapsed) {
			
				updatePlanetPositions(angle);
				angle++; 
				if(angle>360){
					console.log("neue Runde");
					angle = 0;
				}				 			
			}, 100, 100);
			
		}
    	

	}

        
	

}