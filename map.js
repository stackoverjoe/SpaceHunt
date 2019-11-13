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

let coords = [0, 0];
function updateLocation() {}
function renderMap(X, Y) {
  coords[0] = X;
  coords[1] = Y;
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
      mapCell.className = "gameCell";
      mapCell.setAttribute("id", col + "-" + row);
      mapObj.className = "gameCell";
      mapObj.setAttribute("id", row + "--" + col);
      mapCell.appendChild(mapObj);
      mapRow.appendChild(mapCell);
    }
    mapContainer.appendChild(mapRow);
  }

  document.getElementById(
    "0-0"
  ).innerHTML = `<div style='text-align: center; color: white'><img style='height: 100%' src='/assets/Titan.png'/></div>`;
}
var player = {
  xcoord: 0,
  ycoord: 0
};

document.onkeydown = function(e) {
  var oldx = player.xcoord;
  var oldy = player.ycoord;
  if (e.keyCode === 37) {
    //left
    if (player.xcoord > 0) {
      --player.xcoord;
    }
  }
  if (e.keyCode === 39) {
    //down
    if (player.xcoord < coords[0] - 1) ++player.xcoord;
  }
  if (e.keyCode === 38) {
    //up
    if (player.ycoord > 0) {
      --player.ycoord;
    }
  }
  if (e.keyCode === 40) {
    //down
    if (player.ycoord < coords[1] - 1) {
      ++player.ycoord;
    }
  }

  document.getElementById(
    `${oldx}-${oldy}`
  ).innerHTML = `<div class='mapCell'></div>`;
  document.getElementById(
    `${player.xcoord}-${player.ycoord}`
  ).innerHTML = `<div style='text-align: center; color: white'><img style='height: 100%' src='/assets/Titan.png'/></div>`;
};
