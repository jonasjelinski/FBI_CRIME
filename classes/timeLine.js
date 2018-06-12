class TimeLine extends MagicCircle{

	constructor(){
		super();
		this.htmlelement = htmlelementsNamespace.TIME_LINE;
		this.htmlElementID = this.htmlelement.htmlid;
		this.rootElement = this.getRootElement();
		this.width = this.htmlelement.width-this.htmlelement.margin.left - this.htmlelement.margin.right;
		this.height = this.htmlelement.height-this.htmlelement.margin.top - this.htmlelement.margin.bottom;
		this.yearData=commonfunctionsNamespace.getAllYears();
    this.eventTarget = new EventTarget();
    this.onUpdate = "onUpdate";
    this.timer = 0;
    this.moving = false;
    this.update = undefined;
    this.step = undefined;
	}

	doChart(){
		if(this.yearData!=undefined){
			this.doTimeLine();
		}
	}

  isTimeLineMoving(){
    return this.moving;
  }

   playTimeLine(){
    console.log("playTimeLine", this.step);
     this.timer = setInterval(this.step, 100);     
        this.moving = true;             
  }

   pauseTimeLine(){
      clearInterval(this.timer);       
      this.moving = false;
      this.update();       
  }

	doTimeLine(){
		var
			startDate = new Date(String(this.yearData[0])),
			endDate = new Date(String(this.yearData[this.yearData.length-1])),
			targetValue = htmlelementsNamespace.TIME_LINE.width,			
			xAxis = scaleTime(startDate, endDate, targetValue),
			formatDateIntoYear=d3.timeFormat("%Y"),
			currentValue=0,		
			timer = 0,
      that = this;
     

      let svg = this.container.attr("width", this.width + this.htmlelement.margin.left + this.htmlelement.margin.right).attr("height", this.height+ this.htmlelement.margin.top + this.htmlelement.margin.bottom),
      g = svg.append(this.htmlElementType).attr("class", "slider").attr("transform", "translate(" + this.htmlelement.margin.left + "," + this.height/5 + ")"),
      line = drawLine(g, xAxis),
      handle = drawHandler(g),
      label = drawLabel(g, startDate);
      this.update = update;
      this.step = step; 

      drawYearOutput(g, xAxis);     
      handlerDragable(line, xAxis, g); 


    function drawLabel(g,startDate){

      let label = g.append("text")
                .attr("class", "label")
                .attr("text-anchor", "middle")
                .text(formatDateIntoYear(startDate))
                .attr("transform", "translate(0," + (-15) + ")");
                return label;
    }


function handlerDragable(line,xAxis,g){

  line.call(d3.drag()
      .on("start.interrupt", function () { g.interrupt(); })
      .on("start drag", function() {
                currentValue = d3.event.x;
                update();
              })
          );
}

    function drawHandler(g){

      let handle = g.insert("circle", ".track-overlay")
                .attr("class", "handle")
                .attr("r", 9);
                return handle;
    }


    function drawLine(g,xAxis){

      let line = g.append("line")
              .attr("class", "track")
              .attr("x1", xAxis.range()[0])
              .attr("x2", xAxis.range()[1])
              .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
              .attr("class", "track-inset")
              .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
              .attr("class", "track-overlay");
              return line;
    }

    function drawYearOutput(g,xAxis){

      g.insert("g", ".track-overlay")
        .attr("class", "ticks")
        .attr("transform", "translate(0," + 16 + ")")
        .selectAll("text")
        .data(xAxis.ticks(8))
        .enter()
        .append("text")
        .attr("x", xAxis)
        .attr("y", 10)
        .attr("text-anchor", "middle")
        .text(function(d) { return formatDateIntoYear(d);});
    }

    function update() {
      let h = xAxis.invert(currentValue),
      year = formatDateIntoYear(h);
      sendYearAndMovingStatus(year,that.moving);

      handle.attr("cx", xAxis(h));
        label
          .attr("x", xAxis(h))
          .text(formatDateIntoYear(h));

    }

    function sendYearAndMovingStatus(year,moving){
      let event = new CustomEvent(that.onUpdate, {detail:{ year: year, moving: moving}});      
      that.eventTarget.dispatchEvent(event);
    }

    function step() {
      update();
      currentValue = currentValue + (targetValue/99);
      if (currentValue > targetValue) {
        this.moving = false;
        update();
        currentValue = 0;                     
      }
    }

    function scaleTime(startDate, endDate, targetValue){

      let x = d3.scaleTime()
              .domain([startDate, endDate])
              .range([0, targetValue])
              .clamp(true);
              return x;
    }

    function getLine(x,g,htmlClass){

      let line=g.append("line")
              .attr(htmlClass, "track")
              .attr("x1", x.range()[0])
              .attr("x2", x.range()[1])
              .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
              .attr(htmlClass, "track-inset")
              .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
              .attr(htmlClass, "track-overlay");
              return line;
    }

  }
}
