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
    if(instrument === 'piano' && 68 >= noteCode && noteCode >= 25) {
        return model.pianoKeys[noteCode - 25]
    }
    if(instrument === 'guitar' && 53 >= noteCode && noteCode >= 17) {
        return model.guitarKeys[noteCode - 17]
    }
    return ''
}
controller.getKeyCodeFromNoteCode = (noteCode, instrument) => {
    if(instrument === 'piano' && 68 >= noteCode && noteCode >= 25) {
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