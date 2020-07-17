const tempoMeterLibrary = {};
tempoMeterLibrary.tempoMeter = (inputElement, outputValueElement, outputUnitElement) => {
    var renewCounter, beatsCounted, miliSecondsPassed, miliSecondsCounter;
    const startCountBeat = () => {
        inputElement.removeEventListener('click', startCountBeat)
        beatsCounted = 1
        miliSecondsPassed = 0
        miliSecondsCounter= setInterval(()=>{miliSecondsPassed += 10}, 10)
        inputElement.addEventListener('click', countBeat)
        outputValueElement.innerText = 'START'
        renewCounter = setTimeout(()=>{
            inputElement.removeEventListener('click', countBeat)
            clearInterval(miliSecondsCounter)
            outputValueElement.innerText = ''
            inputElement.addEventListener('click', startCountBeat)
        }, 3000)
    }
    const countBeat = () => {
        clearTimeout(renewCounter)
        beatsCounted += 1
        outputValueElement.innerText = tempoMeterLibrary.tempoHeader(beatsCounted, miliSecondsPassed)
        if(outputUnitElement != undefined) outputUnitElement.innerText = 'BPM'
        renewCounter = setTimeout(()=>{
            inputElement.removeEventListener('click', countBeat)
            clearInterval(miliSecondsCounter)
            outputValueElement.innerText = ''
            outputUnitElement.innerText = ''
            inputElement.addEventListener('click', startCountBeat)
        }, 3000)
    }

    if(outputValueElement === undefined) {outputValueElement = inputElement}
    inputElement.addEventListener('click', startCountBeat)
}


tempoMeterLibrary.tempoHeader = (beats, miliSeconds) => {
    if(Math.floor(beats*60000/miliSeconds) < 20) return '>>'
    if(Math.floor(beats*60000/miliSeconds) > 500) return '<<'
    return Math.floor(beats*60000/miliSeconds)
}