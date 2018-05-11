//loads the js files in the correct order
//source: https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement#defer_property 

var startpage_namespace = startpage_namespace || {};
var Script_Sources

//async scripts 
//needs to be loaded as soon the page is loaded
startpage_namespace.loadError = function(oError) {
  throw new URIError("The script " + oError.target.src + " didn't load correctly.");
}


//Async:False will hold the execution of rest code. Once you get response of ajax, only then, rest of the code will execute.
startpage_namespace.prefixScript = function(url, onloadFunction) {
  var newScript = document.createElement("script");
  newScript.onerror = startpage_namespace.loadError;
  if (onloadFunction) { newScript.onload = onloadFunction; }
  newScript.async = false;
  document.currentScript.parentNode.insertBefore(newScript, document.currentScript);
 
  newScript.src = url;
}

//defer scripts
//will not run until after the page is loaded

startpage_namespace.loadFirstScripts = function(callback){
	config_namespace.FIRST_SCRIPTS.forEach(function(script){
		startpage_namespace.prefixScript(script);
		console.log(script);
	});
	commonfunctions_namespace.setJsonObject();
	callback(null);
}

startpage_namespace.loadSecondScripts = function(){
	config_namespace.SECOND_SCRIPTS.forEach(function(script){
		startpage_namespace.prefixScript(script);
		console.log(script);
	});
}


startpage_namespace.loadScripts = function(){
	"use strict"; 
  var q=d3.queue();
  q.defer(startpage_namespace.loadFirstScripts);  
  q.await(function(error) {
    if (error) throw error;
    startpage_namespace.loadSecondScripts();
  }); 
}

startpage_namespace.loadScripts();