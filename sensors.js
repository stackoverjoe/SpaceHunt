
function sensors()
{
    let x = document.getElementById("sensorlog")
    x = "";
    reveal();

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

    //for each element in aroundme, check coordinates in that element in the map
    //if there is something at that tile, add name of object and coordinates to sensorlog
  
   document.getElementById("sensorlog").value = "";

   for(i = 0; i < aroundMe.length; ++i)
   {
    // if(`${aroundMe[i][0]}-${aroundMe[i][1]}`.type != null)
    if(mapObjs.has(`${aroundMe[i][0]}-${aroundMe[i][1]}`))
     {
      document.getElementById("sensorlog").value += mapObjs.get(`${aroundMe[i][0]}-${aroundMe[i][1]}`).type + " ";
      document.getElementById("sensorlog").value += aroundMe[i];
      document.getElementById("sensorlog").value += "\n";
     }
   }
    /*
    var vals = mapObjs.values()
    for(tile in vals)
    {
        console.log(tile)
    }
    mapObjs.keys().forEach(function(key) {
        console.log(key)
    })
    
  function logMapElements(value, key, map){
      console.log(`m[${key}] = ${value.type}`)
  }
mapObjs.forEach(logMapElements);
    
*/
//modify energy consumption (*2 while sensors are on)
}

function reveal() {
    let x = document.getElementById("sensorlog");
    if (x.style.display === "none") {
      x.style.display = "block";
      document.getElementById("deploy").innerHTML = "Turn sensors off";
    } else {
      x.value = " ";
      x.style.display = "none";
      document.getElementById("deploy").innerHTML = "Deploy Sensors";
      
    }
}

function fill_log(){
  
  
  }
