/*
class tile {
  constructor() {
    this.image = null;
    this.energyLoss = 1;
  }
}*/
class coord {
  constructor(newX, newY) {
    this.xcoord = newX;
    this.ycoord = newY;
  }
}
class localStoragePackage {
  //the values seen here are default values to be overwritten by
  //readLocalStorage() if localStorage is properly set
  constructor() {
    //integers, access like returnVal.varName
    this.maxX = 128;
    this.maxY = 128;
    this.startX = 0;
    this.startY = 0;
    this.baseEnergy = 100;
    this.baseSupplies = 200;
    this.baseCredits = 1000;
    this.canDie = 1;
    this.badMaxSpeed = 2;
    this.numBadMaxs = 1;
    //either "random" or an array of coords, access like returnVal.varName[i].xcoord/ycoord
    this.wormholes = "random";
    this.spaceStations = "random";
    this.pentium = "random";
    //planets, either "random" or a coord, access like returnVal.varName.xcoord/ycoord
    this.celeron = "random";
    this.rhyzen = "random";
    this.xeon = "random";
  }
}

//==================sh1 people, you don't need to read past this line :)==================

function debugAlert(pkg) {
  var alertMessage = `DEBUG ALERT
To turn me off, comment me out at the bottom of the file. See options.html to set and know your localStorage.

localStoragePackage
maxX\t\t${pkg.maxX}
maxY\t\t${pkg.maxY}

startX\t\t${pkg.startX}
startY\t\t${pkg.startY}

badMaxSpeed\t${pkg.badMaxSpeed}
numBadMaxs\t${pkg.numBadMaxs}

baseEnergy\t${pkg.baseEnergy}
baseSupplies\t${pkg.baseSupplies}
baseCredits\t${pkg.baseCredits}

canDie\t\t${pkg.canDie}`;

  alertMessage += "\n\nwormholes\t";
  if (pkg.wormholes === "random") alertMessage += "random";
  else for (i of pkg.wormholes) alertMessage += i.xcoord + "," + i.ycoord + " ";

  alertMessage += "\nspaceStations\t";
  if (pkg.spaceStations === "random") alertMessage += "random";
  else
    for (i of pkg.spaceStations)
      alertMessage += i.xcoord + "," + i.ycoord + " ";

  alertMessage += "\n\npentium\t\t";
  if (pkg.spaceStations === "random") alertMessage += "random";
  else for (i of pkg.pentium) alertMessage += i.xcoord + "," + i.ycoord + " ";

  alertMessage += "\nceleron\t\t";
  if (pkg.xort === "random") alertMessage += "random";
  else alertMessage += pkg.xort.xcoord + "," + pkg.xort.ycoord;

  alertMessage += "\nrhyzen\t\t";
  if (pkg.blarg === "random") alertMessage += "random";
  else alertMessage += pkg.blarg.xcoord + "," + pkg.blarg.ycoord;

  alertMessage += "\nxeon\t\t";
  if (pkg.irk === "random") alertMessage += "random";
  else alertMessage += pkg.irk.xcoord + "," + pkg.irk.ycoord;

  alert(alertMessage);
}

function toNumber(name) {
  var dummy = localStorage.getItem(name);
  if (!dummy) return "NaN";
  //NULL, an empty entry, will evaluate to number 0 if I convert it to a number first
  return Number(dummy);
}

function toCoordArray(name, maxX, maxY) {
  var x,
    y,
    dummyLength,
    dummy = localStorage.getItem(name);

  if (dummy && dummy != "random") {
    dummy = dummy.split(" ");
    var dummyLength = dummy.length;

    for (var i = 0; i < dummyLength; ++i) {
      //for( of ) loops uses pass by value for each index :(
      dummy[i] = dummy[i].split(",", 2);

      x = Number(dummy[i][0]);
      y = Number(dummy[i][1]);
      if (x != "NaN" && x >= 0 && x < maxX && y != "NaN" && y >= 0 && y < maxY)
        dummy[i] = new coord(x, y);
      else {
        dummy = 0;
        break;
      }
    }
  }
  return dummy;
}

function toCoord(name, maxX, maxY) {
  var dummy = localStorage.getItem(name);
  if (dummy) {
    dummy = dummy.split(",", 2);

    x = Number(dummy[0]);
    y = Number(dummy[1]);
    if (x != "NaN" && x >= 0 && x < maxX && y != "NaN" && y >= 0 && y < maxY)
      dummy = new coord(x, y);
  }
  return dummy;
}

