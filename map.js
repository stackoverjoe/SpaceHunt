class tile {
  constructor() {
    this.image = null;
    this.energyLoss = 1;
  }
}
/*
document.onkeydown = function(e) {
  console.log(e);
};
function generateMap() {
  let mapArray = new Array(25);
  for (var i = 0; i < mapArray.length; ++i) {
    mapArray[i] = new Array(25);
  }
  for (let i = 0; i < mapArray.length; ++i) {
    document.getElementById("mainMap").innerHTML += `<div id=${i}></div>`;
    for (let j = 0; j < mapArray.length; ++j) {
      console.log(mapArray.length);
      document.getElementById(
        "mainMap"
      ).innerHTML += `<span class='gameCell' id=${i},${j}></span>`;
      mapArray[i][j] = new tile();
    }
  }
}
*/
function renderMap(X, Y) {
  var outer = document.querySelector("#mainMap");

  let mapContainer = document.createElement("table");

  outer.appendChild(mapContainer);
  mapContainer.className = "gameCell";
  for (var row = 0; row < X; ++row) {
    var mapRow = document.createElement("tr");
    mapRow.className = "map-row";
    mapRow.setAttribute("class", "gameCell");
    for (var col = 0; col < Y; ++col) {
      var mapCell = document.createElement("td"),
        mapObj = document.createElement("div");
      mapCell.className = "map-cell";
      mapCell.setAttribute("id", col + "," + row);
      mapObj.className = "gameCell";
      mapCell.appendChild(mapObj);
      mapRow.appendChild(mapCell);
    }
    mapContainer.appendChild(mapRow);
  }
}
