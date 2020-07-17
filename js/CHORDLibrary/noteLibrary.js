const noteLibrary = {};
noteLibrary.semitone = Math.pow(2, 1 / 12)
noteLibrary.noteFrequencyBase = 32.7
noteLibrary.noteSpectrumBase = [
    { r: 69, g: 0, b: 71 },
    { r: 20, g: 0, b: 71 },
    { r: 15, g: 0, b: 71 },
    { r: 0, g: 19, b: 71 },
    { r: 0, g: 63, b: 71 },
    { r: 0, g: 70, b: 39 },
    { r: 0, g: 70, b: 10 },
    { r: 69, g: 71, b: 0 },
    { r: 71, g: 64, b: 0 },
    { r: 71, g: 43, b: 0 },
    { r: 71, g: 26, b: 0 },
    { r: 71, g: 2, b: 0 },

];
noteLibrary.semitoneSpectrum = (10 / 255)
noteLibrary.noteLowestInGuitar = 17





/// convert note name to note code 
/// note name is the full name of note including octave such as C#3 F6 ..
//// note code is the number represents that note start from 0 and other side is C1
noteLibrary.getNoteCodeFromFullName = noteFullName => {
    if(noteFullName.length === 3) {
        const noteName = noteFullName.slice(0, 2)
        const noteOctave = noteFullName.slice(2)
        return noteLibrary.getNoteCodeFromDetails(noteName, noteOctave )
    } else if(noteFullName.length === 2) {
        const noteName = noteFullName.slice(0, 1)
        const noteOctave = noteFullName.slice(1)
        return noteLibrary.getNoteCodeFromDetails(noteName, noteOctave )
    } else return 'Input ERR'


}
noteLibrary.getNoteCodeFromDetails = (noteClassName, noteOctave) => {
    noteClassName = noteClassName.toUpperCase()
    noteOctave = parseInt(noteOctave)
    if(noteClassName === 'C') return 1 + (noteOctave - 1) * 12
    if(noteClassName === 'C#' || noteClassName === 'Db') return 2 + (noteOctave - 1) * 12
    if(noteClassName === 'D') return 3 + (noteOctave - 1) * 12
    if(noteClassName === 'D#' || noteClassName === 'Eb') return 4 + (noteOctave - 1) * 12
    if(noteClassName === 'E') return 5 + (noteOctave - 1) * 12
    if(noteClassName === 'F') return 6 + (noteOctave - 1) * 12
    if(noteClassName === 'F#' || noteClassName === 'Gb') return 7 + (noteOctave - 1) * 12
    if(noteClassName === 'G') return 8 + (noteOctave - 1) * 12
    if(noteClassName === 'G#' || noteClassName === 'Ab') return 9 + (noteOctave - 1) * 12
    if(noteClassName === 'A') return 10 + (noteOctave - 1) * 12
    if(noteClassName === 'A#' || noteClassName === 'Bb') return 11 + (noteOctave - 1) * 12
    if(noteClassName === 'B') return 12 + (noteOctave - 1) * 12
}
//// noteCode = log{frequency/frequencyBase}(semitone) + 1
//// frequency must be greater than or equal 31
noteLibrary.getNoteCodeFromFrequency = frequency => {
    return Math.floor(Math.log(frequency/noteLibrary.noteFrequencyBase)/Math.log(noteLibrary.semitone))+1
}


