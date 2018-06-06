class Lama{
    constructor(){
        this.data = this.getData ();
    }    
    
    getData () {
      return config_namespace.JSON_OBJECT;        
    }
    
    doChart () {
        console.log("ein lama erzeugt einen chart", this.data);
    }
}