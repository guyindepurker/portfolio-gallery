var gFilter = 'NAME';
var gAllUsers = loadFromStorage(USERSDB)

function getUsersToShow(){
    var users;
    if (gFilter === 'NAME')  users=gAllUsers;
    else {
    users = gAllUsers.filter(function(user){
        return (
            gFilter === 'LAST-LOGIN' && user.lastLoginTime
        )
    })} 
    return users;
}



function setFilter(filterBy) {
    gFilter = filterBy;
    gAllUsers = sortUsers(gAllUsers);

}

function sortUsers(users){
    switch (gFilter) {
        case 'NAME':
            users.sort(function(a, b) {
                var nameA = a.userName.toUpperCase(); 
                var nameB = b.userName.toUpperCase(); 
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
              
                // names must be equal
                return 0;
              });
            break;
            case 'LAST-LOGIN':
                users.sort(function(a,b){
                    return  b.lastLoginTime - a.lastLoginTime 
                });
                break;
    }
    return users;
}



function doLogoutAdmin (){
    removeItemFromStorage(LOGIN)
}

function doGoBack(){
    //go back
}

function isAdmin(){
    var user = loadFromStorage(LOGIN);
    return user.isAdmin;
}