var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
const QUESTDB = 'questDB'

function createQuestsTree() {
    gQuestsTree = loadFromStorage(QUESTDB);
    if(!gQuestsTree || gQuestsTree.length === 0){
        gQuestsTree = createQuest("Male?");
        gQuestsTree.yes = createQuest("Gandhi");
        gQuestsTree.no = createQuest("Rita");
        saveToStorage(QUESTDB,gQuestsTree);
    }
    //not in else
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null,
    };
}

function isChildless(node) {
    return node.yes === null && node.no === null;
}

function moveToNextQuest(res) {
    gPrevQuest = gCurrQuest;
    gCurrQuest = gCurrQuest[res];
}

function addGuess(newQuestTxt, newGuessTxt) {
    gCurrQuest.no = createQuest(gCurrQuest.txt);
    gCurrQuest.txt = newQuestTxt;
    gCurrQuest.yes = createQuest(newGuessTxt);
    saveToStorage(QUESTDB,gQuestsTree);
    gCurrQuest = gQuestsTree;
}

function getCurrQuest() {
    return gCurrQuest;
}
