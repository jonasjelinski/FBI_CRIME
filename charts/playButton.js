//This class
//creates a simple button
//which is used to play and stop something

class PlayButton extends MagicCircle{
	constructor(pageId, chartId){
		super(pageId);
		this.htmlelement = htmlelementsNamespace.playButton;
		this.htmlElementID = this.htmlelement.htmlid+chartId;
		this.htmlElementType = this.htmlelement.type;
		this.width = this.htmlelement.width;
		this.height = this.htmlelement.height;
		this.eventTarget = new EventTarget();		
		this.onClick = "onClick";		
	}

	doChart(){
		this.drawButton();
	}

	//draws the button
	drawButton(){
		let button = this.container,
			pause = "pauseButton",
			play = "playButton",
			isPlaying = false,
			buttonLabelClass = "buttonLabel",
			that = this;

		setEventBehaviour();
		setClickBehaviour();
		setButtonLabel();

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
			isPlaying = !isPlaying;
		}

		//changes the label dending on if 
		//the player plays or if it is paused
		function changeButtonLabel(){
			if(isPlaying){
				button.attr("class",pause)			
			}
			else{
				button.attr("class", play)
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

			button
				.attr("class", play)
				.append("class", buttonLabelClass);
		}
	}
}