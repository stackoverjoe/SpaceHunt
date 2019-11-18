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
var ticker = 0;
var counter = 0;
var mapObjs = new Map();
var planets = [
  "/assets/PNG/16.png",
  "/assets/PNG/17.png",
  "/assets/PNG/18.png",
  "/assets/PNG/19.png",
  "/assets/PNG/20.png",
  "/assets/PNG/planet1.png",
  "/assets/PNG/planet2.png",
  "/assets/PNG/planet3.png",
  "/assets/PNG/planet4.png",
  "/assets/PNG/planet5.png",
  "/assets/PNG/planet6.png",
  "/assets/PNG/planet7.png",
  "/assets/PNG/planet10.png",
  "/assets/PNG/planet11.png",
  "/assets/PNG/planet12.png",
  "/assets/PNG/planet13.png",
  "/assets/PNG/planet14.png",
  "/assets/PNG/planet15.png",
  "/assets/PNG/planet16.png",
  "/assets/PNG/planet17.png",
  "/assets/PNG/planet18_0.png",
  "/assets/PNG/planet19.png",
  "/assets/PNG/planet20.png"
];
var astroids = [
  "/assets/medium/a10001.png",
  "/assets/medium/a10014.png",
  "/assets/large/a10004.png",
  "/assets/large/a30011.png",
  "/assets/large/c40001.png",
  "/assets/large/b30008.png",
  "/assets/large/c40013.png"
];
var starBase = [
  "/assets/PNG/ssb.png",
  "/assets/PNG/ssb2.png",
  "/assets/SS1.png"
];
function moon() {
  let i = 1;
  //for(let i = 1; i < 40; ++i){
  setInterval(function() {
    if (i < 10) {
      document.getElementById(
        "1-1"
      ).innerHTML = `<div style="background-color:transparent"><img style="height: 100%; width: 100%"src='/assets/moon/0${i}.png'/></div>`;
    } else {
      document.getElementById(
        "1-1"
      ).innerHTML = `<div style="background-color:transparent"><img style="height: 100%; width: 100%"src='/assets/moon/${i}.png'/></div>`;
    }
    ++i;
    if (i > 48) {
      i = 1;
    }
  }, 50);
  //}
}
//global coords for reference later in program
let coords = [0, 0];
function renderMap(X, Y) {
  mapObjs.clear();
  //moon();
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
  document.getElementById("supplies").value = 100;
  int regularMode = 0;
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
  for (let i = 0; i < 150; ++i) {
    let x = Math.floor(Math.random() * coords[0]) + 1;
    let y = Math.floor(Math.random() * coords[1]) + 1;
    if (!mapObjs.has(`${x}-${y}`)) {
      let img = Math.floor(Math.random() * planets.length);
      mapObjs.set(
        `${x}-${y}`,
        (mapObject = {
          type: "planet",
          coords: [x, y]
        })
      );
      //let tile = document.getElementById(`${x}-${y}`).innerHTML;
      if (document.getElementById(`${x}-${y}`) != null) {
        document.getElementById(
          `${x}-${y}`
        ).innerHTML = `<div style="pointer-events: none"><img style="height: 100%; width: 100%" src='${planets[img]}'/></div>`;
      }
      $(`#${x}-${y}`).tooltip({
        title: `<h4 style="object-fit: contain; padding-bottom: 20px"><img style="object-fit:contain;"src='${planets[img]}' alt='Smiley'> <div>You have found a planet.</div><h4>`,
        placement: "auto",
        html: true,
        container: `#${x}-${y}`,
        trigger: "manual"
      });
    }
  }
  //wormHoles
  for (let i = 0; i < 30; ++i) {
    let x = Math.floor(Math.random() * coords[0]) + 1;
    let y = Math.floor(Math.random() * coords[1]) + 1;
    if (!mapObjs.has(`${x}-${y}`)) {
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
  //starbases
  for (let i = 0; i < 20; ++i) {
    let x = Math.floor(Math.random() * coords[0]) + 1;
    let y = Math.floor(Math.random() * coords[1]) + 1;
    let img = Math.floor(Math.random() * starBase.length);
    if (!mapObjs.has(`${x}-${y}`)) {
      mapObjs.set(
        `${x}-${y}`,
        (mapObject = {
          type: "starBase",
          resources: Math.floor(Math.random() * 100),
          visited: false,
          coords: [x, y]
        })
      );
      var images = new Array();
      for (let i = 0; i < starBase.length; ++i) {
        images[i] = new Image();
        images[i].src = starBase[i];
      }
      //let tile = document.getElementById(`${x}-${y}`).innerHTML;
      if (document.getElementById(`${x}-${y}`) != null) {
        document.getElementById(
          `${x}-${y}`
        ).innerHTML = `<div><img style="height: 100%; width: 100%" src='${images[img].src}'/></div>`;
      }
    }
  }
  //asteroids
  for (let i = 0; i < 350; ++i) {
    let x = Math.floor(Math.random() * coords[0]) + 1;
    let y = Math.floor(Math.random() * coords[1]) + 1;
    let img = Math.floor(Math.random() * astroids.length);
    if (!mapObjs.has(`${x}-${y}`)) {
      mapObjs.set(
        `${x}-${y}`,
        (mapObject = {
          type: "asteroid",
          damage: Math.floor(Math.random() * 10) + 1
        })
      );
      //let tile = document.getElementById(`${x}-${y}`).innerHTML;
      if (document.getElementById(`${x}-${y}`) != null) {
        document.getElementById(
          `${x}-${y}`
        ).innerHTML = `<div><img style="height: 100%; width: 100%" src='${astroids[img]}'/></div>`;
      }
    }
  }
  //energy packs
  for (let i = 0; i < 50; ++i) {
    let x = Math.floor(Math.random() * coords[0]) + 1;
    let y = Math.floor(Math.random() * coords[1]) + 1;
    if (!mapObjs.has(`${x}-${y}`)) {
      mapObjs.set(
        `${x}-${y}`,
        (mapObject = {
          type: "energyPack",
          coords: [x, y]
        })
      );
      //let tile = document.getElementById(`${x}-${y}`).innerHTML;
      if (document.getElementById(`${x}-${y}`) != null) {
        document.getElementById(
          `${x}-${y}`
        ).innerHTML = `<div><img style="height: 100%; width: 100%" src='/assets/PNG/7.png'/></div>`;
        $(`#${x}-${y}`).tooltip({
          title: `<h4 style="object-fit: contain; padding-bottom: 20px"><img style="object-fit:contain;"src='/assets/PNG/7.png' alt='Smiley'> <div>You have gained 10 energy!.</div><h4>`,
          placement: "auto",
          html: true,
          container: `#${x}-${y}`,
          trigger: "manual"
        });
      }
    }
  }
}

//observe key presses
document.onkeydown = function(e) {
  let current = null;
  $(".tooltips").tooltip("hide");
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
    if (current.type !== "energyPack") {
      player.xcoord = oldx;
      player.ycoord = oldy;
    }
    handleEvent(current);
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
  let oldSupplies = parseInt(document.getElementById("supplies").value);
  if (update === 1) {
    document.getElementById("energy").value = --oldHealth;
    document.getElementById("supplies").value = --oldSupplies;
  }
  if (oldHealth <= 0 && regularMode === 1) {
    $("#myModal").modal("show");
  } else if (oldHealth < 30 && oldHealth >= 27) {
    $("#theMotherShip").tooltip({
      title: `<h4 style="padding-bottom: 20px"><img src='assets/PNG/8.png' alt='Smiley'> <div>You are low on energy!! ${oldHealth} remaining!</div><h4>`,
      placement: "auto",
      html: true
    });
    $("#theMotherShip").tooltip("show");
  } else if (oldSupplies === 0) {
    $("#supplyModal").modal("show");
  } else if (oldSupplies === 1) {
    $("#theMotherShip").tooltip({
      title: `<h4 style="padding-bottom: 20px"><img src='assets/PNG/8.png' alt='Smiley'> <div>You are low on Supplies!! ${oldSupplies} remaining!</div><h4>`,
      placement: "auto",
      html: true
    });
    $("#theMotherShip").tooltip("show");
  } else if (current && current.type === "energyPack") {
    $("#theMotherShip").tooltip({
      title: `<h4 style="padding-bottom: 20px"><img src='assets/PNG/7.png' alt='Smiley'> <div>You have gained 10 energy!</div><h4>`,
      placement: "auto",
      trigger: "manual",
      html: true
    });
    $("#theMotherShip").tooltip("show");
  } else if (current && current.type === "asteroid") {
    console.log(current.type);
    $("#theMotherShip").tooltip({
      title: `<h4 style="padding-bottom: 20px"><img src='assets/PNG/3.png' alt='Smiley'> <div>You have hit an astroid and lost ${current.damage} energy!</div><h4>`,
      placement: "auto",
      trigger: "manual",
      html: true
    });
    $("#theMotherShip").tooltip("show");
  } else if (current && current.type === "starBase") {
    if (current.visited === true) {
      $("#theMotherShip").tooltip({
        title: `<h4 style="padding-bottom: 20px"><img src='assets/PNG/9.png' alt='Smiley'> <div>You have already tapped this space station's resources.</div><h4>`,
        placement: "auto",
        trigger: "manual",
        html: true
      });
      $("#theMotherShip").tooltip("show");
    }
  }
};

function handleEvent(mapEvent) {
  if (mapEvent.type === "planet") {
    //otherstuff
    $(`#${mapEvent.coords[0]}-${mapEvent.coords[1]}`).tooltip("show");
    setTimeout(() => {
      $(`#${mapEvent.coords[0]}-${mapEvent.coords[1]}`).tooltip("hide");
    }, 1500);
    //$("#planetModal").modal("show");
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
  } else if (mapEvent.type === "starBase") {
      let olds = parseInt(document.getElementById("supplies").value);
      document.getElementById("supplies").value = olds + mapEvent.resources;
    if (!mapObjs.get(`${mapEvent.coords[0]}-${mapEvent.coords[1]}`).visited) {
      document.getElementById("starBaseModal").innerHTML = `
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
            <h4 class="modal-title" style="font-family: spaceAge;">
              You have found a star base.
            </h4>
          </div>
          <div class="modal-body">
            <p>This star base has ${mapEvent.resources} supplies for you.\nGood luck.</p>
          </div>
          <div class="modal-footer">
            <span style="justify-content: left">
              <button
                type="button"
                class="btn btn-success"
                data-dismiss="modal"
              >
                Thank you.
              </button>
            </span>
          </div>
        </div>
      </div>`;
      $("#starBaseModal").modal("show");
      
      mapObjs.set(
        `${mapEvent.coords[0]}-${mapEvent.coords[1]}`,
        (mapObject = {
          type: "starBase",
          resources: 0,
          visited: true,
          coords: [mapEvent.coords[0], mapEvent.coords[1]]
        })
      );
    } else {
      return false;
    }
  } else if (mapEvent.type === "asteroid") {
    let oldh = parseInt(document.getElementById("energy").value);
    document.getElementById("energy").value = oldh - mapEvent.damage;
  } else if (mapEvent.type === "energyPack") {
    //remove health pack from map
    mapObjs.delete(`${mapEvent.coords[0]}-${mapEvent.coords[1]}`);
    let oldh = parseInt(document.getElementById("energy").value);
    document.getElementById("energy").value = oldh + 10;
  } 
}

function restart() {
  renderMap(100, 100);
}