///// just class name such as c c# ... without octave 
noteLibrary.getNoteClassName = noteCode => {
    if (noteCode === 1 || noteCode % 12 === 1) { return 'C' }
    else if (noteCode === 2 || noteCode % 12 === 2) { return 'C#' }
    else if (noteCode === 3 || noteCode % 12 === 3) { return 'D' }
    else if (noteCode === 4 || noteCode % 12 === 4) { return 'D#' }
    else if (noteCode === 5 || noteCode % 12 === 5) { return 'E' }
    else if (noteCode === 6 || noteCode % 12 === 6) { return 'F' }
    else if (noteCode === 7 || noteCode % 12 === 7) { return 'F#' }
    else if (noteCode === 8 || noteCode % 12 === 8) { return 'G' }
    else if (noteCode === 9 || noteCode % 12 === 9) { return 'G#' }
    else if (noteCode === 10 || noteCode % 12 === 10) { return 'A' }
    else if (noteCode === 11 || noteCode % 12 === 11) { return 'A#' }
    else if (noteCode % 12 === 0) { return 'B' }
}
//// return class name like the one above but in number scale from 1 to 12
noteLibrary.getNoteScaleToTwelveFromNoteCode = noteCode => {
    if (noteCode === 1 || noteCode % 12 === 1) { return 1 }
    else if (noteCode === 2 || noteCode % 12 === 2) { return 2 }
    else if (noteCode === 3 || noteCode % 12 === 3) { return 3 }
    else if (noteCode === 4 || noteCode % 12 === 4) { return 4 }
    else if (noteCode === 5 || noteCode % 12 === 5) { return 5 }
    else if (noteCode === 6 || noteCode % 12 === 6) { return 6 }
    else if (noteCode === 7 || noteCode % 12 === 7) { return 7 }
    else if (noteCode === 8 || noteCode % 12 === 8) { return 8 }
    else if (noteCode === 9 || noteCode % 12 === 9) { return 9 }
    else if (noteCode === 10 || noteCode % 12 === 10) { return 10 }
    else if (noteCode === 11 || noteCode % 12 === 11) { return 11 }
    else if (noteCode % 12 === 0) { return 12 }
}
noteLibrary.getNoteScaleToTwelveFromClassName = noteClassName => {
    noteClassName = noteClassName.toUpperCase()
    if(noteClassName === 'C') return 1
    if(noteClassName === 'C#' || noteClassName === 'Db') return 2
    if(noteClassName === 'D') return 3
    if(noteClassName === 'D#' || noteClassName === 'Eb') return 4
    if(noteClassName === 'E') return 5
    if(noteClassName === 'F') return 6
    if(noteClassName === 'F#' || noteClassName === 'Gb') return 7
    if(noteClassName === 'G') return 8
    if(noteClassName === 'G#' || noteClassName === 'Ab') return 9
    if(noteClassName === 'A') return 10
    if(noteClassName === 'A#' || noteClassName === 'Bb') return 11
    if(noteClassName === 'B') return 12
}
//// return octave from 1 to 12 //// in general, we're rarely using octave over 7
/// human's voice is about from octave 2 to 5 or maybe 6 only
noteLibrary.getNoteOctave = noteCode => {
    if (noteCode <= 12) { return '1' }
    else if (noteCode <= 24) { return '2' }
    else if (noteCode <= 36) { return '3' }
    else if (noteCode <= 48) { return '4' }
    else if (noteCode <= 60) { return '5' }
    else if (noteCode <= 72) { return '6' }
    else if (noteCode <= 84) { return '7' }
    else if (noteCode <= 96) { return '8' }
    else if (noteCode <= 108) { return '9' }
    else if (noteCode <= 120) { return '10' }
    else if (noteCode <= 132) { return '11' }
    else if (noteCode <= 144) { return '12' }
}
//// return the whole name of note
noteLibrary.getNoteFullName = noteCode => {
    return noteLibrary.getNoteClassName(noteCode) + noteLibrary.getNoteOctave(noteCode)
}
//// return how many hertz is that note
/// noteFrequency = noteFrequencyBase    *      semiTone            ^            (noteCode - 1)
///                  32.7hz (C1)             twelveth root of 2
noteLibrary.getNoteFrequency = noteCode => {
    return noteLibrary.noteFrequencyBase * Math.pow(noteLibrary.semitone, noteCode - 1)
}
/// return an array with 3 children for rgb color platform
/// in case we need get color for every single note, to compare each other
noteLibrary.getNoteSpectrum = noteCode => {
    const redIngredientBase = noteLibrary.noteSpectrumBase[noteLibrary.getNoteScaleToTwelveFromNoteCode(noteCode) - 1].r
    const greenIngredientBase = noteLibrary.noteSpectrumBase[noteLibrary.getNoteScaleToTwelveFromNoteCode(noteCode) - 1].g
    const blueIngredientBase = noteLibrary.noteSpectrumBase[noteLibrary.getNoteScaleToTwelveFromNoteCode(noteCode) - 1].b
    const noteRedIngredient = Math.floor(redIngredientBase +Math.pow( redIngredientBase * noteLibrary.semitoneSpectrum, noteLibrary.getNoteOctave(noteCode)))
    const noteGreenIngredient = Math.floor(greenIngredientBase + Math.pow(greenIngredientBase * noteLibrary.semitoneSpectrum, noteLibrary.getNoteOctave(noteCode)))
    const noteBlueIngredient = Math.floor(blueIngredientBase + Math.pow(blueIngredientBase * noteLibrary.semitoneSpectrum, noteLibrary.getNoteOctave(noteCode)))
    return [noteRedIngredient, noteGreenIngredient, noteBlueIngredient]
}
/// get all the note from fret 0 to 12 of a string
/// return an array from first note to that note in next octave
/// ATTENTION firstNoteCode and the returned value would be noteCode
noteLibrary.getGuitarStringNote = firstNoteCode => {
    const string = []
    for (i = firstNoteCode; i < firstNoteCode + 13; i++) {
        string.push(i)
    }
    return string
}
/// return the positions of any note in an array
/// every array has from 1 to 3 children /// and every child has 2 number, 
//// the first one is string from 1 to 6, the left one is fret from 1 to 12
noteLibrary.getGuitarInstrumentPosition = noteCode => {
    const position = [];
    const firstPosition = []
    const secondPosition = []
    const thirdPosition = []
    
    if (noteLibrary.getGuitarStringNote(noteLibrary.noteLowestInGuitar).indexOf(noteCode) != -1) {
        firstPosition.push(6)
        firstPosition.push(
            noteLibrary.getGuitarStringNote(noteLibrary.noteLowestInGuitar).indexOf(noteCode)
        )
        position.push(firstPosition);
    }
    if (noteLibrary.getGuitarStringNote(noteLibrary.noteLowestInGuitar + 5).indexOf(noteCode) != -1) {
        secondPosition.push(5)
        secondPosition.push(
            noteLibrary.getGuitarStringNote(noteLibrary.noteLowestInGuitar + 5).indexOf(noteCode)
        )
        position.push(secondPosition)
    }
    if (noteLibrary.getGuitarStringNote(noteLibrary.noteLowestInGuitar + 10).indexOf(noteCode) != -1) {
        thirdPosition.push(4)
        thirdPosition.push(
            noteLibrary.getGuitarStringNote(noteLibrary.noteLowestInGuitar + 10).indexOf(noteCode)
        )
        position.push(thirdPosition)
    }
    if (noteLibrary.getGuitarStringNote(noteLibrary.noteLowestInGuitar + 15).indexOf(noteCode) != -1) {
        firstPosition.push(3)
        firstPosition.push(
            noteLibrary.getGuitarStringNote(noteLibrary.noteLowestInGuitar + 15).indexOf(noteCode)
        )
        position.push(firstPosition)
    }
    if (noteLibrary.getGuitarStringNote(noteLibrary.noteLowestInGuitar + 19).indexOf(noteCode) != -1) {
        secondPosition.push(2)
        secondPosition.push(
            noteLibrary.getGuitarStringNote(noteLibrary.noteLowestInGuitar + 19).indexOf(noteCode)
        )
        position.push(secondPosition)
    }
    if (noteLibrary.getGuitarStringNote(noteLibrary.noteLowestInGuitar + 24).indexOf(noteCode) != -1) {
        thirdPosition.push(1)
        fthirdPosition.push(
            noteLibrary.getGuitarStringNote(noteLibrary.noteLowestInGuitar + 24).indexOf(noteCode)
        )
        position.push(thirdPosition)
    }
    return position
}
/// return exactly a link to connect to audio source
noteLibrary.getGuitarInstrumentLink = noteCode => {
    if (noteCode < 17 || noteCode > 55) return ''
    return `../sounds/guitar/${noteLibrary.getNoteFullName(noteCode).replace('#', '-')}.ogg`
}
noteLibrary.getPianoInstrumentLink = noteCode => {
    if (noteCode < 1 || noteCode > 88) return ''
    return `../sounds/piano/${noteLibrary.getNoteFullName(noteCode).replace('#', '-')}.ogg`
}
//// return color black or white of the key contain the note
noteLibrary.getPianoInstrumentKeyColor = noteCode => {
    if (noteCode < 1 || noteCode > 88) return ''
    else {
        if (noteLibrary.getNoteClassName(noteCode).length === 1) return 'white'
        return 'black'
    }
}


