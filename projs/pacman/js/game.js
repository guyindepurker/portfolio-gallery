'use strict'
const WALL = '#'
const FOOD = '.'
const EMPTY = ' ';
const POWER_FOOD = '🥩';
const CHEERY = '🍒';
var gBoard;
var gCherryInterval;
var gGame = {
    score: 0,
    foodCount:60,
    isOn: false
}
function init() {
    console.log('hello')
    gGame.foodCount = 60;
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    gGame.score = 0;
    updateScore(0)
    gCherryInterval = setInterval(createCherry,15000);
    gGame.isOn = true
    
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
        }
    }
    board[1][1] = POWER_FOOD;
    board[1][8] = POWER_FOOD;
    board[8][1] = POWER_FOOD;
    board[8][8] = POWER_FOOD;
    return board;
}



function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
    console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval);
    var elBtn = document.querySelector('.modal');
    elBtn.style.display = 'block';
    document.querySelector('.restart-game').style.display = 'block';
}

function restart(elBtn){
    clearInterval(gIntervalGhosts);
    init();   
    elBtn.style.display = 'none';
    document.querySelector('.modal').style.display = 'none';
}

function victory(){
    gameOver();
     document.querySelector('.victory').style.display = 'block';
}

// function createCherry(board){
//     var randomPlace = randomCells(board);
//     // randomPlace = CHEERY;
//     renderCell(randomPlace, CHEERY); 
// }

// function randomCells(board) {
//     var emptyCellRandom = [];
//     for (var i = 0; i < board.length; i++) {
//       for (var j = 0; j < board[0].length; j++) {
//         var currCell = board[i][j];
//         if (currCell === FOOD ) {
//           emptyCellRandom.push({ i, j });
//         }
//     }
//     var randomCell = emptyCellRandom[getRandomInt(0, emptyCellRandom.length)];
//     console.log('this is the empty:',randomCell);
//     }
//   }


  
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }