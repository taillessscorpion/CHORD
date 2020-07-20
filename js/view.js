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
    keyboardBtn.removeEventListener('click', keyboardBtnActive)
    view.setKeyboardContainer()
    keyboardBtn.addEventListener('click', keyboardBtnEnable)
}
const keyboardBtnEnable = () => {
    keyboardBtn.removeEventListener('click', keyboardBtnEnable)
    view.clearKeyboardContainer()
    keyboardBtn.addEventListener('click', keyboardBtnActive)
}


tempoBtn.addEventListener('click', tempoBtnActive)
frequencyBtn.addEventListener('click', frequencyBtnActive)
keyboardBtn.addEventListener('click', keyboardBtnActive)





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
    const pianoKeyboardContainer = document.getElementById('pianoKeyboardContainer')
    if(pianoKeyboardContainer  != null) noteMeterContainer.style.display = 'none'
    for (i = 1; i < 74; i++) {
        const noteWrapper = document.createElement('div')
        noteWrapper.className = 'noteWrapper'
        noteWrapper.id = `${i}fM`
        const noteOctave = document.createElement('div')
        noteOctave.className = 'noteOctave'
        const noteName = document.createElement('div')
        noteName.className = 'noteName'
        const noteLoudness = document.createElement('div')
        noteLoudness.className = 'noteLoudness'
        noteOctave.innerText = noteLibrary.getNoteOctave(i)
        noteName.innerText = noteLibrary.getNoteClassName(i)
        noteOctave.style.backgroundImage = `linear-gradient(to left, ${controller.convertArrayToRGB(noteLibrary.getNoteSpectrum(i), 0.9)}, ${controller.convertArrayToRGB(noteLibrary.getNoteSpectrum(i), 0.5)})`
        noteName.style.backgroundImage = `linear-gradient(to left, ${controller.convertArrayToRGB(noteLibrary.getNoteSpectrum(i), 0.5)}, ${controller.convertArrayToRGB(noteLibrary.getNoteSpectrum(i), 0.1)})`
        noteWrapper.style.backgroundImage = `linear-gradient(to bottom, ${controller.convertArrayToRGB(noteLibrary.getNoteSpectrum(i), 0.6)}, ${controller.convertArrayToRGB(noteLibrary.getNoteSpectrum(i), 0.3)}, rgb(255, 255, 255, 0.1))`
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
    pageContainer.removeChild(noteMeterContainer)
    sound.stopMicroStreamAnalize()
    view.clearKeyWarapperColor()
}

