

// // const frequencyMeterBtn = document.getElementById('frequencyMeterBtn')
// // const songInput = document.getElementById('songInput');
// const audioPlayer = document.getElementById('audioPlayer');
// // const canvas = document.getElementById('canvas');
// var decibel = [];



// // //// FIRST KNOW ABOUT XMLHttpRquest API
// // // var xhr = new XMLHttpRequest();
// // // xhr.onreadystatechange = handleStateChange; // Implemented elsewhere.
// // // xhr.open("GET", "https://api.example.com/data.json", true);
// // // xhr.send();
// // // var handleStateChange = e => {console.log(e)}



const songInput = document.getElementById('songInput')
songInput.addEventListener("input", e => {
    const audioInput = e.srcElement.files[0]
    const url = URL.createObjectURL(audioInput);
    // // create the audio context
    const audioContext = new AudioContext();
    // create a buffer source node
    const sourceNode = audioContext.createBufferSource();
    // setup a analyzer
    const gainNode = audioContext.createGain();
    const analyser = new AnalyserNode(audioContext, {
        fftSize: 32768,
        maxDecibels: -10,
        minDecibels: -90,
        smoothingTimeConstant: 0,
    });
    sourceNode.connect(analyser)
    analyser.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    console.log(audioContext.currentTime)
    // load the specified sound
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    // When loaded decode the data
    request.onload = () => {
        // decode the data
        audioContext.decodeAudioData(request.response, buffer => {
            // when the audio is decoded play the sound
            sourceNode.buffer = buffer;
            sourceNode.start();
        });
    }
    request.send();

    var bufferLength = analyser.frequencyBinCount
    var dataArray = new Uint8Array(bufferLength)

    const ctx = canvas.getContext('2d');
    var canvasWidth = 2000, canvasHeight = 800;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    function DrawFrequencyAnalize() {
        drawVisual = requestAnimationFrame(DrawFrequencyAnalize);
        gainNode.gain.setValueAtTime(1, audioContext.currentTime);
        analyser.getByteFrequencyData(dataArray);
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = "rgb(10, 80, 124)";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        var barWidth = (canvasWidth / bufferLength) * 10;
        var barHeight;
        var x = 0;
        for (var i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];
            ctx.fillStyle = `rgb(${barHeight},${150 + barHeight},${150 + barHeight*3})`
            ctx.fillRect(x, canvasHeight, barWidth, -barHeight*4);
            x += barWidth;
        }
    }
    DrawFrequencyAnalize()
})

// sourceNode.onended = () => {
//     console.log(decibel)
//     // dataJSON = JSON.stringify(decibel);
//     // localStorage.setItem("testData", dataJSON);
//     dataJSON = JSON.stringify(decibel);
//     localStorage.setItem("testData1", dataJSON);
// }

// console.log(analyser)

// dataLoaded = localStorage.getItem("test.json");
// data = JSON.parse(dataLoaded);

// console.log(data);


// dataLoaded  = localStorage.getItem("testData");
// data = JSON.parse(dataLoaded);



// var clearNumber = 0;
// var handledData = []
// for (i = 0; i < data.length; i++) {
//     if (handledData.length === 0) {
//         const newData = {
//             db: data[i].decibels,
//             hz: data[i].hz,
//             ps: i,
//         }
//         handledData.push(newData);
//     } else {
//         if (data[i].decibels != handledData[handledData.length - 1].decibels && data[i].hz != handledData[handledData.length - 1].hz) {
//             const newData = {
//                 db: data[i].decibels,
//                 hz: data[i].hz,
//                 ps: i,
//             }
//             handledData.push(newData);
//         }
//     }
// }
// for (x = 0; x < handledData.length; x++) {
//     if (x != handledData.length - 1) {
//         handledData[x] = {
//             db: handledData[x].db,
//             hz: handledData[x].hz,
//             // sec: (handledData[x+1].ps - handledData[x].ps)*254/171167
//             sec: (handledData[x + 1].ps - handledData[x].ps) * 224 / 12695
//         }
//     } else {
//         handledData[x] = {
//             db: handledData[x].db,
//             hz: handledData[x].hz,
//             // sec: (data.length - handledData[x].ps+1)*254/171167
//             sec: (data.length - handledData[x].ps + 1) * 224 / 12695
//         }
//         console.log(handledData[x])
//     }
// }
// var totalSecond = 0;
// for (one of handledData) {
//     totalSecond += one.sec
// }
// var totalHz = 0;
// for (one of handledData) {
//     totalHz += (one.hz * one.sec)
// }
// let averangeHz = totalHz / totalSecond
// console.log(averangeHz, totalSecond, handledData);




// load
// dataLoaded  = localStorage.getItem("testData");
// data = JSON.parse(dataLoaded);


