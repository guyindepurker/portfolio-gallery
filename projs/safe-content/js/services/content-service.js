'use strict';

const USERSDB = 'allUsersDB';
const LOGIN = 'loggingUser';
var gUsers;

function loadUsersToInit(){
    _createUsers();
  gUsers = loadFromStorage(USERSDB)
}

function doLogin(userName,pass){
    var user = gUsers.find(function(currUser){
        if(userName === currUser.userName && pass === currUser.password) {
            currUser.lastLoginTime = Date.now();
            return currUser;
        };
    })
    saveToStorage(LOGIN, user)
    _saveUsers(gUsers)
   return user;
}
function getIsUserLogIn(){
    if (loadFromStorage(LOGIN) !== null){
        return true;
    }else{
        return false
    }
 }

function doLogout(){
    removeItemFromStorage(LOGIN)
    console.log('i delete....');
}



//Private Functions
 function _createUsers(){
     var users = [
        _createUser('puki','123',true),
        _createUser('muki','123',false),
        _createUser('guy','123',false)
     ];
        _saveUsers(users)
        return users;
 }

function _createUser(name,pass,isAdmin){
    return {
        id:makeId(),
        userName:name,
        password:pass,
        lastLoginTime:'',
        isAdmin:isAdmin
    }
}

 function _saveUsers(val){
    saveToStorage(USERSDB, val);
 }


