function onEnabled() {
    WebMidi.inputs[2].channels[1].addListener("nrpn", e => {
        console.log(`Received 'nrpn' parameter (${e.parameter}).`);
        console.log(`Subtype: ${e.subtype}`);
    });
}

let midiDeviceSelect;
let selectedDevice
async function setup() {
    createCanvas(400, 400);
    //MIDI STUFF
    midiDeviceSelect = createSelect();
    midiDeviceSelect.changed(() => {
        const deviceName = midiDeviceSelect.elt.value;
        const deviceIndex = WebMidi.inputs.findIndex(device => device.name === deviceName);
        selectedDevice = WebMidi.inputs[deviceIndex];
        selectedDevice.channels[1].addListener("nrpn", e => {
            console.log(`Received 'nrpn' parameter (${e.parameter}).`);
        });
    });
    await WebMidi.enable().then(onEnabled).catch(err => alert(err));
    WebMidi.inputs.forEach((device, index) => {
        midiDeviceSelect.option(device.name);   
    });

    //JSON STUFF
}

function draw() {
    background(220);
}