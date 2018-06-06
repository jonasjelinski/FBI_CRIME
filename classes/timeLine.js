class TimeLine extends MagicCircle{

  constructor(){
		  super();
		    this.htmlelement = htmlel_namespace.TIME_LINE;
        this.htmlElementID = this.htmlelement.rootid;
        this.rootElement = this.getRootElement();
        this.width = this.htmlelement.width-this.htmlelement.margin.left - this.htmlelement.margin.right;
        this.height = this.htmlelement.height-this.htmlelement.margin.top - this.htmlelement.margin.bottom;
        this.yearData=commonfunctions_namespace.getAllYears();
	}

  doChart(){
  if(this.yearData!=undefined){
    this.doTimeLine();
  }
}

  doTimeLine(){
    let
    startDate = new Date(String(this.yearData[0])),
    endDate = new Date(String(this.yearData[this.yearData.length-1])),
    targetValue = htmlel_namespace.TIME_LINE.width,
    playButton = d3.select("#"+htmlel_namespace.TIME_LINE.childElement),
    xAxis = scaleTime(startDate, endDate, targetValue),
    formatDateIntoYear=d3.timeFormat("%Y"),
    currentValue=0,
    moving = false,
    timer = 0;

    let svg = this.rootElement.attr("width", this.width + this.htmlelement.margin.left + this.htmlelement.margin.right).attr("height", this.height+ this.htmlelement.margin.top + this.htmlelement.margin.bottom);
    let g = svg.append(this.htmlElementType).attr("class", "slider").attr("transform", "translate(" + this.htmlelement.margin.left + "," + this.height/5 + ")");
    let line = drawLine(g, xAxis);
    let handle = drawHandler(g);
    let label = drawLabel(g, startDate);

    drawYearOutput(g, xAxis);
    handlerDragable(line, xAxis, g);


    playButton
          .on("click", function() {

          let button = d3.select(this);
          if (button.text() == "Pause") {

          clearInterval(timer);
          button.text("Play");
          moving = false;
          update(xAxis.invert(currentValue));
          return timer;
          } else {

          timer = setInterval(step, 100);
          button.text("Pause");
          moving = true;
          return timer;
          }
        });



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
                update(xAxis.invert(currentValue));
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

    function update(h) {

      let statusCrime=document.querySelector("status").getAttribute("crime");
      let map = new Map(formatDateIntoYear(h),statusCrime,moving);
      map.doChart();




      handle.attr("cx", xAxis(h));
        label
          .attr("x", xAxis(h))
          .text(formatDateIntoYear(h));

    }

    function step() {

            update(xAxis.invert(currentValue));
            currentValue = currentValue + (targetValue/99);
            if (currentValue > targetValue) {
            moving = false;
            update(xAxis.invert(currentValue));
            currentValue = 0;
            clearInterval(timer);
            playButton.text("Play");
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
let timeLine = new TimeLine();
timeLine.doChart();
