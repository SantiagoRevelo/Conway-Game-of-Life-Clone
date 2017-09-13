var pixelSize = 10;
var numCells = 18;
var range = 1;

var updateRatio = 1000 / 15;

var canvas = document.getElementById('gameOfLife');
canvas.width = pixelSize * numCells;
canvas.height = pixelSize * numCells;

var canvasTop = canvas.offsetTop;
var canvasLeft = canvas.offsetLeft;
var context = canvas.getContext('2d');
var arr = IniciaArray();
var canDraw = false;


canvas.addEventListener('mousedown', function (event) {
    canDraw = true;

    canvasX = event.offsetX;
    canvasY = event.offsetY;

    addCell(Math.floor(canvasX / pixelSize), Math.floor(canvasY / pixelSize));

}, false);
canvas.addEventListener('mouseup', function () {
    canDraw = false;
}, false);


canvas.addEventListener('mousemove', function (event) {
    if (canDraw) {
        canvasX = event.offsetX;
        canvasY = event.offsetY;

        addCell(Math.floor(canvasX / pixelSize), Math.floor(canvasY / pixelSize));
    }
}, false);

function addCell(row, col) {
    if (col >= 0 && row >= 0 && col < numCells && row < numCells) {
        arr[col][row] = arr[col][row] = 1;
    }
    display(arr);
}

function IniciaArray() {
    var arr = [];
    for (var i = 0; i < numCells; i++) {
        var innerArr = [];
        for (var j = 0; j < numCells; j++) {
            innerArr.push(0);
        }
        arr.push(innerArr);
    }
    return arr;
}

function display(arr) {
    for (var row = 0; row < arr.length; row++) {
        for (var col = 0; col < arr[row].length; col++) {
            drawCell(col, row, arr[row][col]);
        }
    }
}

function drawCell(x, y, alive) {
    context.beginPath();
    context.rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    context.fillStyle = alive ? '#eee' : '#222';
    context.fill();
}

function randomlyPopulate(arr, r, c, w, h) {
    for (var row = r; row < Math.min(r + h, arr.length); row++) {
        for (var col = c; col < Math.min(c + w, arr[row].length); col++) {
            if ((Math.random() * 10) + 1 < 5) {
                arr[row][col] = 1;
            }
        }
    }
}

function manualPopulate() {
    var startArray = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    var filaIni = Math.floor((arr.length - startArray.length) / 2);
    var filaFin = Math.floor((arr[0].length - startArray[0].length) / 2);

    arr = combineSquaredArrays(arr, startArray, filaIni, filaFin);
}

function combineSquaredArrays(base, other, startF, startC) {
    var combined = base.slice();

    for (var f = 0; f < other.length; f++) {
        for (var c = 0; c < other[0].length; c++) {
            combined[startF + f][startC + c] = other[f][c];
        }
    }
    return combined;
}

function vecinosVivos(arr, x, y) {
    var totalVivos = 0;

    for (var j = (x - range); j <= (x + range); j++) {
        for (var k = (y - range); k <= (y + range); k++) {
            var f = 0;
            var c = 0;
            if (j < 0)
                f = numCells + j;
            else if (j > numCells - 1)
                f = j - numCells;
            else f = j;

            if (k < 0)
                c = numCells + k;
            else if (k > numCells - 1)
                c = k - numCells;
            else
                c = k;

            if (!(f == x && c == y)) {
                totalVivos += arr[f][c];
            }
        }
    }
    return totalVivos;
}

function step(arr) {
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

manualPopulate();
display(arr);

var firstRun = true;
var newArr;

setTimeout(function () {
    firstRun = false;

    setInterval(function () {
        if (firstRun) {
            firstRun = false;
        } else {

            if (!canDraw) {
                newArr = step(arr);
                display(newArr);
                arr = newArr;
            }
        }
    }, updateRatio);

}, 5000);

setInterval(function () {
    if (!canDraw && !firstRun) {
        randomlyPopulate(arr,
            Math.floor(Math.random() * numCells),
            Math.floor(Math.random() * numCells),
            Math.floor(Math.random() * numCells / 2) + 2,
            Math.floor(Math.random() * numCells / 2) + 2
        );
    }
}, 5000);
