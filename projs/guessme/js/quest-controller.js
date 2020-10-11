'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);
$('.btn-start').click(onStartGuessing);
$('.btn-yes').click({ ans: 'yes' }, onUserResponse);
$('.btn-no').click({ ans: 'no' }, onUserResponse);
$('.btn-add-guess').click(onAddGuess);
$('.btn-close').click(onCloseModal);

function init() {
  console.log('Started...');
  $('.quest').hide()
  createQuestsTree();
}

function onStartGuessing() {
  // TODO: hide the game-start section
  $('.game-start').hide('slow')
  renderQuest();
  // TODO: show the quest section
  $('.quest').show('slow')
}

function renderQuest() {
  // TODO: select the <h2> inside quest and update
  var currQuest = getCurrQuest();
  $('.quest h2').text(currQuest.txt).fadeIn()
  // its text by the currQuest text
}

function onUserResponse(ev) {
  var res = ev.data.ans;
  var $elModal = $('.modal');
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      $elModal.show('hide')
      $elModal.find('img').attr('src','img/layout/i-win.gif');
      $elModal.find('span').text('yes i know it!')
      onRestartGame()
      // alert('Yes, I knew it!');
      // TODO: improve UX
    } else {
      $elModal.show('hide')
      $elModal.find('img').attr('src','img/layout/loose.gif');
      $elModal.find('span').text('i dont know.... tech me!')
      $('.quest').hide('slow')
      $('.new-quest').show('slow')
    }
  } else {
    gLastRes = res;
    moveToNextQuest(gLastRes);
    renderQuest();
  }
}

function onAddGuess(ev) {
  ev.preventDefault();
  var newGuess = $('#newGuess').val(); 
  var newQuest = $('#newQuest').val();
  if((!newGuess || !newQuest) || (!isNaN(newQuest)|| !isNaN(newGuess)) ) return alert('Enter your answers');
  else {
    addGuess(newQuest, newGuess)
    onRestartGame();

  }
}

function onRestartGame() {
  $('.new-quest').hide('slow');
  $('.game-start').show('slow');
  gLastRes = null;
  init()
}

function onCloseModal(){
  $('.modal').hide('slow')
}
