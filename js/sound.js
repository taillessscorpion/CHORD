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
    model.currentStream.getAudioTracks().forEach(track => { track.stop() });
    model.currentStream = undefined
    console.log('work')
}

sound.frequencyAnalize = (stream) => {
    model.currentStream = stream;
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

// sound.dataFilter = data => {
//     var filtedData = []
//     for (i = 0; i < data.length; i++) {
//         if (filtedData.length === 0) {
//             const newData = {
//                 db: data[i].db,
//                 hz: data[i].hz,
//                 ps: i,
//             }
//             filtedData.push(newData);
//         } else {
//             if (data[i].db != filtedData[filtedData.length - 1].db) {
//                 const newData = {
//                     db: data[i].db,
//                     hz: data[i].hz,
//                     ps: i,
//                 }
//                 filtedData.push(newData);
//             }
//         }
//     }
//     return filtedData
// }