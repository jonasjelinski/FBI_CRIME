class TheForce extends MagicCircle{
	constructor(){
		super();
		this.state = dynamics_namespace.currentState;
		this.htmlelement = htmlel_namespace.LINE_DIAGRAM; 
        this.htmlElementID = this.htmlelement.rootid;
        this.rootElement = this.getRootElement();
        this.year = 2013;
	}

	doChart(){
		console.log("A lama uses the force");
		drawForceChart();
	}

	drawForceChart(){
		let data = createD3Data();
		drawForceNodes(data);
	}

	createD3Data(){
		let quotients = [];
		let statesObject = this.data.years[this.year].states;
		let statesArray = Object.keys(statesObject);
		statesArray.forEach(function(state){
			let newQuotient = {};
			let q = calculateStatesQuotient(state);
			newQuotient.state = state;
			newQuotient.quotient = q;
		});

		return sortArray(quotients);	 
	}

	calculateStatesQuotient(statename){
		let violentCrimesArray = commonfunctions_namespace.getViolentCrimes(this.year, statename, jsondata);
		let propertyCrimesArray = commonfunctions_namespace.getPropertyCrimes(this.year, statename, jsondata);
		let violentCrimes = calculateAverage(violentCrimesArray);
		let propertyCrimes = calculateAverage(propertyCrimesArray);
		return calculateQuotient(violentCrimes, propertyCrimes);
	}

	calculateAverage(array){
		let sum = 0;
		for(let i = 0; i < array.length; i++){
			let number = parseInt (array[i]);
			sum += number;
		}
		return sum/array.length;
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

	drawForceNodes(data){
		let sortedQuotients = data;
		console.log("sortedArray ",sortedArray);		
	}

}