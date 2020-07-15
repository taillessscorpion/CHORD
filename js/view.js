const view = {};
var autoClearAlert, showAlertDelay
view.setAlert = (message) => {
    clearTimeout(autoClearAlert);
    clearTimeout(showAlertDelay);
    const showAlert = document.getElementById('alertTitle');
    showAlert.innerText = '';
    showAlert.parentElement.style.transform = 'translateY(-100vh)';
    showAlert.parentElement.className = 'alertAttention'
    for (a = 0; a < showAlert.parentElement.children.length; a++) {
        showAlert.parentElement.children[a].addEventListener("click", (e) => { e.target.parentElement.style.transform = ''; showAlert.parentElement.className = ''; })
    }
    showAlertDelay = setTimeout(() => { showAlert.innerText = message; }, 200);
    autoClearAlert = setTimeout(() => { showAlert.parentElement.style.transform = ''; showAlert.parentElement.className = '' }, 5000);
}