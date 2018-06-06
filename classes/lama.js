class Lama{
    constructor(){
        this.data = this.getData ();
    }    
    
    getData () {
      return configNamespace.JSON_OBJECT;        
    }
    
    doChart () {
        console.log("ein lama erzeugt einen chart", this.data);
    }
}