function printMat(mat, selector) {
    var strHTML = '<table border="0"><tbody>';
    for (var i = 0; i < mat.length; i++) {
      strHTML += '<tr>';
      for (var j = 0; j < mat[0].length; j++) {
        var cell = mat[i][j];
        var className = 'cell cell' + i + '-' + j;
        strHTML += '<td class="' + className + '"> ' + cell + ' </td>'
      }
      strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
  }

  // location such as: {i: 2, j: 7}
  function renderCell(location, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
    elCell.innerHTML = value;
  }
  function createCherry() {
    var emptyCells = getRandomEmptyCell();
    if (emptyCells[0] === undefined) return;
    var emptyCell = emptyCells[getRandomIntInclusive(0, emptyCells.length - 1)]
    gBoard[emptyCell.i][emptyCell.j] = CHERRY;
    renderCell(emptyCell, CHERRY);
  }
  
  function getRandomEmptyCell() {
    var emptyCells = [];
    for (var i = 0; i < gBoard.length; i++) {
      for (var j = 0; j < gBoard[i].length; j++) {
        if (gBoard[i][j] === EMPTY) emptyCells.push({ i: i, j: j });
      }
    }
    return emptyCells;
  }
  
  function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }