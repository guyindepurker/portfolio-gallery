'use strict';
console.log('game');
var gId=0;
var gCurrQuestIdx = 0;
var gQuests = [
    {id:1 , opts:['Brad Pitt','Chuck" Norris'],correctOptIndex:0},
    {id:2 , opts:['Johnny Depp','Johnny English'],correctOptIndex:0},
    {id:3 , opts:['Zac" Efron','Robert Downey Jr'],correctOptIndex:1},
    {id:4 , opts:['Chris Hemsworth','Chris Evans'],correctOptIndex:1},  
];

function init(){
    renderQuest(gQuests)
}

function play(){
    gCurrQuestIdx = 0;
    init();
}


function checkAnswer(optIdx){
    var correctAnswer = gQuests[gCurrQuestIdx].correctOptIndex;
     if(optIdx === correctAnswer){
        gCurrQuestIdx++
        if(gCurrQuestIdx === gQuests.length){
           return renderVictory();
        }
        createQuest();
    }else {
        var elQuestion = document.querySelector('.qus'+optIdx);
        elQuestion.style.backgroundColor = 'red';
    }
}
function createQuest(){
    renderQuest(gQuests);
}

function renderVictory(){
    var htmlStr ='<div class="victory"><img src="https://st2.depositphotos.com/1340907/8260/v/950/depositphotos_82602484-stock-illustration-confetti-pieces-and-winner-text.jpg"/> The game is end good job!!! if you want to play again click the button!'+
    '<button onclick="play()">start again</button></div>'
    var elContent = document.querySelector('.content');
    elContent.innerHTML = htmlStr;
    
}
function renderQuest(quests){
        var htmlStr = '';
        htmlStr = '<img src="/img/'+(gCurrQuestIdx+1)+'.jpg">'
        for(var i=0; i<quests[0].opts.length; i++){
        htmlStr += '<div onclick="checkAnswer('+(i)+')" class="questions qus'+(i)+'">'+quests[gCurrQuestIdx].opts[i]+'</div>'
        }
     var elQuestion = document.querySelector('.content');
        elQuestion.innerHTML = htmlStr;
}
