function sensors()
{
    let x = document.getElementById("sensorlog")
    x = "";
    Reveal();

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
    
    var vals = mapObjs.values()
    for(tile in vals)
    {
        console.log(tile)
    }
    /*mapObjs.keys().forEach(function(key) {
        console.log(key)
    })*/
    
  function logMapElements(value, key, map){
      console.log(`m[${key}] = ${value.type}`)
  }
mapObjs.forEach(logMapElements);
    
   
//modify energy consumption (*2 while sensors are on)
}

function Reveal() {
    let x = document.getElementById("sensorlog");
    if (x.style.display === "none") {
      x.style.display = "block";
      document.getElementById("deploy").innerHTML = "Turn sensors off";
    } else {
      x.style.display = "none";
      document.getElementById("deploy").innerHTML = "Deploy Sensors";
    }
  }
