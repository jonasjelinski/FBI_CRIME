var action_namespace = action_namespace || {};

action_namespace.actionStartDrawing = function(){
	'use strict';
    components_namespace.lama.doChart();
    components_namespace.magicCircle.doChart();
}

