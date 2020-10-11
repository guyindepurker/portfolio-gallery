
function init(){
    loadUsersToInit()
    renderSecretPage()
}

function renderSecretPage() {
    if(!getIsUserLogIn()) return;
    onHideToogle('login')
    onShowToogle('secret-page')
    var elSecretPage = document.querySelector('.secret-page');
    var user = loadFromStorage(LOGIN);
    htmlStr =
        `        <h1>Welcome  <span class="user-login-name">${user.userName}</span></h1>
    <p>Have a nice day</p>
    <img src="imgs/enter-user.jpg"/>
    <a class="admin-link" href="admin.html" style="display:${(user.isAdmin) ? 'block' : 'none'}">Enter Admin Panel</a>
    <button class="submit-btn Logout" onclick="onLogout()">Logout</button>`
    elSecretPage.innerHTML = htmlStr;
}

function onCheckLogin() {
    elUserName = document.querySelector('#username');
    elPassword = document.querySelector('#pass');
    var userTxt = elUserName.value;
    var passTxt = elPassword.value;
    var res = doLogin(userTxt, passTxt);
    (res !== undefined) ? renderSecretPage() : console.log('wrong');
    elUserName.value = '';
    elPassword.value = '';
}

function onHideToogle(selector) {
    var elSection = document.querySelector('.' + selector);
    elSection.classList.add('hide');
}

function onShowToogle(selector) {
    var elSection = document.querySelector('.' + selector);
    elSection.classList.remove('hide');
}

function onLogout() {
    doLogout()
    onShowToogle('login')
    onHideToogle('secret-page')
}