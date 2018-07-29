/*---MAP--*/

//This class creates a Choropleth-Chart
//it shows which states in the USA have the highest crimerate by color
//the more red-shades are seen, the higher is the crimerate
//the more yellow-shades are seen, the lower is the crimerate
//This template was used: https://github.com/nixony/d3-choropleth

class Map extends MagicCircle{
	constructor(pageId,year=configNamespace.STATES_AND_CRIMES.minYear,crimeType=configNamespace.STATES_AND_CRIMES.crimeCategories.Crimes.violentCrime[0],moving){
		super(pageId);
		this.htmlelement = htmlelementsNamespace.theMap;
		this.htmlElementID = this.htmlelement.htmlid;
		this.width = this.htmlelement.width;
		this.height = this.htmlelement.height;
		this.mapData = configNamespace.MAP_JSON_OBJECT;
		this.year = year;
		this.crime = crimeType;
		this.moving = false;
		this.onClick = "onClick";
		this.colorRange = 11;
		this.eventTarget = new EventTarget();
		this.maxCrime = undefined;
		this.minCrime = undefined;
	}

	doChart(){
		let statesData = this.createD3Data(),
			jsonObject = configNamespace.JSON_OBJECT;
		if(statesData !== undefined){
			this.doMap(statesData);
		}
	}

	getMaxCrime(){
		return this.maxCrime;
	}

	getMinCrime(){
		return this.minCrime;
	}

	setYear(year){
		this.year = year;
	}

	setCrimeType(crimeType){
		this.crime = crimeType;
	}

	isMoving(moving){
		this.moving=moving;
		if(moving){
			d3.select("#map .states").style("cursor","not-allowed");
		}else{
			console.log("is allowed");
			d3.select("#map").style("cursor","pointer");
		}
	}

	mapNotClickable() {
		d3.select(".state").style("pointer-events", "none");
	}

	mapClickable(){
		d3.select("#map").style("pointer-events", "visible");
		d3.selectAll("#infoLabelMap").remove();
	}

	createD3Data() {
		let statesData;
		if(this.mapData !== false){
			statesData = topojson.feature(this.mapData,this.mapData.objects.states).features;
		}
		return statesData;
	}

