// Enable WEBMIDI.js and trigger the onEnabled() function when ready
WebMidi
    .enable()
    .then(onEnabled)
    .catch(err => alert(err));

// Function triggered when WEBMIDI.js is ready
function onEnabled() {
    // Display available MIDI input devices
    if (WebMidi.inputs.length < 1) {
        document.body.innerHTML+= "No device detected.";
    } else {
        WebMidi.inputs.forEach((device, index) => {
        document.body.innerHTML+= `${index}: ${device.name} <br>`;
        });
    }
    const mySynth = WebMidi.inputs[2];
    // const mySynth = WebMidi.getInputByName("TYPE NAME HERE!")

    WebMidi.inputs[2].channels[1].addListener("nrpn", e => {
        console.log(`Received 'nrpn' message (${e.parameter}).`);
    });

}