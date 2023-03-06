let tokenMA = JSON.parse(localStorage.getItem('token'))
const loginContainer = document.getElementById('loginContainer')
const templateBtnLogin = document.getElementById('templateBtnLogin').content;
const templateMA = document.getElementById('templateMA').content;
const fragmentMA = document.createDocumentFragment()
if (tokenMA == null) {
    const clone = templateBtnLogin.cloneNode(true)
    fragmentMA.appendChild(clone)
    loginContainer.appendChild(fragmentMA)
} else {
    const clone = templateMA.cloneNode(true)
    fragmentMA.appendChild(clone)
    loginContainer.appendChild(fragmentMA)
    signOut()
}

//SIGN OUT
function signOut() {
    const btn = document.getElementById('signOut')
    btn.addEventListener('click', (e) => {
        localStorage.removeItem('token');
        location.reload();
    }
    )}