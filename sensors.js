function sensors()
{
    document.getElementById("deploy").innerHTML = "Turn sensors off";

    var aroundMe = new Array(12);
    aroundMe[0] = [player.xcoord+1, player.ycoord]
    aroundMe[1] = [player.xcoord+2, player.ycoord]
    aroundMe[2] = [player.xcoord+1, player.ycoord+1]
    aroundMe[3] = [player.xcoord+1, player.ycoord-1]
    aroundMe[4] = [player.xcoord, player.ycoord+1]
    aroundMe[5] = [player.xcoord, player.ycoord+2]
    aroundMe[6] = [player.xcoord, player.ycoord-1]
    aroundMe[7] = [player.xcoord, player.ycoord-2]
    aroundMe[8] = [player.xcoord-1, player.ycoord]
    aroundMe[9] = [player.xcoord-2, player.ycoord]
    aroundMe[10] = [player.xcoord-1, player.ycoord+1]
    aroundMe[3] = [player.xcoord-1, player.ycoord-1]
    
}