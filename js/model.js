const model = {};
model.analizeDisplay = {
    fftSize: 32768,
    maxDecibels: -30,
    minDecibels: -60,
    smoothingTimeConstant: 0,
}
model.frequencyTolerance = -5;
model.current = {
    stream: undefined,
    instrument: 'piano',
    function: undefined,
    playingNotes: [],
    instrumentVolume: 0.5
}
model.pianoKeys = ['R⇧', 'A', 'Z', 'S', 'X', 'C', 'F', 'V', 'G', 'B', 'H', 'N', 'M', 'K', ',', 'L', '.', '/', `'`, 'L⇧', '↩', '↹', '1', 'Q', 'W', '3', 'E', '4', 'R', 'T', '6', 'Y', '7', 'U', '8', 'I', 'O', '0', 'P', '-', '[', ']', '⟵', '\\' ]
model.guitarKeys  = ['Z', 'X', 'D', 'C', 'F', 'V', 'G', 'B', 'N', 'J', 'M', 'K', ',', '.', ';', '/', `1`, 'Q', '2', 'W', 'E', '4', 'R', '5', 'T', 'Y', '7', 'U', '8', 'I', '9', 'O', 'P', '-', '[', '=', ']']
model.pianoKeysCode = ["ShiftLeft", "KeyA", 'KeyZ', 'KeyS', 'KeyX', 'KeyC', 'KeyF', 'KeyV', 'KeyG', 'KeyB', 'KeyH', 'KeyN', 'KeyM', 'KeyK', 'Comma', 'KeyL', 'Period', 'Slash', 'Quote', 'ShiftRight', 'Enter', 'Tab', 'Digit1', 'KeyQ', 'KeyW', 'Digit3', 'KeyE', 'Digit4', 'KeyR', 'KeyT', 'Digit6', 'KeyY', 'Digit7', 'KeyU', 'Digit8', 'KeyI', 'KeyO', 'Digit0', 'KeyP', 'Minus', 'BracketLeft', 'BracketRight', 'Backspace', 'Backslash']
model.guitarKeysCode = ['KeyZ', 'KeyX', 'KeyD', 'KeyC', 'KeyF', 'KeyV', 'KeyG', 'KeyB', 'KeyN', 'KeyJ', 'KeyM', 'KeyK', 'Comma', 'Period', 'Semicolon', 'Slash', 'Digit1', 'KeyQ', 'Digit2', 'KeyW', 'KeyE', 'Digit4', 'KeyR', 'Digit5', 'KeyT', 'KeyY', 'Digit7', 'KeyU', 'Digit8', 'KeyI', 'Digit9', 'KeyO', 'KeyP', 'Minus', 'BracketLeft', 'Equal', 'BracketRight']
// console.log(model.pianoKeys)