	doMap(statesData){
		d3.select(".states").remove();
		d3.select("#tipBox").remove();
		let year = this.year,
			crimeType = this.crime,
			allStates = commonfunctionsNamespace.getAllStates(),
			that = this,
			path = d3.geoPath(d3.geoAlbersUsa()),
			svg = this.container,
			g = svg.append(this.htmlElementType).attr('class', 'states'),
			getAllCrimesNumber = getAllCrimesState(allStates,year,crimeType,this.data),
			allCrimeValues = getAllCrimeValues(getAllCrimesNumber),
			maxCrime = Math.max.apply(null, allCrimeValues),
			minCrime = Math.min.apply(null, allCrimeValues),
			tip = doTip(getAllCrimesNumber,this.infoLabelMap);
		this.maxCrime = maxCrime;
		this.minCrime = minCrime;

		prepareStatusSite(getAllCrimesNumber,crimeType,year,0,this.infoLabelMap);
		colorizeMap(g,statesData,path,tip,getAllCrimesNumber,this.moving,this.colorRange,that,this.infoLabelMap);
		that.dispatchChartBuildedEvent();


		//This function is the first call and prepares the start values, simultaneously it deletes after every call the old values
		function prepareStatusSite(getAllCrimesNumber,crimeType,year,i,infoLabelMap){
			d3.select(".crimeInfo").remove();
			d3.select(".stateInfo").remove();

			that.page.append("h2").attr("class","stateInfo").attr("id","stateInfoMapId").text(getAllCrimesNumber[i].state);
			that.page.append("h2").attr("class","crimeInfo").text(configNamespace.REAL_CRIME_NAMES[crimeType]+': '+getAllCrimesNumber[i].value+ " "+htmlelementsNamespace.mapPage.mapVictimInhabitants);
		}

		function removeStateInfo(){
			d3.select(".stateInfo").remove();
		}

		//Mainfunction: Make sure that the map presents colors for the states
		function createColorMap(g,statesData,path,getAllCrimesNumber,colorRange){
			return g.selectAll("path")
				.data(statesData)
				.enter().append("path")
				.attr("d", path)
				.attr("class", function(d){
					return fillColorInMap(d,getAllCrimesNumber,colorRange);
				});
		}

		//Send Event to MapPage that a specific state was clicked. Send all informations about the state to "mapPage"
		function onStateClick(colorMap,tip){
			return colorMap.call(tip)
				.on("click", function(d){
					removeStateInfo();
					sendClickEvent(d.properties.name.toUpperCase());
				})
		}

		//Chagne color than the user is on hover on a state
		function onStateHover(onClick,moving,tip,that){

			return onClick.on('mouseover', function(d){
				tip.show(d);
				if(!that.moving){
					that.page.append("div").attr("id","infoLabelMap").text(htmlelementsNamespace.mapPage.mapInfoLabel);
					d3.select(this).style("fill", "#ffe9c2").style("cursor", "pointer");
				}
			})
		}

		//Change color back than the user leaves the hover on a state
		function onStateLeave(onHover,tip){
			return onHover.on('mouseout', function(d){
				tip.hide(d);
				d3.selectAll("#infoLabelMap").remove();
				d3.select(this).style("fill",
					function(d){
						return d.color;
					}
				);
			});
		}

		//Call all the functions that needed for colorizig the map
		function colorizeMap(g,statesData,path,tip,getAllCrimesNumber,moving,colorRange,that){
			let colorMap = createColorMap(g,statesData,path,getAllCrimesNumber,colorRange),
				onClick = onStateClick(colorMap,tip),
				onHover = onStateHover(onClick,moving,tip,that),
				onLeave = onStateLeave(onHover,tip);
		}

		function fillColorInMap(d,getAllCrimesNumber,colorRange){
			let styleClass = "state ",
				quantize = d3.scaleQuantize()
					.domain([minCrime,maxCrime])
					.range(d3.range(colorRange).map(function(i){
						return "q" + i; }));

			for(let i=0;i<getAllCrimesNumber.length;i++){
				if(getAllCrimesNumber[i].state.toUpperCase()===d.properties.name.toUpperCase()){
					styleClass+=quantize(parseInt(getAllCrimesNumber[i].value));
				}
			}
			return styleClass;
		}

		function sendClickEvent(state){
			let event = new CustomEvent(that.onClick,{detail:{state: state, year: year}});
			that.eventTarget.dispatchEvent(event);
		}

		//Function uses the libery "tip" by d3 it registrates the "x" and "y"-position of the mouse. So the System knows on which state
		//the user is hovering or clicking a state
		function doTip(getAllCrimesNumber){
			let maxOfSet=10,
				tip = d3.tip()
					.offset(function() {
						return [maxOfSet,maxOfSet];
					})
					.html(function(d){
						return labelStateOnHover(d);
					});
			return tip;
		}

		function labelStateOnHover(d){
			var html = '';
			for(let i=0;i<getAllCrimesNumber.length;i++){
				if(getAllCrimesNumber[i].state.toUpperCase()==d.properties.name.toUpperCase()){
					html = '<div class="stateHover">'+getAllCrimesNumber[i].state+'</div>';
					prepareStatusSite(getAllCrimesNumber,crimeType,year,i);
				}
			}
			return html;
		}

		function getAllCrimeValues(getAllCrimesNumber){
			let allCrimeValues=[];
			for(let i=0;i<getAllCrimesNumber.length;i++){
				allCrimeValues.push(getAllCrimesNumber[i].value);
			}
			return allCrimeValues;
		}

		//This function is responsible that the states get their crimerates. It is departed into the functions "fillDataInMapViolentCrime" and
		//"fillDataInMapPropertyCrime"
		function getAllCrimesState(allStates,year,crimeType,data){
			let getAllCrimesNumber=[],
				crimeValue,
				objectCrimesStatesNumber;

			for(let i=0;i<allStates.length;i++){
				let currentCrimeValue=commonfunctionsNamespace.getCrimesAndDataByYearAndState(year, allStates[i], data);
				if(configNamespace.STATES_AND_CRIMES.crimeCategories.Crimes.violentCrime.includes(crimeType)){
					fillDataInMapViolentCrime(crimeValue,objectCrimesStatesNumber,currentCrimeValue,i,getAllCrimesNumber);
				}
				else if(configNamespace.STATES_AND_CRIMES.crimeCategories.Crimes.propertyCrime.includes(crimeType)) {
					fillDataInMapPropertyCrime(crimeValue,objectCrimesStatesNumber,currentCrimeValue,i,getAllCrimesNumber);
				}
			}
			return getAllCrimesNumber;
		}

		function fillDataInMapViolentCrime(crimeValue,objectCrimesStatesNumber,currentCrimeValue,i,getAllCrimesNumber){
			crimeValue=currentCrimeValue.crimes.violentCrime[crimeType];

			objectCrimesStatesNumber={state:allStates[i],value:parseInt(crimeValue)};
			getAllCrimesNumber.push(objectCrimesStatesNumber);
		}

		function fillDataInMapPropertyCrime(crimeValue,objectCrimesStatesNumber,currentCrimeValue,i,getAllCrimesNumber){
			crimeValue=currentCrimeValue.crimes.propertyCrime[crimeType];
			objectCrimesStatesNumber={state:allStates[i],value:parseInt(crimeValue)};
			getAllCrimesNumber.push(objectCrimesStatesNumber);
		}

	}
}