/// save
// const test1 = {
//     key: 0,
//     test: 'work'
// }
// dataJSON = JSON.stringify(test1);
// localStorage.setItem("test.json", dataJSON);


document.addEventListener('keydown', e => {console.log(e)})












// /// /// STREAMING
// const model = {};
// model.currentStream = undefined;

// const frequencyAnalize = (stream) => {
//     model.currentStream = stream;

//     //// ACCESS RAW DATA
//     const context = new AudioContext();
//     const source = context.createMediaStreamSource(stream);
//     const processor = context.createScriptProcessor(4096, 1, 1);


//     source.connect(processor);
//     processor.connect(context.destination);

//     processor.onaudioprocess = (e) => {
//         // Do something with the data, e.g. convert it to WAV
//         if (stream.active === true) {
//             console.log(e);
//         }
//     };
// };

// const stopFrequencyAnalize = (stream) => {
//     stream.getAudioTracks().forEach(track => { track.stop() });
// }

// //////// CLICK START RECORD TO DETERMINE NOTE
// const startFrequencyMeter = () => {
//     frequencyMeterBtn.removeEventListener("click", startFrequencyMeter);
//     navigator.permissions.query({ name: 'microphone' }).then(result => {
//         if (result.state == 'granted') {
//             navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => { frequencyAnalize(stream) })
//         } else if (result.state == 'prompt') {
//             navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => { frequencyAnalize(stream) }).catch(() => {
//                 console.log(`This function is not available without microphone`)
//             })
//         } else if (result.state == 'denied') {
//             console.log(`You're blocking microphones, please allow access to your audio devices`)
//         }
//         frequencyMeterBtn.addEventListener('click', stopFrequencyMeter);
//     })
// }
// const stopFrequencyMeter = () => {
//     frequencyMeterBtn.removeEventListener('click', stopFrequencyMeter);
//     stopFrequencyAnalize(model.currentStream);
//     frequencyMeterBtn.addEventListener("click", startFrequencyMeter);
// }
// frequencyMeterBtn.addEventListener("click", startFrequencyMeter);





// let shouldStop = false;
// let stopped = false;
// const downloadLink = document.getElementById('download');
// const stopButton = document.getElementById('stop');

// stopButton.addEventListener('click', () => {
//     shouldStop = true;

// });

// const handleSuccess = stream => {
//     const options = { mimeType: 'audio/webm', audioBitsPerSecond : 128000 };
//     const recordedChunks = [];
//     const mediaRecorder = new MediaRecorder(stream, options);

//     mediaRecorder.ondataavailable =  e => {
//         if (e.data.size > 0) {
//             recordedChunks.push(e.data);
//         }
//         if (shouldStop === true && stopped === false) {
//             mediaRecorder.stop();
//             stopped = true;
//         }
//     };
//     mediaRecorder.onstop = () => {
//         downloadLink.href = window.URL.createObjectURL(new Blob(recordedChunks));
//         downloadLink.download = 'acetest.mp3';
//     };
//     mediaRecorder.start(100);

// };

// navigator.mediaDevices.getUserMedia({ audio: true }).then(handleSuccess);



//// RELOAD WINDOW
// location.reload();

////// ACCESS RAW DATA
// const handleSuccess = function (stream) {
//     const context = new AudioContext();
//     const source = context.createMediaStreamSource(stream);
//     const processor = context.createScriptProcessor(1024, 1, 1);

//     source.connect(processor);
//     processor.connect(context.destination);

//     processor.onaudioprocess = function (e) {
//         // Do something with the data, e.g. convert it to WAV
//         console.log(e.inputBuffer);
//     };
// };

// navigator.mediaDevices.getUserMedia({ audio: true, video: false })
//     .then(handleSuccess);






        /////// ONLINE CHECK
        ///// return boolean
        // console.log(navigator.onLine)
        //// return connection
        // console.log(navigator.connection)



        /// GET USER MEDIA DEVICE
        // navigator.mediaDevices.getUserMedia({ audio: true, video: false}).then(stream => 
        // console.log(stream)
        // ).catch(error =>
        // console.log(`You're blocking microphones, please allow access to your audio devices`)
        // );


        /// ENUMERATE DEVICES
        // navigator.mediaDevices.enumerateDevices().then((devices) => {
        //     devices = devices.filter((d) => {d.kind === 'audioinput'; console.log(d.kind)});
        // });


        /// /// GET AUDIO FILE
// songInput.addEventListener('change', function (e) {
//     const file = e.target.files[0];
//     const url = URL.createObjectURL(file);
//     // Do something with the audio file.
//     audioPlayer.src = url;
// });



/// /// STREAMING PLAYER 
// const frequencyAnalize = function (stream) {
//     stream.getTracks().forEach(track => {
//         console.log(track)
//     });
//     if (window.URL) {
//         audioPlayer.srcObject = stream;

//     } else {
//         audioPlayer.src = stream;
//     }
// };




