//this file includes all actions, which the listener call

var action_namespace = action_namespace || {};

action_namespace.actionStartDrawing = function(){
	'use strict';

	if(dynamics_namespace.chartsCanBeBuild){
		components_namespace.lama.doChart();
		console.log(components_namespace.lama.getData());
    components_namespace.magicCircle.doChart();


	}

}

action_namespace.actionPaintUniverse = function(){
	'use strict';
	components_namespace.universe.doChart();
}


action_namespace.actionDrawUniversePage = function(){
	'use strict';
	components_namespace.universe.doChart();
}