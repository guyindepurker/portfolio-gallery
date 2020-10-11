"use strict";
console.log("Touch Nums");
var gNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
var counter = 1;
var isGameOn = false;
var gTimeInterval;
function init() {
   counter = 1;
  createBoard();
  randerNums(gNumbers);
}

var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}
// function checkVictory
function startGame(elBtn) {
  if (!isGameOn) {
    console.log(isGameOn);
    gTimeInterval = setInterval(setTime, 100);
    isGameOn = true;
    elBtn.innerText = "Restart";
  } else if(isGameOn) {
    counter = 1;
    init();
    console.log(isGameOn);
    isGameOn = false;
    elBtn.innerText = "Start";
  }
}

function numberClicked(number) {
  var currNumber = number.innerText;
  if (!isGameOn) return;
  if (+currNumber === counter) {
    
    number.style.backgroundColor = "white";
    counter++;
  }if(counter === 17){
    clearInterval(gTimeInterval);
    console.log('number: ',counter);
  }
}

function randerNums(nums) {
  var htmlStr = "";
  var length = Math.sqrt(nums.length);
  for (var i = 0; i < length; i++) {
    htmlStr += "<tr>";
    for (var j = 0; j < length; j++) {
      htmlStr +=
        '<td onclick="numberClicked(this)" class="cell">' +
        nums.pop() +
        "</td>";
    }
    htmlStr += "</tr>";
  }
  var elBoard = document.querySelector(".board");
  elBoard.innerHTML = htmlStr;
}

function createBoard() {
  gNumbers = suffeleNums(gNumbers);
}

function suffeleNums(nums) {
  var suffeleNums = [];
  var copyNumbers = nums.slice();
  for (var i = 0; i < nums.length; i++) {
    var randomIdx = getRandomInt(0, copyNumbers.length);
    var newNum = copyNumbers.splice(randomIdx, 1)[0];
    suffeleNums.push(newNum);
  }
  return suffeleNums;
}

// function timer(condition){
//     var elTimer = document.querySelector('.time');
//     if(condition) {
//         elTimer.style.display ='block';
//     }else {
//         elTimer.style.display ='none';

//     }
// }

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
