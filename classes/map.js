class Map extends MagicCircle{


	constructor(year=2000, crimeType="Burglary", moving=false){

		super();
		this.htmlelement = htmlelementsNamespace.THE_MAP;
		this.htmlElementID = this.htmlelement.rootid;
		this.rootElement = this.getRootElement();
		this.width = this.htmlelement.width;
        this.height = this.htmlelement.height;
        this.mapData = configNamespace.MAP_JSON_OBJECT;
				this.year=year;
				this.crime=crimeType;
				this.moving=moving;

	}


	getContextYear(){
		return this.year;
	}

	getContextCrimeType(){
		return this.crime;
	}

	getContextMoving(){
		return this.moving;
	}

	//das wird zum Zeichnen aufgerufen
	doChart(){
		let statesData = this.createD3Data();
		let jsonObject = configNamespace.JSON_OBJECT;
		if(statesData!=undefined){
			this.doMap(statesData);
		}
	}


	createD3Data() {
		let statesData = undefined;
		if(this.mapData !== false){//wenn config_namespace.MAP_JSON_OBJECT noch kein JSON drin ist ist es false
			statesData = topojson.feature(this.mapData, this.mapData.objects.states).features;
		}
		return statesData;
	}


	doMap(statesData){
	d3.select('.states').remove();
	d3.select('#tipBox').remove();

		var year = this.year;
		var crimeType=this.crime;
		var allStates=commonfunctionsNamespace.getAllStates();
		var counter=0;



		var path = d3.geoPath(d3.geoAlbers());
		var svg = this.rootElement.attr("width", this.width).attr("height", this.height);
		var g = svg.append(this.htmlElementType).attr('class', 'states');
		var getAllCrimesNumber = getAllCrimesState(allStates,year,crimeType,this.data);
		var allCrimeValues = getAllCrimeValues(getAllCrimesNumber);
		var maxCrime = Math.max.apply(null, allCrimeValues), minCrime = Math.min.apply(null, allCrimeValues);
		var tip = doTip(getAllCrimesNumber);



		prepareStatusSite(getAllCrimesNumber,crimeType,year);
		colorizeMap(g,statesData,path,tip,getAllCrimesNumber,this.moving);


		function prepareStatusSite(getAllCrimesNumber,crimeType,year){
			d3.select("h1").html('<h1>'+getAllCrimesNumber[0].state+'</h1><div>'+crimeType+' '+getAllCrimesNumber[0].value+'</div> per 100.000 ');
			d3.selectAll("status").remove();
			d3.select("#vmp").append("status").attr("year",""+year).attr("crime", crimeType);
		}
		function colorizeMap(g,statesData,path,tip,getAllCrimesNumber,moving){

			g.selectAll('path')
					.data(statesData)
					.enter().append('path')
					.attr('d', path)
					.attr('class', function(d) {

					var styleClass = 'state ';
					var quantize = d3.scaleQuantize()

										.domain([minCrime,maxCrime])
										.range(d3.range(11).map(function(i) {
										return "q" + i; }));

										for(let i=0;i<getAllCrimesNumber.length;i++){
											if(getAllCrimesNumber[i].state.toUpperCase()==d.properties.name.toUpperCase()){
											styleClass+=quantize(parseInt(getAllCrimesNumber[i].value));
											}
										}
										return styleClass;

									})
									.call(tip)
									//.on('mouseover', tip.show)
									.on('mouseover', function(d){

										if(!moving){
											tip.show(d);
											d3.select(this).style("fill", "#ffe9c2").style("cursor", "pointer")
										}else{
											d3.select(this).style("cursor", "not-allowed");
										}
									})

									.on('mouseout', function(d){
									tip.hide(d)
									d3.select(this).style("fill",

									function(d){
										return d.color;
									}
								)});
							}

												function doTip(getAllCrimesNumber){
													var tip = d3.tip()

													.offset(function() {
													  return [10,10];
													})
													.html(function(d) {

													var html = '';
													for(let i=0;i<getAllCrimesNumber.length;i++){

													  if(getAllCrimesNumber[i].state.toUpperCase()==d.properties.name.toUpperCase()){

													    html = '<div class="stateHover">'+getAllCrimesNumber[i].state+'</div>';
													    d3.select("h1").html('<h1>'+getAllCrimesNumber[i].state+'</h1><div>'+crimeType+' '+getAllCrimesNumber[i].value+'</div> per 100.000 ');
													  }
													};
													return html;
													});

													return tip;
												}

												function getAllCrimeValues(getAllCrimesNumber){
													let allCrimeValues=[];

													for(let i=0;i<getAllCrimesNumber.length;i++){
														allCrimeValues.push(getAllCrimesNumber[i].value);
													}
													return allCrimeValues;
												}


												function getAllCrimesState(allStates,year,crimeType,data){

													var getAllCrimesNumber=[];

													for(let i=0;i<allStates.length;i++){

														let currentCrimeValue=commonfunctionsNamespace.getCrimesAndDataByYearAndState(year, allStates[i], data);

														if(configNamespace.CONSTANTS.crimeCategories.Crimes.violentCrime.includes(crimeType)){

															let crimeValue=currentCrimeValue.crimes.violentCrime[crimeType];

															var objectCrimesStatesNumber={state:allStates[i],value:parseInt(crimeValue)};
															 getAllCrimesNumber.push(objectCrimesStatesNumber);

														}
														else if (configNamespace.CONSTANTS.crimeCategories.Crimes.propertyCrime.includes(crimeType)) {

															let crimeValue=currentCrimeValue.crimes.propertyCrime[crimeType];

															var	objectCrimesStatesNumber={state:allStates[i],value:parseInt(crimeValue)};
															getAllCrimesNumber.push(objectCrimesStatesNumber);
														}
													}return getAllCrimesNumber;
												}
	}

}

													var getAllCrimesNumber=[];

													for(let i=0;i<allStates.length;i++){

														let currentCrimeValue=commonfunctionsNamespace.getCrimesAndDataByYearAndState(year, allStates[i], data);

														if(configNamespace.CONSTANTS.crimeCategories.Crimes.violentCrime.includes(crimeType)){

															let crimeValue=currentCrimeValue.crimes.violentCrime[crimeType];

															var objectCrimesStatesNumber={state:allStates[i],value:parseInt(crimeValue)};
															 getAllCrimesNumber.push(objectCrimesStatesNumber);

														}
														else if (configNamespace.CONSTANTS.crimeCategories.Crimes.propertyCrime.includes(crimeType)) {

															let crimeValue=currentCrimeValue.crimes.propertyCrime[crimeType];

															var	objectCrimesStatesNumber={state:allStates[i],value:parseInt(crimeValue)};
															getAllCrimesNumber.push(objectCrimesStatesNumber);
														}
													}return getAllCrimesNumber;
												}
	}

}
let map = new Map();
map.doChart();
