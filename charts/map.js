class Map extends MagicCircle{
	constructor(pageId, year=2000, crimeType="Burglary", moving=false){
		super(pageId);
		this.htmlelement = htmlelementsNamespace.theMap;
		this.htmlElementID = this.htmlelement.htmlid;
		this.width = this.htmlelement.width;
		this.height = this.htmlelement.height;
		this.mapData = configNamespace.MAP_JSON_OBJECT;
		this.year = year;
		this.crime = crimeType;
		this.moving = moving;
		this.onClick = "onClick";
		this.eventTarget = new EventTarget();
	}

	doChart(){
		let statesData = this.createD3Data(),
			jsonObject = configNamespace.JSON_OBJECT;
		if(statesData!==undefined){
			this.doMap(statesData);
		}
	}

	setYear(year){
		this.year = year;
	}

	setCrimeType(crimeType){
		this.crime = crimeType;
	}

	setMoving(moving){
		this.moving = moving;
	}

	mapNotClickable()
	{
		d3.select("#map").style("pointer-events", "none");

	}

	mapClickable(){
		d3.select("#map").style("pointer-events", "visible");

	}

	createD3Data() {
		let statesData;
		if(this.mapData !== false){
			statesData = topojson.feature(this.mapData, this.mapData.objects.states).features;
		}
		return statesData;
	}

	doMap(statesData){
		d3.select(".states").remove();
		d3.select("#tipBox").remove();
		let year = this.year,
			crimeType=this.crime,
			allStates=commonfunctionsNamespace.getAllStates(),
			that = this,
			path = d3.geoPath(d3.geoAlbersUsa()),
			svg = this.container,
			g = svg.append(this.htmlElementType).attr('class', 'states'),
			getAllCrimesNumber = getAllCrimesState(allStates,year,crimeType,this.data),
			allCrimeValues = getAllCrimeValues(getAllCrimesNumber),
			maxCrime = Math.max.apply(null, allCrimeValues), minCrime = Math.min.apply(null, allCrimeValues),
			tip = doTip(getAllCrimesNumber);

		prepareStatusSite(getAllCrimesNumber,crimeType,year,0);
		colorizeMap(g,statesData,path,tip,getAllCrimesNumber,this.moving);

		function prepareStatusSite(getAllCrimesNumber,crimeType,year,i){
			d3.select(".crimeInfo").remove();
			d3.select(".stateInfo").remove();
			d3.select("#mainpage").append("h2").attr("class","stateInfo").attr("id","stateInfoMapId").text(getAllCrimesNumber[i].state);
			d3.select("#mainpage").append("h2").attr("class","crimeInfo").text(crimeType+': '+getAllCrimesNumber[i].value+' victims per 100.000 inhabitants');
		}

		function prepareStatusPopup(stateName){
			d3.select("#map").style("pointer-events", "none");
			d3.select(".stateInfo").remove();
			d3.select("#popup").append("h1").attr("class","stateInfo").attr("id","stateInfoPopUpId").text(stateName);
		}





		function colorizeMap(g,statesData,path,tip,getAllCrimesNumber,moving){
			g.selectAll("path")
				.data(statesData)
				.enter().append("path")
				.attr("d", path)
				.attr("class", function(d){

					let styleClass = "state ",
						quantize = d3.scaleQuantize()
							.domain([minCrime,maxCrime])
							.range(d3.range(11).map(function(i){
								return "q" + i; }));

					for(let i=0;i<getAllCrimesNumber.length;i++){
						if(getAllCrimesNumber[i].state.toUpperCase()===d.properties.name.toUpperCase()){
							styleClass+=quantize(parseInt(getAllCrimesNumber[i].value));
						}
					}
					return styleClass;
				})
				.call(tip)
				.on("click", function(d){
					prepareStatusPopup(d.properties.name);
					sendClickEvent(d.properties.name.toUpperCase());
				})
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
					);
				});
		}

		function sendClickEvent(state){
			let event = new CustomEvent(that.onClick, {detail:{state: state, year: year}});
			that.eventTarget.dispatchEvent(event);
		}

		function doTip(getAllCrimesNumber){
			var tip = d3.tip()
				.offset(function() {
					return [10,10];
				})
				.html(function(d){
					var html = '';
					for(let i=0;i<getAllCrimesNumber.length;i++){
						if(getAllCrimesNumber[i].state.toUpperCase()==d.properties.name.toUpperCase()){
							html = '<div class="stateHover">'+getAllCrimesNumber[i].state+'</div>';
							prepareStatusSite(getAllCrimesNumber,crimeType,year,i);
						}
					}
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
				if(configNamespace.STATES_AND_CRIMES.crimeCategories.Crimes.violentCrime.includes(crimeType)){
					let crimeValue=currentCrimeValue.crimes.violentCrime[crimeType];
					var objectCrimesStatesNumber={state:allStates[i],value:parseInt(crimeValue)};
					getAllCrimesNumber.push(objectCrimesStatesNumber);
				}
				else if (configNamespace.STATES_AND_CRIMES.crimeCategories.Crimes.propertyCrime.includes(crimeType)) {
					let crimeValue=currentCrimeValue.crimes.propertyCrime[crimeType];
					var	objectCrimesStatesNumber={state:allStates[i],value:parseInt(crimeValue)};
					getAllCrimesNumber.push(objectCrimesStatesNumber);
				}
			}
			return getAllCrimesNumber;
		}
	}
}
