const noteLibrary = {};
noteLibrary.semitone = Math.pow(2, 1/12)
noteLibrary.noteFrequencyBase = 32.7
noteLibrary.noteSpectrumBase = [
    {r: 247, g: 0, b: 255},
    {r: 174, g: 0, b: 255},
    {r: 55, g: 0, b: 255},
    {r: 0, g: 68, b: 255},
    {r: 0, g: 225, b: 255},
    {r: 0, g: 225, b: 128},
    {r: 0, g: 225, b: 34},
    {r: 217, g: 225, b: 0},
    {r: 255, g: 230, b: 0},
    {r: 255, g: 153, b: 0},
    {r: 255, g: 94, b: 0},
    {r: 255, g: 8, b: 0},

];
noteLibrary.semitoneSpectrum = (10/255)



noteLibrary.getNoteName = noteCode => {
    if (noteCode === 1 || noteCode % 12 === 1) {return 'C'}
    else if (noteCode === 2 || noteCode % 12 === 2) {return 'C#'}
    else if (noteCode === 3 || noteCode % 12 === 3) {return 'D'}
    else if (noteCode === 4 || noteCode % 12 === 4) {return 'D#'}
    else if (noteCode === 5 || noteCode % 12 === 5) {return 'E'}
    else if (noteCode === 6 || noteCode % 12 === 6) {return 'F'}
    else if (noteCode === 7 || noteCode % 12 === 7) {return 'F#'}
    else if (noteCode === 8 || noteCode % 12 === 8) {return 'G'}
    else if (noteCode === 9 || noteCode % 12 === 9) {return 'G#'}
    else if (noteCode === 10 || noteCode % 12 === 10) {return 'A'}
    else if (noteCode === 11 || noteCode % 12 === 11) {return 'A#'}
    else if (noteCode % 12 === 0) {return 'B'}
}
noteLibrary.getNoteScaleToTwelve = noteCode => {
    if (noteCode === 1 || noteCode % 12 === 1) {return 1}
    else if (noteCode === 2 || noteCode % 12 === 2) {return 2}
    else if (noteCode === 3 || noteCode % 12 === 3) {return 3}
    else if (noteCode === 4 || noteCode % 12 === 4) {return 4}
    else if (noteCode === 5 || noteCode % 12 === 5) {return 5}
    else if (noteCode === 6 || noteCode % 12 === 6) {return 6}
    else if (noteCode === 7 || noteCode % 12 === 7) {return 7}
    else if (noteCode === 8 || noteCode % 12 === 8) {return 8}
    else if (noteCode === 9 || noteCode % 12 === 9) {return 9}
    else if (noteCode === 10 || noteCode % 12 === 10) {return 10}
    else if (noteCode === 11 || noteCode % 12 === 11) {return 11}
    else if (noteCode % 12 === 0) {return 12}
}
noteLibrary.getNoteOctave = noteCode => {
    if (noteCode <= 12) {return '1'}
    else if (noteCode <= 24) {return '2'}
    else if (noteCode <= 36) {return '3'}
    else if (noteCode <= 48) {return '4'}
    else if (noteCode <= 60) {return '5'}
    else if (noteCode <= 72) {return '6'}
    else if (noteCode <= 84) {return '7'}
    else if (noteCode <= 96) {return '8'}
    else if (noteCode <= 108) {return '9'}
    else if (noteCode <= 120) {return '10'}
    else if (noteCode <= 132) {return '11'}
    else if (noteCode <= 144) {return '12'}
}
noteLibrary.getNoteFullName = noteCode => {
    return noteLibrary.getNoteName(noteCode) + noteLibrary.getNoteOctave(noteCode)
}
noteLibrary.getNoteFrequency = noteCode => {
    return noteLibrary.noteFrequencyBase * Math.pow(noteLibrary.semitone, noteCode-1)
}
noteLibrary.getNoteSpectrum = noteCode => {
    const redIngredientBase = noteLibrary.noteSpectrumBase[noteLibrary.getNoteScaleToTwelve(noteCode)-1].r
    const greenIngredientBase = noteLibrary.noteSpectrumBase[noteLibrary.getNoteScaleToTwelve(noteCode)-1].g
    const blueIngredientBase = noteLibrary.noteSpectrumBase[noteLibrary.getNoteScaleToTwelve(noteCode)-1].b
    const noteRedIngredient = Math.floor(redIngredientBase - redIngredientBase*Math.pow(noteLibrary.semitoneSpectrum, noteLibrary.getNoteOctave(noteCode)))
    const noteGreenIngredient = Math.floor(greenIngredientBase - greenIngredientBase*Math.pow(noteLibrary.semitoneSpectrum, noteLibrary.getNoteOctave(noteCode)))
    const noteBlueIngredient = Math.floor(blueIngredientBase - blueIngredientBase*Math.pow(noteLibrary.semitoneSpectrum, noteLibrary.getNoteOctave(noteCode)))
    return [noteRedIngredient, noteGreenIngredient, noteBlueIngredient]
}



for(i=1;i<=24;i++) {
    console.log(i)
    console.log(noteLibrary.getNoteFullName(i))
    console.log(noteLibrary.getNoteSpectrum(i))
}