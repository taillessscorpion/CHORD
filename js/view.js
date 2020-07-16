const view = {};
document.draggable = false


/// view setScreen
const pageContainer = document.getElementsByClassName('findContainer')[0];
const tempoBtn = document.getElementById('tempoBtn');
const tempoBtnActive = () => {
    tempoBtn.removeEventListener('click', tempoBtnActive)
    view.setTempoMeterContainer()
    tempoBtn.addEventListener('click', tempoBtnEnable)
}
const tempoBtnEnable = () => {
    tempoBtn.removeEventListener('click', tempoBtnEnable)
    view.clearTempoMeterContainer()
    tempoBtn.addEventListener('click', tempoBtnActive)
}
tempoBtn.addEventListener('click', tempoBtnActive)










view.setTempoMeterContainer = () => {
    const tempoMeterContainer = document.createElement('div')
    tempoMeterContainer.id = 'tempoMeterContainer'
    tempoMeterContainer.innerHTML = components.tempoMeter
    pageContainer.appendChild(tempoMeterContainer);
    const tempoCloseBtn = document.getElementById('tempoCloseBtn')
    tempoCloseBtn.addEventListener('click', tempoBtnEnable)
    const beatPad = document.getElementById('beatPad')
    const tempoValue = document.getElementsByClassName('tempoValue')[0]
    const tempoUnit = document.getElementsByClassName('tempoUnit')[0]
    tempoLibrary.tempoMeter(beatPad, tempoValue, tempoUnit)
}
view.clearTempoMeterContainer = () => {
    const tempoMeterContainer = document.getElementById('tempoMeterContainer')
    pageContainer.removeChild(tempoMeterContainer);
}





view.setAlert = (message) => {
    var autoClearAlert, showAlertDelay
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