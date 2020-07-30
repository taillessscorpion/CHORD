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
    const sampleRate = microContext.sampleRate/2
  
    microProcessor.onaudioprocess = () => {
        if (stream.active === true) {
            microAnalyser.getFloatFrequencyData(analysisData)
            pressedAnalysisData = sound.dataPresser(analysisData, sampleRate)
            
            
            changedAnalysisData = sound.dataChanger(pressedAnalysisData)
            ///////
            averangeDb = sound.getAverangeDb(changedAnalysisData)
            loudestFrequencies = sound.dataFilterByAverangeDb(averangeDb, changedAnalysisData)
            // console.log(averangeDb, loudestFrequencies);
            ////


            // loudestFrequencies = sound.dataHypePresser(changedAnalysisData)
            // console.log(loudestFrequencies)
            // if(loudestFrequencies.length >= 1) {
            //     const newArray = []
            //     for(one of loudestFrequencies) {
            //         newOne = one.hz
            //         newArray.push(newOne)
            //     }
            //     console.log(newArray)
            // }


            /////
            view.setFrequencyMeterRecordedNote(loudestFrequencies)
            ///////


            // if(pressedAnalysisData != [] && pressedAnalysisData.length > 0){
            //     loudestFrequency = sound.getLoudestFrequency(pressedAnalysisData)
            //     if(loudestFrequency != undefined) {
            //         view.setFrequencyMeterRecordedNote(loudestFrequency)
            //     }
            // }


        }
    }

}
sound.dataPresser = (data, sampleRate) => {
    
    if(data != undefined && data != []) {
        const pressedData = []
        for(let i=0;i<data.length;i++) {
            const pressedPiece = {}
            const hz = i*sampleRate/data.length
            const dbFloat = Math.pow(10, (data[i]/20))
            let dbFullFilled = 0
            // var dbFullFilled = 0
            // for(let j = 0; j<model.averangeDb.length;j++) {
            //     if(model.averangeDb[j].hz === hz) {
            //         if(dbFloat >= model.averangeDb[j].db*4) {
            //             pressedPiece.hz = hz
            //             pressedPiece.db = dbFloat
            //             pressedData.push(pressedPiece)
            //         }
            //     }
            // }
            
            if(hz>=64 && hz<128) {
                dbEquality = ((64/hz)*500 + 10000)
                dbFullFilled = dbFloat * dbEquality
            } else if(hz>=128 && hz<256) {
                dbEquality = ((128/hz)*10000 + 5000000)
                dbFullFilled = dbFloat * dbEquality
            } else if(hz>=256 && hz<512) {
                dbEquality = ((256/hz)*1000 + 3000)
                dbFullFilled= dbFloat * dbEquality
            } else if(hz>=512 && hz<1024) {
                dbEquality = ((512/hz)*6 + 120)
                dbFullFilled = dbFloat * dbEquality
            } else if(hz>=1024 && hz<2048) {
                dbEquality = ((1024/hz) + 45)
                dbFullFilled = dbFloat * dbEquality
            } else if(hz>=2048 && hz<4096) {
                dbEquality = ((2048/hz) + 3)
                dbFullFilled = dbFloat * dbEquality
            } else if(hz>=4096 && hz<4100) {
                dbEquality = ((4096/hz) + 5)
                dbFullFilled = dbFloat * dbEquality
            }
            

            if(hz<128) {
                if(dbFullFilled > 60) {
                    pressedPiece.hz = hz
                    pressedPiece.db = dbFullFilled,
                    pressedData.push(pressedPiece)
                }
            } else if(hz<256) {
                if(dbFullFilled > 30000) {
                    pressedPiece.hz = hz
                    pressedPiece.db = dbFullFilled,
                    pressedData.push(pressedPiece)
                }
            } else if(hz<512) {
                if(dbFullFilled > 10) {
                    pressedPiece.hz = hz
                    pressedPiece.db = dbFullFilled,
                    pressedData.push(pressedPiece)
                }
            } else if(hz<1024) {
                if(dbFullFilled > 0.7) {
                    pressedPiece.hz = hz
                    pressedPiece.db = dbFullFilled,
                    pressedData.push(pressedPiece)
                }
            } else if(hz<2048) {
                if(dbFullFilled > 0.25) {
                    pressedPiece.hz = hz
                    pressedPiece.db = dbFullFilled,
                    pressedData.push(pressedPiece)
                }
            } else if(hz<=4100) {
                if(dbFullFilled > 0.005) {
                    pressedPiece.hz = hz
                    pressedPiece.db = dbFullFilled,
                    pressedData.push(pressedPiece)
                }
            } else {
                if(dbFullFilled > 0.0008) {
                    pressedPiece.hz = hz
                    pressedPiece.db = dbFullFilled,
                    pressedData.push(pressedPiece)
                }
            }

            // // if(hz>=64 && hz < 66) {
            // //     console.log(hz, dbFloat)
            // // }
            // if(hz>=128 && hz < 130) {
            //     console.log(hz, dbFullFilled)
            // }
            // if(hz>=140 && hz < 142) {
            //     console.log(hz, dbFullFilled)
            // }
            // if(hz>=158 && hz < 160) {
            //     console.log(hz, dbFullFilled)
            // }
            // if(hz>=178 && hz < 180) {
            //     console.log(hz, dbFullFilled)
            // }
            // if(hz>=200 && hz < 202) {
            //     console.log(hz, dbFullFilled)
            // }
            // if(hz>=228 && hz < 230) {
            //     console.log(hz, dbFullFilled)
            // }
            // if(hz>=240 && hz < 242) {
            //     console.log(hz, dbFullFilled)
            //     console.log('')
            // }
            
            // // if(hz>=256 && hz < 258) {
            // //     console.log(hz, dbFullFilled)
            // ///// 10
            // // }
            // // if(hz>=512 && hz < 516) {
            // //     console.log(hz, dbFullFilled)
            // ////// 0.1
            // // }
            // // if(hz>=1024 && hz < 1028) {
            // //         console.log(hz, dbFullFilled)
            // //     }
            // // if(hz>=2048 && hz < 2055) {
            // //     console.log(hz, dbFullFilled)
            // // }
            // //////// >0.01
            // // if(hz>=4096 && hz < 4100) {
            // //         console.log(hz, dbFullFilled)
            // //////  > 0.001
            // //     }

            // // if(i*sampleRate/data.length <= 68 && i*sampleRate/data.length >= 67) {
            // //     console.log(dbFloat)
            // // }
        }
        return pressedData
    }
    return undefined
}
sound.dataChanger = pressedData => {
    const changedData = []
    for(one of pressedData) {
        const newOne = {
            nc: noteLibrary.getNoteCodeFromFrequency(one.hz),
            nt: noteLibrary.getNoteFullName(noteLibrary.getNoteCodeFromFrequency(one.hz)),
            hz: one.hz,
            db: one.db,
        }
        changedData.push(newOne)
    }
    return changedData
}
sound.getAverangeDb = changedData => {
    var averangeDb = 0
    if(changedData != [] && pressedAnalysisData.length > 0) {
        for(one of changedData) {
            averangeDb += one.db
        }
        return averangeDb /= pressedAnalysisData.length
    }
    return 0
}
sound.dataFilterByAverangeDb = (averangeDb, changedAnalysisData) => {
    const loudestFrequencies = []
    if(changedAnalysisData != [] && changedAnalysisData.length != 0 && averangeDb != 0) {
        for(one of changedAnalysisData) {
            if(one.db >= averangeDb) {

                if(loudestFrequencies.length === 0) {
                    loudestFrequencies.push(one)
                } else {
                    for(let i=0;i<loudestFrequencies.length;i++) {
                        if(one.nc === loudestFrequencies[i].nc) break
                        else {
                            if(i === loudestFrequencies.length-1) {
                                loudestFrequencies.push(one)
                            }
                        }
                    }
                }

            }
        }
    }
    return loudestFrequencies
}

