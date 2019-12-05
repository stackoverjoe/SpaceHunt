/* would be placed in index.html
 * sets a variable in localStorage to tell readLocalStorage to read from save instead of set values, or vice-versa*/

function loadGame(){
  var localStorage = window.localStorage;

  const save = localStorage.getItem("save");
  if(!save || save.valid === "0")
    return alert("No save to load, or save data in invalid.");
  
  localStorage.setItem("loadSave", "1");
}
