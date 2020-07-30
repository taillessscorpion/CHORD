const tempoMeterLibrary = {};
tempoMeterLibrary.tempoMeter = (inputElement, outputValueElement, outputUnitElement, outputClickElement) => {
    var renewCounter, beatsCounted, miliSecondsPassed, miliSecondsCounter;
    tempoMeterLibrary.startCountBeat = () => {
        inputElement.removeEventListener('click', tempoMeterLibrary.startCountBeat)
        beatsCounted = 1
        model.tempo.click = 10 * (beatsCounted - 1)
        miliSecondsPassed = 0
        model.tempo.timePassed = miliSecondsPassed
        miliSecondsCounter= setInterval(()=>{miliSecondsPassed += 10}, 10)
        inputElement.addEventListener('click', tempoMeterLibrary.countBeat)
        outputValueElement.innerText = 'START'
    }
    tempoMeterLibrary.countBeat = () => {
        beatsCounted += 1
        const setUpObj = tempoMeterLibrary.tempoHeader(beatsCounted, miliSecondsPassed)
        if(setUpObj.passed === true) {
            outputValueElement.innerText = setUpObj.outputValueElement
            outputUnitElement.innerText = setUpObj.outputUnitElement
            outputClickElement.value = setUpObj.outputClickElement
            console.log(setUpObj.outputClickElement)
        } else if (setUpObj.passed === false) {
            outputValueElement.innerText = setUpObj.outputValueElement
            outputUnitElement.innerText = setUpObj.outputUnitElement
            outputClickElement.value = setUpObj.outputClickElement
            console.log(setUpObj.outputClickElement)
            inputElement.removeEventListener('click', tempoMeterLibrary.countBeat)
            clearInterval(miliSecondsCounter)
            inputElement.addEventListener('click', tempoMeterLibrary.startCountBeat)
        }
    }

    if(outputValueElement === undefined) {outputValueElement = inputElement}
    inputElement.addEventListener('click', tempoMeterLibrary.startCountBeat)
}


tempoMeterLibrary.tempoHeader = (beatsCounted, miliSecondsPassed, inputElement, outputValueElement, outputUnitElement, outputClickElement) => {
    var averangeTimePassed = model.tempo.timePassed
    const anotherTimePassed = miliSecondsPassed-averangeTimePassed
    const anotherTempo = Math.floor(1*60000/(anotherTimePassed))
    if(averangeTimePassed != 0) var averangeTempo = Math.floor((beatsCounted-2)*60000/averangeTimePassed)
    else var averangeTempo = anotherTempo
    if(beatsCounted < 5) {
        if(Math.abs(anotherTempo-averangeTempo) > averangeTempo) {
            return {
                outputValueElement: '||',
                outputUnitElement: '',
                outputClickElement: 0,
                passed: false
            }
        } else {
            model.tempo.click = 10 * (beatsCounted - 0.7)
            model.tempo.timePassed = miliSecondsPassed
            if(averangeTempo < 20) {
                return {
                    outputValueElement: '>>',
                    outputUnitElement: '',
                    outputClickElement: 0,
                    passed: false
                }
            } else if(averangeTempo > 500) {
                return {
                    outputValueElement:'<<',
                    outputUnitElement: '',
                    outputClickElement: 0,
                    passed: false
                }
            } else {
                return {
                    outputValueElement: Math.floor((beatsCounted-1)*60000/(miliSecondsPassed)),
                    outputUnitElement: 'BPM',
                    outputClickElement: model.tempo.click,
                    passed: true
                }
            }
        }
    } else if(beatsCounted < 20) {
        if(Math.abs(anotherTempo-averangeTempo) > averangeTempo*0.5) {
            return {
                outputValueElement: '||',
                outputUnitElement: '',
                outputClickElement: 0,
                passed: false
            }
        } else {
            model.tempo.click = 10 * (beatsCounted - 1)
            model.tempo.timePassed = miliSecondsPassed
            if(averangeTempo < 20) {
                return {
                    outputValueElement: '>>',
                    outputUnitElement: '',
                    outputClickElement: 0,
                    passed: false
                }
            } else if(averangeTempo > 500) {
                return {
                    outputValueElement:'<<',
                    outputUnitElement: '',
                    outputClickElement: 0,
                    passed: false
                }
            } else  {
                return {
                    outputValueElement: Math.floor((beatsCounted-1)*60000/(miliSecondsPassed)),
                    outputUnitElement: 'BPM',
                    outputClickElement: model.tempo.click,
                    passed: true
                }
            }
        }
    } else {
        if(Math.abs(anotherTempo-averangeTempo) > averangeTempo*0.2) {
            return {
                outputValueElement: '||',
                outputUnitElement: '',
                outputClickElement: 0,
                passed: false
            }
        } else {
            model.tempo.click = 10 * (beatsCounted - 1)
            if(model.tempo.click >= 200) model.tempo.click = 200
            model.tempo.timePassed = miliSecondsPassed
            if(averangeTempo < 20) {
                return {
                    outputValueElement: '>>',
                    outputUnitElement: '',
                    outputClickElement: 0,
                    passed: false
                }
            } else if(averangeTempo > 500) {
                return {
                    outputValueElement:'<<',
                    outputUnitElement: '',
                    outputClickElement: 0,
                    passed: false
                }
            } else  {
                model.tempo.value = Math.floor((beatsCounted-1)*60000/(miliSecondsPassed))
                view.setSongTempo(model.tempo.value)
                return {
                    outputValueElement: Math.floor((beatsCounted-1)*60000/(miliSecondsPassed)),
                    outputUnitElement: 'BPM',
                    outputClickElement: model.tempo.click,
                    passed: true
                }
            }
        }
    }

}