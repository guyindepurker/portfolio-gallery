"use strict";
console.log("Check if");
var gIsClick = false;
var gSound = new Audio("pop.mp3");
var END_OF_ROAD = 500;
var gNextId = 1;
var gBalloons;
var gInterval;


function init() {
    gBalloons = createBalloons(4)
    renderBallons(gBalloons)
    
    gInterval= setInterval(play,1000)
   
}


function play(){
  moveBalloons(gBalloons);
  checkVictory ()
}

function checkVictory (){
  for(var i=0; i<gBalloons.length; i++){
    var currBallon = gBalloons[i];
    if(currBallon.bottom >= END_OF_ROAD){
      alert('the ballon'+gBalloons[i].id+'is the winner!');
      clearInterval(gInterval);
    }
  }
}

function renderBallons(ballons){
  var elHtml = document.querySelector('.balloons')
  var htmlStr = '';
  for(var i=0; i<ballons.length; i++){
    var balloon = ballons[i];
     htmlStr += `<div onclick="balloonIsClick(this)" class="balloon balloon-${balloon.id}"></div>`;
    
  }
  elHtml.innerHTML = htmlStr;
}

function balloonIsClick(elBtn){
  if(!gIsClick){  
    gSound.play();
    elBtn.style.display = 'none';
    gIsClick = true;
  } else{
    elBtn.style.display = 'block';
    gIsClick = false;
  }
}




function moveBalloons(balloons){
  var elBallon = document.querySelectorAll('.balloon')
  for(var i=0; i<balloons.length; i++){
    var currBallon =balloons[i];
    currBallon.bottom += currBallon.speed;
    elBallon[i].style.bottom = currBallon.bottom+'px';
  }
  
}



function createBalloons(number){
  gBalloons = [];
  for(var i=0; i<number; i++){
    var currBallon = createBalloon();
    gBalloons.push(currBallon);
  }
  return gBalloons;
}


function createBalloon(){
  var ballon = {
    id:gNextId++,
    speed:10,
    bottom:10
  };
  return ballon;
}


