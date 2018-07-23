class StartContainer extends MagicCircle{
	constructor(pageId, chartId, picSrc, picId, alt, textId, labelText, buttonText){
		super(pageId);
		this.htmlelement = htmlelementsNamespace.startContainer; 
		this.htmlElementID = chartId;
		this.htmlElementType = this.htmlelement.type;
		this.width = this.htmlelement.width;
		this.height = this.htmlelement.height;
		this.onClick = "onClick";
		this.eventTarget =  new EventTarget();
		this.chartId = chartId;
		this.picSrc = picSrc;
		this.picId = picId;
		this.alt = alt;
		this.textId = textId;
		this.labelText = labelText;
		this.buttonText = buttonText;
	}

	doChart(){
		this.drawStartContainer();
	}

	drawStartContainer(){
		let that = this,
			startContainer,
			picture,
			label,
			clickLabel;

		initStartContainer();
		drawPicture();
		appendTextToStartContainer();
		appendClickLabel();
		addClickListener();

		//"<div class='startContainer' id='startMap'><img src='./pictures/MapChart.png' alt='MapChart' class='startPics' id='mapPic'></img

		function initStartContainer(){
			startContainer = that.container
				.attr("class", "startContainer")
		}

		function drawPicture(){
			picture = startContainer
				.append("img")
				.attr("src", that.picSrc)
				.attr("id", that.picId)
				.attr("class", "startPics")
				.attr("alt", that.alt);
		}

		function appendTextToStartContainer(){
			label = startContainer
				.append("p")
				.attr("id", that.textId)
				.attr("class", "startText")
				.text(that.labelText);
		}

		function appendClickLabel(){
			clickLabel = label
				.append("p")
				.text(that.buttonText);
		}

		function addClickListener(){
			startContainer
				.on("click", dispatchClickEvent);
		}

		function dispatchClickEvent(){
			let event = new Event(that.onClick);
			event.detail = {};
			event.detail.chartId = that.chartId;
			that.eventTarget.dispatchEvent(event); 
		}
	}
}