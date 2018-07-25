/*---PLAY BUTTON--*/

//This class
//creates a simple button
//which is used to play and stop something

class PlayButton extends MagicCircle{
	constructor(pageId, chartId, labelText= "playButton"){
		super(pageId);
		this.htmlelement = htmlelementsNamespace.playButton;
		this.htmlElementID = this.htmlelement.htmlid+chartId;
		this.htmlElementType = this.htmlelement.type;
		this.width = this.htmlelement.width;
		this.height = this.htmlelement.height;
		this.eventTarget = new EventTarget();		
		this.onClick = "onClick";
		this.labelText = labelText;
		this.isPlaying = false;	
	}

	doChart(){
		this.drawButton();
	}

	//draws the button
	drawButton(){
		let button,
			label,
			pause = "pauseButton",
			play = "playButton",
			that = this,
			hidden = 0,
			visible = 1;

		initButton();
		setEventBehaviour();
		setClickBehaviour();
		setButtonLabel();
		setHoverBehaviour();

		function initButton(){
			button = that.container
				.append("button")
				.attr("class", play);		
		}

		//sets event behaviour
		//button needs always be clickable even if nonClickable layer blocks it
		function setEventBehaviour(){
			button.style("pointer-events","all");
		}

		//determines the cklickbehaviour of the button
		function setClickBehaviour(){
			button.on("click", changeButtonLabelAndSendEvent);
		}

		//changes the boolean isPlaying, the buttonLabel and dispatches the clickevent
		function changeButtonLabelAndSendEvent(event){
			setIsPlaying();
			changeButtonLabel();
			sendClickEvent(event);
		}

		//sets isPlaying true if it is false
		//sets isPlaying false if it is true
		function setIsPlaying(){
			that.isPlaying = !that.isPlaying;
		}

		//changes the label dending on if<d 
		//the player plays or if it is paused
		function changeButtonLabel(){
			if(that.isPlaying){
				button.attr("class",pause);			
			}
			else{
				button.attr("class", play);
			}
		}

		//dispatches clickEvent
		function sendClickEvent(){
			let event = new Event(that.onClick);
			that.eventTarget.dispatchEvent(event);
		}

		//appends a new class to button
		//which contains the text of the button
		function setButtonLabel(){
			label = that.container
				.append("text")
				.attr("class", "buttonLabel")
				.style("opacity", hidden)
				.text(that.labelText);
		}

		function setHoverBehaviour(){
			button.on("mouseover", showLabel)
				.on("mouseout", hideLabel);
		}

		function showLabel(){
			label.style("opacity", visible);
		}

		function hideLabel(){
			label.style("opacity", hidden);
		}
	}
}