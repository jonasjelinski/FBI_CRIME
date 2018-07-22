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
		this.page.style("pointer-events", "none");
	}

	mapClickable(){
		this.page.style("pointer-events", "visible");
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
			that.page.append("h2").attr("class","stateInfo").attr("id","stateInfoMapId").text(getAllCrimesNumber[i].state);
			that.page.append("h2").attr("class","crimeInfo").text(crimeType+': '+getAllCrimesNumber[i].value+' victims per 100.000 inhabitants');
		}

		function removeStateInfo(){
			d3.select(".stateInfo").remove();
		}

		function colorizeMap(g,statesData,path,tip,getAllCrimesNumber,moving){
			g.selectAll("path")
				.data(statesData)
				.enter().append("path")
				.attr("d", path)
				.attr("class", function(d){
					return fillColorInMap(d);
				})
				.call(tip)
				.on("click", function(d){
					removeStateInfo();
					sendClickEvent(d.properties.name.toUpperCase());
				})
				.on('mouseover', function(d){
					if(!moving){
						tip.show(d);
						d3.select(this).style("fill", "#ffe9c2").style("cursor", "pointer")
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
		
		function fillColorInMap(d){
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
