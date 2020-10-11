"use strict";
const PACMAN = "😷";
var gEatenGhost = 0;
var gPacman;

function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5,
    },
    isSuper: false,
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}
function movePacman(ev) {
  if (!gGame.isOn) return;
  // console.log('ev', ev);
  var nextLocation = getNextLocation(ev);

  if (!nextLocation) return;
  // console.log('nextLocation', nextLocation);

  var nextCell = gBoard[nextLocation.i][nextLocation.j];
  // console.log('NEXT CELL', nextCell);

  if (nextCell === WALL) return;
  if (nextCell === FOOD) {
    updateScore(1);
    gGame.foodCount--;
  }
      else if (nextCell === CHERRY) {
        updateScore(10);
  } else if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            killGhost(nextLocation);
        }
       else {
          gameOver();
          renderCell(gPacman.location, EMPTY);
          return;
      }
  }   else if (nextCell === POWER_FOOD) {
    if(gPacman.isSuper) return;
    gPacman.isSuper = true;
    changeGhostsColor();
    setTimeout(function(){gPacman.isSuper=false},5000);
    setTimeout(returnGhosts(),5000);
    gGame.foodCount--;
  }

  // update the model
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

  // update the dom
  renderCell(gPacman.location, EMPTY);

  gPacman.location = nextLocation;

  // update the model
  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  // update the dom
  renderCell(gPacman.location, PACMAN);
  if (gGame.foodCount === 0) {
    victory();
  }
}

function getNextLocation(eventKeyboard) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j,
  };
  switch (eventKeyboard.code) {
    case "ArrowUp":
      nextLocation.i--;
      break;
    case "ArrowDown":
      nextLocation.i++;
      break;
    case "ArrowLeft":
      nextLocation.j--;
      break;
    case "ArrowRight":
      nextLocation.j++;
      break;
    default:
      return null;
  }
  return nextLocation;
}

// function activateSuper() {
//   gPacman.isSuper = true;
//   for (var i = 0; i < gGhosts.length; i++) {
//     gGhosts[i].color = "white";
//     // renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]));
//   }
//   setTimeout(function () {
//     gPacman.isSuper = false;
//     console.log(gPacman.isSuper,'super');
//     for (var i = 0; i < gGhosts.length; i++) {
//       gGhosts[i].color = getRandomColor();
//     //   renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]));
//     } 
//     for (var j = 0; j < gEatenGhost; j++) {
//         createGhost(gBoard);
//     } 
//     gEatenGhost = 0;
//   }, 5000);
// }
