class MagicCircle{
    constructor (){
        this.data = this.getData();
        this.htmlelement = htmlel_namespace.MAGIC_CIRCLE;
        this.width = this.htmlelement.width;
        this.height = this.htmlelement.height;               
        this.htmlElementID = this.htmlelement.rootid;
        this.htmlElementType = this.htmlelement.type;
        this.rootElement = this.getRootElement(); 
    }
    
    getRootElement(){
          return commonfunctions_namespace.getRootElement(this);      
    }
    
    getData (){
         return commonfunctions_namespace.loadCSV();    
    }

    doChart (){
        console.log("ein magischerKreis erzeugt sich selbst");
        this.drawCircle();   
    }

    drawCircle(){
        var circle=this.rootElement.append(this.htmlElementType).append("circle").attr("cx", 30).attr("cy", 20).attr("r",20);
        
    }
}