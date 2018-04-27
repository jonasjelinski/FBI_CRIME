//this file includes all actions, which the listener call

var action_namespace = action_namespace || {};

action_namespace.actionStartDrawing = function(){
	'use strict';
    components_namespace.lama.doChart();
    components_namespace.magicCircle.doChart();
}

