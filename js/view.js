const view = {};
document.draggable = false


/// view setScreen
const pageContainer = document.getElementsByClassName('findContainer')[0]
/// set tempo meter
const tempoBtn = document.getElementById('tempoBtn')
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
/// set frequency meter 
const frequencyBtn = document.getElementById('frequencyBtn')
const frequencyBtnActive = () => {
    frequencyBtn.removeEventListener('click', frequencyBtnActive)
    view.setFrequencyMeterContainer()
    frequencyBtn.addEventListener('click', frequencyBtnEnable)
}
const frequencyBtnEnable = () => {
    frequencyBtn.removeEventListener('click', frequencyBtnEnable)
    view.clearFrequencyMeterContainer()
    frequencyBtn.addEventListener('click', frequencyBtnActive)
}
/// set keyboard
const keyboardBtn = document.getElementById('keyboardBtn')
const keyboardBtnActive = () => {

}
const keyboardBtnEnable = () => {

}


tempoBtn.addEventListener('click', tempoBtnActive)
frequencyBtn.addEventListener('click', frequencyBtnActive)






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
    tempoMeterLibrary.tempoMeter(beatPad, tempoValue, tempoUnit)
}
view.clearTempoMeterContainer = () => {
    const tempoMeterContainer = document.getElementById('tempoMeterContainer')
    pageContainer.removeChild(tempoMeterContainer)
}


view.setFrequencyMeterContainer = () => {
    const noteMeterContainer = document.createElement('div')
    noteMeterContainer.id = 'noteMeterContainer'
    for(i=0;i<73;i++) {
        const noteWrapper = document.createElement('div')
        noteWrapper.className = 'noteWrapper'
        noteWrapper.id = i
        const noteOctave = document.createElement('div')
        noteOctave.className = 'noteOctave'
        const noteName =  document.createElement('div')
        noteName.className = 'noteName'
        const noteLoudness = document.createElement('div')
        noteLoudness.className = 'noteLoudness'
        noteOctave.innerText = noteLibrary.getNoteOctave(i+1)
        noteName.innerText = noteLibrary.getNoteClassName(i+1)
        noteOctave.style.backgroundColor = controller.convertArrayToRGB(noteLibrary.getNoteSpectrum(i+1), 0.6)
        noteName.style.backgroundColor = controller.convertArrayToRGB(noteLibrary.getNoteSpectrum(i+1), 0.6)
        noteWrapper.appendChild(noteOctave)
        noteWrapper.appendChild(noteName)
        noteWrapper.appendChild(noteLoudness)
        noteMeterContainer.appendChild(noteWrapper)
    }
    pageContainer.appendChild(noteMeterContainer);
    sound.getMicroStreamAnalize()
}
view.clearFrequencyMeterContainer = () => {
    const noteMeterContainer = document.getElementById('noteMeterContainer')
    pageContainer.removeChild(noteMeterContainer);
    sound.stopMicroStreamAnalize()
}


view.setFrequencyMeterRecordedNote = (loudestFrequency) => {
    noteCode = noteLibrary.getNoteCodeFromFrequency(loudestFrequency.hz) + model.frequencyTolerance;
    const noteWrapper = document.getElementsByClassName('noteWrapper')
    for(one of noteWrapper) {
        one.style.backgroundColor = 'transparent'
        one.lastChild.innerHTML = ''
    }
    if(noteCode<73) {
        const noteWrapperRecorded = document.getElementById(noteCode-1)
        noteWrapperRecorded.style.backgroundColor = controller.convertArrayToRGB(noteLibrary.getNoteSpectrum(noteCode), 0.8)
        crestPosition = controller.checkDecibelToCreateCrest(loudestFrequency.db)
        const noteLoudness = noteWrapperRecorded.getElementsByClassName('noteLoudness')[0]
        if(crestPosition < 1) {
            const crest = document.createElement('div')
            crest.className = 'crest'
            noteLoudness.appendChild(crest)
        } else {
            for(i=0;i<crestPosition;i++) {
                const dot = document.createElement('div')
                dot.className = 'dot'
                noteLoudness.appendChild(dot)
            }
            const crest = document.createElement('div')
            crest.className = 'crest'
            noteLoudness.appendChild(crest)
        }
    }
}


view.setKeyboardContainer = () => {
    const keyboardContainer = document.createElement('div')
    keyboardContainer.id = 'keyboardContainer'
    keyboardContainer.innerHTML = components.pianoKeyboard
    for(i=0;i<16;i++) {
        const keysWrapper = document.createElement('div')
        keysWrapper.className = keysWrapper
    }
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