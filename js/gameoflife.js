
/* Declaración de patrones */ 

var pattern_oscillator_1 = [
    [0,0,0,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,0,0,0]
];

var pattern_oscillator_2 = [
    [0,0,0,0,0,0],
    [0,0,0,1,0,0],
    [0,1,0,0,1,0],
    [0,1,0,0,1,0],
    [0,0,1,0,0,0],
    [0,0,0,0,0,0] 
];
var pattern_oscillator_3 = [
    [0,0,0,0,0,0],
    [0,1,1,0,0,0],
    [0,1,0,0,0,0],
    [0,0,0,0,1,0],
    [0,0,0,1,1,0],
    [0,0,0,0,0,0]
];

var pattern_oscillator_4 = [
    //                9                         
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,0],
    [0,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,0],
    [0,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,0],
    [0,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],  //9
    [0,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,0],
    [0,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,0],
    [0,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,0],
    [0,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
]

var pattern_oscillator_5 =[
    //          6          
    [0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,1,1,1,0,0,0,0,],
    [0,0,0,0,0,1,0,0,0,0,0,],
    [0,0,0,0,0,1,0,0,0,0,0,],
    [0,0,0,0,1,1,1,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,1,1,1,0,0,0,0,], //9
    [0,0,0,0,1,1,1,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,1,1,1,0,0,0,0,],
    [0,0,0,0,0,1,0,0,0,0,0,],
    [0,0,0,0,0,1,0,0,0,0,0,],
    [0,0,0,0,1,1,1,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0,0,],
];

var patrones = [
    pattern_oscillator_1,
    pattern_oscillator_2,
    pattern_oscillator_3,
    pattern_oscillator_4,
    pattern_oscillator_5
];

var marginCells = 5;
var pixelSize = 10;
var numCells = 20;
var range = 1;

var canvas = document.getElementById('gameOfLife');
var sizeTablero = (pixelSize * numCells);

//Array.reduce: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce?v=b
var patternsW = (patrones.reduce((a, b) => a + b.length, 0) * pixelSize) + ((patrones.length - 1) * pixelSize * marginCells);
// Math.max.apply: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply#Using_apply_and_built-in_functions
var patternsH = (Math.max.apply(null, patrones.map(function (el) { return el.length })) ) * pixelSize;

var offsetXTablero = (((sizeTablero + patternsW) / 2) - sizeTablero) / pixelSize;
var offsetYTablero = 0;

canvas.width = Math.max(sizeTablero, patternsW);
canvas.height = sizeTablero + (marginCells * pixelSize) + patternsH;

var canvasTop = canvas.offsetTop;
var canvasLeft = canvas.offsetLeft;
var context = canvas.getContext('2d');
var arr = IniciaArray();
var canDraw = false;

canvas.addEventListener('mousedown', function(event){
    canDraw = true;
    var coorX = event.pageX - canvasLeft - (offsetXTablero * pixelSize);
    var coorY = event.pageY - canvasTop;
    addCell(Math.floor( (coorX / pixelSize) ), Math.round(coorY/pixelSize));
                                                
}, false);
canvas.addEventListener('mouseup', function(){
    canDraw = false;
}, false);

canvas.addEventListener('mousemove', function(event) {
    if (canDraw) {
        var coorX = event.pageX - canvasLeft - (offsetXTablero * pixelSize);
        var coorY = event.pageY - canvasTop;

        addCell( Math.floor( (coorX / pixelSize) ), Math.round(coorY / pixelSize) );
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

function display(arr, startX, startY, activeColor, inactiveColor) {
    for (var x = 0; x < arr.length; x++) {
        for (var y = 0; y < arr[x].length; y++) {
            drawCell(startX + x, startY + y, arr[x][y], activeColor, inactiveColor);
        }
    }
}

function drawCell(x, y, alive, activeColor, inactiveColor) {
    context.beginPath();
    context.rect(x*pixelSize, y*pixelSize, pixelSize, pixelSize);
    context.fillStyle = alive ? activeColor : inactiveColor;
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
/*
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
*/
function vecinosVivos(arr, x, y) {    
   var totalVivos = 0;
        
    for ( var j = (x - range); j <= (x + range); j ++) {
        for (var k = (y - range); k <= (y + range); k++) {            
            if ( j >= 0 && k >= 0 && j < numCells && k < numCells) {
                if ( !(j == x && k == y) ) {
                    totalVivos += arr[j][k];
                }
            }
        }
    }
    return totalVivos;
}

function paso(arr) {
    var newArr = IniciaArray();
    for (var x = 0; x < arr.length; x++) {
        for (var y = 0; y < arr[x].length; y++) {
            var cell = arr[x][y];
            var alives = vecinosVivos(arr, x, y);
            
            if (cell == 1) {
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
display(arr, offsetXTablero, offsetYTablero, '#00ccff', '#9966ff');
pintaPatrones();

function pintaPatrones() {
    var offset = 0;
    for(var i = 0; i < patrones.length; i++) {        
        display ( patrones[i] , offset, numCells + marginCells, '#80e5ff', '#9999ff');
        offset += patrones[i].length + marginCells;
    }
}

setInterval( function() {
    var newArr = paso(arr);
    display(newArr, offsetXTablero, offsetYTablero, '#00ccff', '#9966ff');
    arr = newArr;
}, 100);