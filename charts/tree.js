class Tree extends MagicCircle{

	constructor(pageId, state = configNamespace.STATES_AND_CRIMES.states[0], year = 2000){
		super(pageId);
		this.htmlelement = htmlelementsNamespace.tree;
		this.htmlElementID = this.htmlelement.htmlid;
		this.rootElement = this.getRootElement();
		this.width = this.htmlelement.width;
		this.height = this.htmlelement.height;
		this.year=year;
		this.state=state;
	}

	getData(){
		return configNamespace.JSON_OBJECT;
	}

	doChart(){
		this.drawTree();
	}

	drawTree(){

		let hierarchyData = this.createHierarchyData(),
			width = this.width - this.htmlelement.margin.left - this.htmlelement.margin.right,
			height = this.height - this.htmlelement.margin.top - this.htmlelement.margin.bottom,
			svg = this.container.attr("width", width + this.htmlelement.margin.right + this.htmlelement.margin.left).attr("height", height + this.htmlelement.margin.top + this.htmlelement.margin.bottom).append("g").attr("transform", "translate("+this.htmlelement.margin.left + "," + this.htmlelement.margin.top+ ")"),
			increaseNode = 0,
			duration = 750,
			root = d3.hierarchy(hierarchyData[0].children[0], function(d) { return d.children; }),
			path=0,
			treemap = d3.tree().size([height, width]);

		root.x0 = height / 2;
		root.y0 = 0;
		root.children.forEach(collapse);

		update(root);

		// Collapse the node and all it's children
		function collapse(d) {
			if(d.children) {
				d._children = d.children
				d._children.forEach(collapse)
				d.children = null
			}
		}

		function update(source) {
			let treeData = treemap(root),
				nodes = treeData.descendants(),
				links = treeData.descendants().slice(1),
				node = svg.selectAll('g.node').data(nodes, function(d) {return d.id || (d.id = ++increaseNode); });

        nodes.forEach(function(d){ d.y = d.depth * 180});

        nodeEnter=nodeEnter();

    nodeEnter.append('text')
    .attr("dy", ".35em")
    .attr("x", function(d) {
      return d.children || d._children ? -13 : 13;
    })
      .attr("text-anchor", function(d) {
          return d.children || d._children ? "end" : "start";
      })
      .text(function(d) { return d.data.name; });


  var nodeUpdate = nodeEnter.merge(node);


  nodeUpdate.transition()
    .duration(duration)
    .attr("transform", function(d) {
        return "translate(" + d.y + "," + d.x + ")";
     });


     nodeUpdate.select('circle.node')
    .attr('r', 10)
    .style("fill", function(d) {
        return d._children ? "lightsteelblue" : "red";
    })
    .attr('cursor', 'pointer');



  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) {
          return "translate(" + source.y + "," + source.x + ")";
      })
      .remove();


  nodeExit.select('circle')
    .attr('r', 1e-6);


  nodeExit.select('text')
    .style('fill-opacity', 1e-6);


  var link = svg.selectAll('path.link')
      .data(links, function(d) { return d.id; });


  var linkEnter = link.enter().insert('path', "g")
      .attr("class", "link")
      .attr('d', function(d){
        var o = {x: source.x0, y: source.y0}
        return diagonal(o, o)
      });


  var linkUpdate = linkEnter.merge(link);

  linkUpdate.transition()
      .duration(duration)
      .attr('d', function(d){ return diagonal(d, d.parent) });


  var linkExit = link.exit().transition()
      .duration(duration)
      .attr('d', function(d) {
        var o = {x: source.x, y: source.y}
        return diagonal(o, o)
      })
      .remove();


  nodes.forEach(function(d){
    d.x0 = d.x;
    d.y0 = d.y;
  });


  function diagonal(s, d) {

  var  path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`

    return path
  }

  function nodeEnter(){
    var nodeEnter = node.enter().append('g')
    .attr('class', 'node')
    .attr("transform", function(d) {
      return "translate(" + source.y0 + "," + source.x0 + ")";
  })
  .on('click', click);

  nodeEnter.append('circle')
  .attr('class', 'node')
  .attr('r', 1e-6)
  .style("fill", function(d) {
    return d._children ? "lightsteelblue" : "#fff";
  });
  return nodeEnter;
  }


  function click(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
    update(d);
  }
}




}


createHierarchyData(){

let crimedata = commonfunctionsNamespace.getCrimesAndDataByYearAndState(this.year, this.state, this.data);
let treeData=firstNode(this.year);
let treeDataState=secondNode(treeData,this.state);
let treeDataCrimes=lastNode(treeDataState);




function firstNode(year){
  let treeData =[];
  treeData.push({
    "name": year,
    "parent": "null",
    "value": 10,
    "type": "black",
    "level": "red",
    "children": []
  }
);
return treeData;
}

function secondNode(treeData,state){
  treeData[treeData.length-1].children=[];
  treeData[treeData.length-1].children.push(
    {
      "name": state,
      "parent": "null",
      "value": 10,
      "type": "black",
      "level": "red",
      "children":[]
    }
  );
  return treeData;
}

function childNodeMurderManslaughter(){
	return [
            {
              "name": ""+crimedata.crimes.violentCrime.MurderManslaughter,
              "parent": "null",
              "value": 10,
              "type": "black",
              "level": "red",
              "children": null
            }
          ]
		 }
		 
function childNodeRape(){
	return [
            {
              "name": ""+crimedata.crimes.violentCrime.Rape,
              "parent": "null",
              "value": 10,
              "type": "black",
              "level": "red",
              "children": null
            }
          ]
}

function childNodeRobbery(){
	return [
            {
              "name": ""+crimedata.crimes.violentCrime.Robbery,
              "parent": "null",
              "value": 10,
              "type": "black",
              "level": "red",
              "children": null
            }
          ]
}

function childNodeAggravatedassault(){
	return [
            {
              "name": ""+crimedata.crimes.violentCrime.Aggravatedassault,
              "parent": "null",
              "value": 10,
              "type": "black",
              "level": "red",
              "children": null
            }
          ]
}

function childNodeBuglary(){
	return [
            {
              "name": ""+crimedata.crimes.propertyCrime.Burglary,
              "parent": "null",
              "value": 10,
              "type": "black",
              "level": "red",
              "children": null
            }
          ]
}

function childNodeLarencytheft(){
	return [
            {
              "name": ""+crimedata.crimes.propertyCrime.Larcenytheft,
              "parent": "null",
              "value": 10,
              "type": "black",
              "level": "red",
              "children": null
            }
          ]
}

function childNodeMotorvehicletheft(){
	return [
            {
              "name": " "+crimedata.crimes.propertyCrime.Motorvehicletheft,
              "parent": "null",
              "value": 10,
              "type": "black",
              "level": "red",
              "children": null
            }
          ]
}

function childNodeViolentCrime(){
	return [
        {
          "name": "MurderManslaughter: ",
          "parent": "null",
          "value": 10,
          "type": "black",
          "level": "red",
          "children": childNodeMurderManslaughter()
        },
        {
          "name": "Rape: ",
          "parent": "null",
          "value": 10,
          "type": "black",
          "level": "red",
          "children": childNodeRape()
        },
        {
          "name": "Robbery: ",
          "parent": "null",
          "value": 10,
          "type": "black",
          "level": "red",
          "children": childNodeRobbery()
        },
        {
          "name": "Aggravatedassault: ",
          "parent": "null",
          "value": 10,
          "type": "black",
          "level": "red",
          "children": childNodeAggravatedassault()
        }
      ]
}

function childNodePropertyCrime(){
	return [
        {
          "name": "Burglary: ",
          "parent": "null",
          "value": 10,
          "type": "black",
          "level": "red",
          "children": childNodeBuglary()
        },
        {
          "name": "Larcenytheft: ",
          "parent": "null",
          "value": 10,
          "type": "black",
          "level": "red",
          "children": childNodeLarencytheft()
        },
        {
          "name": "Motorvehicletheft: ",
          "parent": "null",
          "value": 10,
          "type": "black",
          "level": "red",
          "children": childNodeMotorvehicletheft()
        }
      ]
}

function lastNode(treeDataState){
  treeDataState[treeDataState.length-1].children[0].children.push(
    {
      "name": "violentCrime",
      "parent": "null",
      "value": 10,
      "type": "black",
      "level": "red",
      "children": childNodeViolentCrime()
    },
    {
      "name": "propertyCrime:",
      "parent": "null",
      "value": 10,
      "type": "black",
      "level": "red",
      "children": childNodePropertyCrime()
    }
  )
}

return treeData;
}

setYear(year){
  this.year = year;
}

}
