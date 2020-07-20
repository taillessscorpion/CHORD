const chordLibrary = {}
chordLibrary.chordTypes = ['basis', 'minor', 'major', 'sus', 'aug', 'dim']
chordLibrary.chordRanges = [0, 2, 4, 6, 7, 9, 11]




chordLibrary.getChordCodeFromFullName = chordFullName => {
    chordName = chordLibrary.getChordNameFromFullName(chordFullName)
    chordType = chordLibrary.getChordTypeFromFullName(chordFullName)
    chordRange = chordLibrary.getChordRangeFromFullName(chordFullName)
    return chordLibrary.getChordCodeFromDetails(chordName, chordType, chordRange)
}
chordLibrary.getChordCodeFromDetails = (chordName, chordType, chordRange) => {
    chordNameCode = noteLibrary.getNoteScaleToTwelveFromClassName(chordName)
    chordTypeCode = chordLibrary.chordTypes.indexOf(chordType)
    chordRangeCode =  chordRange
    chordLibrary.getChordCodeFromDetailsCode(chordNameCode, chordTypeCode, chordRangeCode)
}
chordLibrary.getChordCodeFromDetailsCode = (chordNameCode, chordTypeCode, chordRangeCode) => {
    if (chordRangeCode === undefined) chordRangeCode = 0
    if(chordTypeCode != -1 && chordLibrary.chordRanges.indexOf(chordRangeCode) != -1 && chordNameCode != -1) {
        if(chordTypeCode != 3 && chordRangeCode != 2 && chordRangeCode != 4) {
            return `${utils.fullfillDateMonth(chordNameCode)}${chordTypeCode}${utils.fullfillDateMonth(chordRangeCode)}`
        } else if(chordTypeCode == 3) {
            return `${utils.fullfillDateMonth(chordNameCode)}${chordTypeCode}${utils.fullfillDateMonth(chordRangeCode)}`
        }
    }
    return -1
}


chordLibrary.getChordNameCodeFromChordCode = chordCode => {
    return chordNameCode = parseInt(chordCode.slice(0, 2))
}
chordLibrary.getChordTypeCodeFromChordCode = chordCode => {
    return chordTypeCode = parseInt(chordCode.slice(2, 4))
}
chordLibrary.getChordRangeCodeFromChordCode = chordCode => {
    return chordRangeCode = parseInt(chordCode.slice(4, 6))
}

chordLibrary.getChordNameFromFullName = chordFullName => {
    if(chordFullName.indexOf('#') === 1) {
        return chordFullName.slice(0, 2)
    }

    return chordFullName.slice(0, 1)
}
chordLibrary.getChordTypeFromFullName = chordFullName => {
    if(chordFullName.indexOf('#') === 1) {
        functionName = chordFullName.slice(2, chordFullName.length)
    }
    else {
        functionName = chordFullName.slice(1, chordFullName.length)
    }
    chordRangeNext = parseInt(functionName.slice(-2, functionName.length))
    if(isNaN(chordRangeNext)) {
        chordRangeLast = parseInt(functionName.slice(-1, functionName.length))
        if(isNaN(chordRangeLast)) {
            if(functionName === '') return 'basis'
            return functionName
        } else {
            if(functionName === '') return 'basis'
            return functionName.slice(0, -1)
        }
    } else {
        if(functionName === '') return 'basis'
        return functionName.slice(0, -2)
    }
}
chordLibrary.getChordRangeFromFullName = chordFullName => {
    chordRangeNext = parseInt(chordFullName.slice(-2, chordFullName.length))
    if(isNaN(chordRangeNext)) {
        chordRangeLast = parseInt(chordFullName.slice(-1, chordFullName.length))
        if(isNaN(chordRangeLast)) {
            return 0
        } else {
            return chordRangeLast
        }
    } else {
        return chordRangeNext
    }
}

chordLibrary.getChordNoteOnPiano = chordCode => {
    // const chordName
}

chordLibrary.getChordNotePosition = (chordTypeCode, chordRangeCode) => {
    if(chordTypeCode === 0) return chordLibrary.getBasisChordNote(chordRangeCode)
    else if(chordTypeCode === 1) return chordLibrary.getBasisChordNote(chordRangeCode)
    else if(chordTypeCode === 2) return chordLibrary.getBasisChordNote(chordRangeCode)
    else if(chordTypeCode === 3) return chordLibrary.getBasisChordNote(chordRangeCode)
    else if(chordTypeCode === 4) return chordLibrary.getBasisChordNote(chordRangeCode)
    else if(chordTypeCode === 5) return chordLibrary.getBasisChordNote(chordRangeCode)
}




chordLibrary.getBasisChordNote = chordRangeCode => {
    const chord3Note = [1, 5, 8]
    if(chordRangeCode === 0) return chord3Note
    else return chord3Note.concat(chordLibrary.getBasisHighRangeChord(chordRangeCode))
}
chordLibrary.getMajorChordNote = chordRangeCode => {
    const chord3Note = [1, 5, 8]
    if(chordRangeCode === 0) return chord3Note
    else return chord3Note.concat(chordLibrary.getMajorHighRangeChord(chordRangeCode))
}
chordLibrary.getMinorChordNote = chordRangeCode => {
    const chord3Note = [1, 4, 8]
    if(chordRangeCode === 0) return chord3Note
    else return chord3Note.concat(chordLibrary.getBasisHighRangeChord(chordRangeCode))
}
chordLibrary.getSusChordNote = chordRangeCode => {
    const chord3Note = [1, 5, 8]
    if(chordRangeCode === 0) return chord3Note
    else if(chordRangeCode === 2) return [1, 2, 8]
    else if(chordRangeCode === 4) return [1, 4, 8]
    else return chord3Note.concat(chordLibrary.getBasisHighRangeChord(chordRangeCode))
}
chordLibrary.getAugChordNote = chordRangeCode => {
    const chord3Note = [1, 5, 9]
    if(chordRangeCode === 0) return chord3Note
    else return chord3Note.concat(chordLibrary.getBasisHighRangeChord(chordRangeCode))
}
chordLibrary.getDimChordNote = chordRangeCode => {
    const chord3Note = [1, 4, 7]
    if(chordRangeCode === 0) return chord3Note
    else return chord3Note.concat(chordLibrary.getBasisHighRangeChord(chordRangeCode))
}



chordLibrary.getBasisHighRangeChord = chordRangeCode => {
    if(chordRangeCode === 6) return [10]
    else if(chordRangeCode === 7) return [11]
    else if(chordRangeCode === 9) return [11, 15]
    else if(chordRangeCode === 11) return [11, 15, 18]
}
chordLibrary.getMajorHighRangeChord = chordRangeCode => {
    if(chordRangeCode === 6) return [10]
    else if(chordRangeCode === 7) return [12]
    else if(chordRangeCode === 9) return [12, 15]
    else if(chordRangeCode === 11) return [12, 15, 18]
}

for(n=0;n<12;n++) {
    for(t=0;t<6;t++) {
        for(r=0;r<7;r++){
            if(t!=4) {
                if(r!=1 && r!=2) console.log(chordLibrary.getChordCodeFromDetailsCode(n, t, r))
            } else console.log(chordLibrary.getChordCodeFromDetailsCode(n, t, r))
        }
    }
}