sound.dataHypePresser = changedAnalysisData => {
    const loudestFrequencies = []
    if(changedAnalysisData != [] && changedAnalysisData.length != 0) {
        for(one of changedAnalysisData) {


            if(loudestFrequencies.length === 0) {
                loudestFrequencies.push(one)
            } else {
                for(let i=0;i<loudestFrequencies.length;i++) {
                    if(loudestFrequencies[i].nt === one.nt) break
                    else {
                        if(i === loudestFrequencies.length-1) {
                            loudestFrequencies.push(one)
                        }
                    }
                }
            }


        }
    }
    return loudestFrequencies
}



sound.getLoudestFrequency = pressedData => {
    const loudestFrequency = {}
    if(pressedData != undefined && pressedData != []) {
        loudestFrequency.db = pressedData[0].db
        loudestFrequency.hz = pressedData[0].hz
        for(let i=1;i<pressedData.length;i++) {
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

sound.getScale = () => {
    const wholeSong = model.current.song.noteForAnalize
    const lastSentence = wholeSong[wholeSong.length-1]
    const lastNote = noteLibrary.getNoteScaleToTwelveFromNoteCode(lastSentence[lastSentence.length-1])
    if(lastNote != -1) {
        const scale = noteLibrary.getScaleFromNoteCode(lastNote)
        model.current.song.undetectedScale = scale
        model.current.song.undetectedScale.name = noteLibrary.getNoteClassName(lastNote)
        model.current.song.scale = undefined
        view.setSongGamme('N/A')
        view.setMissions('The last note is inputted. <br> Try another note.')
    } else {
        view.setMissions('The last note is not determined. <br> Please, input the last note.')
        model.current.song.undetectedScale = undefined
        model.current.song.scale = undefined
    }
}
sound.checkScale = () => {
    if(model.current.song.undetectedScale != undefined && model.current.song.scale === undefined) {
        const scale = model.current.song.undetectedScale
        model.current.song.undetectedScale.minorFail = 0
        model.current.song.undetectedScale.majorFail = 0
        for(let j=0;j<model.current.song.noteForAnalize.length;j++) {
            const sentenceNote = model.current.song.noteForAnalize[j]
            if(sentenceNote.length != 0) {
                for(let i=0;i<sentenceNote.length;i++) {
                    if(sentenceNote[i] != -1) {
                        for(let k=0;k<scale.major.length;k++) {
                            if(sentenceNote[i] === scale.major[k] && sentenceNote[i] === scale.minor[k]) break
                            else if (sentenceNote[i] === scale.major[k] && sentenceNote[i] != scale.minor[k]) {
                                model.current.song.undetectedScale.minorFail++
                                break
                            }
                            else if (sentenceNote[i] != scale.major[k] && sentenceNote[i] === scale.minor[k]) {
                                model.current.song.undetectedScale.majorFail++
                                break
                            }
                            else if (sentenceNote[i] != scale.major[k] && sentenceNote[i] != scale.minor[k] && k === scale.major.length-1) {
                                view.setAppStatus(`The note ${noteLibrary.getNoteClassName(sentenceNote[i])} maybe incorrect.`)
                            }
                        }
                    }
                }
            }
        }
        if(model.current.song.undetectedScale.minorFail >= 3 && model.current.song.undetectedScale.majorFail >= 3) {
            view.setAppStatus('The gamme is absolutely incorrect')
            model.current.song.undetectedScale = undefined
        } else {
            if (model.current.song.undetectedScale.minorFail - model.current.song.undetectedScale.majorFail >= 3) {
                model.current.song.scale = {
                    note: model.current.song.undetectedScale.major,
                    modal: 'major',
                    name: model.current.song.undetectedScale.name,
                    chord: controller.chordFilter(chordLibrary.getAvailableChords(model.current.song.undetectedScale.major)),
                }
                view.setSongGamme(model.current.song.scale.name)
                view.setAppStatus(`Detected gamme ${model.current.song.scale.name}`)
            } else if (model.current.song.undetectedScale.majorFail - model.current.song.undetectedScale.minorFail >=3) {
                model.current.song.scale = {
                    note: model.current.song.undetectedScale.minor,
                    modal: 'minor',
                    name: model.current.song.undetectedScale.name + 'm',
                    chord: controller.chordFilter(chordLibrary.getAvailableChords(model.current.song.undetectedScale.minor)),
                }
                view.setSongGamme(model.current.song.scale.name)
                view.setAppStatus(`Detected gamme ${model.current.song.scale.name}`)
            }
        }
            
    } else if (model.current.song.undetectedScale === undefined && model.current.song.scale === undefined) {
        view.setSongGamme('N/A')
        view.setMissions("The song's gamme is incorrect, or has never been inputted")
    } else if (model.current.song.scale != undefined) {
        const scale = model.current.song.scale.note
        notePasses = 0
        noteFails = 0
        const notesFail = []
        for(let j=0;j<model.current.song.noteForAnalize.length;j++) {
            const sentenceNote = model.current.song.noteForAnalize[j]
            if(sentenceNote.length != 0) {
                for(let i=0;i<sentenceNote.length;i++) {
                    if(sentenceNote[i] != -1) {
                        for(let k=0;k<scale.length;k++) {
                            if(sentenceNote[i] === scale[k]) {
                                notePasses++
                                break
                            }
                            else if (sentenceNote[i] != scale[k] && k === scale.length-1) {
                                noteFails++
                                const noteFail = {
                                    note: sentenceNote[i],
                                    at: j+1
                                }
                                notesFail.push(noteFail)
                                break
                            }
                        }
                    }
                }
            }
        }
        notifyString = ''
        if(notesFail.length>=1) {
            for(let n=0;n<notesFail.length;n++) {
                if(n!=notesFail.length-1) notifyString += noteLibrary.getNoteClassName(notesFail[n].note) + ' at sentence ' + notesFail[n].at + ', '
                else notifyString += noteLibrary.getNoteClassName(notesFail[n].note) + ' at sentence ' + notesFail[n].at + '.'
            }
        }
        if(notifyString != '') view.setMissions(`These notes are wrong: ${notifyString}`)
        else view.setMissions('All notes are correct, keep trying')
    }
}
sound.getFitNoteChord = noteCode => {
    if(model.current.song.scale != undefined) {
        const allChords = model.current.song.scale.chord
        const noteRecommendChord = allChords.filter(objc => objc.notes.indexOf(noteCode) != -1 || objc.notes.indexOf(noteCode-12) != -1 || objc.notes.indexOf(noteCode+12) != -1)
        return noteRecommendChord
    }
    return []
}
sound.getFitNotesChord = (checkStart, checkEnd) => {
    model.current.song.chordJustShow = []
    const allNote = model.current.song.noteForSave
    const takenNote = []
    const takenChord = []
    let finalChord = []
    if(checkStart.sentence === checkEnd.sentence) {
        if(checkStart.word === checkEnd.word) {
            if(checkStart.note === checkEnd.note) {
                takenNote.push(allNote[checkStart.sentence-1][checkStart.word][checkStart.note])
                model.current.song.noteCheckPosition.push({
                    sentence: checkStart.sentence,
                    word: checkStart.word,
                    note: checkStart.note,
                })
            } else {
                for(let j = checkStart.note; j <checkEnd.note+1; j++) {
                    takenNote.push(allNote[checkStart.sentence-1][checkStart.word][j])
                    model.current.song.noteCheckPosition.push({
                        sentence: checkStart.sentence,
                        word: checkStart.word,
                        note: j,
                    })
                }
            }
        } else {
            for(let j = checkStart.word; j < checkEnd.word+1; j++) {
                if(j === checkStart.word) {
                    for(let k = checkStart.note; k<allNote[checkStart.sentence-1][checkStart.word].length; k ++) {
                        takenNote.push(allNote[checkStart.sentence-1][checkStart.word][k])
                        model.current.song.noteCheckPosition.push({
                            sentence: checkStart.sentence,
                            word: checkStart.word,
                            note: k,
                        })
                    }
                } else if ( j === checkEnd.word) {
                    for(let k = 0; k < checkEnd.note+1; k++) {
                        takenNote.push(allNote[checkStart.sentence-1][checkEnd.word][k])
                        model.current.song.noteCheckPosition.push({
                            sentence: checkStart.sentence,
                            word: checkEnd.word,
                            note: k,
                        })
                    }
                } else {
                    for(let k = 0; k< allNote[checkStart.sentence-1][j].length;k++) {
                        takenNote.push(allNote[checkStart.sentence-1][j][k])
                        model.current.song.noteCheckPosition.push({
                            sentence: checkStart.sentence,
                            word: j,
                            note: k,
                        })
                    }
                }
            }
        }
    } else {
        for(let i = checkStart.sentence-1; i < checkEnd.sentence; i++) {
            if(i === checkStart.sentence-1) {
                for(let j = checkStart.word; j < allNote[checkStart.sentence-1].length; j++) {
                    if(j === checkStart.word) {
                        for(let k = checkStart.note; k< allNote[checkStart.sentence-1][checkStart.word].length; k++) {
                            takenNote.push(allNote[checkStart.sentence-1][checkStart.word][k])
                            model.current.song.noteCheckPosition.push({
                                sentence: checkStart.sentence,
                                word: checkStart.word,
                                note: k,
                            })
                        }
                    } else {
                        for(let k = 0; k < allNote[checkStart.sentence-1][j].length; k++) {
                            takenNote.push(allNote[checkStart.sentence-1][j][k])
                            model.current.song.noteCheckPosition.push({
                                sentence: checkStart.sentence,
                                word: j,
                                note: k,
                            })
                        }
                    }
                }
            } else if (i === checkEnd.sentence-1) {
                for(let j = 0; j < checkEnd.word+1; j++) {
                    if(j === checkEnd.word) {
                        for(let k = 0; k < checkEnd.note+1;k++) {
                            takenNote.push(allNote[checkEnd.sentence-1][checkEnd.word][k])
                            model.current.song.noteCheckPosition.push({
                                sentence: checkEnd.sentence,
                                word: checkEnd.word,
                                note: k,
                            })
                        }
                    } else {
                        for(let k = 0; k < allNote[checkEnd.sentence-1][j].length; k++) {
                            takenNote.push(allNote[checkEnd.sentence-1][j][k])
                            model.current.song.noteCheckPosition.push({
                                sentence: checkEnd.sentence,
                                word: j,
                                note: k,
                            })
                        }
                    }
                }
            } else {
                for(let j = 0; j < allNote[i].length; j++) {
                    for(let k = 0; k < allNote[i][j].length; k++) {
                        takenNote.push(allNote[i][j][k])
                        model.current.song.noteCheckPosition.push({
                            sentence: i,
                            word: j,
                            note: k,
                        })
                    }
                }
            }
        }
    }
    for(let i = 0; i < takenNote.length; i++) {
        const chord = sound.getFitNoteChord(noteLibrary.getNoteScaleToTwelveFromClassName(takenNote[i]))
        takenChord.push(chord)
    }
    if(takenChord.length === 1) {
        finalChord = takenChord[0]
    } else {
        for(let i = 0;i<takenChord.length-1;i++) {
            if(i === 0) {
                finalChord = controller.comparationFilter(takenChord[0], takenChord[1])
            } else {
                if(finalChord.length != 0) {
                    finalChord = controller.comparationFilter(finalChord, takenChord[i+1])
                } else break
            }
        }
    }
    if(checkStart.sentence === checkEnd.sentence) {
        const chordWidth = controller.checkChordWidth(checkStart, checkEnd)
        const chordElement = view.addLyricsChord(checkStart, chordWidth, finalChord)
        model.current.song.chordJustShow.push(chordElement)
    } else {
        for(let i = checkStart.sentence; i < checkEnd.sentence+1; i++) {
            if(i === checkStart.sentence) {
                const sentenceElement = document.getElementById(`${checkStart.sentence}st`)
                const checkEndCalc = {
                    sentence: checkStart.sentence,
                    word: sentenceElement.firstChild.children.length-1,
                    note: sentenceElement.firstChild.children[sentenceElement.children.length-1].lastChild.children.length-1,
                    last: sentenceElement.firstChild.children[sentenceElement.children.length-1].lastChild.children.length-1
                }
                const chordWidth = controller.checkChordWidth(checkStart, checkEndCalc)
                const chordElement = view.addLyricsChord(checkStart, chordWidth, finalChord)
                model.current.song.chordJustShow.push(chordElement)
            } else if (i === checkEnd.sentence) {
                const sentenceElement = document.getElementById(`${checkEnd.sentence}st`)
                const checkStartCalc = {
                    sentence: checkEnd.sentence,
                    word: 0,
                    note: 0,
                    last: sentenceElement.firstChild.children[0].lastChild.children.length-1,
                }
                const chordWidth = controller.checkChordWidth(checkStartCalc, checkEnd)
                const chordElement = view.addLyricsContinuousChord(checkStartCalc, chordWidth)
                model.current.song.chordJustShow.push(chordElement)
            } else {
                const sentenceElement = document.getElementById(`${i}st`)
                const checkStartCalc = {
                    sentence: i,
                    word: 0,
                    note: 0,
                    last: sentenceElement.firstChild.children[0].lastChild.children.length-1,
                }
                const checkEndCalc = {
                    sentence: i,
                    word: sentenceElement.firstChild.children.length-1,
                    note: sentenceElement.firstChild.children[sentenceElement.children.length-1].lastChild.children.length-1,
                    last: sentenceElement.firstChild.children[sentenceElement.children.length-1].lastChild.children.length-1
                }
                const chordWidth = controller.checkChordWidth(checkStartCalc, checkEndCalc)
                const chordElement = view.addLyricsContinuousChord(checkStartCalc, chordWidth)
                model.current.song.chordJustShow.push(chordElement)
            }
        }
    }
}


