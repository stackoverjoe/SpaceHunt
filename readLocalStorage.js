class coord{
  constructor(newX, newY){
    this.xcoord = newX;
    this.ycoord = newY;
  }
}

class localStoragePackage{
  constructor(){
    //plain ol integers
    this.maxX = 128;
    this.maxY = 128;
    this.startX = 63;
    this.startY = 63;
    this.baseEnergy = 100;
    this.baseSupplies = 200;
    this.baseCredits = 100;
    this.canDie = 1;
    //either "random" or an array of coords, access like coordArray[i].xcoord/ycoord
    this.wormholes = "random";
    this.spaceStations = "random";
    //planets, either "random" or a coord, access like coordArray.xcoord/ycoord
    this.xort = "random";
    this.blarg = "random";
    this.irk = "random";
    this.aether = "random";
    this.foo = "random";
  }
}

//returns the results packaged in a class of the above
function readLocalStorage(){
  var pkg = new localStoragePackage();
  //no pass by reference mean a lot of code dumplication :/
  var dummy;

  //maxX
  dummy = Number(localStorage.getItem("maxX"));
  if(dummy != "NaN" && dummy > 0) pkg.maxX = dummy;

  //maxY
  dummy = Number(localStorage.getItem("maxY"));
  if(dummy != "NaN" && dummy > 0) pkg.maxY = dummy;

  //startX
  dummy = Number(localStorage.getItem("startX"));
  if(dummy != "NaN" && dummy > 0 && dummy < pkg.maxX) pkg.startX = dummy;
  else pkg.startX = 0;

  //startY
  dummy = Number(localStorage.getItem("startY"));
  if(dummy != "NaN" && dummy > 0 && dummy < pkg.maxY) pkg.startY = dummy;
  else pkg.startY = 0;
  
  //baseEnergy
  dummy = Number(localStorage.getItem("baseEnergy"));
  if(dummy != "NaN") pkg.baseEnergy = dummy;
  
  //baseSupplies
  dummy = Number(localStorage.getItem("baseSupplies"));
  if(dummy != "NaN") pkg.baseSupplies = dummy;
  
  //baseCredits
  dummy = Number(localStorage.getItem("baseCredits"));
  if(dummy != "NaN") pkg.baseCredits = dummy;
  
  //canDie
  dummy = Number(localStorage.getItem("canDie"));
  if(dummy === 0 || dummy === 1) pkg.canDie = dummy;

  //wormholes
  dummy = localStorage.getItem("wormholes");
  if(dummy && dummy != "random"){
    dummy = dummy.split(" ");
    const dummyLength = dummy.length;
    for(var i = 0; i < dummyLength; ++i)
      dummy[i] = dummy[i].split(",");

    pkg.wormholes = new Array(dummyLength);
    for(var i = 0; i < dummyLength; ++i)
      pkg.wormholes[i] = new coord(Number(dummy[i][0]), Number(dummy[i][1]));
  }

  //spaceStations
  dummy = localStorage.getItem("spaceStations");
  if(dummy && dummy != "random"){
    dummy = dummy.split(" ");
    const dummyLength = dummy.length;
    for(var i = 0; i < dummyLength; ++i)
      dummy[i] = dummy[i].split(",");

    pkg.spaceStations = new Array(dummyLength);
    for(var i = 0; i < dummyLength; ++i)
      pkg.spaceStations[i] = new coord(Number(dummy[i][0]), Number(dummy[i][1]));
  }

  //xort
  dummy = localStorage.getItem("xort");
  if(dummy){
    dummy = dummy.split(",");
    pkg.xort = new coord(Number(dummy[0]), Number(dummy[1]));
  }

  //blarg
  dummy = localStorage.getItem("blarg");
  if(dummy){
    dummy = dummy.split(",");
    pkg.blarg = new coord(Number(dummy[0]), Number(dummy[1]));
  }

  //irk
  dummy = localStorage.getItem("irk");
  if(dummy){
    dummy = dummy.split(",");
    pkg.irk = new coord(Number(dummy[0]), Number(dummy[1]));
  }

  //aether
  dummy = localStorage.getItem("aether");
  if(dummy){
    dummy = dummy.split(",");
    pkg.aether = new coord(Number(dummy[0]), Number(dummy[1]));
  }

  //foo
  dummy = localStorage.getItem("foo");
  if(dummy){
    dummy = dummy.split(",");
    pkg.foo = new coord(Number(dummy[0]), Number(dummy[1]));
  }
  
  return pkg;
}
/* test code
  //testing
  localStorage.setItem("wormholes", "1,2 3,4 5,6 7,8 9,10");
  //testing
  
  alert("Read done.\n" +
    "maxX = " + pkg.maxX + "\n" +
    "maxY = " + pkg.maxY + "\n" +
    "startX = " + pkg.startX + "\n" +
    "startY = " + pkg.startY + "\n" +
    "baseEnergy = " + pkg.baseEnergy + "\n" +
    "baseSupplies = " + pkg.baseSupplies + "\n" +
    "baseCredits = " + pkg.baseCredits + "\n" +
    "wormholes[0].xcoord = " + pkg.wormholes[0].xcoord + "\n" +
    "wormholes[0].ycoord = " + pkg.wormholes[0].ycoord + "\n" +
    "wormholes[1].xcoord = " + pkg.wormholes[1].xcoord + "\n" +
    "wormholes[1].ycoord = " + pkg.wormholes[1].ycoord + "\n" +
    "wormholes[2].xcoord = " + pkg.wormholes[2].xcoord + "\n" +
    "wormholes[2].ycoord = " + pkg.wormholes[2].ycoord + "\n" +
    "wormholes[3].xcoord = " + pkg.wormholes[3].xcoord + "\n" +
    "wormholes[3].ycoord = " + pkg.wormholes[3].ycoord + "\n" +
    "wormholes[4].xcoord = " + pkg.wormholes[4].xcoord + "\n" +
    "wormholes[4].ycoord = " + pkg.wormholes[4].ycoord + "\n");
    */
