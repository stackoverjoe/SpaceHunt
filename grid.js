function make2D(columns, rows)
{
    var arr = new Array(columns)

    for(var i = 0; i < arr.length; ++i)
    {
        arr[i] = new Array(rows);
    }

    return arr;
}

var infoArray = make2D(100, 100);

function check(x,y)
{
    
}