//returns the results packaged in a class of the above, changing any non-default values
function readLocalStorage() {
  var pkg = new localStoragePackage();
  //no pass by reference mean a lot of code duplication :/

  //integer
  dummy = toNumber("maxX"); //maxX
  if (dummy != "NaN" && dummy > 0) pkg.maxX = dummy;
  dummy = toNumber("maxY"); //maxY
  if (dummy != "NaN" && dummy > 0) pkg.maxY = dummy;

  dummy = toNumber("startX"); //startX
  if (dummy != "NaN" && dummy > 0 && dummy < pkg.maxX) pkg.startX = dummy;
  else pkg.startX = 0;
  dummy = toNumber("startY"); //startY
  if (dummy != "NaN" && dummy > 0 && dummy < pkg.maxY) pkg.startY = dummy;
  else pkg.startY = 0;

  dummy = toNumber("baseEnergy"); //baseEnergy
  if (dummy != "NaN") pkg.baseEnergy = dummy;
  dummy = toNumber("baseSupplies"); //baseSupplies
  if (dummy != "NaN") pkg.baseSupplies = dummy;
  dummy = toNumber("baseCredits"); //baseCredits
  if (dummy != "NaN") pkg.baseCredits = dummy;
  dummy = toNumber("baseCredits"); //baseCredits
  if (dummy != "NaN") pkg.baseCredits = dummy;

  dummy = toNumber("badMaxSpeed"); //badMaxSpeed
  if (dummy != "NaN" && dummy >= 0) pkg.badMaxSpeed = dummy;
  dummy = toNumber("numBadMaxs"); //numBadMaxs
  if (dummy != "NaN" && dummy >= 0) pkg.numBadMaxs = dummy;

  dummy = toNumber("canDie"); //canDie
  if (dummy === 0 || dummy === 1) pkg.canDie = dummy;

  //coord[]
  const maxX = pkg.maxX;
  const maxY = pkg.maxY;
  dummy = toCoordArray("wormholes", maxX, maxY); //wormholes
  if (dummy) pkg.wormholes = dummy;
  dummy = toCoordArray("spaceStations", maxX, maxY); //spaceStations
  if (dummy) pkg.spaceStations = dummy;
  dummy = toCoordArray("pentium", maxX, maxY); //pentium
  if (dummy && dummy.length == 7) pkg.pentium = dummy;

  //coord
  dummy = toCoord("celeron", maxX, maxY); //xort
  if (dummy) pkg.xort = dummy;
  dummy = toCoord("rhyzen", maxX, maxY); //blarg
  if (dummy) pkg.blarg = dummy;
  dummy = toCoord("xeon", maxX, maxY); //irk
  if (dummy) pkg.irk = dummy;

  // debugAlert(pkg);
  return pkg;
}
//global player object that hold player location and orientation for animations.
var player = {
  xcoord: 0,
  ycoord: 0,
  orientation: 1 //1right, 2left, 3up, 4 down
};
var localS = null;
//badMax object that has the information regarding where badMax is on the screen
var badMax = {
  xcoord: null,
  ycoord: null,
  orientation: 1,
  distanceFromPlayer: null
};
//victory screen variables
var globalRandom = Math.floor(Math.random() * 100);
var recipeFound = 0;

//global audio object for the death sound effect
let deathSound = new Audio("/assets/endGame.mp3");
var max = 100;
var min = 1;
var start = 0;
var ticker = 0;
var counter = 0;
var regularMode = 0;
var dead = false;

//create a Map object that stores all of the celestial objects in the game
var mapObjs = new Map();

//this variable is used as a switch to alternate which sound plays when you discover planets
var planetSndChoice = 0;
var pirateSnd = new Audio("/assets/bruhh.mp3");
//All arrays of assets allow for random generation of celestial artifacts to allow
//more unique map experiences
//var victory = ["/assets/VictoryScreen.png"];
var discover = ["/assets/disocvery.mp3", "/assets/discovery2.mp3"];
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
  "/assets/PNG/ssb2.png",
  "/assets/SS1.png",
  "/assets/tribase-u1-d0.png"
];

var freighters = [
  "/assets/freighter1.png",
  "/assets/freighter2.png",
  "/assets/freighter3.png"
];

