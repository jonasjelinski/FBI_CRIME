class DropDown extends MagicCircle {

  constructor(){
      super();
        this.htmlelement = htmlel_namespace.DROP_DOWN;
        this.htmlElementID = this.htmlelement.rootid;
        this.rootElement = this.getRootElement();
        this.width = this.htmlelement.width;
        this.categoryData=commonfunctions_namespace.getAllCategoriesAsText();

  }


  doChart(){
  if(this.categoryData!=undefined){
    this.doDropDown();
  }
}

  doDropDown(){

    let select = this.rootElement.attr("width",this.width)
  	.attr('class','drop-down-select')
    .on('change',changeOption);


    var test=this.categoryData.Crimes.propertyCrime.concat(this.categoryData.Crimes.violentCrime);


    select
    .selectAll('option')
    .data(test).enter()
    .append('option')
    .text(function (d) {return d.crimeText});




  function changeOption(){
    let selectValue = d3.select('select').property('value');
    let statusYear;
    let crimeType=[];

    for(let i=0;i<test.length;i++) {

    if(selectValue==test[i].crimeText){

      statusYear=document.querySelector("status").getAttribute("year");
      let map = new Map(statusYear,test[i].crimeType,false);
      map.doChart();

    }
  }
}
}





}
let dropDown = new DropDown();
dropDown.doChart();