view.setFrequencyMeterRecordedNote = (loudestFrequency) => {
    noteCode = noteLibrary.getNoteCodeFromFrequency(loudestFrequency.hz) + model.frequencyTolerance;
    const noteWrapper = document.getElementsByClassName('noteWrapper')
    for (i = 1; i < noteWrapper.length; i++) {
        noteWrapper[i].style.backgroundImage = `linear-gradient(to bottom, ${controller.convertArrayToRGB(noteLibrary.getNoteSpectrum(i+1), 0.6)}, ${controller.convertArrayToRGB(noteLibrary.getNoteSpectrum(i+1), 0.3)}, rgb(255, 255, 255, 0.1))`
        noteWrapper[i].lastChild.innerHTML = ''
    }
    const blackKey = document.getElementsByClassName('blackKey')
    for(one of blackKey) {
        one.style.backgroundImage = '';
        one.style.backgroundColor = 'rgb(100, 100, 100)'
    }
    const whiteKey = document.getElementsByClassName('whiteKey')
    for(one of whiteKey) one.style.backgroundImage = ''
    if (noteCode < 74) {
        const noteWrapperRecorded = document.getElementById(`${noteCode}fM`)
        const newKeyPiano = document.getElementById(`${noteCode}pi`)
        const newKeyGuitar = document.getElementById(`${noteCode}gu`)
        const highNote = noteLibrary.getNoteSpectrum(noteLibrary.getNoteCodeFromDetails(noteLibrary.getNoteClassName(noteCode), 5))
        if (newKeyPiano != undefined) {
            const checker = controller.checkBlackOrWhiteKey(noteCode)
            if (checker === 'black') {
                newKeyPiano.style.backgroundColor = ''
                newKeyPiano.style.backgroundImage = `linear-gradient(${controller.convertArrayToRGB(highNote, 0.3)}, ${controller.convertArrayToRGB(highNote, 1)})`
            } else {
                newKeyPiano.style.backgroundImage = `linear-gradient(${controller.convertArrayToRGB(highNote, 0.2)}, ${controller.convertArrayToRGB(highNote, 1)})`
            }
        }
        if (newKeyGuitar != undefined) {
            const checker = controller.checkBlackOrWhiteKey(noteCode)
            if (checker === 'black') {
                newKeyGuitar.style.backgroundColor = ''
                newKeyGuitar.style.backgroundImage = `linear-gradient(${controller.convertArrayToRGB(highNote, 0.3)}, ${controller.convertArrayToRGB(highNote, 1)})`
            } else {
                newKeyGuitar.style.backgroundImage = `linear-gradient(${controller.convertArrayToRGB(highNote, 0.2)}, ${controller.convertArrayToRGB(highNote, 1)})`
            }
        }
        if(noteWrapperRecorded != undefined) {
            noteWrapperRecorded.style.backgroundImage = `linear-gradient(to left, ${controller.convertArrayToRGB(noteLibrary.getNoteSpectrum(noteCode), 0.1)}, ${controller.convertArrayToRGB(noteLibrary.getNoteSpectrum(noteCode), 0.7)}, ${controller.convertArrayToRGB(noteLibrary.getNoteSpectrum(noteCode), 0.9)})`
            crestPosition = controller.checkDecibelToCreateCrest(loudestFrequency.db)
            const noteLoudness = noteWrapperRecorded.getElementsByClassName('noteLoudness')[0]
            if (crestPosition < 1) {
                const crest = document.createElement('div')
                crest.className = 'crest'
                noteLoudness.appendChild(crest)
            } else {
                for (i = 0; i < crestPosition; i++) {
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
}
view.clearKeyWarapperColor = () => {
    const blackKey = document.getElementsByClassName('blackKey')
    for(one of blackKey) one.style.backgroundImage = ''
    const whiteKey = document.getElementsByClassName('whiteKey')
    for(one of whiteKey) one.style.backgroundImage = ''
}


view.setKeyboardContainer = () => {
    const noteMeterContainer = document.getElementById('noteMeterContainer')
    if(noteMeterContainer != undefined) {
        noteMeterContainer.style.display = 'none'
    }
    const pianoKeyboardContainer = document.createElement('div')
    pianoKeyboardContainer.id = 'pianoKeyboardContainer'
    pageContainer.appendChild(pianoKeyboardContainer)
    if(model.current.instrument==='piano'){view.setPianoKeyBoard()}
    else if(model.current.instrument==='guitar'){view.setGuitarKeyBoard()}
    model.current.function = 'keyBoard'
}
view.clearKeyboardContainer = () => {
    keyboardBtn.removeEventListener('click', keyboardBtnEnable)
    const pianoKeyboardContainer = document.getElementById('pianoKeyboardContainer')
    pageContainer.removeChild(pianoKeyboardContainer)
    keyboardBtn.addEventListener('click', keyboardBtnActive)
    const noteMeterContainer = document.getElementById('noteMeterContainer')
    if(noteMeterContainer != undefined) noteMeterContainer.style.display = 'flex'
    model.current.function = undefined
    if(model.current.instrument === 'piano') {
        document.removeEventListener('keydown', view.pianoKeyDown)
        document.removeEventListener('keyup', view.releasePianoSound)
        const guitarFretboardContainer = document.getElementById('guitarFretboardContainer')
        if(guitarFretboardContainer != undefined && guitarFretboardContainer != null) pageContainer.removeChild(guitarFretboardContainer)
    }
    if(model.current.instrument === 'guitar') {
        document.removeEventListener('keydown', view.guitarKeyDown)
        document.removeEventListener('keyup', view.releaseGuitarSound)
        const guitarFretboardContainer = document.getElementById('guitarFretboardContainer')
        if(guitarFretboardContainer != undefined && guitarFretboardContainer != null) {view.setGuitarFretBoard(guitarFretboardContainer, 0, -105)}
    }
    model.current.playingNotes = []

}


view.setPianoKeyBoard = () => {
    const playingNotes = []
    model.current.instrument = 'piano'
    const pianoKeyboardContainer = document.getElementById('pianoKeyboardContainer')
    pianoKeyboardContainer.innerHTML = components.pianoKeyboard
    const guitarSoundBtn = document.getElementById('guitarSoundBtn')
    const keyboardCloseBtn = document.getElementById('keyboardCloseBtn')
    guitarSoundBtn.addEventListener('click', ()=>{view.setGuitarKeyBoard()})
    keyboardCloseBtn.addEventListener('click', () => {view.clearKeyboardContainer()})
    const pianoKeyboard = document.getElementById('pianoKeyboard')
    for (i = 0; i < 15; i++) {
        const keysWrapper = document.createElement('div')
        keysWrapper.className = 'keysWrapper'
        if (i === 14) {
            keysWrapper.style.width = `${100/50}%`
            const newKey = document.createElement('div')
            newKey.id = `${1 + 6 * i}pi`
            const newNoteCode = 1 + 6 * i
            newKey.className = 'whiteKey'
            newKey.style.width = `${100}%`
            newKey.innerHTML = `
                <div class="topKey">
                    <div class="noteKey">${controller.checkNoteKeyFromNoteCode(newNoteCode, 'piano')}</div>
                    <div class="noteName">
                        <div class="className">${noteLibrary.getNoteClassName(newNoteCode)}</div>
                        <div class="octave">${noteLibrary.getNoteOctave(newNoteCode)}</div>
                    </div>
                </div>
                <div class="botKey"></div>
            `
            newKey.addEventListener('mousedown', () => {sound.playNoteByClick(newKey)})
            keysWrapper.appendChild(newKey)
        } else {
            if (i === 0 || i % 2 === 0) {
                keysWrapper.style.width = `calc(${300 / 50}% - 2px)`
                for (k = 1; k < 6; k++) {
                    const newKey = document.createElement('div')
                    newKey.id = `${k + i * 6}pi`
                    const newNoteCode = k + i * 6
                    if (k === 2 || k === 4) {
                        newKey.className = 'blackKey'
                        newKey.style.width = `calc(${100 / 3}% - 2px)`
                        if(k===2) newKey.style.left = `${100/6}%`
                        else newKey.style.right = `${100/6}%`
                        newKey.innerHTML = `
                            <div class="topKey">
                                <div class="noteKey">${controller.checkNoteKeyFromNoteCode(newNoteCode, 'piano')}</div>
                            </div>
                            <div id='${controller.getKeyCodeFromNoteCode(newNoteCode, 'piano')}' class="botKey"></div>
                        `
                    } else {
                        newKey.className = 'whiteKey'
                        newKey.style.width = `${100 / 3}%`
                        newKey.innerHTML = `
                            <div class="topKey">
                                <div class="noteKey">${controller.checkNoteKeyFromNoteCode(newNoteCode, 'piano')}</div>
                                <div class="noteName">
                                    <div class="className">${noteLibrary.getNoteClassName(newNoteCode)}</div>
                                    <div class="octave">${noteLibrary.getNoteOctave(newNoteCode)}</div>
                                </div>
                            </div>
                            <div id='${controller.getKeyCodeFromNoteCode(newNoteCode, 'piano')}' class="botKey"></div>
                        `
                    }
                    newKey.addEventListener('mousedown', () => {sound.playNoteByClick(newKey)})
                    keysWrapper.appendChild(newKey)
                }
            } else if (i === 1 || i % 2 === 1) {
                keysWrapper.style.width = `${400 / 50}%`
                for (k = 1; k < 8; k++) {
                    const newKey = document.createElement('div')
                    newKey.id = `${k + 5 + 6 * ( i - 1)}pi`
                    const newNoteCode = k + 5 + 6 * ( i - 1)
                    if (k === 2 || k === 4 || k === 6) {
                        newKey.className = 'blackKey'
                        newKey.style.width = `calc(${100 / 4}% - 2px)`
                        if(k===2) newKey.style.left = `${100/8}%`
                        else if (k===4) newKey.style.left = `calc(${75/2}% + 1px)`
                        else newKey.style.right = `${100/8}%`
                        newKey.innerHTML = `
                            <div class="topKey">
                                <div class="noteKey">${controller.checkNoteKeyFromNoteCode(newNoteCode, 'piano')}</div>
                            </div>
                            <div id='${controller.getKeyCodeFromNoteCode(newNoteCode, 'piano')}' class="botKey"></div>
                        `
                    } else {
                        newKey.className = 'whiteKey'
                        newKey.style.width = `${100 / 4}%`
                        newKey.innerHTML = `
                            <div class="topKey">
                                <div class="noteKey">${controller.checkNoteKeyFromNoteCode(newNoteCode, 'piano')}</div>
                                <div class="noteName">
                                    <div class="className">${noteLibrary.getNoteClassName(newNoteCode)}</div>
                                    <div class="octave">${noteLibrary.getNoteOctave(newNoteCode)}</div>
                                </div>
                            </div>
                            <div id='${controller.getKeyCodeFromNoteCode(newNoteCode, 'piano')}' class="botKey"></div>
                        `
                    }
                    newKey.addEventListener('mousedown', () => {sound.playNoteByClick(newKey)})
                    keysWrapper.appendChild(newKey)
                }
            }
        }
        pianoKeyboard.appendChild(keysWrapper)
    }

    const guitarFretboardContainer = document.getElementById('guitarFretboardContainer')
    if(guitarFretboardContainer != undefined && guitarFretboardContainer != null) {
        view.setGuitarFretBoard(guitarFretboardContainer, 0, -100)
    }


    document.removeEventListener('keydown', view.guitarKeyDown)
    document.removeEventListener('keyup', view.releaseGuitarSound)
    document.addEventListener('keydown', view.pianoKeyDown = (e) => {
        e.preventDefault();
        noteCode = controller.checkPianoNoteKeys(e.code)
        if(model.current.playingNotes.indexOf(noteCode) === -1) {
            if(noteCode != null) {
                model.current.playingNotes.push(noteCode)
                const playingNote = sound.playNoteByPressKey(noteCode)
                playingNotes.push(playingNote)
            }
        }
    })


    document.addEventListener('keyup', view.releasePianoSound = (e) => {
        if(model.current.function === 'keyBoard') {
            noteCode = controller.checkPianoNoteKeys(e.code)
            if(noteCode != undefined) {
                const playingNote = controller.checkPlayingNote(playingNotes, noteCode)
                if(playingNote != 'none') {
                    if(playingNote.noteCode === noteCode) {
                        const releasedKey = document.getElementById(model.pianoKeysCode[noteCode-25]).parentElement
                        view.releaseNote(releasedKey)
                        if(playingNote.noteSound.currentTime >= 0.3) {
                            sound.releaseNoteFromKeyUp(playingNotes, playingNote, noteCode)
                            model.current.playingNotes.splice(model.current.playingNotes.indexOf(noteCode), 1)
                        } else {
                            setTimeout(()=>{
                                sound.releaseNoteFromKeyUp(playingNotes, playingNote, noteCode)
                                model.current.playingNotes.splice(model.current.playingNotes.indexOf(noteCode), 1)
                            }, 120)
                        }
                    }
                }
            }
        }
    })

}
view.setGuitarKeyBoard = () => {
    const playingNotes = []
    model.current.instrument = 'guitar'
    const pianoKeyboardContainer = document.getElementById('pianoKeyboardContainer')
    pianoKeyboardContainer.innerHTML = components.guitarKeyboard
    const pianoSoundBtn = document.getElementById('pianoSoundBtn')
    const keyboardCloseBtn = document.getElementById('keyboardCloseBtn')
    pianoSoundBtn.addEventListener('click', () => {view.setPianoKeyBoard()})
    keyboardCloseBtn.addEventListener('click', () => {view.clearKeyboardContainer()})
    const guitarKeyboard = document.getElementById('guitarKeyboard')
    for (i = 0; i < 11; i++) {
        const keysWrapper = document.createElement('div')
        keysWrapper.className = 'keysWrapper'
        if(i === 0 || i % 2 === 0) {
            keysWrapper.style.width = `${300 / 35}%`
            for(k = 1; k < 6; k++) {
                for (k = 1; k < 6; k++) {
                    const newKey = document.createElement('div')
                    newKey.id = `${k + 12 * (i/2 + 1)}gu`
                    const newNoteCode = k + 12 * (i/2 + 1)
                    if (k === 2 || k === 4) {
                        newKey.className = 'blackKey'
                        newKey.style.width = `calc(${100 / 3}% - 2px)`
                        if(k===2) newKey.style.left = `${100/6}%`
                        else newKey.style.right = `${100/6}%`
                        newKey.innerHTML = `
                            <div class="topKey">
                                <div class="noteKey">${controller.checkNoteKeyFromNoteCode(newNoteCode, 'guitar')}</div>
                            </div>
                            <div id='${controller.getKeyCodeFromNoteCode(newNoteCode, 'guitar')}' class="botKey"></div>
                        `
                    } else {
                        newKey.className = 'whiteKey'
                        newKey.style.width = `${100 / 3}%`
                        newKey.innerHTML = `
                            <div class="topKey">
                                <div class="noteKey">${controller.checkNoteKeyFromNoteCode(newNoteCode, 'guitar')}</div>
                                <div class="noteName">
                                    <div class="className">${noteLibrary.getNoteClassName(newNoteCode)}</div>
                                    <div class="octave">${noteLibrary.getNoteOctave(newNoteCode)}</div>
                                </div>
                            </div>
                            <div  id='${controller.getKeyCodeFromNoteCode(newNoteCode, 'guitar')}' class="botKey"></div>
                        `
                    }
                    newKey.addEventListener('mousedown', () => {sound.playNoteByClick(newKey)})
                    keysWrapper.appendChild(newKey)
                }
            }
        } else {
            keysWrapper.style.width = `${400 / 35}%`
            for (k = 1; k < 8; k++) {
                const newKey = document.createElement('div')
                newKey.id = `${5 + k + 12 * (i + 1 )/2}gu`
                const newNoteCode = 5 + k + 12 * (i + 1 )/2
                if (k === 2 || k === 4 || k === 6) {
                    newKey.className = 'blackKey'
                    newKey.style.width = `calc(${100 / 4}% - 2px)`
                    if(k===2) newKey.style.left = `${100/8}%`
                    else if (k===4) newKey.style.left = `calc(${75/2}% + 1px)`
                    else newKey.style.right = `${100/8}%`
                    newKey.innerHTML = `
                        <div class="topKey">
                            <div class="noteKey">${controller.checkNoteKeyFromNoteCode(newNoteCode, 'guitar')}</div>
                        </div>
                        <div id='${controller.getKeyCodeFromNoteCode(newNoteCode, 'guitar')}' class="botKey"></div>
                    `
                } else {
                    newKey.className = 'whiteKey'
                    newKey.style.width = `${100 / 4}%`
                    newKey.innerHTML = `
                        <div class="topKey">
                            <div class="noteKey">${controller.checkNoteKeyFromNoteCode(newNoteCode, 'guitar')}</div>
                            <div class="noteName">
                                <div class="className">${noteLibrary.getNoteClassName(newNoteCode)}</div>
                                <div class="octave">${noteLibrary.getNoteOctave(newNoteCode)}</div>
                            </div>
                        </div>
                        <div id='${controller.getKeyCodeFromNoteCode(newNoteCode, 'guitar')}' class="botKey"></div>
                    `
                }
                newKey.addEventListener('mousedown', () => {sound.playNoteByClick(newKey)})
                keysWrapper.appendChild(newKey)
            }
        }
        guitarKeyboard.appendChild(keysWrapper)
    }

    const guitarFretboardContainer = document.getElementById('guitarFretboardContainer')
    if(guitarFretboardContainer === null) {
        const newGuitarFretboardContainer = document.createElement('div')
        newGuitarFretboardContainer.id = "guitarFretboardContainer"
        newGuitarFretboardContainer.innerHTML = components.guitarFretboard
        pageContainer.appendChild(newGuitarFretboardContainer)
        view.setGuitarFretBoard(newGuitarFretboardContainer, -100, 0)
    } else {
        view.setGuitarFretBoard(guitarFretboardContainer, -100, 0)
    }

    document.removeEventListener('keydown', view.pianoKeyDown)
    document.removeEventListener('keyup', view.releasePianoSound)
    document.addEventListener('keydown', view.guitarKeyDown = (e) => {
        e.preventDefault();
        noteCode = controller.checkGuitarNoteKeys(e.code)
        if(model.current.playingNotes.indexOf(noteCode) === -1) {
            if(noteCode != undefined) {
                model.current.playingNotes.push(noteCode)
                const playingNote = sound.playNoteByPressKey(noteCode)
                playingNotes.push(playingNote)
            }
        }
    })


    document.addEventListener('keyup', view.releaseGuitarSound = (e) => {
        if(model.current.function === 'keyBoard') {
            noteCode = controller.checkGuitarNoteKeys(e.code)
            if(noteCode != undefined) {
                const playingNote = controller.checkPlayingNote(playingNotes, noteCode)
                if(playingNote != 'none') {
                    if(playingNote.noteCode === noteCode) {
                        const releasedKey = document.getElementById(model.guitarKeysCode[noteCode-17]).parentElement
                        view.releaseNote(releasedKey)
                        if(playingNote.noteSound.currentTime >= 0.5) {
                            sound.releaseNoteFromKeyUp(playingNotes, playingNote, noteCode)
                            model.current.playingNotes.splice(model.current.playingNotes.indexOf(noteCode), 1)
                        } else {
                            setTimeout(()=>{
                                sound.releaseNoteFromKeyUp(playingNotes, playingNote, noteCode)
                                model.current.playingNotes.splice(model.current.playingNotes.indexOf(noteCode), 1)
                            }, 300)
                        }
                    }
                }
            }
        }
    })

}

view.holdNote = noteElement => {
    if(noteElement.className === 'whiteKey') {
        noteElement.children[0].classList.add('holdingWhiteKey')
    } else {
        noteElement.children[0].classList.add('holdingBlackKey')
    }
}
view.releaseNote = noteElement => {
    noteElement.children[0].className = 'topKey'
}

view.setGuitarFretBoard = (guitarFretboardContainer, startIndex, endIndex) => {
    var containerAnimation, mainPadding
    clearInterval(containerAnimation)
    const mainContainer = document.getElementById('mainContainer')
    if(startIndex - endIndex > 0) {
        mainPadding = 15
        containerAnimation = setInterval(()=>{
            guitarFretboardContainer.style.left = `${startIndex}vw`
            startIndex -= 2
            opacity =  (startIndex + 150)/100
            if(opacity < 0.5) opacity = 0.5
            guitarFretboardContainer.style.opacity = opacity


            mainContainer.style.paddingTop = `${mainPadding}vw`
            mainPadding -= 0.3
            if(mainPadding <= 5) mainContainer.style.paddingTop = `5vh`


            if(startIndex <= endIndex) {
                if(endIndex === -100) {
                    guitarFretboardContainer.style.left = `${endIndex}vw`
                    guitarFretboardContainer.style.opacity = 1
                } else {
                    // const pageContainer = document.getElementsByClassName('findContainer')[0]
                    for(i=0;i<pageContainer.children.length;i++) {
                        if(pageContainer.children[i] === guitarFretboardContainer) {
                            pageContainer.removeChild(guitarFretboardContainer)
                        }
                    }
                }
                clearInterval(containerAnimation)
            }
        }, 10)
    } else if(startIndex - endIndex < 0) {
        mainPadding = 5
        containerAnimation = setInterval(()=>{
            guitarFretboardContainer.style.left = `${startIndex}vw`
            startIndex += 2
            opacity = (150 + startIndex)/100
            if(opacity > 1) opacity = 1
            guitarFretboardContainer.style.opacity = opacity

            mainContainer.style.paddingTop = `${mainPadding}vh`
            mainPadding += 0.3
            if(mainPadding >= 15) mainContainer.style.paddingTop = `15vw`

            if(startIndex >= endIndex) {
                guitarFretboardContainer.style.left = `${endIndex}vw`
                clearInterval(containerAnimation)
            }
        }, 10)
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