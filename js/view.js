const view = {};
document.draggable = false


/// view setScreen
const pageContainer = document.getElementsByClassName('findContainer')[0]
const tempoBtn = document.getElementById('tempoBtn')
const frequencyBtn = document.getElementById('frequencyBtn')
const keyboardBtn = document.getElementById('keyboardBtn')
const mediaBtn = document.getElementById('mediaBtn')
const infoBtn = document.getElementById('infoBtn')




view.tempoBtnActive = () => {
    const tempoBtn = document.getElementById('tempoBtn')
    tempoBtn.removeEventListener('click', view.tempoBtnActive)
    view.setTempoMeterContainer()
    tempoBtn.addEventListener('click', view.tempoBtnEnable)
}
view.tempoBtnEnable = () => {
    const tempoBtn = document.getElementById('tempoBtn')
    tempoBtn.removeEventListener('click', view.tempoBtnEnable)
    view.clearTempoMeterContainer()
    tempoBtn.addEventListener('click', view.tempoBtnActive)
}

view.setTempoMeterContainer = () => {
    const pageContainer = document.getElementsByClassName('findContainer')[0]
    const tempoMeterContainer = document.createElement('div')
    tempoMeterContainer.id = 'tempoMeterContainer'
    tempoMeterContainer.innerHTML = components.tempoMeter
    pageContainer.appendChild(tempoMeterContainer);
    const tempoCloseBtn = document.getElementById('tempoCloseBtn')
    tempoCloseBtn.addEventListener('click', view.tempoBtnEnable)
    const beatPad = document.getElementById('beatPad')
    const tempoValue = document.getElementsByClassName('tempoValue')[0]
    const tempoUnit = document.getElementsByClassName('tempoUnit')[0]
    const tempoClick = document.getElementById('tempoClickRange')
    tempoMeterLibrary.tempoMeter(beatPad, tempoValue, tempoUnit, tempoClick)
}
view.clearTempoMeterContainer = () => {
    const pageContainer = document.getElementsByClassName('findContainer')[0]
    const tempoMeterContainer = document.getElementById('tempoMeterContainer')
    pageContainer.removeChild(tempoMeterContainer)
}



view.frequencyBtnActive = () => {
    const frequencyBtn = document.getElementById('frequencyBtn')
    frequencyBtn.removeEventListener('click', view.frequencyBtnActive)
    view.setFrequencyMeterContainer()
    frequencyBtn.addEventListener('click', view.frequencyBtnEnable)
}
view.frequencyBtnEnable = () => {
    const frequencyBtn = document.getElementById('frequencyBtn')
    frequencyBtn.removeEventListener('click', view.frequencyBtnEnable)
    view.clearFrequencyMeterContainer()
    frequencyBtn.addEventListener('click', view.frequencyBtnActive)
}

