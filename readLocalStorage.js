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
    this.baseCredits = 1000;
    this.canDie = 1;
    //either "random" or an array of coords, access like variableName[i].xcoord/ycoord
    this.wormholes = "random";
    this.spaceStations = "random";
    //planets, either "random" or a coord, access like variableName.xcoord/ycoord
    this.xort = "random";
    this.blarg = "random";
    this.irk = "random";
    this.aether = "random";
    this.foo = "random";
  }
}

//==================sh1 people, you don't need to read past this line :)==================

function debugAlert(pkg){
  var alertMessage = 
    "DEBUG ALERT" +
    "\nTo turn me off, comment me out at the bottom of the file." +
    "\n\nlocalStorage" +
    "\nmaxX\t\t"        + localStorage.maxX +
    "\nmaxY\t\t"        + localStorage.maxY +
    "\nstartX\t\t"      + localStorage.startX +
    "\nstartY\t\t"      + localStorage.startY +
    "\nbaseEnergy\t"    + localStorage.baseEnergy +
    "\nbaseSupplies\t"  + localStorage.baseSupplies +
    "\nbaseCredits\t"   + localStorage.baseCredits +
    "\ncanDie\t\t"      + localStorage.canDie +
    "\nwormholes\t"     + localStorage.wormholes +
    "\nspaceStations\t" + localStorage.spaceStations +
    "\nxort\t\t\t"      + localStorage.xort +
    "\nblarg\t\t"       + localStorage.blarg +
    "\nirk\t\t\t"       + localStorage.irk +
    "\naether\t\t"      + localStorage.aether +
    "\nfoo\t\t\t"       + localStorage.foo +

    "\n\nlocalStoragePackage" +
    "\nmaxX\t\t"       + pkg.maxX +
    "\nmaxY\t\t"       + pkg.maxY +
    "\nstartX\t\t"     + pkg.startX +
    "\nstartY\t\t"     + pkg.startY +
    "\nbaseEnergy\t"   + pkg.baseEnergy +
    "\nbaseSupplies\t" + pkg.baseSupplies +
    "\nbaseCredits\t"  + pkg.baseCredits
    "\ncanDie\t\t"     + localStorage.canDie;

  alertMessage += "\nwormholes\t";
  if(pkg.wormholes === "random") alertMessage += "random";
  else
    for(i in pkg.wormholes)
      alertMessage += " " + i.xcoord + "," + i.ycoord;

  alertMessage += "\nspaceStations\t";
  if(pkg.spaceStations === "random") alertMessage += "random";
  else
    for(i in pkg.spaceStations)
      alertMessage += " " + i.xcoord + "," + i.ycoord;

  alertMessage +=
    "\nxort\t\t\t" + pkg.xort.xcoord   + "," + pkg.xort.ycoord +
    "\nblarg\t\t"  + pkg.blarg.xcoord  + "," + pkg.blarg.ycoord +
    "\nirk\t\t\t"  + pkg.irk.xcoord    + "," + pkg.irk.ycoord +
    "\naether\t\t" + pkg.aether.xcoord + "," + pkg.aether.ycoord +
    "\nfoo\t\t\t"  + pkg.foo.xcoord    + "," + pkg.foo.ycoord;

  alert(alertMessage);
}

//returns the results packaged in a class of the above, changing any non-default values
function readLocalStorage(){
  var pkg = new localStoragePackage();
  //no pass by reference mean a lot of code duplication :/
  var dummy, x, y;

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

    for(var i = 0; i < dummyLength; ++i){
      x = Number(dummy[i][0]);
      y = Number(dummy[i][1]);
      if(x != "NaN" && x >= 0 && x < pkg.maxX &&
         y != "NaN" && y >= 0 && y < pkg.maxY)
        pkg.wormholes[i] = new coord(x, y);
      else{
        pkg.wormholes = "random";
        break;
      }
    }
  }

  //spaceStations
  dummy = localStorage.getItem("spaceStations");
  if(dummy && dummy != "random"){
    dummy = dummy.split(" ");
    const dummyLength = dummy.length;
    for(var i = 0; i < dummyLength; ++i)
      dummy[i] = dummy[i].split(",");

    pkg.spaceStations = new Array(dummyLength);

    for(var i = 0; i < dummyLength; ++i){
      x = Number(dummy[i][0]);
      y = Number(dummy[i][1]);
      if(x != "NaN" && x >= 0 && x < pkg.maxX &&
         y != "NaN" && y >= 0 && y < pkg.maxY)
        pkg.spaceStations[i] = new coord(x, y);
      else{
        pkg.wormholes = "random";
        break;
      }
    }
  }

  //xort
  dummy = localStorage.getItem("xort");
  if(dummy){
    dummy = dummy.split(",");
    
    x = Number(dummy[0]);
    y = Number(dummy[1]);
    if(x != "NaN" && x >= 0 && x < pkg.maxX &&
       y != "NaN" && y >= 0 && y < pkg.maxY)
      pkg.xort = new coord(x, y);
  }

  //blarg
  dummy = localStorage.getItem("blarg");
  if(dummy){
    dummy = dummy.split(",");

    x = Number(dummy[0]);
    y = Number(dummy[1]);
    if(x != "NaN" && x >= 0 && x < pkg.maxX &&
       y != "NaN" && y >= 0 && y < pkg.maxY)
      pkg.blarg = new coord(x, y);
  }

  //irk
  dummy = localStorage.getItem("irk");
  if(dummy){
    dummy = dummy.split(",");

    x = Number(dummy[0]);
    y = Number(dummy[1]);
    if(x != "NaN" && x >= 0 && x < pkg.maxX &&
       y != "NaN" && y >= 0 && y < pkg.maxY)
      pkg.irk = new coord(x, y);
  }

  //aether
  dummy = localStorage.getItem("aether");
  if(dummy){
    dummy = dummy.split(",");

    x = Number(dummy[0]);
    y = Number(dummy[1]);
    if(x != "NaN" && x >= 0 && x < pkg.maxX &&
       y != "NaN" && y >= 0 && y < pkg.maxY)
      pkg.aether = new coord(x, y);
  }

  //foo
  dummy = localStorage.getItem("foo");
  if(dummy){
    dummy = dummy.split(",");

    x = Number(dummy[0]);
    y = Number(dummy[1]);
    if(x != "NaN" && x >= 0 && x < pkg.maxX &&
       y != "NaN" && y >= 0 && y < pkg.maxY)
      pkg.foo = new coord(x, y);
  }
  
  debugAlert(pkg);
  return pkg;
}
