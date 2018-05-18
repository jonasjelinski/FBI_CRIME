class TheForce extends MagicCircle{
	constructor(){
		super();
		this.state = dynamics_namespace.currentState;
		this.htmlelement = htmlel_namespace.LINE_DIAGRAM; 
        this.htmlElementID = this.htmlelement.rootid;
        this.rootElement = this.getRootElement();
        this.year = 2008;
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

	createNodes(){

	}

	createLinks(sortedQuotients){		
		let links = [];
		// {"source": "Napoleon", "target": "Myriel", "value": 1},
		sortedQuotients.forEach(function(stateObject){
			let newLink = {};
			newLink.source = stateObject.state;
			newLink.target = stateObject.quotient > 0.5 ? "Violence" : "Property";
			links.push(newLink);
		});		
		return links;
	}

	drawForceNodes(data){
		let sortedQuotients = data;
		let links = this.createLinks(sortedQuotients);
		console.log(links);
		let width = this.width;
		let height = this.height;
		let rootElement = this.rootElement.attr("width", width).attr("height", height);
		let radius = 5;


		let simulation = d3.forceSimulation()
		    .force("link", d3.forceLink().id(function(d) { return d.id; }))
		    .force("charge", d3.forceManyBody())
		    .force("center", d3.forceCenter(width / 2, height / 2));


		let nodes = rootElement.attr("class", "nodes")
    			.selectAll("circle")
    			.data(sortedQuotients)
    			.enter().append("circle")
      			.attr("r", radius)
      			.attr("fill","red" )
      			.attr("cx", function(d){return calculateXPos(d);})      			
      			.attr("cy", function(d,i){return calculateYPos(i);});  

      	let labes = rootElement.attr("class", "lables")
    			.selectAll(".lables")
    			.data(sortedQuotients)
    			.enter().append("text")
      			.text(function(d){return d.state;})
      			.attr("fill","green" )
      			.attr("x", function(d){return calculateXPos(d);})    			
      			.attr("y", function(d,i){return calculateYPos(i);}); 


      	function calculateXPos(d) {
      			let x = d.quotient*width;
      				if(x>width){
      					x = x-radius;
      				}
      				if(x<width){
      					x = x+radius;
      				}
      				return x;
        }

        function calculateYPos(i){
        	let yPos = height/50*i;
            return yPos;
        }

	}

}