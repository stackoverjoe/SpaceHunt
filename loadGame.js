/* would be placed in index.html
 * sets a variable in localStorage to tell readLocalStorage to read from save instead of set values, or vice-versa
 * TODO: readLocalStorage has not yet been updated to have this functionality yet*/

function loadGame(){
  var localStorage = window.localStorage;

  const saveData = localStorage.getItem("save");
  if(!saveData || saveData.valid === "0")
    return alert("No save to load, or save data in invalid.");
  
  localStorage.setItem("loadSave", "1");

  /* this would make it so you always load a save on starting, which users may not want
  localStorage.setItem("maxX", save.maxX);
  localStorage.setItem("maxY", save.maxY);

  localStorage.setItem("startX", save.startX);
  localStorage.setItem("startY", save,startY);

  localStorage.setItem("baseEnergy", save.energy);
  localStorage.setItem("baseSupplies", save.supplies);
  localStorage.setItem("baseCredits", save.credits);
                               
  localStorage.setItem("badMaxSpeed", save.badMaxSpeed);
  //localStorage.setItem("numBadMaxs", save.numBadMaxs);
                               
  localStorage.setItem("canDie", save.canDie);
                               
  localStorage.setItem("wormholes", save.wormholes);
  localStorage.setItem("spaceStations", save.spaceStations);
                               
  localStorage.setItem("pentium", save.pentium);
  localStorage.setItem("celeron", save.celeron);
  localStorage.setItem("rhyzen", save.rhyzen);
  localStorage.setItem("xeon", save.xeon);
  */
}
