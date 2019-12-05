/* would be placed in map.js and be used as an onclick event in a button at the bottom
 * creates an object in localStorage with information from the current session of the game
 * so far you can only have one save at a time, because they'd overwrite eachother
 * TODO: complete initalization of saveData class. I don't know how map.js stores everything yet*/

function saveGame(){
  var localStorage = window.localStorage;

  class saveData{
    this.valid = 1; //can be set invalid by one mistake, intentionally

    this.maxX = X;
    this.maxY = Y;

    this.startX = player.xCoord;
    this.startY = player.yCoord;

    this.energy = current.energy;
    this.supplies = current.supplies;
    this.credits = ;

    this.badMaxSpeed = ;
    //this.numBadMaxs = ;

    this.canDie = ;

    this.wormholes = ;
    this.spaceStations = ;

    this.pentium = ;
    this.celeron = ;
    this.rhyzen = ;
    this.xeon = ;
  }

  var save = new saveData();

  function invalidSaveData(){
    alert("Could not save, there is contaminated or non-sencical save data.");
    save.valid = 0;
    return 1;
  }
  function invalidNum(input){
    if(typeof input === "Number") return 0;
    return invalidSaveData();
  }
  function invalidCoord(input){
    if(typeof input === "String"){
      const coord = input.split(",");
      const x = Number(coord[0]);
      if(x == "NaN" || x < 0 || x > save.maxX) return invalidSaveData();
      const y = Number(coord[1]);
      if(y == "NaN" || y < 0 || y > save.maxY) return invalidSaveData();
    }
    else return invalidSaveData();

    return 0;
  }
  function invalidCoordArray(input){
    if(typeof input === "String"){
      const coords = input.split(" ");
      for(coord in coords) if(!validCoord(coord)) return invalidSaveData();
    }
    else return invalidSaveData();

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
