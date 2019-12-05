/* would be placed in map.js and be used as an onclick event in a button at the bottom
 * creates an object in localStorage with information from the current session of the game
 * so far you can only have one save at a time, because they'd overwrite eachother
 * TODO: remember what's destroyed somehow. It's pretty easy on my side,
   but it may not be on on the other side, so it can wait to be put in*/

function saveGame(){
  var localStorage = window.localStorage;

  class saveData{
    this.valid = 1; //can be set invalid by one mistake, intentionally

    this.maxX          = X;
    this.maxY          = Y;
                    
    this.startX        = player.xCoord;
    this.startY        = player.yCoord;
                    
    this.energy        = current.energy;
    this.supplies      = current.supplies;
    this.credits       = Number(document.getElementById("credits").value);
                      
    this.badMaxSpeed   = localS.badMaxSpeed;
    //this.numBadMaxs = ;

    this.canDie        = localS.canDie;

    this.wormholes     = localS.wormholes;
    this.spaceStations = localS.wormholes;

    this.pentium       = localS.pentium;
    this.celeron       = localS.celeron;
    this.rhyzen        = localS.rhyzen;
    this.xeon          = localS.xeon;
  }

  var save = new saveData();

  function invalidSaveData(){
    alert("Could not save, there is contaminated or non-sencical save data.");
    save.valid = 0;
    return 1;
  }
  function invalidNum(input){
    if(typeof input != "Number") return invalidSaveData();
    return 0;
  }
  function invalidCoord(input){
    if(typeof input != "String") return invalidSaveData();

    const coord = input.split(",");
    const x = Number(coord[0]);
    if(x == "NaN" || x < 0 || x > save.maxX) return invalidSaveData();
    const y = Number(coord[1]);
    if(y == "NaN" || y < 0 || y > save.maxY) return invalidSaveData();

    return 0;
  }
  function invalidCoordArray(input){
    if(typeof input != "String") return invalidSaveData();

    const coords = input.split(" ");
    for(coord in coords) if(!validCoord(coord)) return invalidSaveData();

    return 0;
  }

  if(invalidNum(save.maxX) || save.maxX < 0) return;
  if(invalidNum(save.maxY) || save.maxY < 0) return;

  if(invalidNum(save.startX) || save.startX < 0 || save.startX > save.maxX) return;
  if(invalidNum(save.startY) || save.startY < 0 || save.startY > save.maxY) return;

  if(invalidNum(save.energy)) return;
  if(invalidNum(save.supplies)) return;
  if(invalidNum(save.credits)) return;

  if(invalidCoordArray(save.wormholes)) return;
  if(invalidCoordArray(save.spaceStations)) return;

  if(invalidCoordArray(save.pentium)) return;
  if(invalidCoord(save.celeron)) return;
  if(invalidCoord(save.rhyzen)) return;
  if(invalidCoord(save.xeon)) return;

  localStorage.setItem("save", save);
  alert("Save successful!");
}
