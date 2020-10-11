"use strict";
const GHOST = "&#9781;";
var gDeleteGhost = [];
var gGhosts = [];
var gIntervalGhosts;

function createGhost(board) {
  var ghost = {
    location: {
      i: 3,
      j: 3,
    },
    color: getRandomColor(),
    currCellContent: FOOD,
  };
  gGhosts.push(ghost);
  board[ghost.location.i][ghost.location.j] = GHOST;
}

function createGhosts(board) {
  createGhost(board);
  createGhost(board);
  createGhost(board);
  gIntervalGhosts = setInterval(moveGhosts, 1000);
}

function moveGhosts() {
  for (var i = 0; i < gGhosts.length; i++) {
    var ghost = gGhosts[i];
    moveGhost(ghost);
  }
}
function moveGhost(ghost) {
  var moveDiff = getMoveDiff();
  var nextLocation = {
    i: ghost.location.i + moveDiff.i,
    j: ghost.location.j + moveDiff.j,
  };
  var nextCell = gBoard[nextLocation.i][nextLocation.j];
  if (nextCell === WALL) return;
  if (nextCell === GHOST) return;
  if (nextCell === POWER_FOOD) return;
  if (nextCell === CHEERY) return;
  if (nextCell === PACMAN) {
    gameOver();
    return;
  }

  // model
  gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
  // dom
  renderCell(ghost.location, ghost.currCellContent);

  // model
  ghost.location = nextLocation;
  ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j];
  gBoard[ghost.location.i][ghost.location.j] = GHOST;
  // dom
  renderCell(ghost.location, getGhostHTML(ghost));
}

function getMoveDiff() {
  var randNum = getRandomIntInclusive(0, 100);
  if (randNum < 25) {
    return { i: 0, j: 1 };
  } else if (randNum < 50) {
    return { i: -1, j: 0 };
  } else if (randNum < 75) {
    return { i: 0, j: -1 };
  } else {
    return { i: 1, j: 0 };
  }
}

function getGhostHTML(ghost) {
  return `<span style="color:${ghost.color}">${GHOST}</span>`;
}

function killGhost(ghostLocation) {
  for (var i = 0; i < gGhosts.length; i++) {
    var currGhost = gGhosts[i];
    if (
      ghostLocation.i === currGhost.location.i &&
      ghostLocation.j === currGhost.location.j
    ) {
      gDeleteGhost.push(currGhost);
      ghost.splice(i, 1);
    }
  }
}
function returnGhosts() {
  gGhosts.push(...gDeleteGhost);
  gDeleteGhost = [];
}
function changeGhostsColor() {
  for (var i = 0; i < gGhosts.length; i++) {
    var currGhost = gGhosts[i];
    var randomColor = getRandomColor();
    currGhost.color = randomColor;
  }
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
