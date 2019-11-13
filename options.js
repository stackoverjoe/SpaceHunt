var localStorage = window.localStorage;
var form = document.forms[0];

function init(){
  if(typeof(Storage) == "undefined")
    return alert("Your browser may not support local storage!"
      + "This page will be unable to save anything you enter!");
  else if(!localStorage.getItem(element[0]){ //it must be empty! set defaults
    localStorage.clear();
    localStorage.setItem(element.name, element.value);
    localStorage.setItem(maxX, "128");
    localStorage.setItem(maxY, "128");

    localStorage.setItem(startX, "63");
    localStorage.setItem(startY, "63");

    localStorage.setItem(baseEnergy, "100");
    localStorage.setItem(baseSupplies, "100");
    localStorage.setItem(baseCredits, "100");
    localStorage.setItem(wormhole, "fixed");
    localStorage.setItem(canDie, "true");
    return;
  }

  for(element of form)
    element.value = localStorage.getItem(element.name);
}

function validChange(element){
  if(element.value === "" || 
     element.type === "number" &&
     Number(element.value) === "NaN")
    return invalidChange(element);
  element.style.color = 'black';
  localStorage.setItem(element.name, element.value);
  element.placeholder = element.value;
}

function invalidChange(element){
  element.style.color = 'red';
}

function save(){
  var maxX = form.maxX;
  var maxY = form.maxY;

  var startX = form.startX;
  var startY = form.startY;

  var baseEnergy = form.baseEnergy;
  var baseSupplies = form.baseSupplies;
  var baseCredits = form.baseCredits;
  var wormhole = form.wormhole;
  var canDie = form.canDie;

  if(Number(maxX.value) < 0) invalidChange(maxX);
  else validChange(maxX);
  if(Number(maxY.value) < 0) invalidChange(maxY);
  else validChange(maxY);

  if(Number(startX.value) < 0 ||
     Number(startX.value) > Number(localStorage.getItem("maxX") - 1))
    invalidChange(startX);
  else validChange(startX);
  if(Number(startY.value) < 0 ||
     Number(startY.value) > Number(localStorage.getItem("maxY") - 1))
    invalidChange(startY);
  else validChange(startY);

  validChange(baseEnergy);
  validChange(baseSupplies);
  validChange(baseCredits);
  validChange(canDie);

  alert('I ran!');
}
