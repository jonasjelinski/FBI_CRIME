var action_namespace = action_namespace || {};

action_namespace.actionStartDrawing = function(){
    components_namespace.lama.doChart();
    components_namespace.magicCircle.doChart();
}

