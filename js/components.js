const components = {};
components.registerSrceen = `
<div class="registerContainer">
    <div class="registerForm">
        <div id="appLogo"><div id="appName">CHORD</div><div id="appSlogan">Share your music, share your life</div></div>
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
</div>`
components.loginScreen = `
<div class="loginContainer">
<div class="loginForm">
    <div id="appLogo"><div id="appName">CHORD</div><div id="appSlogan">Share your music, share your life</div></div>
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
</div>`
components.tempoMeter = `
    <div class="topBar">Tempo meter<i id="tempoCloseBtn" class="fa fa-window-close" aria-hidden="true"></i></div>
    <div id="beatPad"></div>
    <div class="tempoValue"></div>
    <div class="tempoUnit"></div>
`