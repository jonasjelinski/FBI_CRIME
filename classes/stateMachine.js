class StateMachine{
	constructor(){
		this.activeClasses = [];
	}

	switchState(state){
		switch(state){
			case config_namespace.STATE_MACHINE.states.MAP: this.drawMapPage();
			break;
			case config_namespace.STATE_MACHINE.states.LINE_CHART:this.drawLineChartPage();
			break;
			case config_namespace.STATE_MACHINE.states.FORCE:this.drawForcePage();
			break;
			case config_namespace.STATE_MACHINE.states.UNIVERSE:this.drawUnivesePage();
			break;
		}
	}

	drawMapPage(){
		this.cleanPageFromOldClasses();

	}

	drawLineChartPage(){
		this.cleanPageFromOldClasses();

	}

	drawForcePage(){
		this.cleanPageFromOldClasses();

	}

	drawUnivesePage(){
		this.cleanPageFromOldClasses();
	}

	cleanPageFromOldClasses(){
		this.activeClasses.forEach(function(activeClass){
			activeClass.killsHimself();
		});
	}
}