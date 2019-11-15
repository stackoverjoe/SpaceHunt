/*
class tile {
  constructor() {
    this.image = null;
    this.energyLoss = 1;
  }
}*/
//global player object that hold player location and orientation for animations.
var player = {
  xcoord: 0,
  ycoord: 0,
  orientation: 1 //1right, 2left, 3up, 4 down
};
var counter = 0;
var mapObjs = new Map();
var planets = [
  "/assets/PNG/16.png",
  "/assets/PNG/17.png",
  "/assets/PNG/18.png",
  "/assets/PNG/19.png",
  "/assets/PNG/20.png"
];
//global coords for reference later in program
let coords = [0, 0];
function renderMap(X, Y) {
  mapObjs.clear();
  var snd = new Audio("/assets/spaceSong.mp3");
  snd.play();
  document.getElementById("mainMap").focus();
  coords[0] = X;
  coords[1] = Y;
  var outer = document.querySelector("#mainMap");
  var inner = document.getElementById("theBigTable");
  if (inner) {
    inner.remove();
  }
  let mapContainer = document.createElement("table");
  mapContainer.setAttribute("id", "theBigTable");
  outer.appendChild(mapContainer);
  mapContainer.className = "gameCell";
  //create presentational table for game movement
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
  //call function to populate map with celestial objects
  //set player coords back to start incase reset function called.
  player.xcoord = 0;
  player.ycoord = 0;
  //snap to start of game
  //scroll ship back into view
  document.getElementById("0-0").scrollIntoView();
  //make sure title is visible
  window.location = "spaceMap.html#top";

  document.getElementById("energy").value = 1000;
  populateMap();
}

var mapObject = {
  type: null,
  resources: 0,
  div: null
};

//var checker = new Map();
function populateMap() {
  //populate planets
  for (let i = 0; i < 100; ++i) {
    let x = Math.floor(Math.random() * coords[0]) + 1;
    let y = Math.floor(Math.random() * coords[1]) + 1;
    if (!mapObjs.has(`${x}-${y}`)) {
      let img = Math.floor(Math.random() * planets.length);
      mapObjs.set(
        `${x}-${y}`,
        (mapObject = {
          type: "planet"
        })
      );
      //let tile = document.getElementById(`${x}-${y}`).innerHTML;
      if (document.getElementById(`${x}-${y}`) != null) {
        document.getElementById(
          `${x}-${y}`
        ).innerHTML = `<div><img style="height: 100%; width: 100%" src='${planets[img]}'/></div>`;
      }
    }
  }
  //wormHoles
  for (let i = 0; i < 30; ++i) {
    let x = Math.floor(Math.random() * coords[0]) + 1;
    let y = Math.floor(Math.random() * coords[1]) + 1;
    if (!mapObjs.has(`${x}-${y}`)) {
      let img = Math.floor(Math.random() * planets.length);
      mapObjs.set(
        `${x}-${y}`,
        (mapObject = {
          type: "wormHole"
        })
      );
      //let tile = document.getElementById(`${x}-${y}`).innerHTML;
      if (document.getElementById(`${x}-${y}`) != null) {
        document.getElementById(
          `${x}-${y}`
        ).innerHTML = `<div><img style="height: 100%; width: 100%" src='/assets/PNG/10.png'/></div>`;
      }
    }
  }
}

