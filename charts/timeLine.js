//This class creates a TimeLine with d3
//An interactive scale bar to chosse the years for the modules "map" and "planets"

class TimeLine extends MagicCircle{

	constructor(pageId){
		super(pageId);
		this.htmlelement = htmlelementsNamespace.timeLine;
		this.htmlElementID = this.htmlelement.htmlid;
		this.width = this.htmlelement.width-this.htmlelement.margin.left - this.htmlelement.margin.right;
		this.height = this.htmlelement.height-this.htmlelement.margin.top - this.htmlelement.margin.bottom;
		this.yearData=commonfunctionsNamespace.getAllYears();
		this.eventTarget = new EventTarget();
		this.onUpdate = "onUpdate";
		this.timer = 0;
		this.currentValue=0;
		this.startDate = new Date(String(this.yearData[0]));
		this.endDate = new Date(String(this.yearData[this.yearData.length-1]));
		this.isMoving = false;
		this.update = undefined;
		this.step = undefined;
	}

	doChart(){
		if(this.yearData!==undefined){
			this.doTimeLine();
		}
	}

	isTimeLineMoving(){
		return this.isMoving;
	}

	playTimeLine(){
		this.timer = setInterval(this.step, 100);
		this.isMoving = true;
	}

	pauseTimeLine(){
		clearInterval(this.timer);
		this.isMoving = false;
		this.update();
	}

	//creates the Timeline
	//https://gist.github.com/officeofjane/47d2b0bfeecfcb41d2212d06d095c763#file-circles-csv
	doTimeLine(){
		let startDate = this.startDate,
			endDate = this.endDate,
			targetValue = this.width,
			xAxis = scaleTime(startDate, endDate, targetValue),
			formatDateIntoYear=d3.timeFormat("%Y"),
			currentValue=this.currentValue,
			timer = this.timer,
			that = this,
			svg = this.container.append("svg").attr("width", this.width + this.htmlelement.margin.left + this.htmlelement.margin.right).attr("height", this.height+ this.htmlelement.margin.top + this.htmlelement.margin.bottom),
			g = svg.append("g").attr("class", "slider").attr("transform", "translate(" + this.htmlelement.margin.left + "," + 50 + ")"),
			line = drawLine(g, xAxis),
			handle = drawHandler(g),
			label = drawLabel(g, startDate);
			
		this.update = update;
		this.step = step;

		drawYearOutput(g, xAxis);
		handlerDragable(line, xAxis, g);

		//show current date above the drag-Handler as text
		function drawLabel(g,startDate){
			let label = g.append("text")
				.attr("class", "label")
				.attr("text-anchor", "middle")
				.text(formatDateIntoYear(startDate))
				.attr("transform", "translate(0," + (-15) + ")");
			return label;
		}

		//make drag-Handler dragable
		function handlerDragable(line,xAxis,g){
			line.call(d3.drag()
				.on("start.interrupt", function () { g.interrupt(); })
				.on("start drag", function() {
					currentValue = d3.event.x;
					update();
				})
			);
		}

		//show drag-Handler as dot
		function drawHandler(g){
			let handle = g.insert("circle", ".track-overlay")
				.attr("class", "handle")
				.attr("r", 9);
			return handle;
		}

		//draw the line and define the beginning -and endRange
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

		//show the Date-Range below the line
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

		//handle current status of drag-Handler and year-label
		//send status of year to other modules
		function update(){
			let h = xAxis.invert(currentValue),
				year = formatDateIntoYear(h);
			sendYearAndMovingStatus(year,that.isMoving);
			handle.attr("cx", xAxis(h));
			label
				.attr("x", xAxis(h))
				.text(formatDateIntoYear(h));
		}

		//shoot the event to let know other modules of year and if drag-Handler is moving
		function sendYearAndMovingStatus(year,isMoving){
			let event = new CustomEvent(that.onUpdate, {detail:{ year: year, isMoving: isMoving}});
			that.eventTarget.dispatchEvent(event);
		}

		//
		function step(){
			update();
			currentValue = currentValue + (targetValue/99);
			if (currentValue > targetValue) {
				this.isMoving = false;
				update();
				currentValue = 0;
			}
		}

		//define the start -and endScale of the line
		function scaleTime(startDate, endDate, targetValue){
			let x = d3.scaleTime()
				.domain([startDate, endDate])
				.range([0, targetValue])
				.clamp(true);
			return x;
		}

		//getter-function to drawn Line
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
