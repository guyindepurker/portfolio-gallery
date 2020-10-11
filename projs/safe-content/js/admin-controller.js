function initAdmin(){
    onIsAdmin()
    renderListUsers()
}

function onIsAdmin(){
   if(!isAdmin()) window.location.replace("index.html")
}
function renderListUsers(){
   if (!isAdmin()) return;
    var strHtml = '';
    var users = getUsersToShow();
    users.forEach(function(currUser){
        strHtml+=
        `<tr><td>${currUser.userName}</td>
        <td>${currUser.password}</td>
        <td>${new Date(currUser.lastLoginTime).toTimeString()}</td>
        <td>${currUser.isAdmin}</td></tr>`
    })
     document.querySelector('.users-list-tb').innerHTML = strHtml;
}

function onSetFilter(filterBy) {
    setFilter(filterBy)
    renderListUsers();
}

function onLogoutAdmin(){
    doLogoutAdmin();
    onGoBack()
}

function onGoBack(){
    location.href = "index.html"
}