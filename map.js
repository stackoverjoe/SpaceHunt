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
      mapCell.className = "gameCell"; //mapCell for fun game
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
  ycoord: 0,
  orientation: 1 //1right, 2left, 3up, 4 down
};

var counter = 0;

document.onkeydown = function(e) {
  var update = 1;
  var oldx = player.xcoord;
  var oldy = player.ycoord;
  if (e.keyCode === 37) {
    //left
    player.orientation = 2;
    if (player.xcoord > 0) {
      --player.xcoord;
    }
  } else if (e.keyCode === 39) {
    //right
    player.orientation = 1;
    if (player.xcoord < coords[0] - 1) ++player.xcoord;
  } else if (e.keyCode === 38) {
    //up
    e.preventDefault;
    player.orientation = 3;
    if (player.ycoord > 0) {
      --player.ycoord;
    }
  } else if (e.keyCode === 40) {
    //down
    e.preventDefault;

    player.orientation = 4;
    if (player.ycoord < coords[1] - 1) {
      ++player.ycoord;
    }
  } else if (e.keyCode === 32) {
    let zone = player.xcoord;
    let yz = player.ycoord;
    let laser;
    if (player.orientation === 1) {
      zone = player.xcoord + 1;
      yz = player.ycoord;
      laser = setInterval(() => {
        if (zone < coords[0] - 1) {
          document.getElementById(
            `${zone + 1}-${yz}`
          ).innerHTML = `<div><img style='height:100%; transform: rotate(90deg)' src='/assets/PNG/beams22.png'/></div>`;
          document.getElementById(
            `${zone}-${yz}`
          ).innerHTML = `<div class = "mapCell"></div>`;
          ++zone;
        }
      }, 100);
    } else if (player.orientation === 2) {
      zone = player.xcoord - 1;
      yz = player.ycoord;
      laser = setInterval(() => {
        if (zone > 0) {
          document.getElementById(
            `${zone - 1}-${yz}`
          ).innerHTML = `<div><img style='height:100%; transform: rotate(-90deg)' src='/assets/PNG/beams22.png'/></div>`;
          document.getElementById(
            `${zone}-${yz}`
          ).innerHTML = `<div class = "mapCell"></div>`;
          --zone;
        }
      }, 100);
    } else if (player.orientation === 3) {
      zone = player.xcoord;
      yz = player.ycoord - 1;
      laser = setInterval(() => {
        if (yz > 0) {
          document.getElementById(
            `${zone}-${yz - 1}`
          ).innerHTML = `<div style='text-align:center'><img style='height:100%; transform: rotate(0deg)' src='/assets/PNG/beams22.png'/></div>`;
          document.getElementById(
            `${zone}-${yz}`
          ).innerHTML = `<div class = "mapCell"></div>`;
          --yz;
        }
      }, 100);
    }
    if (player.orientation === 4) {
      zone = player.xcoord;
      yz = player.ycoord + 1;
      laser = setInterval(() => {
        if (yz < coords[1] - 1) {
          document.getElementById(
            `${zone}-${yz + 1}`
          ).innerHTML = `<div style='text-align:center'><img style='height:100%; transform: rotate(180deg)' src='/assets/PNG/beams22.png'/></div>`;
          document.getElementById(
            `${zone}-${yz}`
          ).innerHTML = `<div class = "mapCell"></div>`;
          ++yz;
        }
      }, 100);
    }
    if (zone >= coords[0] && player.orientation === 1) {
      clearInterval(laser);
    }
    if (zone <= 0 && player.orientation === 2) {
      clearInterval(laser);
    }
    if (yz >= coords[1] && player.orientation === 3) {
      clearInterval(laser);
    }
    if (yz < 0 && player.orientation === 4) {
      clearInterval(laser);
    }
    return false;
  } else {
    update = 0;
  }
  if (update === 1) {
    document.getElementById(
      `${oldx}-${oldy}`
    ).innerHTML = `<div class='mapCell'></div>`;
  }
  if (e.keyCode === 37) {
    document.getElementById(
      `${player.xcoord}-${player.ycoord}`
    ).innerHTML = `<div id='theMotherShip' style='text-align: center; color: white; transform: rotate(-90deg);'><img style='height: 100%' src='/assets/Titan.png'/></div>`;
  } else if (e.keyCode === 39) {
    document.getElementById(
      `${player.xcoord}-${player.ycoord}`
    ).innerHTML = `<div id='theMotherShip' style='text-align: center; color: white; transform: rotate(90deg);'><img style='height: 100%' src='/assets/Titan.png'/></div>`;
  } else if (e.keyCode === 38) {
    document.getElementById(
      `${player.xcoord}-${player.ycoord}`
    ).innerHTML = `<div id='theMotherShip' style='text-align: center; color: white; transform: rotate(0deg);'><img style='height: 100%' src='/assets/Titan.png'/></div>`;
  } else if (e.keyCode === 40) {
    document.getElementById(
      `${player.xcoord}-${player.ycoord}`
    ).innerHTML = `<div id='theMotherShip' style='text-align: center; color: white; transform: rotate(180deg);'><img style='height: 100%' src='/assets/Titan.png'/></div>`;
  }
  //$("#theMotherShip").scrollintoview();
  if (update === 1) {
    document
      .getElementById("theMotherShip")
      .scrollIntoView({ behaviour: "smooth", block: "center" });
  }
  let oldHealth = parseInt(document.getElementById("energy").value);
  document.getElementById("energy").value = --oldHealth;
  if (oldHealth <= 0) {
    $("#myModal").modal("show");
  }
  //window.location.hash = "#theMotherShip";
};
