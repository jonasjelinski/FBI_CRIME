class Sunburst extends MagicCircle{
    constructor(){
        super();
        this.self = this; 
        this.htmlelement = htmlel_namespace.SUN_BURST; 
        this.htmlElementID = this.htmlelement.rootid;
        this.width = this.htmlelement.width;
        this.height = this.htmlelement.height;   
        this.state = "ALABAMA",
        this.year = "2003",
        this.categories = [],
        this.crimes = [],
        this.doChart = this.doChart.bind(this);
        this.drawSunburst = this.drawSunburst.bind(this);
        this.createD3Data = this.createD3Data.bind(this);
        this.createNewNode  = this.createNewNode.bind(this);
        this.createSunburst = this.createSunburst.bind(this);
        //this.computeTextRotation = this.computeTextRotation.bind(this);
        this.rootElement = this.getRootElement();   
    }    
    
    getData () {
      return config_namespace.JSON_OBJECT;        
    }
    
    doChart () {
        //console.log("ein lama erzeugt einen sunburst", this);
        this.self.drawSunburst();
    }

    drawSunburst () {
        //console.log("drawSunburst");
        let data = this.createD3Data();
      //  console.log("drawSunburst ",this);
        this.self.createSunburst(data);           
	}

    getRootElement(){
          return commonfunctions_namespace.getRootElement(this);      
    }

	createD3Data () {
    	let crimedata = commonfunctions_namespace.getCrimesAndDataByYearAndState(this.year, this.state, this.data);
		let crimesdata = crimedata.crimes;    
        let children_object = {};     
        let root_json_object = {};
        root_json_object.name = "Crimes";
        root_json_object.children = [];
        let newChild = {}; 
             
        for(let categorie in crimesdata){  
           
            let categorie_crimes = crimesdata[categorie];           
            let children_array = [];

            for(let crime in categorie_crimes){
                children_object.name = crime;
                children_object.size = parseFloat(categorie_crimes[crime]);
              //  console.log("typeofe", typeof children_object.size);
                children_array.push(children_object);
                //console.log("children_object", children_object);       
                children_object = {};                    
            }    
           
            newChild = this.self.createNewNode(categorie, children_array);

            root_json_object.children.push(newChild);              
        }; 
     //console.log("root_json_object root_json_object ",root_json_object); 
          
         return root_json_object;
	}

    createNewNode(name, childrenarray){ 
        let newjsonobject = {};     
        newjsonobject.children = childrenarray;         
        newjsonobject.name = name;
        //console.log(" 3 createJsonObjectOfCrimes", json_object);
        return newjsonobject;
    }

    getWidth(){
        return this.width;
    }

    getHeight(){
        return this.height;
    }


    //source: https://bl.ocks.org/denjn5/f059c1f78f9c39d922b1c208815d18af
    createSunburst(jsondata){
      //  console.log("createSunburst jsondata ",jsondata, " this ", this, " self ", this.self);
        let data = JSON.parse(JSON.stringify(jsondata));
            
        let height = this.self.getHeight();
        let width = this.self.getWidth();
      //  console.log("wh ", width, height)
        
        
            // Size our <svg> element, add a <g> element, and move translate 0,0 to the center of the element.
        let rootElement=this.rootElement.attr("width", width).attr("height", height);
       

        let linefunction = d3.line().x(function(d){return 20;})
                                    .y(function(d){return 2;})
                                    .curve(d3.curveLinear);   
        
        let widthGrafic = width*0.5;
        let heightGrafic = height*0.5;
        let radius = Math.min(widthGrafic, heightGrafic) / 2;                            
        var grafic = rootElement
            .append(this.htmlElementType)
            .attr("width", width)
            .attr('class', 'grafic')
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
            
                      

        // Create our sunburst data structure and size it.
        var partition = d3.partition()
            .size([2 * Math.PI, radius]);


            // Find the root node of our data, and begin sizing process.
            var root = d3.hierarchy(data)
               .sum(function (d) {    

                    let value = parseFloat(d.size);
                
                   return value;
                    });

                        // console.log("createSunburst data ",data);  
  
            // Calculate the sizes of each arc that we'll draw later.
          //console.log("d3 hierarchy ",d3.hierarchy(data));
            partition(root);
            var arc = d3.arc()
                .startAngle(function (d) { return d.x0;})
                .endAngle(function (d) { return d.x1;})
                .innerRadius(function (d) { return d.y0})
                .outerRadius(function (d) { return d.y1});

            var labelarc = d3.arc()
                .startAngle(function (d) { return d.x0;})
                .endAngle(function (d) { return d.x1;})
                .innerRadius(function (d) { return d.y0})
                .outerRadius(function (d) { return (d.y1)});


            // Add a <g> element for each node in thd data, then append <path> elements and draw lines based on the arc
            // variable calculations. Last, color the lines and the slices.
            grafic.selectAll('g')
                .data(root.descendants())
                .enter().append('g').attr("class", "node").append('path')
                .attr("display", function (d) { return d.depth ? null : "none"; })
                .attr("d", arc)
                .style("stroke", "blue")
                .style("fill", function(d){
                    let crimename = d.data.name;
                       //console.log(" data", d.data);
                       let color = commonfunctions_namespace.getCrimeColor(crimename);

                       if(color != undefined){
                        return color;
                       }

                       else{
                        let defaultcolor = "rgb(6,6,6)";
                        return defaultcolor;
                       }  
                    } );

            let labelWidth = width/2;
            let labelHeight = labelWidth;
            let labelradius = labelWidth;

            //console.log(this);
            var labels = rootElement            
            .append('g')
            .attr("width", width)
            .attr('class', 'labels')
            .attr('transform', 'translate(' + labelWidth + ',' + labelHeight + ')');

            labels.selectAll('g')
                .data(root.descendants())
                .enter().append('g').attr("class", "label");    
                   
                labels.selectAll('g')
                .append('g').attr("class", "labelname")
                .append("text")
               /* .attr("transform", function(d) {
                    
                    let pos = labelarc.centroid(d);
                    return "translate(" + pos + ")rotate(" + computeTextRotation(d) + ")"; }) */
                .attr("x", function (d, i) { return computeTextXPos(d,i); })
                .attr("y",  function (d, i) { return computeTextYPos(d, i); }) 
                .attr("text-anchor", function(d,i){return computeTextAnchor(d,i);})
                .attr("font-size", "10px")
                .text(function(d) { return d.parent ? d.data.name : "" }); // rotation align

         var lines = labels.append("line")
                .data(root.descendants())
                .attr("x1", function (d, i) {return labelarc.centroid(d)[0];})
                .attr("y1", function (d, i) {return labelarc.centroid(d)[1];}) 
                .attr("x2", function (d, i) {return computeLineX2(d)})
                .attr("y2", function (d, i) {return computeLineY2(d)})
                .attr("stroke-width", 2)
                .attr("stroke", "black");
                
        


        function computeTextRotation(data) {
        var angle = (data.x0 + data.x1) / Math.PI * 90;
            // Avoid upside-down labels
            return (angle < 120 || angle > 270) ? angle : angle + 180;  // labels as rims
            //return (angle < 180) ? angle - 90 : angle + 90;  // labels as spokes
        }  

        function computeTextXPos(data, index){
            let centroid = labelarc.centroid(data);
            let midAngle = Math.atan2(centroid[1], centroid[0]);
            let x = Math.cos(midAngle) * labelWidth/2;
            console.log("x ",x);
            let sign = (x > 0) ? 1 : -1;
            let multiplier = index;
            let labelX = x + (multiplier * sign);
            
            return labelX;
        }

        function computeTextYPos(data, index){
            let centroid = labelarc.centroid(data);
            let midAngle = Math.atan2(centroid[1], centroid[0]);
            let multiplier = index/6    ;
            let y = Math.sin(midAngle)*labelWidth*multiplier;
            return y;
        }

        function computeTextAnchor(data, index){
            let centroid = labelarc.centroid(data);
            let midAngle = Math.atan2(centroid[1], centroid[0]);
            let x = Math.cos(midAngle) * width/2;
            return (x > 0) ? "start" : "end";
        }

        function computeLineX2(data, index){
            let centroid = labelarc.centroid(data);
            let midAngle = Math.atan2(centroid[1], centroid[0]);
            let x = Math.cos(midAngle) * labelWidth/2;
            return x;
        }

        function computeLineY2(data, index){
            let centroid = labelarc.centroid(data);
            let midAngle = Math.atan2(centroid[1], centroid[0]);
            let y = Math.sin(midAngle) * labelWidth/2;
            return y;
        }

         
    }  
    /*attr("transform", function(d) {
                    
                    let pos = labelarc.centroid(d);
                    return "translate(" + pos + ")rotate(" + computeTextRotation(d) + ")"; })*/      

}

