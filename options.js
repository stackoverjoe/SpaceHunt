var localStorage = window.localStorage;
var form = document.forms.options;

function init(){
  if(typeof(Storage) == "undefined")
    return alert("Your browser may not support local storage!"
      + "This page will be unable to save anything you enter!");
}

function debugAlert(){
  alert(`This is what is in localStorage.
maxX\t\t${localStorage.maxX}
maxY\t\t${localStorage.maxY}

startX\t\t${localStorage.startX}
startY\t\t${localStorage.startY}

baseEnergy\t${localStorage.baseEnergy}
baseSupplies\t${localStorage.baseSupplies}
baseCredits\t${localStorage.baseCredits}

badMaxSpeed\t${localStorage.badMaxSpeed}
numBadMaxs\t${localStorage.numBadMaxs}

canDie\t\t${localStorage.canDie}

wormholes\t${localStorage.wormholes}
spaceStations\t${localStorage.spaceStations}

pentium\t\t${localStorage.pentium}
celeron\t\t${localStorage.celeron}
rhyzen\t\t${localStorage.rhyzen}
xeon\t\t${localStorage.xeon}`);
}

//=============================max_=================================
function validNumChange(element){
  if(element.value === "" || Number(element.value) === "NaN")
    return invalidChange(element);
  localStorage.setItem(element.name, element.value);
  element.style.color = 'black';
}
function invalidChange(element){
  element.style.color = 'red';
}

function maxXCheck(){
  var maxX = form.maxX;
  if(Number(maxX.value) < 0) invalidChange(maxX);
  else validNumChange(maxX);
}
function maxYCheck(){
  var maxY = form.maxY;
  if(Number(maxY.value) < 0) invalidChange(maxY);
  else validNumChange(maxY);
}

//============================start_================================
function startXCheck(){
  var startX = form.startX;
  if(Number(startX.value) < 0 ||
     Number(startX.value) > Number(localStorage.getItem("maxX") - 1))
    invalidChange(startX);
  else validNumChange(startX);
}
function startYCheck(){
  var startY = form.startY;
  if(Number(startY.value) < 0 ||
     Number(startY.value) > Number(localStorage.getItem("maxY") - 1))
    invalidChange(startY);
  else validNumChange(startY);
}

//============================base*=================================
function baseEnergyCheck(){
  validNumChange(form.baseEnergy);
}
function baseSuppliesCheck(){
  validNumChange(form.baseSupplies);
}
function baseCreditsCheck(){
  validNumChange(form.baseCredits);
}


//=============================badMax===============================
function badMaxCheck(){
  badMaxSpeedCheck();
  numBadMaxsCheck();
}
function badMaxSpeedCheck(){
  var badMaxSpeed = form.badMaxSpeed;
  if(Number(badMaxSpeed.value) < 0)
    invalidChange(badMaxSpeed);
  else validNumChange(badMaxSpeed);
}
function numBadMaxsCheck(){
  var numBadMaxs = form.numBadMaxs;
  if(Number(numBadMaxs.value) < 0)
    invalidChange(numBadMaxs);
  else validNumChange(numBadMaxs);
}

//=================specific format _,_ _,_ _,_...===================
function isNotCustomArray(val){
  if(val.match(/\D/g) != ",") //it has any non-digit character but a single ,
    return true;
  val = val.split(",");
  if(Number(val[0]) >= Number(localStorage.getItem("maxX")) ||
     Number(val[1]) >= Number(localStorage.getItem("maxY")))
    return true;
  return false;
}

function validSpecialSyntaxChange(name, input){
  const customArrays = input.value.split(" ");
  const customArraysLength = customArrays.length;
  for(var i = 0; i < customArraysLength; ++i)
    if(isNotCustomArray(customArrays[i])) return invalidChange(input);
  localStorage.setItem(name, input.value);
  input.style.color = 'black';
}

function wormholesCheck(){
  if(document.getElementById("wormhole-random").checked)
    return localStorage.setItem("wormholes", "random");
  if(document.getElementById("wormhole-fixed").checked)
    return validSpecialSyntaxChange("wormholes",
                                    document.getElementById("wormhole-location"));
}
function spaceStationsCheck(){
  if(document.getElementById("station-random").checked)
    return localStorage.setItem("spaceStations", "random");
  if(document.getElementById("station-fixed").checked)
    return validSpecialSyntaxChange("spaceStations",
                                    document.getElementById("station-location"));
}

//=============================canDie===============================
function canDieCheck(){
  if(document.getElementById("canDie-off").checked)
    return localStorage.setItem("canDie", "0");
  if(document.getElementById("canDie-on").checked)
    return localStorage.setItem("canDie", "1");
}

//============================planets===============================
function validArrayChange(name, input){
  if(isNotCustomArray(input.value)) 
    return invalidChange(input);
  localStorage.setItem(name, input.value);
  input.style.color = 'black';
}

function planetCheck(){
  if(document.getElementById("planets-random").checked){
    localStorage.setItem("celeron", "random");
    localStorage.setItem("rhyzen",  "random");
    localStorage.setItem("xeon",    "random");
    return localStorage.setItem("pentium", "random");
  }
  celeronCheck();
  rhyzenCheck();
  xeonCheck();
  pentiumCheck();
}
function celeronCheck(){
  validArrayChange("celeron", document.getElementById("Celeron"));
}
function rhyzenCheck(){
  validArrayChange("rhyzen", document.getElementById("Rhyzen"));
}
function xeonCheck(){
  validArrayChange("xeon", document.getElementById("Xeon"));
}
function pentiumCheck(){
  var pentium = document.getElementById("Pentium");
  const customArrays = pentium.value.split(" ");
  if(customArrays.length != 7) return invalidChange(pentium);

  for(var i = 0; i < 7; ++i)
    if(isNotCustomArray(customArrays[i])) return invalidChange(pentium);
  localStorage.setItem("pentium", pentium.value);
  pentium.style.color = 'black';
}

//=====================it all comes together!========================
function save(){
  maxXCheck();
  maxYCheck();

  startXCheck();
  startYCheck();

  baseEnergyCheck();
  baseSuppliesCheck();
  baseCreditsCheck();

  wormholesCheck();
  spaceStationsCheck();
  badMaxCheck();

  canDieCheck();

  planetCheck();

  debugAlert();
}