//Function to replicate a gif of a rotating moon, currently clips too much and not in use
function moon() {
  let i = 1;
  //for(let i = 1; i < 48; ++i){
  let images = new Array();
  for (let i = 1; i <= 48; ++i) {
    images[i] = new Image();
    if (i < 10) {
      images[i].src = `assets/moon/0${i}.png`;
    } else {
      images[i].src = `assets/moon/${i}.png`;
    }
  }
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
//snd is global background music
let snd = null;
//global jet audio object for spacecraft movement noise
let jet = null;

//renderMap generates the html table for the map
localS = readLocalStorage();
function renderMap(X, Y) {
  localS = readLocalStorage();
  X = localS.maxX;
  Y = localS.maxY;
  //console.log(localS);
  //dead variable used to control sound output and represents current life status
  dead = false;
  pirateSnd.pause();
  pirateSnd.currentTime = 0;
  //clear the entire map every time the game starts so we can generate a new one
  mapObjs.clear();
  //background music is played from here
  if (snd) {
    snd.pause();
    snd.currentTime = 0;
    snd.play();
  } else {
    snd = new Audio("/assets/spaceSong.mp3");
    snd.volume = 0.3;
    snd.play();
  }

  //focus the mainMap on the screen
  document.getElementById("mainMap").focus();
  //Global coords that keep track of the max X and Y value of the table
  coords[0] = X;
  coords[1] = Y;
  var outer = document.querySelector("#mainMap");
  var inner = document.getElementById("theBigTable");
  //If in inner already exists we destroy it so that we can rebuild. This allows us to reset the game easier
  if (inner) {
    inner.remove();
  }

  //create a table element for the game board
  let mapContainer = document.createElement("table");
  mapContainer.setAttribute("id", "theBigTable");
  //append to the main map
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

  //set the player ship at the 0,0 coords of the map
  //console.log(localS);
  document.getElementById(
    `${localS.startX}-${localS.startY}`
  ).innerHTML = `<div style='text-align: center; color: white'><img style='height: 100%' src='/assets/Titan.png'/></div>`;
  //set player coords back to start incase reset function called.
  player.xcoord = `${localS.startX}`;
  player.ycoord = `${localS.startY}`;
  badMax.xcoord = Math.floor(Math.random() * 127) + 1;
  badMax.ycoord = Math.floor(Math.random() * 127) + 1;
  //snap to start of game
  //scroll ship back into view
  document.getElementById(`${localS.startX}-${localS.startY}`).scrollIntoView();
  //make sure title is visible
  window.location = "spaceMap.html#top";

  //set all starting values for game
  document.getElementById("energy").value = localS.baseEnergy;
  document.getElementById("supplies").value = localS.baseSupplies;
  document.getElementById("credits").value = localS.baseCredits;
  document.getElementById(
    "coords"
  ).value = `(${localS.startX},${localS.startY})`;
  start = 0;
  document.getElementById("history").value = "";
  //populate the map with celestial objects
  populateMap();
  //spawn bad max
  badMaxFunc();
}

let zone1 = null;
let yz1 = null;
//badMax interval variable
let ship = null;
//this function summons bad max
function badMaxFunc() {
  //set interval function allows max to move every x milliseconds, by reducing the second argument to this function
  //you will make him faster
  pirateSnd.play();
  pirateSnd.volume = 0;
  ship = setInterval(function() {
    //calculate the hypotenuse to determine how far bad max is from player
    badMax.distance = Math.floor(
      Math.sqrt(
        Math.abs(
          (player.xcoord - badMax.xcoord) * (player.xcoord - badMax.xcoord)
        ) +
          Math.abs(
            (player.ycoord - badMax.ycoord) * (player.ycoord - badMax.ycoord)
          )
      )
    );
    let sndVal = 0;
    if (badMax.distance > 70) {
      pirateSnd.volume = 0;
    } else {
      if (pirateSnd.pause) {
        pirateSnd.play();
      }
      //smoothout the volume increase of badmax the cloer he gets
      if (badMax.distance > 60 && badMax.distance <= 70) {
        sndVal = Math.abs(badMax.distance - 100) * 0.001;
      } else if (badMax.distance > 50 && badMax.distance <= 60) {
        sndVal = Math.abs(badMax.distance - 100) * 0.002;
      } else if (badMax.distance > 40 && badMax.distance <= 50) {
        sndVal = Math.abs(badMax.distance - 100) * 0.003;
      } else if (badMax.distance > 30 && badMax.distance <= 40) {
        sndVal = Math.abs(badMax.distance - 100) * 0.004;
      } else if (badMax.distance > 20 && badMax.distance <= 30) {
        sndVal = Math.abs(badMax.distance - 100) * 0.005;
      } else if (badMax.distance > 10 && badMax.distance <= 20) {
        sndVal = Math.abs(badMax.distance - 100) * 0.006;
      } else {
        sndVal = Math.abs(badMax.distance - 100) * 0.008;
      }
      //console.log(badMax.distance);
      //console.log(sndVal);
      if (sndVal > 1) {
        sndVal = 1;
      }
      if (badMax.distance < 8) {
        sndVal = 1;
      }
      pirateSnd.volume = sndVal;
    }
    //bad max destroys every thing he runs over
    if (mapObjs.has(`${badMax.xcoord}-${badMax.ycoord}`)) {
      mapObjs.delete(`${badMax.xcoord}-${badMax.ycoord}`);
    }
    let oldx = badMax.xcoord;
    let oldy = badMax.ycoord;
    //check where player is and make one step toward them
    if (badMax.xcoord < player.xcoord) {
      badMax.orientation = 1;
      ++badMax.xcoord;
    } else if (badMax.xcoord > player.xcoord) {
      badMax.orientation = 2;
      --badMax.xcoord;
    } else if (badMax.ycoord < player.ycoord) {
      badMax.orientation = 4;
      ++badMax.ycoord;
    } else if (badMax.ycoord > player.ycoord) {
      badMax.orientation = 3;
      --badMax.ycoord;
    }

    //If coords match up, bad max found the player and killed them
    if (badMax.xcoord === player.xcoord && badMax.ycoord === player.ycoord) {
      if (snd) {
        snd.pause();
        snd.currentTime = 0;
      }
      pirateSnd.pause();
      pirateSnd.currentTime = 0;
      deathSound.play();
      //stop the interval from running
      clearInterval(ship);
      //show the death screen
      if (!pirateSnd.pause) {
        pirateSnd.pause();
        pirateSnd.currentTime = 0;
      }
      $("#death").modal("show");
      return;
    }

    //redraw bad max to the screen with the correct rotation at the updated cooridantes on the table
    //first document.get is to leave a trail behind bad max showing where he has gone
    document.getElementById(
      `${oldx}-${oldy}`
    ).innerHTML = `<div id="badMax" class='gameCell' style="border: 1px solid red; background: red; opacity: 0.3"></div>`;
    if (badMax.orientation === 1) {
      document.getElementById(
        `${badMax.xcoord}-${badMax.ycoord}`
      ).innerHTML = `<div id="badMax" style="text-align: center"><img style='height:100%; transform: rotate(90deg)' src='/assets/9B.png'/></div>`;
    }
    if (badMax.orientation === 2) {
      document.getElementById(
        `${badMax.xcoord}-${badMax.ycoord}`
      ).innerHTML = `<div id="badMax" style="text-align: center;"><img style='height:100%; transform: rotate(-90deg)' src='/assets/9B.png'/></div>`;
    }
    if (badMax.orientation === 3) {
      document.getElementById(
        `${badMax.xcoord}-${badMax.ycoord}`
      ).innerHTML = `<div id="badMax" style="text-align: center;"><img style='height:100%; transform: rotate(0deg)' src='/assets/9B.png'/></div>`;
    }
    if (badMax.orientation === 4) {
      document.getElementById(
        `${badMax.xcoord}-${badMax.ycoord}`
      ).innerHTML = `<div id="badMax" style="text-align: center;"><img style='height:100%; transform: rotate(180deg)' src='/assets/9B.png'/></div>`;
    }
  }, 1000 / localS.badMaxSpeed); //this number dictates how fast bad max is
}

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
  for (let i = 0; i < 50; ++i) {
    let x = Math.floor(Math.random() * coords[0]) + 1;
    let y = Math.floor(Math.random() * coords[1]) + 1;
    let img = Math.floor(Math.random() * starBase.length);
    if (!mapObjs.has(`${x}-${y}`)) {
      mapObjs.set(
        `${x}-${y}`,
        (mapObject = {
          type: "starBase",
          resources: Math.floor(Math.random() * 400) + 50,
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
  //Abandoned Freighters
  for (let i = 0; i < 60; ++i) {
    let x = Math.floor(Math.random() * coords[0]) + 1;
    let y = Math.floor(Math.random() * coords[1]) + 1;
    let img = Math.floor(Math.random() * freighters.length);
    if (!mapObjs.has(`${x}-${y}`)) {
      mapObjs.set(
        `${x}-${y}`,
        (mapObject = {
          type: "freighter",
          supplies: Math.floor(Math.random() * 400) + 50,
          energy: Math.floor(Math.random() * 400) + 50,
          visited: false,
          coords: [x, y]
        })
      );
      //let tile = document.getElementById(`${x}-${y}`).innerHTML;
      if (document.getElementById(`${x}-${y}`) != null) {
        document.getElementById(
          `${x}-${y}`
        ).innerHTML = `<div><img style="height: 100%; width: 100%" src='${freighters[img]}'/></div>`;
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
          coords: [x, y],
          energyV: Math.floor(Math.random() * 300) + 50
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
  let historyMes = null;
  $(".tooltips").tooltip("hide");
  var update = 1;
  var oldx = player.xcoord;
  var oldy = player.ycoord;
  let warp = {
    type: "wormHole"
  };
  //figure out what movement key was pressed
  if (e.keyCode === 37 || e.keyCode === 65) {
    //left
    e.preventDefault();
    player.orientation = 2;
    if (player.xcoord > 0) {
      --player.xcoord;
    } else {
      //current.type = "wormHole";
      handleEvent(warp);
      // return;
    }
  } else if (e.keyCode === 39 || e.keyCode === 68) {
    //right
    e.preventDefault();
    player.orientation = 1;
    if (player.xcoord < coords[0] - 1) {
      ++player.xcoord;
    } else {
      handleEvent(warp);
      //current.type = "wormHole";
    }
  } else if (e.keyCode === 38 || e.keyCode === 87) {
    //up
    e.preventDefault();
    player.orientation = 3;
    if (player.ycoord > 0) {
      --player.ycoord;
    } else {
      handleEvent(warp);
      //current.type = "wormHole";
    }
  } else if (e.keyCode === 40 || e.keyCode === 83) {
    //down
    e.preventDefault();

    player.orientation = 4;
    if (player.ycoord < coords[1] - 1) {
      ++player.ycoord;
    } else {
      handleEvent(warp);
      //current.type = "wormHole";
    }
  } else if (e.keyCode === 32) {
    e.preventDefault();
    var laserSnd = new Audio("/assets/1laz.mp3");
    laserSnd.play();
    let zone = player.xcoord;
    let yz = player.ycoord;
    let laser;
    if (player.orientation === 1) {
      zone = player.xcoord + 1;
      yz = player.ycoord;
      laser = setInterval(() => {
        //check if laser has met an object on the map
        if (mapObjs.has(`${zone}-${yz}`)) {
          mapObjs.delete(`${zone}-${yz}`);
          //if it has  remove the item from the map
          //and clear the interval
          clearInterval(laser);
          //remove the laser image from the cell
          document.getElementById(
            `${zone}-${yz}`
          ).innerHTML = `<div class = "mapCell"></div>`;
          return;
        }
        if (zone < coords[0] - 1) {
          document.getElementById(
            `${zone + 1}-${yz}`
          ).innerHTML = `<div><img style='height:100%; transform: rotate(90deg)' src='/assets/PNG/beams22.png'/></div>`;
          document.getElementById(
            `${zone}-${yz}`
          ).innerHTML = `<div class = "mapCell"></div>`;
          ++zone;
        } else {
          clearInterval(laser);
        }
      }, 50);
    } else if (player.orientation === 2) {
      zone = player.xcoord - 1;
      yz = player.ycoord;
      laser = setInterval(() => {
        if (mapObjs.has(`${zone}-${yz}`)) {
          mapObjs.delete(`${zone}-${yz}`);
          clearInterval(laser);
          //remove the laser image from the cell
          document.getElementById(
            `${zone}-${yz}`
          ).innerHTML = `<div class = "mapCell"></div>`;
          return;
        }
        if (zone > 0) {
          document.getElementById(
            `${zone - 1}-${yz}`
          ).innerHTML = `<div><img style='height:100%; transform: rotate(-90deg)' src='/assets/PNG/beams22.png'/></div>`;
          document.getElementById(
            `${zone}-${yz}`
          ).innerHTML = `<div class = "mapCell"></div>`;
          --zone;
        } else {
          document.getElementById(
            `${zone}-${yz}`
          ).innerHTML = `<div class = "mapCell"></div>`;
          clearInterval(laser);
        }
      }, 50);
    } else if (player.orientation === 3) {
      zone = player.xcoord;
      yz = player.ycoord - 1;
      laser = setInterval(() => {
        if (mapObjs.has(`${zone}-${yz}`)) {
          mapObjs.delete(`${zone}-${yz}`);
          clearInterval(laser);
          //remove the laser image from the cell
          document.getElementById(
            `${zone}-${yz}`
          ).innerHTML = `<div class = "mapCell"></div>`;
          return;
        }
        if (yz > 0) {
          document.getElementById(
            `${zone}-${yz - 1}`
          ).innerHTML = `<div style='text-align:center'><img style='height:100%; transform: rotate(0deg)' src='/assets/PNG/beams22.png'/></div>`;
          document.getElementById(
            `${zone}-${yz}`
          ).innerHTML = `<div class = "mapCell"></div>`;
          --yz;
        } else {
          document.getElementById(
            `${zone}-${yz}`
          ).innerHTML = `<div class = "mapCell"></div>`;
          clearInterval(laser);
        }
      }, 50);
    }
    if (player.orientation === 4) {
      zone = player.xcoord;
      yz = player.ycoord + 1;
      if (mapObjs.has(`${zone}-${yz}`)) {
        mapObjs.delete(`${zone}-${yz}`);
        clearInterval(laser);
        //remove the laser image from the cell
        document.getElementById(
          `${zone}-${yz}`
        ).innerHTML = `<div class = "mapCell"></div>`;
        return;
      }
      laser = setInterval(() => {
        if (mapObjs.has(`${zone}-${yz}`)) {
          mapObjs.delete(`${zone}-${yz}`);
          clearInterval(laser);
          //remove the laser image from the cell
          document.getElementById(
            `${zone}-${yz}`
          ).innerHTML = `<div class = "mapCell"></div>`;
          return;
        }
        if (yz < coords[1] - 1) {
          document.getElementById(
            `${zone}-${yz + 1}`
          ).innerHTML = `<div style='text-align:center'><img style='height:100%; transform: rotate(180deg)' src='/assets/PNG/beams22.png'/></div>`;
          document.getElementById(
            `${zone}-${yz}`
          ).innerHTML = `<div class = "mapCell"></div>`;
          ++yz;
        } else {
          document.getElementById(
            `${zone}-${yz}`
          ).innerHTML = `<div class = "mapCell"></div>`;
          clearInterval(laser);
        }
      }, 50);
    }
    let h = parseInt(document.getElementById("energy").value);
    document.getElementById("energy").value -= 100;
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
    document.getElementById("energy").value = oldHealth - 10;
    document.getElementById("supplies").value =
      oldSupplies - Math.ceil(oldSupplies * 0.02);
    document.getElementById(
      "coords"
    ).value = `(${player.xcoord},${player.ycoord})`;
  }
  if (oldHealth <= 0) {
    clearInterval(ship);
    if (snd) {
      snd.pause();
      snd.currentTime = 0;
    }
    if (jet) {
      jet.pause();
      jet.currentTime = 0;
    }
    pirateSnd.pause();
    pirateSnd.currentTime = 0;
    let snd2 = new Audio("/assets/endGame.mp3");
    if (!dead) {
      snd2.play();
    }
    dead = true;
    $("#myModal").modal("show");
  } else if (oldHealth <= 30 && oldHealth >= 27) {
    if (oldHealth === 30) {
      let snd = new Audio("/assets/alert.mp3");
      snd.volume = 0.8;
      snd.play();
    }
    $("#theMotherShip").tooltip({
      title: `<h4 style="padding-bottom: 20px"><img src='/assets/PNG/8.png' alt='Smiley'> <div>You are low on energy!! ${oldHealth} remaining!</div><h4>`,
      placement: "auto",
      html: true
    });
    $("#theMotherShip").tooltip("show");
  } else if (oldSupplies <= 0) {
    clearInterval(ship);
    pirateSnd.pause();
    pirateSnd.currentTime = 0;
    if (jet) {
      jet.pause();
      jet.currentTime = 0;
    }
    if (snd) {
      snd.pause();
      snd.currentTime = 0;
    }
    let snd2 = new Audio("/assets/endGame.mp3");
    if (!dead) {
      snd2.play();
    }
    dead = true;
    $("#supplyModal").modal("show");
  } else if (oldSupplies === 1) {
    $("#theMotherShip").tooltip({
      title: `<h4 style="padding-bottom: 20px"><img src='/assets/PNG/8.png' alt='Smiley'> <div>You are low on Supplies!! ${oldSupplies} remaining!</div><h4>`,
      placement: "auto",
      html: true
    });
    $("#theMotherShip").tooltip("show");
  } else if (current && current.type === "energyPack") {
    historyMes = "You discovered an energy pack at this location.";
    $("#theMotherShip").tooltip({
      title: `<h4 style="padding-bottom: 20px"><img src='/assets/PNG/7.png' alt='Smiley'> <div>You have gained ${current.energyV} energy!</div><h4>`,
      placement: "auto",
      trigger: "manual",
      html: true
    });
    $("#theMotherShip").tooltip("show");
  } else if (current && current.type === "asteroid") {
    //console.log(current.type);
    historyMes = "You hit an asteroid at this location.";
    $("#theMotherShip").tooltip({
      title: `<h4 style="padding-bottom: 20px"><img src='/assets/PNG/3.png' alt='Smiley'> <div>You have hit an astroid and lost ${current.damage} energy!</div><h4>`,
      placement: "auto",
      trigger: "manual",
      html: true
    });
    $("#theMotherShip").tooltip("show");
  } else if (current && current.type === "starBase") {
    if (current.visited === true) {
      historyMes = "You discovered a star base at this location.";
      $("#theMotherShip").tooltip({
        title: `<h4 style="padding-bottom: 20px"><img src='/assets/PNG/9.png' alt='Smiley'> <div>You have already tapped this space station's resources.</div><h4>`,
        placement: "auto",
        trigger: "manual",
        html: true
      });
      $("#theMotherShip").tooltip("show");
    }
  } else if (current && current.type === "freighter") {
    if (current.visited != true) {
      $("#theMotherShip").tooltip({
        title: `<h4 style="padding-bottom: 20px"><img src='/assets/PNG/8.png' alt='Smiley'> <div>You have salvaged ${current.supplies} supplies, and ${current.energy} energy!</div><h4>`,
        placement: "auto",
        html: true
      });
      $("#theMotherShip").tooltip("show");
    } else if (current.visited === true) {
      historyMes = "You discovered an abandoned freighter at this location.";
      $("#theMotherShip").tooltip({
        title: `<h4 style="padding-bottom: 20px"><img src='/assets/PNG/9.png' alt='Smiley'> <div>You have already tapped this freighter's resources.</div><h4>`,
        placement: "auto",
        trigger: "manual",
        html: true
      });
      $("#theMotherShip").tooltip("show");
    }
  } else if (current && current.type === "wormHole") {
    var warpsnd = new Audio("/assets/warp.mp3");
    warpsnd.volume = 0.7;
    warpsnd.play();
    historyMes = "You discovered a worm hole at this location.";
    $("#theMotherShip").tooltip({
      title: `<h4 style="padding-bottom: 20px"><img src='/assets/PNG/10.png' alt='Smiley'> <div>You have entered a wormhole and appeared at a random location!</div><h4>`,
      placement: "auto",
      trigger: "manual",
      html: true
    });
    $("#theMotherShip").tooltip("show");
  } else if (current && current.type === "planet") {
    //let x = Math.floor(Math.random() * coords[0]);
    didIWin(); //check to see if the planet holds the koka kola recipe
    planetSndChoice = planetSndChoice === 1 ? 0 : 1;
    var planetsnd = new Audio(discover[planetSndChoice]);
    planetsnd.volume = 0.3;
    planetsnd.play();
    historyMes = "You discovered a planet at this location.";
  }
  jet = new Audio("/assets/jets.mp3");
  jet.volume = 0.5;
  if (!dead) {
    jet.play();
  }
  $("#history").val(function(index, old) {
    if (historyMes) {
      return (
        `You visited location (${player.xcoord},${player.ycoord}). ${historyMes}\n` +
        old
      );
    } else {
      return (
        `You visited location (${player.xcoord},${player.ycoord}).\n` + old
      );
    }
  });

  /*
  if (start === 0) {
    start = 1;
    document.getElementById(
      "history"
    ).value = `You visited location (${player.xcoord},${player.ycoord})\n`;
  } else {
    document.getElementById(
      "history"
    ).value += `You visited location (${player.xcoord},${player.ycoord})\n`;
  }
  */

  //add to sensor log whenever I move
  //if(deployed == 1){fillLog();}

  //checking to see if this planet has the koka kola recipe
  if (recipeFound === 1) {
    /*$("#theMotherShip").tooltip({
      title: `<h4 style="padding-bottom: 20px"><img src='/assets/VictoryScreen.png' alt='Smiley'> <div>You have found the Koka Kola recipe and won the game!</div><h4>`,
      placement: "auto",
      trigger: "manual",
      html: true
    });*/
    //$("#theMotherShip").tooltip("show");
    clearInterval(ship);
    pirateSnd.pause();
    pirateSnd.volume = 0;
    pirateSnd.currentTime = 0;
    clearInterval(ship);

    $("#win").modal("show");
    recipeFound = 0;
    //restart();
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
    didIWin();
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
    document
      .getElementById("theMotherShip")
      .scrollIntoView({ behaviour: "smooth", block: "center" });
  } else if (mapEvent.type === "starBase") {
    var base = new Audio("/assets/sapceb.mp3");
    base.volume = 0.8;
    base.play();
    setInterval(function() {
      base.volume -= 0.1;
    }, 250);
    document.getElementById("starBaseModal").innerHTML = `
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content" style="background: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url('/assets/spaceStation1.jpg'); opacity: 0.9; height: 95%; font-family: Helvetica; font-size: 17px; font-style: normal; font-variant: normal; font-weight: 400; line-height: 19px; color: #C0C0C0; text-shadow: 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000; letter-spacing: 0.05em;">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" style="text-align: center; color: #000">
              &times;
            </button>
            <h4 class="modal-title" style="font-family: spaceAge; font-weight: 800; text-align: center">
              You have found a star base.
            </h4>
          </div>
          <div class="modal-body" style="text-align: center">
            <p style="font-weight: 800">Welcome, Traveler!</p>
          </div>
          <div class="storeWrapper" style="display: grid; grid-auto-columns: 1fr; grid-auto-flow: column; height: 30%">
            <div class="columnA" style="margin: 0 auto; text-align: center;">
              <p style="font-weight: 800;">Buy Supplies!</p>
              <button type="button" class="btn btn-success" onclick="purchaseSupplies()">Buy 500</button>
              <button type="button" class="btn btn-success" onclick="sellSupplies()">Sell 500</button>
            </div>
            <div class="columnB" style="margin: 0 auto; text-align: center;">
              <p style="font-weight: 800;">Buy Energy!</p>
              <button type="button" class="btn btn-success" onclick="purchaseEnergy()">Buy 100</button>
              <button type="button" class="btn btn-success" onclick="sellEnergy()">Sell 100</button>
            </div>
          </div>
          <div class="blackjackGame" style="text-align: center; height: 40%; margin: auto; width: 80%;">
            <p style="font-weight: 800; margin-right: 5%;">Need Credits? Place Your Bet!</p>
            <input type="number" style="color: #000;" id="bet" min="1" max="1000" value="500">
            <button type="button" id="beginGame" class="btn btn-success" onclick="play()">Play Blackjack</button><br><br>
            <button type="button" style="display: none;" id="hitMe" class="btn btn-success" onclick="deal()">Hit</button>
            <button type="button" style="display: none;" id="stay" class="btn btn-success" onclick="stay()">Stay</button>
            <p id="player" style="font-weight: 900; margin-top: 10px;"></p><br>
            <p id="outcome" style="font-weight: 900; margin-top: 10px;"></p><br>
          </div>
          <div class="modal-footer" style="text-align: center">
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
  } else if (mapEvent.type === "freighter") {
    let olds = parseInt(document.getElementById("supplies").value);
    let olde = parseInt(document.getElementById("energy").value);
    document.getElementById("supplies").value = olds + mapEvent.supplies;
    document.getElementById("energy").value = olde + mapEvent.energy;
    if (!mapObjs.get(`${mapEvent.coords[0]}-${mapEvent.coords[1]}`).visited) {
      var base = new Audio("/assets/sapceb.mp3");
      base.play();
      setInterval(function() {
        base.volume -= 0.1;
      }, 250);
      mapObjs.set(
        `${mapEvent.coords[0]}-${mapEvent.coords[1]}`,
        (mapObject = {
          type: "freighter",
          supplies: 0,
          energy: 0,
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
    let snd = new Audio("/assets/energyUp3.mp3");
    snd.volume = 0.4;
    snd.play();
    mapObjs.delete(`${mapEvent.coords[0]}-${mapEvent.coords[1]}`);
    let oldh = parseInt(document.getElementById("energy").value);
    document.getElementById("energy").value = oldh + mapEvent.energyV;
  }
}

function restart() {
  renderMap(100, 100);
}
//victory screen check for every planet visited
function didIWin() {
  let random = Math.floor(Math.random() * 100);
  //recipeFound = 1;
  if (globalRandom === random) recipeFound = 1;
}
function purchaseSupplies() {
  let oldSupplies = parseInt(document.getElementById("supplies").value);
  let oldCredits = parseInt(document.getElementById("credits").value);
  if (oldCredits >= 500) {
    document.getElementById("credits").value = oldCredits - 500;
    document.getElementById("supplies").value = oldSupplies + 500;
  }
}

function sellSupplies() {
  let oldSupplies = parseInt(document.getElementById("supplies").value);
  let oldCredits = parseInt(document.getElementById("credits").value);
  if (oldSupplies >= 500) {
    document.getElementById("credits").value = oldSupplies - 500;
    document.getElementById("supplies").value = oldCredits + 500;
  }
}

function purchaseEnergy() {
  let oldEnergy = parseInt(document.getElementById("energy").value);
  let oldCredits = parseInt(document.getElementById("credits").value);
  if (oldCredits >= 100) {
    document.getElementById("credits").value = oldCredits - 100;
    document.getElementById("energy").value = oldEnergy + 100;
  }
}

function sellEnergy() {
  let oldEnergy = parseInt(document.getElementById("energy").value);
  let oldCredits = parseInt(document.getElementById("credits").value);
  if (oldEnergy >= 100) {
    document.getElementById("energy").value = oldEnergy - 100;
    document.getElementById("credits").value = oldCredits + 100;
  }
}
