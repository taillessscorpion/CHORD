const controller = {};
controller.convertArrayToRGB = (array, opacity) => {
    return `rgb(${array[0]}, ${array[1]}, ${array[2]}, ${opacity})`
}
controller.checkDecibelToCreateCrest = db => {
    if(db<=0.007) return 1
    else if(db<=0.01) return 2
    else if(db<=0.015) return 3 
    else if(db<=0.02) return 4 
    else if(db<=0.03) return 5 
    else if(db<=0.04) return 6 
    else if(db<=0.06) return 7 
    else if(db<=0.08) return 8 
    else if(db<=0.1) return 9 
    else return 10 
}
controller.checkNoteKeyFromNoteCode = (noteCode, instrument) => {
    if(instrument === 'piano' && 66 >= noteCode && noteCode >= 25) {
        return model.pianoKeys[noteCode - 25]
    }
    if(instrument === 'guitar' && 53 >= noteCode && noteCode >= 17) {
        return model.guitarKeys[noteCode - 17]
    }
    return ''
}
controller.getKeyCodeFromNoteCode = (noteCode, instrument) => {
    if(instrument === 'piano' && 66 >= noteCode && noteCode >= 25) {
        return model.pianoKeysCode[noteCode - 25]
    }
    if(instrument === 'guitar' && 53 >= noteCode && noteCode >= 17) {
        return model.guitarKeysCode[noteCode - 17]
    }
    return ''
}
controller.checkBlackOrWhiteKey = noteCode => {
    const checker = noteCode % 12
    if(checker === 2 || checker === 4 || checker === 7 || checker === 9 || checker === 11) return 'black'
    return 'white'
}
controller.checkPianoNoteKeys = e => {
    const index = model.pianoKeysCode.indexOf(e)
    if(index != -1) {
        return index + 25
    }
    return undefined
}
controller.checkGuitarNoteKeys = e => {
    const index = model.guitarKeysCode.indexOf(e)
    if(index != -1) {
        return keyCode = index + 17
    }
    return undefined
}
controller.checkPlayingNote = (playingNotes, noteCode) => {
    for(one of playingNotes) {
        if(one.noteCode = noteCode) return one
    }
    return 'none'
}
controller.checkInstrumentLink = noteCode => {
    if(model.current.instrument === 'piano') return noteLibrary.getPianoInstrumentLink(noteCode)
    else if(model.current.instrument === 'guitar') return noteLibrary.getGuitarInstrumentLink(noteCode)
}
controller.checkPressedKey = noteCode => {
    if(model.current.instrument === 'piano') return document.getElementById(model.pianoKeysCode[noteCode-25]).parentElement
    else if(model.current.instrument === 'guitar') return document.getElementById(model.guitarKeysCode[noteCode-17]).parentElement
}
controller.checkNoteInput = e => {
    e.preventDefault()
    var noteCode
    const sentence = e.srcElement.parentElement.parentElement.parentElement.parentElement.parentElement
    const index = parseInt(sentence.id) - 1
    if(model.current.song.noteForAnalize === undefined) {
        model.current.song.noteForAnalize = []
        for(let i=0;i<model.current.song.lyricArray.length;i++) {
            const sentenceNote = []
            model.current.song.noteForAnalize.push(sentenceNote)
        }
    }
    if(model.current.song.noteForSave === undefined) {
        model.current.song.noteForSave = []
        for(let i=0;i<model.current.song.lyricArray.length;i++) {
            const sentenceNote = []
            for(k=0;k<model.current.song.lyricArray[i].length;k++) {
                const wordNote = []
                sentenceNote.push(wordNote)
            }
            model.current.song.noteForSave.push(sentenceNote)
        }
    }
    if(e.code === 'Backspace') {
        if(e.srcElement.parentElement.parentElement.children.length > 1) {
            for(i=0;i<e.srcElement.parentElement.parentElement.children.length;i++) {
                if(e.srcElement.parentElement.parentElement.children[i] === e.srcElement.parentElement) {
                    if(i>0) {
                        e.srcElement.parentElement.parentElement.children[i-1].children[0].focus()
                    } else {
                        e.srcElement.parentElement.parentElement.children[i+1].children[0].focus()
                    }
                }
            }
            e.srcElement.parentElement.parentElement.removeChild(e.srcElement.parentElement)
            view.setAppStatus('Note is deleted')
        }
    } else if (e.code === 'Space') {
        if(e.srcElement.value != '' && e.srcElement.parentElement.parentElement.children.length < 4) {
            const newNote = utils.createDivWithClassName('wordsNote')
            const noteInput = document.createElement('input')
            noteInput.type = 'text'
            noteInput.maxLength = '1'
            noteInput.placeholder = 'N'
            noteInput.addEventListener('mouseenter', () => { noteInput.focus() })
            noteInput.addEventListener('mouseleave', () => { noteInput.blur() })
            noteInput.addEventListener('keydown', e => {controller.checkNoteInput(e)})
            newNote.appendChild(noteInput)
            e.srcElement.parentElement.parentElement.appendChild(newNote)
            noteInput.focus()
            view.setAppStatus('New note is added')
        }
    } else { 
        for(let i=0;i<model.pianoKeysCode.length;i++) {
            if(e.code === model.pianoKeysCode[i]) {
                noteCode = i + 25
                const note = noteLibrary.getNoteClassName(noteCode)
                e.srcElement.value = note
                if(note.length === 1) {
                    e.srcElement.value = note
                    if(e.srcElement.parentElement.children.length === 2) {
                        e.srcElement.parentElement.removeChild(e.srcElement.nextSibling)
                    }
                } else if (note.length === 2) {
                    e.srcElement.value = note.slice(0, 1)
                    if(e.srcElement.parentElement.children.length === 1) {
                        const hashTag = utils.createDivWithClassName('hashtags')
                        hashTag.innerText =`#`
                        e.srcElement.parentElement.appendChild(hashTag)
                    }
                }
                view.setAppStatus(`Added note ${note} into sentence ${index + 1}`)
            }
        }
    }
    const sentenceNoteForAnalize = []
    const sentenceNoteForSave = []
    for(let i=0;i<sentence.children[0].children.length;i++) {
        const wordNotesForSave = []
        for(k=0;k<sentence.children[0].children[i].children[1].children.length;k++) {
            if(sentence.children[0].children[i].children[1].children[k].children.length === 1) {
                const wordNote = sentence.children[0].children[i].children[1].children[k].children[0].value
                wordNotesForSave.push(wordNote)
                if(noteLibrary.getNoteScaleToTwelveFromClassName(wordNote) != -1) sentenceNoteForAnalize.push(noteLibrary.getNoteScaleToTwelveFromClassName(wordNote)+12)
                else sentenceNoteForAnalize.push(noteLibrary.getNoteScaleToTwelveFromClassName(wordNote))
            
            } else if(sentence.children[0].children[i].children[1].children[k].children.length === 2) {
                const wordNote = sentence.children[0].children[i].children[1].children[k].children[0].value + sentence.children[0].children[i].children[1].children[k].children[1].innerText
                sentenceNoteForAnalize.push(noteLibrary.getNoteScaleToTwelveFromClassName(wordNote)+12)
                wordNotesForSave.push(wordNote)
            } 
        }
        sentenceNoteForSave.push(wordNotesForSave)
    }
    if(e.code === 'Backspace') {
        model.current.song.noteForAnalize[index] = sentenceNoteForAnalize
        model.current.song.noteForSave[index] = sentenceNoteForSave
        sound.getScale()
        controller.checkAllNote()
    } else if (e.code === 'Space') {
        if(e.srcElement.value != '' && e.srcElement.parentElement.parentElement.children.length <= 4) {
            model.current.song.noteForAnalize[index] = sentenceNoteForAnalize
            model.current.song.noteForSave[index] = sentenceNoteForSave
            if(index === model.current.song.lyricArray.length-1 && e.srcElement.parentElement.parentElement.parentElement === e.srcElement.parentElement.parentElement.parentElement.parentElement.children[e.srcElement.parentElement.parentElement.parentElement.parentElement.children.length-1]) {
                sound.getScale()
            } else sound.checkScale()
            controller.checkAllNote()
        }
    } else { 
        for(i=0;i<model.pianoKeysCode.length;i++) {
            if(e.code === model.pianoKeysCode[i]) {
                model.current.song.noteForAnalize[index] = sentenceNoteForAnalize
                model.current.song.noteForSave[index] = sentenceNoteForSave
                if(index === model.current.song.lyricArray.length-1 && e.srcElement.parentElement.parentElement.parentElement === e.srcElement.parentElement.parentElement.parentElement.parentElement.children[e.srcElement.parentElement.parentElement.parentElement.parentElement.children.length-1] && e.srcElement.parentElement === e.srcElement.parentElement.parentElement.children[e.srcElement.parentElement.parentElement.children.length-1]) {
                    const lastNote = model.current.song.noteForAnalize[index][model.current.song.noteForAnalize[index].length-1]
                    sound.getScale()
                    view.setAppStatus(`The song was played in gamme ${noteLibrary.getNoteClassName(lastNote)}`)
                } else sound.checkScale()
                controller.checkAllNote()
                break
            }
        }
    }
}
controller.checkAllNote = () => {
    const allNote = document.getElementsByClassName('wordsNote')
    let check = true
    for(let i = 0; i < allNote.length; i++) {
        if(allNote[i].firstChild.value === '') check = false
    }
    if(check === true) {
        model.current.song.chordPosition = []
        view.addCheckNote()
    } else view.addCheckNoteWrapper()
}
controller.noteChecked = e => {
    const sentenceIndex = parseInt(e.srcElement.parentElement.parentElement.parentElement.parentElement.parentElement.id)
    let wordIndex = undefined
    let noteIndex = undefined
    for(let j = 0; j<e.srcElement.parentElement.parentElement.parentElement.parentElement.children.length; j++) {
        if(e.srcElement.parentElement.parentElement.parentElement === e.srcElement.parentElement.parentElement.parentElement.parentElement.children[j]) wordIndex = j
    }
    for(let i =0; i<e.srcElement.parentElement.parentElement.children.length;i++) {
        if(e.srcElement.parentElement === e.srcElement.parentElement.parentElement.children[i]) noteIndex = i
    }
    if(e.srcElement.checked === true) {
        model.current.song.noteChecked.push({
            sentence: sentenceIndex,
            word: wordIndex,
            note: noteIndex,
            last: e.srcElement.parentElement.parentElement.children.length-1
        })
        controller.checkNoteChecked()
    } else {
        view.clearAllJustShowChord()
        view.uncheckNote()
    }
}
controller.checkNoteChecked = () => {
    const noteChecked = model.current.song.noteChecked
    const chordPosition = model.current.song.chordPosition
    let checkStart = noteChecked[0]
    let checkEnd = noteChecked[0]
    for(let i = 0; i<noteChecked.length; i++) {
        if(noteChecked[i].sentence < checkStart.sentence) checkStart = noteChecked[i]
        else if (noteChecked[i].sentence === checkStart.sentence) {
            if(noteChecked[i].word < checkStart.word) checkStart = noteChecked[i]
            else if(noteChecked[i].word === checkStart.word) {
                if(noteChecked[i].note < checkStart.note) checkStart = noteChecked[i]
            }
        }
        if(noteChecked[i].sentence > checkEnd.sentence) checkEnd = noteChecked[i]
        else if (noteChecked[i].sentence === checkEnd.sentence) {
            if(noteChecked[i].word > checkEnd.word) checkEnd = noteChecked[i]
            else if (noteChecked[i].word === checkEnd.word) {
                if(noteChecked[i].note > checkEnd.note) checkEnd = noteChecked[i]
            }
        }
    }
    if(chordPosition.length === 0) {
        if(checkStart.sentence === 1) {
            if(checkStart.word === 0) {
                if(checkStart.note === 0) {
                    sound.getFitNotesChord(checkStart, checkEnd)
                } else {
                    view.uncheckNote()
                    view.setAppStatus(`Find chords from the first note, please`)
                }
            } else {
                view.uncheckNote()
                view.setAppStatus(`Find chords from the beginning of sentence, please`)
            }
        } else {
            view.uncheckNote()
            view.setAppStatus(`Find chords of first sentence first, please`)
        }
    } else {
        const lastChord = chordPosition[chordPosition.length-1][chordPosition[chordPosition.length-1].length-1]
        const sentence = document.getElementById(`${lastChord.sentence}st`).firstChild
        if(lastChord.word === sentence.children.length-1) {
            if(lastChord.note === lastChord.last) {
                if(checkStart.sentence  === lastChord.sentence+1) {
                    if(checkStart.word === 0) {
                        if(checkStart.note === 0) {
                            sound.getFitNotesChord(checkStart, checkEnd)
                        } else {
                            view.uncheckNote()
                            view.setAppStatus(`Find chord from that sentence's first note, please`)
                        }
                    } else {
                        view.uncheckNote()
                        view.setAppStatus(`Find chord from that sentence's first note, please`)
                    }
                } else {
                    view.uncheckNote()
                    view.setAppStatus(`Find chords of ${utils.convertNumericalToWord(lastChord.sentence+2)} sentence first, please`)
                }
            } else {
                if(checkStart.sentence  === lastChord.sentence) {
                    if(checkStart.word === lastChord.word) {
                        if(checkStart.note === lastChord.note+1) {
                            sound.getFitNotesChord(checkStart, checkEnd)
                        } else {
                            view.uncheckNote()
                            view.setAppStatus(`Find chord from that sentence's ${utils.convertNumericalToWord(lastChord.note+2)} note, please`)
                        }
                    } else {
                        view.uncheckNote()
                        view.setAppStatus(`Find chord from that sentence's ${utils.convertNumericalToWord(lastChord.word+2)} word, please`)
                    }
                } else {
                    view.uncheckNote()
                    view.setAppStatus(`Find chords of ${utils.convertNumericalToWord(lastChord.sentence+1)} sentence first, please`)
                }
            }
        } else {
            if(lastChord.note === lastChord.last) {
                if(checkStart.sentence === lastChord.sentence+1) {
                    if(checkStart.word === lastChord.word+1) {
                        if(checkStart.note === 0) {
                            sound.getFitNotesChord(checkStart, checkEnd)
                        } else {
                            view.uncheckNote()
                            view.setAppStatus(`Find chord from that sentence's ${utils.convertNumericalToWord(1)} note, please`)
                        }
                    } else {
                        view.uncheckNote()
                        view.setAppStatus(`Find chord from that sentence's ${utils.convertNumericalToWord(lastChord.word+2)} word, please`)
                    }
                } else {
                    view.uncheckNote()
                    view.setAppStatus(`Find chords of ${utils.convertNumericalToWord(lastChord.sentence+1)} sentence first, please`)
                }
            } else {
                if(checkStart.sentence === lastChord.sentence+1) {
                    if(checkStart.word === lastChord.word) {
                        if(checkStart.note === lastChord.note+1) {
                            sound.getFitNotesChord(checkStart, checkEnd)
                        } else {
                            view.uncheckNote()
                            view.setAppStatus(`Find chord from that sentence's ${utils.convertNumericalToWord(lastChord.note+2)} note, please`)
                        }
                    } else {
                        view.uncheckNote()
                        view.setAppStatus(`Find chord from that sentence's ${utils.convertNumericalToWord(lastChord.word+2)} word, please`)
                    }
                } else {
                    view.uncheckNote()
                    view.setAppStatus(`Find chords of ${utils.convertNumericalToWord(lastChord.sentence+1)} sentence first, please`)
                }
            }
        }
    }
}