noteLibrary.getMajorScale = noteCode => {
    const scale = [noteCode];
    var newNote = noteCode ;
    for(i=1;i<7;i++) {
        newNote += 2
        if(i===3) {newNote--}
        scale.push(newNote)
    }
    return scale
}
noteLibrary.getMinorScale = noteCode => {
    const scale = [noteCode];
    var newNote = noteCode ;
    for(i=1;i<7;i++) {
        newNote += 2
        if(i===2 || i===5) {newNote--}
        scale.push(newNote)
    }
    return scale
}
noteLibrary.getScaleFromNoteCode = (firstNoteCode, modal) => {
    if(firstNoteCode > 12) firstNoteCode %= 12
    const majorScale = noteLibrary.getMajorScale(firstNoteCode).concat(
        noteLibrary.getMajorScale(firstNoteCode+12),
        noteLibrary.getMajorScale(firstNoteCode+24),
        noteLibrary.getMajorScale(firstNoteCode+36),
        noteLibrary.getMajorScale(firstNoteCode+48),
        noteLibrary.getMajorScale(firstNoteCode+60)
        )
    const minorScale = noteLibrary.getMinorScale(firstNoteCode).concat(
        noteLibrary.getMinorScale(firstNoteCode+12),
        noteLibrary.getMinorScale(firstNoteCode+24),
        noteLibrary.getMinorScale(firstNoteCode+36),
        noteLibrary.getMinorScale(firstNoteCode+48),
        noteLibrary.getMinorScale(firstNoteCode+60)
    )
    if (modal === 'major') return majorScale
    else if (modal === 'minor') return minorScale
    else return {
        major: majorScale,
        minor: minorScale
    }
}
noteLibrary.getScaleFromNoteClassName = (noteClassName, modal) => {
    return noteLibrary.getScaleFromNoteCode(noteLibrary.getNoteScaleToTwelveFromClassName(noteClassName), modal)
}





// for (i = 1; i <= 24; i++) {
//     console.log(i)
//     console.log(noteLibrary.getNoteFullName(i))
//     console.log(noteLibrary.getNoteSpectrum(i))
// }