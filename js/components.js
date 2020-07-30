const components = {};
components.registerSrceen = `
<div class="registerContainer">
    <div class="registerForm">
        <div id="appLogo"><div id="appName">CHORDZ</div><div id="appSlogan">Share your music, share your life</div></div>
        <div id="formRegisterContainer">
            <form id="formRegister" spellcheck="false">
                <div class="inputWrapper">
                    <input type="text" autocomplete="off" name="name" placeholder="Full Name...">
                    <div class="error" id="errorName"></div>
                </div>
                <div class="inputWrapper">
                    <input type="text" name="email" placeholder="Email...">
                    <div class="error" id="errorEmail"></div>
                </div>
                <div class="inputWrapper">
                    <input type="password" name="password" placeholder="Password...">
                    <img class="showPassword" src="../images/showPassword.jpg">
                    <div class="error" id="errorPassword"></div>
                </div>
                <div class="inputWrapper">
                    <input type="password" name="confirmPassword" placeholder="Confirm Password...">
                    <img class="showPassword" src="../images/showPassword.jpg">
                    <div class="error" id="errorConfirmPassword"></div>
                </div>
                <button class="btn" type="submit">Register</button>
            </form>   
        </div>
        <div class='question'>Already have an account? <span id='redirectToLogin'><i class="fa fa-sign-in" aria-hidden="true"></i></span></div>
    </div>
</div>
<div id="alertWrapper">
    <div class="alert">ALERT</div>
    <div class="alert" id="alertTitle">A</div>
</div>
`
components.loginScreen = `
<div class="loginContainer">
<div class="loginForm">
    <div id="appLogo"><div id="appName">CHORDZ</div><div id="appSlogan">Share your music, share your life</div></div>
    <div id="formLoginContainer">
        <form id="formLogin" spellcheck="false">
            <div class="inputWrapper">
                <input type="text" name="email" placeholder="Email...">
                <div class="error" id="errorEmail"></div>
            </div>
            <div class="inputWrapper">
                <input type="password" name="password" placeholder="Password...">
                <img class="showPassword" src="../images/showPassword.jpg">
                <div class="error" id="errorPassword"></div>
            </div>
            <button class="btn" type="submit">login</button>
        </form>   
    </div>
    <div class='question'>Don't have an account? <span id='redirectToRegister'><i class="fa fa-user-plus" aria-hidden="true"></i></span></div>
</div>
</div>
<div id="alertWrapper">
<div class="alert">ALERT</div>
<div class="alert" id="alertTitle">A</div>
</div>
`
components.tempoMeter = `
    <div class="topBar">Tempo meter<i id="tempoCloseBtn" class="fa fa-window-close closeBtn" aria-hidden="true"></i></div>
    <div id="beatPad"></div>
    <div class="tempoValue"></div>
    <div class="tempoUnit"></div>
    <div class="botBar">
    <input id="tempoClickRange" value='0' type='range' disabled min='0' max='200'>
    </div>
`
components.frequencyMeter = `
<div class="noteWrapper noteActive">
    <div class="noteOctave"></div>
    <div class="noteName"></div>
    <div class="noteLoudness"></div>
</div>
`
components.pianoKeyboard = `
<div id="keyboardOptional">
    <i id="keyboardCloseBtn" class="fa fa-window-close closeBtn" aria-hidden="true"></i>
    <div id='guitarSoundBtn' title="GUITAR SOUND" class="keyboardFunctionBtn"></div>
    <div id='pianoSoundBtn' title="PIANO SOUND" class="keyboardFunctionBtn"></div>
</div>
<div id="pianoKeyboard"></div>
`
components.guitarKeyboard = `
<div id="keyboardOptional">
    <i id="keyboardCloseBtn" class="fa fa-window-close closeBtn" aria-hidden="true"></i>
    <div id='guitarSoundBtn' title="GUITAR SOUND" class="keyboardFunctionBtn"></div>
    <div id='pianoSoundBtn' title="PIANO SOUND" class="keyboardFunctionBtn"></div>
</div>
<div id="guitarKeyboard"></div>
`
components.guitarFretboard = `
<img src="../images/guitarFretboard.png" alt="GUITAR FRETBOARD">
`
components.promt = `
<div id="promtContainer">
    <div class="promtWrapper">
        <div class="promtMessage">Are you fuckin sure</div>
        <div class="promtAnswer">
            <div class="negativeAnswer">Hell no</div>
            <div class="positiveAnswer">Of cause</div>
        </div>
    </div>
</div>
`
components.mainInputing = `
<input id='songsName' autocomplete="off" type="text" autofocus="true" spellcheck="false" placeholder="Song's name">
<form id="lyrics">
    <textarea name="lyric" type="text" spellcheck="false" placeholder="Fill up this field with the lyric...&#10Please finish every single sentence with a dot.&#10Or type the next sentence on a new line.&#10Tips: Holding shift before press enter to add a new line."></textarea>
</form>
`
components.mainEditing = `
<input id='songsName'  autocomplete="off" type="text" spellcheck="false" placeholder="Song's name">
<div id="songsContentShow">
</div>
`
components.mainEditingTextarea = `
<form id="lyrics">
    <textarea name="lyric" type="text" spellcheck="false" placeholder="Fill up this field with the lyric...&#10Please finish every single sentence with a dot.&#10Or type the next sentence on a new line.&#10Tips: Holding shift before press enter to add a new line."></textarea>
</form>
`
components.mediaContainer = `
<i id="mediaCloseBtn" class="fa fa-window-close closeBtn" aria-hidden="true"></i>
<div id="mediaInputAnalize">
    <div class="leftContainer">
        <canvas id="mediaInputShow" width="1200px" height="800px"></canvas>
        <div class="leftBotBar">
                <form id="askForLastNote">Last note start play at: 
                    <input name="mins" type="number" min="0" max="99" placeholder="min">
                    <input name="secs" type="number" min="0" max="59" placeholder="sec"></form>
            <div id="playerCurrentTime">0:00/04:13</div>
        </div>
    </div>
    <div class="rightContainer">
        <div id='mediaInputSpeaker'>
            <input id='audioInput' type='file' accept="audio/*">
        </div>
        <div class="rightBotBar">100%</div>
    </div>
</div>
`

components.missionEditingMessage = `
    Click the button
    <div id="modelMediaBtn" title="User's information" class="modelFunctionBtn"></div>
    at top left angle to activate automatic finding mode.<br> Or click the button
    <div id="modelKeyboardBtn" title="User's information" class="modelFunctionBtn"></div>
    below to activate manually mode.
`
components.missionFindLastNoteMessage = `
    Find the song's last note first, fill those input 
    <div class="wordsNote">
        <input id='modelNote' type='text' maxlength="1" disabled placeholder="N">
    </div> with the piano keyboard at the bottom.<br>
    Press "⎵ space" to add one more note under every word and "← backspace" to remove note.<br>
    Tips: You can turn on frequency meter <div id="modelFrequencyBtn" title="Note meter" class="modelFunctionBtn"></div> to determine the note from your voice.
`