controller.chordFilter = allChord => {
    const filtedChord = []
    for(i=0;i<allChord.length;i++) {
        if(i===0) {

            filtedChord.push(allChord[i])

        } else {

            for(j=0;j<filtedChord.length;j++) {
                if(allChord[i].notes.join('') != filtedChord[j].notes.join('')) {
                    if(j===filtedChord.length-1) {
                        filtedChord.push(allChord[i])
                        break    
                    }
                } else {
                    break
                }

            }
        }
    }
    return filtedChord
}
controller.decreaseSentenceNoteTwelve = sentenceNote => {
    const decreasedSentenceNote = []
    for(i=0;i<sentenceNote.length;i++) {
        decreasedSentenceNote.push(sentenceNote[i] - 12)
    }
    return decreasedSentenceNote
}

controller.comparationFilter = (array, otherArray) => {
    const result = []
    for(let i = 0; i<array.length;i++) {
        for(let j=0;j<otherArray.length;j++) {
            if(array[i] === otherArray[j]) {
                result.push(array[i])
                break
            }
        }
    }
    return result
}




controller.checkChordWidth = (checkStart, checkEnd) => {
    const sentenceElement = document.getElementById(`${checkStart.sentence}st`).firstChild
    if(checkStart.word === checkEnd.word) {
        const wordElement = sentenceElement.children[checkStart.word]
        let chordWidth = (checkEnd.note - checkStart.note + 1)/(checkEnd.last+1)*(wordElement.offsetWidth)
        if(checkEnd.note === checkEnd.last) {
            const wordCss = wordElement.currentStyle || window.getComputedStyle(wordElement);
            const wordMarginRight = parseInt(wordCss.marginRight)
            chordWidth += wordMarginRight
        }
        return chordWidth - 10
        /// (checkEnd.note - checkStart.note + 1)/(checkEnd.last+1) - self margin
    } else {
        const wordStartElement = sentenceElement.children[checkStart.word]
        const wordEndElement = sentenceElement.children[checkEnd.word]
        let chordStartWidth = (checkStart.last- checkStart.note + 1)/(checkStart.last+1)*(wordStartElement.offsetWidth)
        const wordStartCss = wordStartElement.currentStyle || window.getComputedStyle(wordStartElement);
        const wordStartMarginRight = parseInt(wordStartCss.marginRight)
        chordStartWidth += wordStartMarginRight
        let chordEndWidth = (checkEnd.note+1)/(checkEnd.last+1)*(wordEndElement.offsetWidth)
        if(checkEnd.note === checkEnd.last) {
            const wordEndCss = wordEndElement.currentStyle || window.getComputedStyle(wordEndElement);
            const wordEndMarginRight = parseInt(wordEndCss.marginRight)
            chordEndWidth += wordEndMarginRight
        }
        let chordDuringWidth = 0
        for(let i = checkStart.word+1; i<checkEnd.word; i++) {
            const wordDuringElement = sentenceElement.children[i]
            const wordDuringCss = wordDuringElement.currentStyle || window.getComputedStyle(wordDuringElement);
            const wordDuringMarginRight = parseInt(wordDuringCss.marginRight)
            chordDuringWidth += wordDuringElement.offsetWidth + wordDuringMarginRight
        }
        return chordStartWidth + chordEndWidth + chordDuringWidth - 10
        //// startWidth + endWidth + duringWidth - self margin
        /// (checkStart.last - checkStart.note +1)/(checkStart.last+1) + margin right
        /// (checkEnd.note+1)/(checkEnd.last+1)
        /// whole word + margin
    }
}