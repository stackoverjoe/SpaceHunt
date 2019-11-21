class coord{
  constructor(newX, newY){
    this.xcoord = newX;
    this.ycoord = newY;
  }
}

class localStoragePackage{
  //the values seen here are default values to be overwritten by
  //readLocalStorage() if localStorage is properly set
  constructor(){
    //integers, access like returnVal.varName
    this.maxX = 128;
    this.maxY = 128;
    this.startX = 0;
    this.startY = 0;
    this.baseEnergy = 100;
    this.baseSupplies = 200;
    this.baseCredits = 1000;
    this.canDie = 1;
    //either "random" or an array of coords, access like returnVal.varName[i].xcoord/ycoord
    this.wormholes = "random";
    this.spaceStations = "random";
    //planets, either "random" or a coord, access like returnVal.varName.xcoord/ycoord
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
`DEBUG ALERT
To turn me off, comment me out at the bottom of the file. See options.html to set and know your localStorage.

localStoragePackage
maxX\t\t${pkg.maxX}
maxY\t\t${pkg.maxY}
startX\t\t${pkg.startX}
startY\t\t${pkg.startY}
baseEnergy\t${pkg.baseEnergy}
baseSupplies\t${pkg.baseSupplies}
baseCredits\t${pkg.baseCredits}
canDie\t\t${pkg.canDie}`;

  alertMessage += "\nwormholes\t";
  if(pkg.wormholes === "random") alertMessage += "random";
  else for(i of pkg.wormholes) alertMessage += i.xcoord + "," + i.ycoord + " ";

  alertMessage += "\nspaceStations\t";
  if(pkg.spaceStations === "random") alertMessage += "random";
  else for(i of pkg.spaceStations) alertMessage += i.xcoord + "," + i.ycoord + " ";

  alertMessage += "\nxort\t\t\t";
  if(pkg.xort === "random") alertMessage += "random";
  else alertMessage += pkg.xort.xcoord + "," + pkg.xort.ycoord;
  
  alertMessage += "\nblarg\t\t";
  if(pkg.blarg === "random") alertMessage += "random";
  else alertMessage += pkg.blarg.xcoord + "," + pkg.blarg.ycoord;
  
  alertMessage += "\nirk\t\t\t";
  if(pkg.irk === "random") alertMessage += "random";
  else alertMessage += pkg.irk.xcoord + "," + pkg.irk.ycoord;
  
  alertMessage += "\naether\t\t";
  if(pkg.aether === "random") alertMessage += "random";
  else alertMessage += pkg.aether.xcoord + "," + pkg.aether.ycoord;
  
  alertMessage += "\nfoo\t\t\t";
  if(pkg.foo === "random") alertMessage += "random";
  else alertMessage += pkg.foo.xcoord + "," + pkg.foo.ycoord;

  alert(alertMessage);
}

function toNumber(name){
  var dummy = localStorage.getItem(name);
  if(!dummy) return "NaN";
  //NULL, an empty entry, will evaluate to number 0 if I convert it to a number first
  return Number(dummy);
}

function toCoordArray(name, maxX, maxY){
  var x, y, dummyLength, dummy = localStorage.getItem(name);

  if(dummy && dummy != "random"){
    dummy = dummy.split(" ");
    var dummyLength = dummy.length;

    for(var i = 0; i < dummyLength; ++i){ //for( of ) loops uses pass by value for each index :(
      dummy[i] = dummy[i].split(",", 2);

      x = Number(dummy[i][0]);
      y = Number(dummy[i][1]);
      if(x != "NaN" && x >= 0 && x < maxX &&
         y != "NaN" && y >= 0 && y < maxY)
        dummy[i] = new coord(x, y);
      else{
        dummy = 0;
        break;
      }
    }
  }
  return dummy;
}

function toCoord(name, maxX, maxY){
  var dummy = localStorage.getItem(name);
  if(dummy){
    dummy = dummy.split(",", 2);
    
    x = Number(dummy[0]);
    y = Number(dummy[1]);
    if(x != "NaN" && x >= 0 && x < maxX &&
       y != "NaN" && y >= 0 && y < maxY)
      dummy = new coord(x, y);
  }
  return dummy;
}

//returns the results packaged in a class of the above, changing any non-default values
function readLocalStorage(){
  var pkg = new localStoragePackage();
  //no pass by reference mean a lot of code duplication :/

  //integer
  dummy = toNumber("maxX");                                                 //maxX
  if(dummy != "NaN" && dummy > 0) pkg.maxX = dummy;

  dummy = toNumber("maxY");                                                 //maxY
  if(dummy != "NaN" && dummy > 0) pkg.maxY = dummy;

  dummy = toNumber("startX");                                               //startX
  if(dummy != "NaN" && dummy > 0 && dummy < pkg.maxX) pkg.startX = dummy;
  else pkg.startX = 0;

  dummy = toNumber("startY");                                               //startY
  if(dummy != "NaN" && dummy > 0 && dummy < pkg.maxY) pkg.startY = dummy;
  else pkg.startY = 0;

  dummy = toNumber("baseEnergy");                                           //baseEnergy
  if(dummy != "NaN") pkg.baseEnergy = dummy;

  dummy = toNumber("baseSupplies");                                         //baseSupplies
  if(dummy != "NaN") pkg.baseSupplies = dummy;
  
  dummy = toNumber("baseCredits");                                          //baseCredits
  if(dummy != "NaN") pkg.baseCredits = dummy;

  dummy = toNumber("canDie");                                               //canDie
  if(dummy === 0 || dummy === 1) pkg.canDie = dummy;


  //coord[]
  const maxX = pkg.maxX;
  const maxY = pkg.maxY;
  dummy = toCoordArray("wormholes", maxX, maxY);                            //wormholes
  if(dummy) pkg.wormholes = dummy;
  dummy = toCoordArray("spaceStations", maxX, maxY);                        //spaceStations
  if(dummy) pkg.spaceStations = dummy;
  
  //coord
  dummy = toCoord("xort", maxX, maxY);                                      //xort
  if(dummy) pkg.xort = dummy;
  dummy = toCoord("blarg", maxX, maxY);                                     //blarg
  if(dummy) pkg.blarg = dummy;
  dummy = toCoord("irk", maxX, maxY);                                       //irk
  if(dummy) pkg.irk = dummy;
  dummy = toCoord("aether", maxX, maxY);                                    //aether
  if(dummy) pkg.aether = dummy;
  dummy = toCoord("foo", maxX, maxY);                                       //foo
  if(dummy) pkg.foo = dummy;
  
  debugAlert(pkg);
  return pkg;
}
