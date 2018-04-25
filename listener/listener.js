/*eslint-env browser*/

/*This js file connects all Listners of the html page with the actions of the action folder*/

//this is the namespace of the listener.js
var listener_namespace = listener_namespace || {};

//this is the document of the html page
listener_namespace.doc = document;


//this function creates new listeners
listener_namespace.createListener = function(id, type, action){

    console.log(id);
    var listener=listener_namespace.doc.getElementById(id);
    listener.addEventListener(type, () => {
    action();});
    
    return listener;
}


//this listeners starts the action drawing
//and should draw a nice circle
listener_namespace.startDrawingListener = listener_namespace.createListener("dochart", "click", action_namespace.actionStartDrawing);
