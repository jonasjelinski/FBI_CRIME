class Map extends MagicCircle{

	constructor(){
		super();
		this.htmlelement = htmlel_namespace.THE_MAP; 
        this.htmlElementID = this.htmlelement.rootid;
        this.rootElement = this.getRootElement();
        this.width = this.htmlelement.width;
        this.height = this.htmlelement.height;
        this.mapData = config_namespace.MAP_JSON_OBJECT;
        this.startYear = 2012;
	}

	//das wird zum Zeichnen aufgerufen
	doChart(){
		let statesData = this.createD3Data();
		if(statesData!=undefined){
			this.doMap(statesData);
		}	
	}

	//hier werden die Daten verarbeitet
	createD3Data(){
		let statesData = undefined;
		if(this.mapData !== false){//wenn config_namespace.MAP_JSON_OBJECT noch kein JSON drin ist ist es false
			statesData = topojson.feature(this.mapData, this.mapData.objects.states).features;
		}
		return statesData;
	}


	//hier wird die Karte gezeichnet
	//du hat eine andere d3 Version verwendet, daher musst du den Code noch anpassen
	doMap(statesData){
		let maxCrime=0,
		minCrime=0,
		crimes = this.data,
		year = this.startYear;

		/*let tip = d3.tip()
		.offset(function(){return [10,10];})
		.html(function(d) {	return createTextHtml(d);});*/
		let g = this.rootElement.append(this.htmlElementType);
	console.log("sd",statesData);
		setMaxMinCrime();
		createPath();

		
		function createPath(){
			g.selectAll('path')
			.data(statesData)
			.enter().append('path')
			//.attr('d', path)
	    	.attr('class', 'state')
	        .attr('class', function(d) { return createStyleClass(d);})
	        .call(tip)
	        .on('mouseover', function(d){ 
	        	let that = this;
	        	showTip(d, that);
	        })
	        .on('mouseout', function(d){ 
	        	let that = this;
	        	hideTip(d, that);})
	        .on("click", function(d) {showStateDetails();});
		}   
        

		function setMaxMinCrime(){
			let keyNames = Object.keys(crimes.years[year].states);
			let testCrime=[];
			for(let i=0;i<keyNames.length;i++){
				testCrime[i]=parseInt(crimes.years[year].states[keyNames[i]].crimes.violentCrime.Rape);
			}
			maxCrime=Math.max.apply(null, testCrime);
			minCrime=Math.min.apply(null, testCrime);

		}

		function createTextHtml(d){
			var html = '';
			for(let i=0;i<keyNames.length;i++){
				if(keyNames[i].toUpperCase()==d.properties.name.toUpperCase()){
					html = '<div>'+keyNames[i]+'</div>';
					d3.select("h1").html('<h1>'+keyNames[i]+'</h1><div>Rape: '+getCrime(i, year, crimes, keyNames)+'</div> per 100.000 ');

				}
			};
			return html;
		}
        

        function createStyleClass(d){
        	var styleClass = 'state ';
        	var keyNames = Object.keys(crimes.years[year].states);
        	var quantize = d3.scale.quantize()
        	.domain([minCrime,maxCrime])
        	.range(d3.range(11).map(function(i) {
        		return "q" + i; }));

        	for(let i=0;i<keyNames.length;i++){

        		if(keyNames[i].toUpperCase()==d.properties.name.toUpperCase()){
        			styleClass+=quantize(parseInt(getCrime(i, year,crimes, keyNames)));
        //  console.log(styleClass);
		    }
		}
		return styleClass;
		}

		function showTip(d, that){
			tip.show(d);
			d3.select(that).style("fill", "#ffe9c2").style("cursor", "pointer");
		}

		function hideTip(d, that){
			tip.hide(d)
			d3.select(this).style("fill", function(d){return d.color;});
		}

		//Diese Funtkion ist schon in den commonfunctions hinterlegt		
		function getCrime(index, year,crimes, keyNames){

		  return crimes.years[year].states[keyNames[index]].crimes.violentCrime.Rape;
		}

		function zoom() {
		  g.attr('transform', 'translate(' + d3.event.translate + ')scale(' + d3.event.scale + ')');
		}

		function showStateDetails(){
			let createPopUp = d3.select("body");
			let createPopUpInner = createPopUp.append("div")
			.attr("id", "myModal")
			.attr("class", "modal");

			let modalPopUpContent=createPopUpInner.append("div")
			.attr("class", "modal-content");



			modalPopUpContent.append("div")
			.attr("class", "modalHeader")
			.append("span")
			.attr("class","close")
			.text("x");

			modalPopUpContent.append("div")
			.attr("class","modalBody")
			.text("Hier kommt ein Sunburst hin");

			var modal = document.getElementById('myModal');
			var span = document.getElementsByClassName("close")[0];
			modal.style.display = "block";

			span.onclick = function() {
				modal.style.display = "none";
			}

			window.onclick = function(event) {
				if (event.target == modal) {
					modal.style.display = "none";
				}
			}
		}
	}	
}
let map = new Map();
//map.doChart();


