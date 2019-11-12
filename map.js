class tile {
  constructor() {
    this.image = null;
    this.energyLoss = 1;
  }
}

document.onkeydown = function(e) {
  console.log(e);
};
function generateMap() {
  let mapArray = new Array(25);
  for (var i = 0; i < mapArray.length; ++i) {
    mapArray[i] = new Array(25);
  }
  for (let i = 0; i < mapArray.length; ++i) {
    document.getElementById(
      "mainMap"
    ).innerHTML += `<div style="text-align: left">ok</div>`;
    for (let j = 0; j < mapArray.length; ++j) {
      console.log(mapArray.length);
      document.getElementById(
        "mainMap"
      ).innerHTML += `<span style="text-align: left">test</span>`;
      mapArray[i][j] = new tile();
    }
  }
  //document.getElementById("mainMap").innerHTML += `<div>Hi</div>`;
}
