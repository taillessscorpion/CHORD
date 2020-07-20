const sound = {}
sound.getMicroStreamAnalize = () => {
    navigator.permissions.query({ name: 'microphone' }).then(result => {
        if (result.state == 'granted') {
            navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => { sound.frequencyAnalize(stream) })
        } else if (result.state == 'prompt') {
            navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => { sound.frequencyAnalize(stream) }).catch(() => {
                view.setAlert(`This function is not available without microphone`)
            })
        } else if (result.state == 'denied') {
            view.setAlert(`You're blocking microphones, please allow accessing to your audio devices`)
        }
    })
}
sound.stopMicroStreamAnalize = () => {
    model.current.stream.getAudioTracks().forEach(track => { track.stop() });
    model.current.stream = undefined
}

sound.frequencyAnalize = (stream) => {
    model.current.stream = stream;
    const microContext = new AudioContext();
    const bufferSource = microContext.createMediaStreamSource(stream);
    const microAnalyser = new AnalyserNode(microContext, model.analizeDisplay)
    const microProcessor = microContext.createScriptProcessor(4096, 1, 1)
    bufferSource.connect(microAnalyser)
    bufferSource.connect(microProcessor)
    microProcessor.connect(microContext.destination)
    var bufferLength = microAnalyser.frequencyBinCount
    var analysisData = new Float32Array(bufferLength)
    microProcessor.onaudioprocess = () => {
        if (stream.active === true) {
            microAnalyser.getFloatFrequencyData(analysisData)
            pressedAnalysisData = sound.dataPresser(analysisData)
            if(pressedAnalysisData != [] && pressedAnalysisData.length > 0){
                loudestFrequency = sound.getLousdestFrequency(pressedAnalysisData)
                if(loudestFrequency != undefined) {
                    view.setFrequencyMeterRecordedNote(loudestFrequency)
                }
            }
        }
    }

}
sound.dataPresser = data => {
    if(data != undefined && data != []) {
        const pressedData = []
        for(i=0;i<data.length;i++) {
            var pressedPiece = {}
            const dbFloat = Math.pow(10, (data[i]/20))
            if(dbFloat > 0.005) {
                pressedPiece.db = dbFloat,
                pressedPiece.hz = i
                pressedData.push(pressedPiece)
            }
        }
        return pressedData
    }
    return undefined
}
sound.getLousdestFrequency = pressedData => {
    const loudestFrequency = {}
    if(pressedData != undefined && pressedData != []) {
        loudestFrequency.db = pressedData[0].db
        loudestFrequency.hz = pressedData[0].hz
        for(i=1;i<pressedData.length;i++) {
            if(pressedData[i].db > loudestFrequency.db) {
                loudestFrequency.db = pressedData[i].db
                loudestFrequency.hz = pressedData[i].hz
            }
            if(i===pressedData.length-1) return loudestFrequency
        }
    }
    return undefined
}


sound.playNoteByClick = newKey => {
    const clickedKey = newKey.id
    var soundLink
    if(clickedKey.indexOf("pi") == 2) {
        soundLink = noteLibrary.getPianoInstrumentLink(parseInt(clickedKey))
    } else if(clickedKey.indexOf("gu") == 2) {
        soundLink = noteLibrary.getGuitarInstrumentLink(parseInt(clickedKey))
    }
    view.holdNote(newKey)
    var noteSound = new Audio(soundLink);
    noteSound.play()
    newKey.addEventListener('mouseup', () => {
        view.releaseNote(newKey)
        noteSound.pause()
    })
}


sound.playNoteByPressKey = (noteCode) => {
    const soundLink = controller.checkInstrumentLink(noteCode)
    const pressedKey = controller.checkPressedKey(noteCode)
    view.holdNote(pressedKey)

    const noteSound = new AudioContext()
    const noteSource = noteSound.createBufferSource()
    const muteSound = noteSound.createGain()
    muteSound.gain.setValueAtTime(model.current.instrumentVolume, noteSound.currentTime)
    noteSource.connect(muteSound)
    muteSound.connect(noteSound.destination)
    var request = new XMLHttpRequest();
    request.open('GET', soundLink, true);
    request.responseType = 'arraybuffer';
    request.onload = () => {
        noteSound.decodeAudioData(request.response, buffer => {
            noteSource.buffer = buffer;
            noteSource.start()
        });
    }
    request.send();
    return {noteSound: noteSound, noteSource: noteSource, noteCode: noteCode}

}

sound.releaseNoteFromKeyUp = (playingNotes, playingNote, noteCode) => {
    if(playingNote.noteCode == noteCode) {
        if(playingNote.noteSound.state === 'running') {
            playingNote.noteSound.close()
            playingNotes.splice(playingNotes.indexOf(playingNote), 1)
        }
    }
}






