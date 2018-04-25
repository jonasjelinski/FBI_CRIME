class Lama{
    constructor(){
        data: this.getData();
    }
    
    
    getData (){
      return commonfunctions_namespace.loadCSV();        
    }
    
    doChart (){
        console.log("ein lama erzeugt einen chart");
    }
}