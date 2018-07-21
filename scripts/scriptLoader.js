//loads the js files in the correct order
//and starts the startpage
//source: https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement#defer_property 

var scriptLoader = scriptLoader || {};

scriptLoader = (function(){
	"use strict";

	let that = {};

	//async scripts 
	//needs to be loaded as soon the page is loaded
	function loadError(oError) {
		throw new URIError("The script " + oError.target.src + " didn't load correctly.");
	}

	//Async:False will hold the execution of rest code. Once you get response of ajax, only then, rest of the code will execute.
	function prefixScript(url, onloadFunction) {
		var newScript = document.createElement("script");
		newScript.onerror = loadError;
		if (onloadFunction) { newScript.onload = onloadFunction; }
		newScript.async = false;
		document.currentScript.parentNode.insertBefore(newScript, document.currentScript); 
		newScript.src = url;
	}

	//defer scripts
	//will not run until after the page is loaded

	function loadFirstScripts(callback){
		scripts_namespace.FIRST_SCRIPTS.forEach(function(script){
			prefixScript(script);		
		});		
		callback(null);
	}

	function loadSecondScripts(){
		scripts_namespace.SECOND_SCRIPTS.forEach(function(script){
			prefixScript(script);		
		});	
	}

	function loadScripts(){
		var q=d3.queue();
		q.defer(loadFirstScripts);  
		q.await(function(error) {
			if (error) throw error;
			loadSecondScripts();
			loadObjectsAfterWaitingForScripts();
						
		});
	}

	//waits waitingTime and then
	//sets the dataObjects and starts the startpage
	//this ensures that the dataObjects are set and the startpage is loaded
	//after all scripts have been loaded
	//otherwise the namespaces won't be recognised
	//and the app is'nt loaded correctly
	function loadObjectsAfterWaitingForScripts(){
		let waitingTime = 1000;
		setTimeout(function () {
			loadDataObjects();
			actionNamespace.actionDrawStartPage();	
		}, waitingTime);
	}

	function loadDataObjects(){
		commonfunctionsNamespace.setMapJsonObject();
		commonfunctionsNamespace.setJsonObject();	
		commonfunctionsNamespace.setCrimeCorrelationCSV();	
	}

	that.loadScripts = loadScripts;
	that.loadDataObjects = loadDataObjects;
	return that;
}());

