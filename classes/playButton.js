class PlayButton extends MagicCircle{
	constructor(){
		super();
		this.htmlelement = htmlelementsNamespace.PLAY_BUTTON;
		this.htmlElementID = this.htmlelement.htmlid;
		this.htmlElementType = this.htmlelement.type;
		this.width = this.htmlelement.width;
		this.height = this.htmlelement.height;
		this.eventTarget = new EventTarget();		
		this.onClick = "onClick";		
	}

	doChart(){
		this.drawButton();
	}

	drawButton(){
		let button = this.container,
			pause = "Pause",
			play = "Play",
			isPlaying = false,
			buttonLabelClass = "buttonLabel",
			that = this;

		setClickBehaviour();
		setButtonLabel();

		function setClickBehaviour(){
			button.on("click", changeButtonLabelAndSendEvent);
		}

		function changeButtonLabelAndSendEvent(event){
			setIsPlaying();
			changeButtonLabel();
			sendClickEvent(event);
		}

		function setIsPlaying(){
			isPlaying = !isPlaying;
		}

		function changeButtonLabel(){
			if(isPlaying){
				button.text(pause);				
			}
			else{
				button.text(play);
			}
		}

		function sendClickEvent(){
			let event = new Event(that.onClick);
			that.eventTarget.dispatchEvent(event);
		}

		function setButtonLabel(){
			button
				.append("class", buttonLabelClass)
				.text(play);
		}
	}
}