view.setFrequencyMeterContainer = () => {
    const pageContainer = document.getElementsByClassName('findContainer')[0]
    const noteMeterContainer = document.createElement('div')
    noteMeterContainer.id = 'noteMeterContainer'
    const pianoKeyboardContainer = document.getElementById('pianoKeyboardContainer')
    if (pianoKeyboardContainer != null) noteMeterContainer.style.display = 'none'
    for (i = 13; i < 74; i++) {
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
    const pageContainer = document.getElementsByClassName('findContainer')[0]
    const noteMeterContainer = document.getElementById('noteMeterContainer')
    pageContainer.removeChild(noteMeterContainer)
    sound.stopMicroStreamAnalize()
    view.clearKeyWarapperColor()
}

view.setFrequencyMeterRecordedNote = (loudestFrequencies) => {
    /////// clear noteWrapper and keyboard before set new one
    const noteWrapper = document.getElementsByClassName('noteWrapper')
    for (i = 1; i < noteWrapper.length; i++) {
        noteWrapper[i].style.backgroundImage = `linear-gradient(to bottom, ${controller.convertArrayToRGB(noteLibrary.getNoteSpectrum(i + 1), 0.6)}, ${controller.convertArrayToRGB(noteLibrary.getNoteSpectrum(i + 1), 0.3)}, rgb(255, 255, 255, 0.1))`
        noteWrapper[i].lastChild.innerHTML = ''
    }
    const blackKey = document.getElementsByClassName('blackKey')
    for (one of blackKey) {
        one.style.backgroundImage = '';
        one.style.backgroundColor = 'rgb(100, 100, 100)'
    }
    const whiteKey = document.getElementsByClassName('whiteKey')
    for (one of whiteKey) one.style.backgroundImage = ''
    for (loudestFrequency of loudestFrequencies) {
        noteCode = noteLibrary.getNoteCodeFromFrequency(loudestFrequency.hz);
        if (noteCode <= 96) {
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
            if (noteWrapperRecorded != undefined) {
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
}
view.clearKeyWarapperColor = () => {
    const blackKey = document.getElementsByClassName('blackKey')
    for (one of blackKey) one.style.backgroundImage = ''
    const whiteKey = document.getElementsByClassName('whiteKey')
    for (one of whiteKey) one.style.backgroundImage = ''
}




view.keyboardBtnActive = () => {
    const keyboardBtn = document.getElementById('keyboardBtn')
    keyboardBtn.removeEventListener('click', view.keyboardBtnActive)
    view.setKeyboardContainer()
    keyboardBtn.addEventListener('click', view.keyboardBtnEnable)
}
view.keyboardBtnEnable = () => {
    const keyboardBtn = document.getElementById('keyboardBtn')
    keyboardBtn.removeEventListener('click', view.keyboardBtnEnable)
    view.clearKeyboardContainer()
    keyboardBtn.addEventListener('click', view.keyboardBtnActive)
}

view.setKeyboardContainer = () => {
    const pageContainer = document.getElementsByClassName('findContainer')[0]
    const noteMeterContainer = document.getElementById('noteMeterContainer')
    if (noteMeterContainer != undefined) {
        noteMeterContainer.style.display = 'none'
    }
    const pianoKeyboardContainer = document.createElement('div')
    pianoKeyboardContainer.id = 'pianoKeyboardContainer'
    pageContainer.appendChild(pianoKeyboardContainer)
    if (model.current.instrument === 'piano') { view.setPianoKeyBoard() }
    else if (model.current.instrument === 'guitar') { view.setGuitarKeyBoard() }
    const mediaBtn = document.getElementById('mediaBtn')
    view.clearOpositeBtn(mediaBtn)
    view.setAppStatus('Opened keyboard')
}
view.clearKeyboardContainer = () => {
    const pageContainer = document.getElementsByClassName('findContainer')[0]
    const pianoKeyboardContainer = document.getElementById('pianoKeyboardContainer')
    const keyboardBtn = document.getElementById('keyboardBtn')
    keyboardBtn.removeEventListener('click', view.keyboardBtnEnable)
    pageContainer.removeChild(pianoKeyboardContainer)
    keyboardBtn.addEventListener('click', view.keyboardBtnActive)
    const noteMeterContainer = document.getElementById('noteMeterContainer')
    if (noteMeterContainer != undefined) noteMeterContainer.style.display = 'flex'
    if (model.current.instrument === 'piano') {
        document.removeEventListener('keydown', view.pianoKeyDown)
        document.removeEventListener('keyup', view.releasePianoSound)
        const guitarFretboardContainer = document.getElementById('guitarFretboardContainer')
        if (guitarFretboardContainer != undefined && guitarFretboardContainer != null) pageContainer.removeChild(guitarFretboardContainer)
    }
    if (model.current.instrument === 'guitar') {
        document.removeEventListener('keydown', view.guitarKeyDown)
        document.removeEventListener('keyup', view.releaseGuitarSound)
        const guitarFretboardContainer = document.getElementById('guitarFretboardContainer')
        if (guitarFretboardContainer != undefined && guitarFretboardContainer != null) { view.setGuitarFretBoard(guitarFretboardContainer, 0, -105) }
    }
    view.setBackOpositeBtn('media')
    view.setAppStatus('Closed keyboard')
    model.current.playingNotes = []
}

view.setPianoKeyBoard = () => {
    const playingNotes = []
    model.current.instrument = 'piano'
    const pianoKeyboardContainer = document.getElementById('pianoKeyboardContainer')
    pianoKeyboardContainer.innerHTML = components.pianoKeyboard
    const guitarSoundBtn = document.getElementById('guitarSoundBtn')
    const keyboardCloseBtn = document.getElementById('keyboardCloseBtn')
    guitarSoundBtn.addEventListener('click', () => { view.setGuitarKeyBoard() })
    keyboardCloseBtn.addEventListener('click', () => { view.clearKeyboardContainer() })
    const pianoKeyboard = document.getElementById('pianoKeyboard')
    for (i = 2; i < 15; i++) {
        const keysWrapper = document.createElement('div')
        keysWrapper.className = 'keysWrapper'
        if (i === 14) {
            keysWrapper.style.width = `${100 / 37}%`
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
            newKey.addEventListener('mousedown', () => { sound.playNoteByClick(newKey) })
            keysWrapper.appendChild(newKey)
        } else {
            if (i % 2 === 0) {
                keysWrapper.style.width = `calc(${300 / 37}% - 2px)`
                for (k = 1; k < 6; k++) {
                    const newKey = document.createElement('div')
                    newKey.id = `${k + i * 6}pi`
                    const newNoteCode = k + i * 6
                    if (k === 2 || k === 4) {
                        newKey.className = 'blackKey'
                        newKey.style.width = `calc(${100 / 3}% - 2px)`
                        if (k === 2) newKey.style.left = `${100 / 6}%`
                        else newKey.style.right = `${100 / 6}%`
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
                    newKey.addEventListener('mousedown', () => { sound.playNoteByClick(newKey) })
                    keysWrapper.appendChild(newKey)
                }
            } else if (i % 2 === 1) {
                keysWrapper.style.width = `${400 / 37}%`
                for (k = 1; k < 8; k++) {
                    const newKey = document.createElement('div')
                    newKey.id = `${k + 5 + 6 * (i - 1)}pi`
                    const newNoteCode = k + 5 + 6 * (i - 1)
                    if (k === 2 || k === 4 || k === 6) {
                        newKey.className = 'blackKey'
                        newKey.style.width = `calc(${100 / 4}% - 2px)`
                        if (k === 2) newKey.style.left = `${100 / 8}%`
                        else if (k === 4) newKey.style.left = `calc(${75 / 2}% + 1px)`
                        else newKey.style.right = `${100 / 8}%`
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
                    newKey.addEventListener('mousedown', () => { sound.playNoteByClick(newKey) })
                    keysWrapper.appendChild(newKey)
                }
            }
        }
        pianoKeyboard.appendChild(keysWrapper)
    }

    const guitarFretboardContainer = document.getElementById('guitarFretboardContainer')
    if (guitarFretboardContainer != undefined && guitarFretboardContainer != null) {
        view.setGuitarFretBoard(guitarFretboardContainer, 0, -100)
    }


    document.removeEventListener('keydown', view.guitarKeyDown)
    document.removeEventListener('keyup', view.releaseGuitarSound)
    document.addEventListener('keydown', view.pianoKeyDown = (e) => {
        e.preventDefault();
        noteCode = controller.checkPianoNoteKeys(e.code)
        if (model.current.playingNotes.indexOf(noteCode) === -1) {
            if (noteCode != null) {
                model.current.playingNotes.push(noteCode)
                const playingNote = sound.playNoteByPressKey(noteCode)
                playingNotes.push(playingNote)
            }
        }
    })


    document.addEventListener('keyup', view.releasePianoSound = (e) => {
        const pianoKeyboardContainer = document.getElementById('pianoKeyboardContainer')
        if (model.current.instrument === 'piano' && pianoKeyboardContainer != undefined) {
            noteCode = controller.checkPianoNoteKeys(e.code)
            if (noteCode != undefined) {
                const playingNote = controller.checkPlayingNote(playingNotes, noteCode)
                if (playingNote != 'none') {
                    if (playingNote.noteCode === noteCode) {
                        const releasedKey = document.getElementById(model.pianoKeysCode[noteCode - 25]).parentElement
                        view.releaseNote(releasedKey)
                        if (playingNote.noteSound.currentTime >= 0.3) {
                            sound.releaseNoteFromKeyUp(playingNotes, playingNote, noteCode)
                            model.current.playingNotes.splice(model.current.playingNotes.indexOf(noteCode), 1)
                        } else {
                            setTimeout(() => {
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
    pianoSoundBtn.addEventListener('click', () => { view.setPianoKeyBoard() })
    keyboardCloseBtn.addEventListener('click', () => { view.clearKeyboardContainer() })
    const guitarKeyboard = document.getElementById('guitarKeyboard')
    for (i = 0; i < 11; i++) {
        const keysWrapper = document.createElement('div')
        keysWrapper.className = 'keysWrapper'
        if (i === 0 || i % 2 === 0) {
            keysWrapper.style.width = `${300 / 35}%`
            for (k = 1; k < 6; k++) {
                for (k = 1; k < 6; k++) {
                    const newKey = document.createElement('div')
                    newKey.id = `${k + 12 * (i / 2 + 1)}gu`
                    const newNoteCode = k + 12 * (i / 2 + 1)
                    if (k === 2 || k === 4) {
                        newKey.className = 'blackKey'
                        newKey.style.width = `calc(${100 / 3}% - 2px)`
                        if (k === 2) newKey.style.left = `${100 / 6}%`
                        else newKey.style.right = `${100 / 6}%`
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
                    newKey.addEventListener('mousedown', () => { sound.playNoteByClick(newKey) })
                    keysWrapper.appendChild(newKey)
                }
            }
        } else {
            keysWrapper.style.width = `${400 / 35}%`
            for (k = 1; k < 8; k++) {
                const newKey = document.createElement('div')
                newKey.id = `${5 + k + 12 * (i + 1) / 2}gu`
                const newNoteCode = 5 + k + 12 * (i + 1) / 2
                if (k === 2 || k === 4 || k === 6) {
                    newKey.className = 'blackKey'
                    newKey.style.width = `calc(${100 / 4}% - 2px)`
                    if (k === 2) newKey.style.left = `${100 / 8}%`
                    else if (k === 4) newKey.style.left = `calc(${75 / 2}% + 1px)`
                    else newKey.style.right = `${100 / 8}%`
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
                newKey.addEventListener('mousedown', () => { sound.playNoteByClick(newKey) })
                keysWrapper.appendChild(newKey)
            }
        }
        guitarKeyboard.appendChild(keysWrapper)
    }

    const guitarFretboardContainer = document.getElementById('guitarFretboardContainer')
    if (guitarFretboardContainer === null) {
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
        if (model.current.playingNotes.indexOf(noteCode) === -1) {
            if (noteCode != undefined) {
                model.current.playingNotes.push(noteCode)
                const playingNote = sound.playNoteByPressKey(noteCode)
                playingNotes.push(playingNote)
            }
        }
    })


    document.addEventListener('keyup', view.releaseGuitarSound = (e) => {
        const pianoKeyboardContainer = document.getElementById('pianoKeyboardContainer')
        if (model.current.instrument === 'guitar' && pianoKeyboardContainer != undefined) {
            noteCode = controller.checkGuitarNoteKeys(e.code)
            if (noteCode != undefined) {
                const playingNote = controller.checkPlayingNote(playingNotes, noteCode)
                if (playingNote != 'none') {
                    if (playingNote.noteCode === noteCode) {
                        const releasedKey = document.getElementById(model.guitarKeysCode[noteCode - 17]).parentElement
                        view.releaseNote(releasedKey)
                        if (playingNote.noteSound.currentTime >= 0.5) {
                            sound.releaseNoteFromKeyUp(playingNotes, playingNote, noteCode)
                            model.current.playingNotes.splice(model.current.playingNotes.indexOf(noteCode), 1)
                        } else {
                            setTimeout(() => {
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
    if (noteElement.className === 'whiteKey') {
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
    if (startIndex - endIndex > 0) {
        view.dodgeGuitarFretboard(false)
        mainPadding = 15
        containerAnimation = setInterval(() => {
            guitarFretboardContainer.style.left = `${startIndex}vw`
            startIndex -= 2
            opacity = (startIndex + 150) / 100
            if (opacity < 0.5) opacity = 0.5
            guitarFretboardContainer.style.opacity = opacity
            mainContainer.style.paddingTop = `${mainPadding}vw`
            mainPadding -= 0.3
            if (mainPadding <= 5) mainContainer.style.paddingTop = `5vh`
            if (startIndex <= endIndex) {
                if (endIndex === -100) {
                    guitarFretboardContainer.style.left = `${endIndex}vw`
                    guitarFretboardContainer.style.opacity = 1
                } else {
                    for (i = 0; i < pageContainer.children.length; i++) {
                        if (pageContainer.children[i] === guitarFretboardContainer) {
                            pageContainer.removeChild(guitarFretboardContainer)
                        }
                    }
                }
                clearInterval(containerAnimation)
            }
        }, 10)
    } else if (startIndex - endIndex < 0) {
        view.dodgeGuitarFretboard(true)
        mainPadding = 5
        containerAnimation = setInterval(() => {
            guitarFretboardContainer.style.left = `${startIndex}vw`
            startIndex += 2
            opacity = (150 + startIndex) / 100
            if (opacity > 1) opacity = 1
            guitarFretboardContainer.style.opacity = opacity

            mainContainer.style.paddingTop = `${mainPadding}vh`
            mainPadding += 0.3
            if (mainPadding >= 15) mainContainer.style.paddingTop = `15vw`

            if (startIndex >= endIndex) {
                guitarFretboardContainer.style.left = `${endIndex}vw`
                clearInterval(containerAnimation)
            }
        }, 10)
    }
}

view.mediaBtnActive = () => {
    const mediaBtn = document.getElementById('mediaBtn')
    mediaBtn.removeEventListener('click', view.mediaBtnActive)
    view.setMediaContainer()
    mediaBtn.addEventListener('click', view.mediaBtnEnable)
}
view.mediaBtnEnable = () => {
    const mediaBtn = document.getElementById('mediaBtn')
    mediaBtn.removeEventListener('click', view.mediaBtnEnable)
    view.clearMediaContainer()
    mediaBtn.addEventListener('click', view.mediaBtnActive)
}

view.setMediaContainer = () => {
    const pageContainer = document.getElementsByClassName('findContainer')[0]
    const noteMeterContainer = document.getElementById('noteMeterContainer')
    if (noteMeterContainer != undefined) {
        noteMeterContainer.style.display = 'none'
    }
    const mediaContainer = document.createElement('div')
    mediaContainer.id = 'mediaContainer'
    mediaContainer.innerHTML = components.mediaContainer
    pageContainer.appendChild(mediaContainer)
    const mediaCloseBtn = document.getElementById('mediaCloseBtn')
    mediaCloseBtn.addEventListener('click', () => { view.clearMediaContainer() })
    const keyboardBtn = document.getElementById('keyboardBtn')
    view.clearOpositeBtn(keyboardBtn)
    view.setAppStatus('Opened media player')
}
view.clearMediaContainer = () => {
    const mediaBtn = document.getElementById('mediaBtn')
    const pageContainer = document.getElementsByClassName('findContainer')[0]
    const mediaContainer = document.getElementById('mediaContainer')
    mediaBtn.removeEventListener('click', view.mediaBtnEnable)
    pageContainer.removeChild(mediaContainer)
    mediaBtn.addEventListener('click', view.mediaBtnActive)
    const noteMeterContainer = document.getElementById('noteMeterContainer')
    if (noteMeterContainer != undefined) noteMeterContainer.style.display = 'flex'
    view.setBackOpositeBtn('keyboard')
    view.setAppStatus('Closed media player')
}






view.setBotMain = (mode) => {
    const pageContainer = document.getElementsByClassName('findContainer')[0]
    const botMain = document.getElementsByClassName('botMain')[0]
    const songInfoTitle = document.getElementsByClassName('songInfoTitle')
    songInfoTitle[1].addEventListener('wheel', e=>{
        if(e.deltaY > 0) {
            model.tempo.value--
            if(model.tempo.value < 20) model.tempo.value = 20
            view.setSongTempo(model.tempo.value)
        } else {
            model.tempo.value ++
            if(model.tempo.value>500) model.tempo.value = 500
            view.setSongTempo(model.tempo.value)
        }
    })
    songInfoTitle[2].addEventListener('wheel', e=>{
        if(e.deltaY > 0) {
            model.current.instrumentVolume -= 0.01
            if(model.current.instrumentVolume < 0) model.current.instrumentVolume = 0
            view.setSongVolume(Math.floor(model.current.instrumentVolume*100))
        } else {
            model.current.instrumentVolume += 0.01
            if(model.current.instrumentVolume > 1) model.current.instrumentVolume = 1
            view.setSongVolume(Math.floor(model.current.instrumentVolume*100))
        }
    })
    const activateFunctionMode = e => {
        const keyboardBtn = document.getElementById('keyboardBtn')
        const mediaBtn = document.getElementById('mediaBtn')
        if (e.target.id === "keyboardBtn") {
            pageContainer.removeChild(keyboardBtn)
            view.setKeyboardContainer()
            const keyboardOptional = document.getElementById('keyboardOptional')
            keyboardOptional.innerHTML = ``
            view.setAppStatus('Manually is activated')
            view.setMissions(components.missionFindLastNoteMessage)
            view.showSongLyric('manually')
        } else if (e.target.id === "mediaBtn") {
            pageContainer.removeChild(mediaBtn)
            view.setMediaContainer()
            const mediaContainer = document.getElementById('mediaContainer')
            const mediaCloseBtn = document.getElementById('mediaCloseBtn')
            mediaContainer.removeChild(mediaCloseBtn)
            view.setAppStatus('Automatic is activated')
            view.setMissions('')
            view.showSongLyric('autoFinding')
        }
    }
    if (mode === 'input') {
        view.setMissions('This small window will be guiding you to find out the chords step by step. <br>Type information about the song down below here')
        botMain.innerHTML = components.mainInputing
        const songsNameInput = document.getElementById('songsName')
        const songsLyricsInput = document.getElementById('lyrics')
        songsNameInput.addEventListener('keypress', e => { view.songsNameOninput(e) })
        songsNameInput.addEventListener('focusout', e => { view.songNameOnFocusOut(e) })
        songsLyricsInput.addEventListener('keypress', e => { view.songsLyricsOninput(e) })
    } else if (mode === 'edit') {
        botMain.innerHTML = components.mainEditing
        const songsNameInput = document.getElementById('songsName')
        songsNameInput.value = model.current.song.name
        songsNameInput.addEventListener('keypress', e => { view.songsNameOninput(e) })
        songsNameInput.addEventListener('focusout', e => { view.songNameOnFocusOut(e) })
        view.showSongLyric('readonly')
        const keyboardBtn = document.getElementById('keyboardBtn')
        const mediaBtn = document.getElementById('mediaBtn')
        const pianoKeyboardContainer = document.getElementById('pianoKeyboardContainer')
        const mediaContainer = document.getElementById('mediaContainer')
        if (pianoKeyboardContainer != undefined) view.keyboardBtnEnable()
        else if (mediaContainer != undefined) view.mediaBtnEnable()
        view.setMissions(components.missionEditingMessage)
        keyboardBtn.removeEventListener('click', view.keyboardBtnActive)
        mediaBtn.removeEventListener('click', view.mediaBtnActive)
        keyboardBtn.addEventListener('click', e => { activateFunctionMode(e) })
        mediaBtn.addEventListener('click', e => { activateFunctionMode(e) })
    }
}







view.showSongLyric = mode => {
    const songsName = document.getElementById('songsName')
    const songsContentShow = document.getElementById('songsContentShow')
    songsContentShow.innerHTML = ``
    model.current.song.noteChecked = []
    for (i = 0; i < model.current.song.lyricArray.length; i++) {
        const sentence = utils.createDivWithClassName('lyricsSentence')
        sentence.id = `${i + 1}st`
        if (mode === 'readonly') {
            songsName.disabled = false
            const lyricText = utils.createDivWithClassName('lyricsTexts')
            for (k = 0; k < model.current.song.lyricArray[i].length; k++) {
                const lyricWord = view.renderLyricWordOnly(i, k, 'only')
                lyricText.appendChild(lyricWord)
            }
            sentence.appendChild(lyricText)
        } else if (mode === 'manually') {
            model.current.song.noteCheckPosition = []
            model.current.song.addedChord = []
            model.current.song.finalChord = []
            songsName.disabled = true
            songsContentShow.style.paddingBottom = '170px'
            const lyricText = utils.createDivWithClassName('lyricsTexts')
            for (k = 0; k < model.current.song.lyricArray[i].length; k++) {
                const lyricWord = view.renderLyricWordIncludingNote(i, k)
                lyricText.appendChild(lyricWord)
            }
            sentence.appendChild(lyricText)
        } else if (mode === 'autoFinding') {
            songsContentShow.style.paddingBottom = '170px'
            const lyricText = utils.createDivWithClassName('lyricsTexts')
            for (k = 0; k < model.current.song.lyricArray[i].length; k++) {
                const lyricWord = view.renderLyricWordOnly(i, k)
                lyricText.appendChild(lyricWord)
            }
            sentence.appendChild(lyricText)
        } else if (mode === 'autoResutl') {
            const lyricText = utils.createDivWithClassName('lyricsTexts')
            for (k = 0; k < model.current.song.lyricArray[i].length; k++) {
                const lyricWord = view.renderLyricWord(i, k)
                lyricText.appendChild(lyricWord)
            }
            sentence.appendChild(lyricText)
        }
        songsContentShow.appendChild(sentence)
    }
    if (mode === 'readonly') {
        const songsLyricsInput = document.createElement('form')
        songsLyricsInput.className = 'smallLyrics'
        songsLyricsInput.id = 'lyrics'
        songsLyricsInput.innerHTML = components.mainEditingTextarea
        songsLyricsInput.addEventListener('keypress', e => { view.songsLyricsOninput(e) })
        songsContentShow.appendChild(songsLyricsInput)
        songsLyricsInput.lyric.value = model.current.song.lyricString
    }
}

view.renderLyricWordOnly = (i, k, comesWith) => {
    const lyricWord = utils.createDivWithClassName('lyricsWord')
    const wordText = utils.createDivWithClassName('wordsText')
    wordText.innerText = model.current.song.lyricArray[i][k]
    if (comesWith === 'only') {
        wordText.addEventListener('mouseenter', e => view.renderChangeSentenceInput(e, comesWith))
    }
    lyricWord.appendChild(wordText)
    return lyricWord
}
view.renderLyricWordIncludingNote = (i, k) => {
    const lyricWord = utils.createDivWithClassName('lyricsWord')
    const noteChecks = utils.createDivWithClassName('noteChecks')
    const wordText = utils.createDivWithClassName('wordsText')
    const wordNotes = utils.createDivWithClassName('wordsNotes')
    const wordNote = utils.createDivWithClassName('wordsNote')
    const noteInput = document.createElement('input')
    noteInput.type = 'text'
    noteInput.maxLength = '1'
    noteInput.placeholder = 'N'
    noteInput.addEventListener('keydown', e => { controller.checkNoteInput(e) })
    noteInput.addEventListener('mouseenter', () => { noteInput.focus() })
    noteInput.addEventListener('mouseleave', () => { noteInput.blur() })
    wordText.innerText = model.current.song.lyricArray[i][k]
    wordNote.appendChild(noteInput)
    wordNotes.appendChild(wordNote)
    lyricWord.appendChild(wordText)
    lyricWord.appendChild(wordNotes)
    lyricWord.appendChild(noteChecks)
    return lyricWord
}
view.addCheckNoteWrapper = () => {
    model.current.song.noteChecked = []
    const songNote = model.current.song.noteForSave
    for (let i = 0; i < songNote.length; i++) {
        const sentenceNote = songNote[i]
        const sentenceElement = document.getElementById(`${i + 1}st`).firstChild
        for (let j = 0; j < sentenceNote.length; j++) {
            const wordNote = sentenceNote[j]
            const wordElement = sentenceElement.children[j].lastChild
            wordElement.innerHTML = ``
            wordElement.style.display = 'none'
            sentenceElement.parentElement.addEventListener('mouseover', ()=>{wordElement.style.display = 'none'})
            sentenceElement.parentElement.addEventListener('mouseout', ()=>{wordElement.style.display = 'none'})
            for (let k = 0; k < wordNote.length; k++) {
                const oneNoteClassWrapper = utils.createDivWithClassName('noteCheck')
                wordElement.appendChild(oneNoteClassWrapper)
            }
        }
    }
}
view.addCheckNote = () => {
    model.current.song.noteChecked = []
    const songNote = model.current.song.noteForSave
    for (let i = 0; i < songNote.length; i++) {
        const sentenceNote = songNote[i]
        const sentenceElement = document.getElementById(`${i + 1}st`).firstChild
        for (let j = 0; j < sentenceNote.length; j++) {
            const wordNote = sentenceNote[j]
            const wordElement = sentenceElement.children[j].lastChild
            wordElement.innerHTML = ``
            wordElement.style.display = 'none'
            sentenceElement.parentElement.addEventListener('mouseover', ()=>{wordElement.style.display = 'flex'})
            sentenceElement.parentElement.addEventListener('mouseout', ()=>{wordElement.style.display = 'none'})
            for (let k = 0; k < wordNote.length; k++) {
                const oneNote = wordNote[k]
                const oneNoteClassWrapper = utils.createDivWithClassName('noteCheck')
                const oneNoteClassCode = noteLibrary.getNoteScaleToTwelveFromClassName(oneNote)
                if (oneNoteClassCode != -1) {
                    let oneElement = document.createElement('input')
                    oneElement.type = 'checkbox'
                    oneElement.addEventListener('click', e=>{controller.noteChecked(e)})
                    oneNoteClassWrapper.appendChild(oneElement)
                    if (oneNoteClassCode === 2 || oneNoteClassCode === 4 || oneNoteClassCode === 7 || oneNoteClassCode === 9 || oneNoteClassCode === 1) {
                        let addedWidth = utils.createDivWithClassName('addWidth')
                        oneNoteClassWrapper.appendChild(addedWidth)
                    }
                }
                wordElement.appendChild(oneNoteClassWrapper)
            }
        }
    }
}
view.uncheckNote = () => {
    const inputElement = document.getElementsByTagName('input')
        for(let k = 0; k<inputElement.length; k++) {
            if(inputElement[k].type === 'checkbox') {
                inputElement[k].checked = false
            }
        }
    model.current.song.noteChecked = []
    model.current.song.noteCheckPosition = []
}

view.renderChangeSentenceInput = (e) => {
    const sentence = e.srcElement.parentElement.parentElement.parentElement
    sentence.innerHTML = ``
    const changeInput = document.createElement('input')
    changeInput.type = 'text'
    changeInput.spellcheck = false
    changeInput.placeholder = `Sentence ${parseInt(sentence.id)}`
    changeInput.value = model.current.song.lyricArray[parseInt(sentence.id) - 1].join(" ")
    changeInput.addEventListener('mouseleave', e => { view.renderBackSentence(e) })
    sentence.appendChild(changeInput)
    changeInput.focus()
}
view.renderBackSentence = (e) => {
    const sentence = e.srcElement.parentElement
    const index = parseInt(sentence.id) - 1
    const sentenceLyric = e.srcElement.value.trim()
    lastChar = sentenceLyric.slice(sentenceLyric.length - 1, sentenceLyric.length)
    if (sentenceLyric.charCodeAt(sentenceLyric.length - 1) === 190 || sentenceLyric.charCodeAt(sentenceLyric.length - 1) === 110 || sentenceLyric.charCodeAt(sentenceLyric.length - 1) === 46) {
        sentenceArray = sentenceLyric.substring(0, sentenceLyric.length - 1).split(" ")
    } else {
        sentenceArray = sentenceLyric.substring(0, sentenceLyric.length).split(" ")
    }
    model.current.song.lyricArray[index] = sentenceArray
    model.current.song.lyricString = ''
    for (i = 0; i < model.current.song.lyricArray.length; i++) {
        model.current.song.lyricString += model.current.song.lyricArray[i].join(" ")
        if (i != model.current.song.lyricArray.length - 1) model.current.song.lyricString += String.fromCharCode(10)
    }

    sentence.innerHTML = ''
    const lyricText = utils.createDivWithClassName('lyricsTexts')
    for (k = 0; k < model.current.song.lyricArray[index].length; k++) {
        const lyricWord = view.renderLyricWordOnly(index, k, 'only')
        lyricText.appendChild(lyricWord)
    }
    sentence.appendChild(lyricText)
    const songsLyricsInput = document.getElementById('lyrics')
    songsLyricsInput.lyric.value = model.current.song.lyricString
    view.setAppStatus(`Sentence ${index + 1} is changed`)
}



view.songsNameOninput = e => {
    if (e.keyCode === 13 || e.keyCode === 10) {
        e.preventDefault()
        if (e.srcElement.value != "") {
            if (model.current.song.lyricArray === undefined) {
                model.current.song.name = e.target.value.toUpperCase()
                view.setAppStatus(`Song's name is ${model.current.song.name}`)
                document.getElementsByTagName('textarea')[0].focus()
            } else {
                model.current.song.name = e.target.value.toUpperCase()
                view.setAppStatus(`Song's name is changed to ${model.current.song.name}`)
                e.target.blur()
            }
        } else {
            view.setAppStatus("Cannot set song's name with a blank")
        }
    }
}
view.songNameOnFocusOut = e => {
    if (e.srcElement.value != "") {
        if (model.current.song.lyricArray === undefined) {
            model.current.song.name = e.target.value.toUpperCase()
            view.setAppStatus(`Song's name is ${model.current.song.name}`)
            document.getElementsByTagName('textarea')[0].focus()
        } else {
            model.current.song.name = e.target.value.toUpperCase()
            view.setAppStatus(`Song's name is changed to ${model.current.song.name}`)
            e.target.blur()
        }
    }
}
view.songsLyricsOninput = e => {
    if (e.keyCode === 13 || e.keyCode === 10) {
        var lyric = e.srcElement.value
        if (!e.shiftKey && e.srcElement.value.length > 0) {
            const addedEnter = String.fromCharCode(13)
            const addedEnterLyric = lyric + addedEnter
            const lyricArray = []
            var enterPosition = 0
            var checkSyntax
            for (k = 0; k < lyric.length; k++) {
                const characterCode = lyric.charCodeAt(k)
                if (characterCode === 13 || characterCode === 10 || characterCode === 46) {
                    checkSyntax = true
                    break
                }
                checkSyntax = false
            }
            if (checkSyntax === true) {
                for (i = 0; i < addedEnterLyric.length; i++) {
                    const characterCode = addedEnterLyric.charCodeAt(i)
                    if (characterCode === 13 || characterCode === 10 || characterCode === 46) {
                        sentence = utils.cutDuplicateSpaceInString(addedEnterLyric.substring(enterPosition, i).trim()).split(" ")
                        if (sentence != "") lyricArray.push(sentence)
                        enterPosition = i + 1
                    }
                }
                if (model.current.song.name != undefined) {
                    model.current.song.lyricArray = lyricArray
                    var lyricsString = ''
                    for (n = 0; n < lyricArray.length; n++) {
                        const sentence = lyricArray[n].join(" ")
                        if (n != lyricArray.length - 1) lyricsString += sentence + addedEnter
                        else lyricsString += sentence
                    }
                    model.current.song.lyricString = lyricsString
                    view.setAppStatus("Song's lyric is inputted")
                    view.setBotMain('edit')
                } else {
                    e.preventDefault()
                    document.getElementById('songsName').focus()
                    view.setAlert("Please type the song's name")
                }
            } else {
                e.preventDefault()
                view.setAlert('Please separate sentence with a dot "." or an enter while holding shift key')
            }
        } else if (!e.shiftKey && lyric.length === 0) {
            e.preventDefault()
        } else {
            if (lyric.charCodeAt(lyric.length - 1) === 10 || lyric.charCodeAt(lyric.length - 1) === 13) {
                e.preventDefault()
            }
        }

    }
}

view.clearAllJustShowChord = () => {
    const justShows = model.current.song.chordJustShow
    for(let i = 0; i < justShows.length; i++) {
        justShows[i].parentElement.removeChild(justShows[i])
    }
    model.current.song.chordJustShow = []
}
view.addLyricsChord = (checkStart, chordWidth, finalChord) => {
    model.current.song.newFinalChord = {
        show: finalChord[0],
        chord: finalChord,
    }
    const sentenceElement = document.getElementById(`${checkStart.sentence}st`)
    const chordElement = utils.createDivWithClassName('lyricsChord')
    chordElement.style.width = `${chordWidth}px`
    chordElement.innerHTML =  chordLibrary.getChordFullNameFromChordCode(finalChord[0].id)
    const functionBtn = utils.createDivWithClassName('functionBtn')
    functionBtn.innerText = `+`
    functionBtn.addEventListener('click', e => {view.addChordClick(e)})
    chordElement.appendChild(functionBtn)
    chordElement.classList.add('justShow')
    if(sentenceElement.children.length === 1) {
        const lyricsChords = utils.createDivWithClassName('lyricsChords')
        lyricsChords.appendChild(chordElement)
        sentenceElement.appendChild(lyricsChords)
        return chordElement
    } else {
        const lyricsChords = sentenceElement.lastChild
        const justShow = lyricsChords.getElementsByClassName('justShow')[0]
        if(justShow != undefined) lyricsChords.removeChild(justShow)
        lyricsChords.appendChild(chordElement)
        return chordElement
    }
}
view.addLyricsContinuousChord = (checkStart, chordWidth) => {
    const sentenceElement = document.getElementById(`${checkStart.sentence}st`)
    const chordElement = utils.createDivWithClassName('lyricsContinuousChord')
    chordElement.style.width = `${chordWidth}px`
    chordElement.innerHTML =  `...`
    chordElement.classList.add('justShow')
    if(sentenceElement.children.length === 1) {
        const lyricsChords = utils.createDivWithClassName('lyricsChords')
        lyricsChords.appendChild(chordElement)
        sentenceElement.appendChild(lyricsChords)
        return chordElement
    } else {
        const lyricsChords = sentenceElement.lastChild
        const justShow = lyricsChords.getElementsByClassName('justShow')[0]
        if(justShow != undefined) lyricsChords.removeChild(justShow)
        lyricsChords.appendChild(chordElement)
        return chordElement
    }
}
view.addChordClick = e => {
    const addBtn = e.srcElement
    const chordElement = e.srcElement.parentElement
    chordElement.removeChild(addBtn)
    model.current.song.addedChord.push(model.current.song.chordJustShow)
    const justShows = model.current.song.chordJustShow
    for(let i = 0; i < justShows.length; i++) {
        justShows[i].classList.remove('justShow')
    }
    model.current.song.chordJustShow = []

    model.current.song.chordPosition.push(model.current.song.noteCheckPosition)
    model.current.song.finalChord.push(model.current.song.newFinalChord)
    view.uncheckNote()
}






view.clearOpositeBtn = opositeBtn => {
    const pageContainer = document.getElementsByClassName('findContainer')[0]
    pageContainer.removeChild(opositeBtn)
}
view.setBackOpositeBtn = (opositeBtnName) => {
    const pageContainer = document.getElementsByClassName('findContainer')[0]
    const opositeBtn = utils.createDivWithClassName('functionBtn')
    if (opositeBtnName === 'media') {
        opositeBtn.id = 'mediaBtn'
        opositeBtn.title = 'Media player'
        opositeBtn.addEventListener('click', view.mediaBtnActive)
    } else if (opositeBtnName === 'keyboard') {
        opositeBtn.id = 'keyboardBtn'
        opositeBtn.title = 'Piano keyboard'
        opositeBtn.addEventListener('click', view.keyboardBtnActive)
    }
    pageContainer.append(opositeBtn)
}
view.dodgeGuitarFretboard = command => {
    const subjectDodge = document.getElementById('grandChildContainer')
    if (command === true) {
        subjectDodge.style.paddingRight = ''
        subjectDodge.style.paddingLeft = '5vw'
    } else {
        if (window.innerWidth <= 780) {
            subjectDodge.style.paddingLeft = ''
        } else {
            subjectDodge.style.paddingRight = '5vw'
            subjectDodge.style.paddingLeft = ''
        }
    }
}
view.textAreaMultilinePlaceholder = textareaElement => {
    Array.prototype.forEach.call(textareaElement, function (elem) {
        elem.placeholder = elem.placeholder.replace(/\\n/g, '\n');
    });
}



view.setAlert = message => {
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
view.setMissions = mission => {
    const missionTag = document.getElementById('missionTagContainer')
    missionTag.innerHTML = mission
}
view.setAppStatus = status => {
    clearTimeout(autoClearStatus)
    const appStatus = document.getElementById('appStatus')
    appStatus.innerText = status
    autoClearStatus = setTimeout(() => {
        appStatus.innerText = ''
    }, 5000)
}
view.clearAppStatus = () => {
    const appStatus = document.getElementById('appStatus')
    appStatus.innerText = ''
}
view.setSongGamme = gamme => {
    const songGamme = document.getElementById('songGamme')
    songGamme.innerText = gamme
}
view.setSongTempo = tempo => {
    const songTempo = document.getElementById('songTempo')
    songTempo.innerText = tempo
}
view.setSongVolume = volume => {
    const songVolume = document.getElementById('songVolume')
    songVolume.innerText = volume
}

view.setBotMain('input')
// infoBtn.addEventListener('click', view.)
tempoBtn.addEventListener('click', view.tempoBtnActive)
frequencyBtn.addEventListener('click', view.frequencyBtnActive)
keyboardBtn.addEventListener('click', view.keyboardBtnActive)
mediaBtn.addEventListener('click', view.mediaBtnActive)