//observe key presses
document.onkeydown = function(e) {
  var update = 1;
  var oldx = player.xcoord;
  var oldy = player.ycoord;
  //figure out what movement key was pressed
  if (e.keyCode === 37 || e.keyCode === 65) {
    //left
    e.preventDefault();
    player.orientation = 2;
    if (player.xcoord > 0) {
      --player.xcoord;
    }
  } else if (e.keyCode === 39 || e.keyCode === 68) {
    //right
    e.preventDefault();
    player.orientation = 1;
    if (player.xcoord < coords[0] - 1) ++player.xcoord;
  } else if (e.keyCode === 38 || e.keyCode === 87) {
    //up
    e.preventDefault();
    player.orientation = 3;
    if (player.ycoord > 0) {
      --player.ycoord;
    }
  } else if (e.keyCode === 40 || e.keyCode === 83) {
    //down
    e.preventDefault();

    player.orientation = 4;
    if (player.ycoord < coords[1] - 1) {
      ++player.ycoord;
    }
  } else if (e.keyCode === 32) {
    var laserSnd = new Audio("/assets/1laz.mp3");
    laserSnd.play();
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
      }, 50);
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
      }, 50);
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
      }, 50);
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
      }, 50);
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
  if (mapObjs.has(`${player.xcoord}-${player.ycoord}`)) {
    //alert("test");
    current = mapObjs.get(`${player.xcoord}-${player.ycoord}`);

    player.xcoord = oldx;
    player.ycoord = oldy;
    handleEvent(current);
    console.log(current);
  }
  if (update === 1) {
    document.getElementById(
      `${oldx}-${oldy}`
    ).innerHTML = `<div class='gameCell' style="border: 1px solid blue; background: blue; opacity: 0.3"></div>`;
  }
  if (e.keyCode === 37 || e.keyCode === 65) {
    document.getElementById(
      `${player.xcoord}-${player.ycoord}`
    ).innerHTML = `<div id='theMotherShip' style='text-align: center; color: white; transform: rotate(-90deg);'><img style='height: 100%' src='/assets/Titan.png'/></div>`;
  } else if (e.keyCode === 39 || e.keyCode === 68) {
    document.getElementById(
      `${player.xcoord}-${player.ycoord}`
    ).innerHTML = `<div id='theMotherShip' style='text-align: center; color: white; transform: rotate(90deg);'><img style='height: 100%' src='/assets/Titan.png'/></div>`;
  } else if (e.keyCode === 38 || e.keyCode === 87) {
    document.getElementById(
      `${player.xcoord}-${player.ycoord}`
    ).innerHTML = `<div id='theMotherShip' style='text-align: center; color: white; transform: rotate(0deg);'><img style='height: 100%' src='/assets/Titan.png'/></div>`;
  } else if (e.keyCode === 40 || e.keyCode === 83) {
    document.getElementById(
      `${player.xcoord}-${player.ycoord}`
    ).innerHTML = `<div id='theMotherShip' style='text-align: center;  transform: rotate(180deg);'><img style='height: 100%' src='/assets/Titan.png'/></div>`;
  }
  //$("#theMotherShip").scrollintoview();
  if (update === 1) {
    document
      .getElementById("theMotherShip")
      .scrollIntoView({ behaviour: "smooth", block: "center" });
  }
  let oldHealth = parseInt(document.getElementById("energy").value);
  if (update === 1) {
    document.getElementById("energy").value = --oldHealth;
  }
  if (oldHealth <= 0) {
    $("#myModal").modal("show");
  } else if (oldHealth < 30 && oldHealth >= 27) {
    $("#theMotherShip").tooltip({
      title: `<h4 style="padding-bottom: 20px"><img src='assets/PNG/8.png' alt='Smiley'> <div>You are low on energy!! ${oldHealth} remaining!</div><h4>`,
      placement: "auto",
      html: true
    });
    $("#theMotherShip").tooltip("show");
  }

  //window.location.hash = "#mainMap";
  //document.getElementById("#mainMap").scrollIntoView();
};

function handleEvent(mapEvent) {
  if (mapEvent.type === "planet") {
    $("#planetModal").modal("show");
  } else if (mapEvent.type === "wormHole") {
    let x = Math.floor(Math.random() * coords[0]) + 1;
    let y = Math.floor(Math.random() * coords[1]) + 1;
    document.getElementById(
      `${player.xcoord}-${player.ycoord}`
    ).innerHTML = `<div class='mapCell'></div>`;
    player.xcoord = x;
    player.ycoord = y;
    document.getElementById(
      `${x}-${y}`
    ).innerHTML = `<div id='theMotherShip' style='text-align: center;  transform: rotate(180deg);'><img style='height: 100%' src='/assets/Titan.png'/></div>`;
  }
}

function restart() {
  renderMap(100, 100);
}
