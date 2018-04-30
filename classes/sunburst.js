class Sunburst extends MagicCircle{
    constructor(){
        super();
        this.self = this; 
        this.htmlelement = htmlel_namespace.SUN_BURST; 
        this.htmlElementID = this.htmlelement.rootid;  
        this.state = "ALABAMA",
        this.year = "2003",
        this.categories = [],
        this.crimes = [],
        this.doChart = this.doChart.bind(this);
        this.drawSunburst = this.drawSunburst.bind(this);
        this.createD3Data = this.createD3Data.bind(this);
        this.createNewNode  = this.createNewNode.bind(this);
        this.createSunburst = this.createSunburst.bind(this);
        this.computeTextRotation = this.computeTextRotation.bind(this);
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
        root_json_object.name = "CRIMES";
        root_json_object.children = [];
        let newChild = {}; 
             
        for(let categorie in crimesdata){  
           
            let categorie_crimes = crimesdata[categorie];           
            let children_array = [];

            for(let crime in categorie_crimes){
                children_object.crime = crime;
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
        //console.log("createSunburst jsondata ",jsondata, " this ", this, " self ", this.self);
        let data = JSON.parse(JSON.stringify(jsondata));
            
        let height = this.self.getHeight();
        let width = this.self.getWidth();
      //  console.log("wh ", width, height)
        
        let radius = Math.min(width, height) / 2;
            // Size our <svg> element, add a <g> element, and move translate 0,0 to the center of the element.
        let rootElement=this.rootElement.append(this.htmlElementType);    
        console.log("htmlelement ", this.htmlelement, " rootElement ", rootElement);

        var g = rootElement
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');            

        // Create our sunburst data structure and size it.
        var partition = d3.partition()
            .size([2 * Math.PI, radius]);


            // Find the root node of our data, and begin sizing process.
            var root = d3.hierarchy(data)
               .sum(function (d) {    

                    let value = parseFloat(d.size);
                    
                   // console.log("data in hierarchy", d);
                   // console.log(d, " d.value 1", value, "type", typeof(d.size));
                    if( d.value != undefined && !isNaN(d.size)){
                        d.size = value;
                      //  console.log("d.value", d.size);
                        return d.size;
                    }
                    else return 1;
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


            // Add a <g> element for each node in thd data, then append <path> elements and draw lines based on the arc
            // variable calculations. Last, color the lines and the slices.
            g.selectAll('g')
                .data(root.descendants())
                .enter().append('g').attr("class", "node").append('path')
                .attr("display", function (d) { return d.depth ? null : "none"; })
                .attr("d", arc)
                .style("stroke", "blue")
                .style("fill", "yellow");

/*
          // Populate the <text> elements with our data-driven titles.
            g.selectAll(".node")
                .append("text")
                .attr("transform", function(d) {
                    return "translate(" + arc.centroid(d) + ")rotate(" + function(d){
                       
                    let angle = (d.x0 + d.x1) / Math.PI * 90;                   
                    return (angle < 120 || angle > 270) ? angle : angle + 180;  // labels as rims                    
                    } + ")"; })
                .attr("dx", "-20") // radius margin
                .attr("dy", ".5em") // rotation align
                .text(function(d) { return d.parent ? d.data.name : "" });*/


    }

    computeTextRotation(data) {
        var angle = (data.x0 + data.x1) / Math.PI * 90;

        // Avoid upside-down labels
        return (angle < 120 || angle > 270) ? angle : angle + 180;  // labels as rims
        //return (angle < 180) ? angle - 90 : angle + 90;  // labels as spokes
    }

}