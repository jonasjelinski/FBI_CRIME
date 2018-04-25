var commonfunctions_namespace = commonfunctions_namespace || {};

commonfunctions_namespace.loadCSV = function(){

	try{
        data = d3.csv(config_namespace.FILE_PATHES.csvpath, 
                      function(csvdata){
                            return csvdata;
                      }
                );
                   
        
            return data;

  }

   catch(err){
        console.log("couldn't load csv "+err);   
  } 
};

commonfunctions_namespace.getRootElement= function(environment){
          rootElement = d3.selectAll("#"+environment.htmlElementID).attr("width",environment.width).attr("height",environment.height);
          return rootElement;        
};