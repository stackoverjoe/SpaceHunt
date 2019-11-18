function make2D(columns, rows)
{
    var arr = new Array(columns)

    for(var i = 0; i < arr.length; ++i)
    {
        arr[i] = new Array(rows);
    }

    return arr;
}

//function Artifact(name, imageNumber, energyChange, suppliesChange)
function Artifact(name, imageNumber)
{
    this.name = name
    this.imageNumber = imageNumber
    //this. energyChange = energyChange
    //this.suppliesChange  = suppliesChange
}

function randomGenerate(columns, rows)
{
    var arr = make2D(columns, rows)



}

/*
function makeAsteroids()
{
    // 9/10 asteroids damage ship and energy consumed *=5 until repaired.  1/10 destroy ship & game over

    var asteroid = new Artifact("Asteroid", 1)
}

function makePentium(arr, col, row)
{
    // pentium system of 7 planets.  1 contains the recipe for Koca Kola
    var winner = Math.floor(Math.random() * 10) + 1;

    for(var i = 1; i <= 7; ++i)
    {
        arr[col][row] = new Artifact(("Pentium " + i), 2)
        if(i = winner)
            arr[col][row].hasRecipe = 1;
        else arr[col][row].hasRecipe = 0;
        col += 2;
        row += 2;
    }

}
*/