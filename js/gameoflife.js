var pixelSize = 10;
var numCells = 20;
var range = 1;

var canvas = document.getElementById('gameOfLife');
canvas.width = pixelSize * numCells;
canvas.height = pixelSize * numCells;

var canvasTop = canvas.offsetTop;
var canvasLeft = canvas.offsetLeft;
var context = canvas.getContext('2d');
var arr = IniciaArray();
var canDraw = false;


canvas.addEventListener('mousedown', function(event){
    canDraw = true;
    var coorX = event.pageX - canvasLeft;
    var coorY = event.pageY - canvasTop;
    addCell(Math.floor(coorX/pixelSize), Math.round(coorY/pixelSize));
                                                
}, false);
canvas.addEventListener('mouseup', function(){
    canDraw = false;
}, false);
    

canvas.addEventListener('mousemove', function(event) {
    if (canDraw) {
        var coorX = event.pageX - canvasLeft;
        var coorY = event.pageY - canvasTop;

        addCell(Math.floor(coorX/pixelSize), Math.round(coorY/pixelSize));
    }
}, false);

function addCell(x, y) {
    if ( x >= 0 && y >= 0 && x < numCells && y < numCells)
    arr[x][y] = 1;
    display(arr);
}

function IniciaArray() {
    var arr = [];
    for (var i = 0; i < numCells; i++) {
        var innerArr = [];
        for ( var j = 0; j < numCells; j++) {
            innerArr.push(0);
        }
        arr.push(innerArr);
    }
    return arr;
}

function display(arr) {
    for (var x = 0; x < arr.length; x++) {
        for (var y = 0; y < arr[x].length; y++) {
            drawCell(x, y, arr[x][y]);
        }
    }
}

function drawCell(x, y, alive) {
    context.beginPath();
    context.rect(x*pixelSize, y*pixelSize, pixelSize, pixelSize);
    context.fillStyle = alive ? '#000' : '#EEE';
    context.fill();
}

function randomlyPopulate(arr) {
    for (var x = 0; x < arr.length; x++) {
        for (var y = 0; y < arr[x].length; y++) {
            if (Math.log(Math.random() * 10) < -0.1) {
            //if ((Math.random() * 10) < 5) {
                arr[x][y] = 1;
            }
        }
    }
}

function manualPopulate() {
    
    arr[1][0] = 1; 
    
    arr[2][1] = 1;
    
    arr[0][2] = 1;
    arr[1][2] = 1;
    arr[2][2] = 1;
    
    arr[10][4] = 1;
    arr[11][4] = 1;
    arr[12][4] = 1;
    
}

function vecinosVivos(arr, x, y) {
    
   var totalVivos = 0;
        
    for ( var j = (x - range); j <= (x + range); j ++) {
        for (var k = (y - range); k <= (y + range); k++) {
            
            if ( j >= 0 && k >= 0 && j < numCells && k < numCells)
                if ( !(j == x && k == y) ) {
                    totalVivos += arr[j][k];
                }
        }
    }
    return totalVivos;
    
    
   /* if (x > 0 && y > 0 && x < numCells -1 && y < numCells -1) {
        var totalAlive = 
            arr[x-1][y-1] +
            arr[ x ][y-1] +
            arr[x+1][y-1] +
            
            arr[x-1][ y ] +
            arr[x+1][ y ] +
            
            arr[x-1][y+1] +
            arr[ x ][y+1] +
            arr[x+1][y+1];
        return totalAlive;
    } else {
        return 0;
    }
    */
}

function step(arr) {
    var newArr = IniciaArray();
    for (var x = 0; x < arr.length; x++) {
        for (var y = 0; y < arr[x].length; y++) {
            var cell = arr[x][y];
            var alives = vecinosVivos(arr, x, y);
            
            if (cell == 1) {
                
                /*if (alives < 2) {
                    newArr[x][y] = 0;
                } else if (alives == 2 || alives == 3) {
                    newArr[x][y] = 1;
                } else if (alives > 3) {
                    newArr[x][y] = 0;
                }
                */
                if (alives == 2 || alives == 3) {
                    newArr[x][y] = 1;
                } else {
                    newArr[x][y] = 0;
                }               
            } else if (cell == 0 && alives == 3) {
                newArr[x][y] = 1;
            }
        }
    }
    delete arr;
    return newArr;
}

randomlyPopulate(arr);
//manualPopulate();
display(arr);

setInterval( function() {
    var newArr = step(arr);
    display(newArr);
    arr = newArr;
}, 100);