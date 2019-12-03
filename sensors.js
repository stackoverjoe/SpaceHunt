
function sensors()
{
    //var x = document.getElementById("sensorlog")
    //x = "";
    var todisplay = "Objects Nearby:\n";
    var aroundMe = new Array(12);
    aroundMe[0] = [player.xcoord+1, player.ycoord]
    aroundMe[1] = [player.xcoord+2, player.ycoord]
    aroundMe[2] = [player.xcoord+1, player.ycoord+1]
    aroundMe[3] = [player.xcoord+1, player.ycoord-1]
    aroundMe[4] = [player.xcoord, player.ycoord+1]
    aroundMe[5] = [player.xcoord, player.ycoord+2]
    aroundMe[6] = [player.xcoord, player.ycoord-1]
    aroundMe[7] = [player.xcoord, player.ycoord-2]
    aroundMe[8] = [player.xcoord-1, player.ycoord]
    aroundMe[9] = [player.xcoord-2, player.ycoord]
    aroundMe[10] = [player.xcoord-1, player.ycoord+1]
    aroundMe[11] = [player.xcoord-1, player.ycoord-1]
  
    //clear before adding new tile information
    document.getElementById("sensorlog").value = "";
  
      //for each element in aroundme, check coordinates in that element in the map
      //if there is something at that tile, add name of object and coordinates to sensorlog
     for(i = 0; i < aroundMe.length; ++i)
     {
      if(mapObjs.has(`${aroundMe[i][0]}-${aroundMe[i][1]}`))
       {
         /*
        document.getElementById("sensorlog").value += mapObjs.get(`${aroundMe[i][0]}-${aroundMe[i][1]}`).type + " ";
        document.getElementById("sensorlog").value += aroundMe[i];
        document.getElementById("sensorlog").value += "\n";
        */
       todisplay += mapObjs.get(`${aroundMe[i][0]}-${aroundMe[i][1]}`).type + " ";
       todisplay += aroundMe[i];
       todisplay += "\n";
  
       }
     }
     if(todisplay == "Objects Nearby:\n"){
       todisplay = "Sensors could not detect any celestial objects";
     }
    alert(todisplay);
    
    document.getElementById("energy") -=10;
}

function godmode(){
  
  reveal();
 /* let keys = mapObjs.keys();
 for(var i = 0; i < keys.length; ++i){
    var myObj = mapObjs.get(keys[i])
    document.getElementById("sensorlog").value += myObj.type + " ";
    document.getElementById("sensorlog").value += "[" + myObj.xcoord + ", " + myObj.ycoord + "]";
    document.getElementById("sensorlog").value += "\n";
 }
 */

 //very low tech version.  need to change to use keys and better display
var maxX = coords[0];
var maxY = coords[1];

for(let j=0; j<maxX; ++j){
  for(let k=0; k<maxY; ++k){
    if(mapObjs.has(`${j}-${k}`)){
      let myObj = mapObjs.get(`${j}-${k}`);
      document.getElementById("sensorlog").value += myObj.type + " ";
      document.getElementById("sensorlog").value += "[" + j + ", " + k + "]";
      document.getElementById("sensorlog").value += "\n";
      /* display winner
      if(myObj.type == "planet"){}*/
    }
  }
}
}

function reveal() {
    var x = document.getElementById("sensorlog");
    if (x.style.display === "none") {
      x.style.display = "block";
   //   document.getElementById("deploy").innerHTML = "Turn sensors off";
     // document.getElementById("deployed") = 1;
    } else {
      x.value = " ";
      x.style.display = "none";
     // document.getElementById("deploy").innerHTML = "Deploy Sensors";
     // document.getElementById("deployed") = 0;
    }
}
/*
function fillLog(){

  var aroundMe = new Array(12);
  aroundMe[0] = [player.xcoord+1, player.ycoord]
  aroundMe[1] = [player.xcoord+2, player.ycoord]
  aroundMe[2] = [player.xcoord+1, player.ycoord+1]
  aroundMe[3] = [player.xcoord+1, player.ycoord-1]
  aroundMe[4] = [player.xcoord, player.ycoord+1]
  aroundMe[5] = [player.xcoord, player.ycoord+2]
  aroundMe[6] = [player.xcoord, player.ycoord-1]
  aroundMe[7] = [player.xcoord, player.ycoord-2]
  aroundMe[8] = [player.xcoord-1, player.ycoord]
  aroundMe[9] = [player.xcoord-2, player.ycoord]
  aroundMe[10] = [player.xcoord-1, player.ycoord+1]
  aroundMe[11] = [player.xcoord-1, player.ycoord-1]

  //clear before adding new tile information
  document.getElementById("sensorlog").value = "";

    //for each element in aroundme, check coordinates in that element in the map
    //if there is something at that tile, add name of object and coordinates to sensorlog
   for(i = 0; i < aroundMe.length; ++i)
   {
    if(mapObjs.has(`${aroundMe[i][0]}-${aroundMe[i][1]}`))
     {
       /*
      document.getElementById("sensorlog").value += mapObjs.get(`${aroundMe[i][0]}-${aroundMe[i][1]}`).type + " ";
      document.getElementById("sensorlog").value += aroundMe[i];
      document.getElementById("sensorlog").value += "\n";
      
     todisplay += mapObjs.get(`${aroundMe[i][0]}-${aroundMe[i][1]}`).type + " ";
     todisplay += aroundMe[i];
     todisplay += "\n";

     }
   }

}
*/