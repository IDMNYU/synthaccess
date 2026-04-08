var vvv;
var chan = 1; // active MIDI channel
var firstspeak = 1;
var shiftDown = 0;

// DOM / speech / MIDI stuff
var fileSelect;
var fileList = []; // list of JSON files
var filePtr = 0; // current file
var midiDeviceSelectIn;
var midiInList = []; // list of MIDI input devices
var midiInPtr = 0; // current device
var midiDeviceSelectOut;
var midiOutList = []; // list of MIDI output devices
var midiOutPtr = 0; // current device
let selectedDevice;

var textDebug;
let speaker; // speech synthesis object
var thestuff; // JSON data

function onEnabled() { // MIDI active
  midiInList = [];
  midiOutList = [];

  WebMidi.inputs[midiInPtr].addListener("programchange", (e) => doit(e));
  WebMidi.inputs[midiInPtr].addListener("controlchange", (e) => doit(e));
  WebMidi.inputs[midiInPtr].addListener("nrpn", (e) => doit(e));

  WebMidi.inputs.forEach((device, index) => {
    midiDeviceSelectIn.option(device.name);
    midiInList.push(device.name);
  });
  WebMidi.outputs.forEach((device, index) => {
    midiDeviceSelectOut.option(device.name);
    midiOutList.push(device.name);
  });
}


// main stuff:
async function setup() {
  let blah;
  noCanvas();

  //text debugger:
  textDebug = createDiv('hi there');

  blah = createDiv('<br>JSON files:');

  fileList = await loadStrings('devlist.txt');
  fileSelect = createSelect();
  fileList.forEach((fname) => {
    if(fname.length>0) fileSelect.option(fname);
  });
    fileSelect.changed(() => {
    const fileName = fileSelect.elt.value;
    const fileIndex = fileList.findIndex(
      (element) => element === fileName,
      );
    loadFile(fileIndex);
  });

  blah = createDiv('<br>MIDI inputs:');

  //MIDI STUFF
  midiDeviceSelectIn = createSelect();
  midiDeviceSelectIn.changed(() => {
    const deviceName = midiDeviceSelectIn.elt.value;
    const deviceIndex = WebMidi.inputs.findIndex(
      (device) => device.name === deviceName,
      );
    changeMidiInput(deviceIndex);
  });

  blah = createDiv('<br>MIDI outputs:');

  midiDeviceSelectOut = createSelect();
  midiDeviceSelectOut.changed(() => {
    const deviceName = midiDeviceSelectOut.elt.value;
    const deviceIndex = WebMidi.outputs.findIndex(
      (device) => device.name === deviceName,
      );
    changeMidiOutput(deviceIndex);
  });

  textAlign(LEFT, CENTER);
  textSize(24);
  fill(255);
  text("hi there", 50, width / 2);

  speaker = new p5.Speech();

  await WebMidi.enable()
  .then(onEnabled)
  .catch((err) => alert(err));

  // end of setup
}


// require user interaction on audio context
function keyPressed() {
  // say cheers:
  if(firstspeak) {
    speaker.setVoice('Google US English');
    speaker.interrupt = true;
    speaker.speak("Welcome to MIDI to Speech! Press i for instructions.");
    firstspeak = 0;
  }
  if(keyCode === 37&&!shiftDown) changeMidiInput(midiInPtr-1);
  if(keyCode === 39&&!shiftDown) changeMidiInput(midiInPtr+1);
  if(keyCode === 37&&shiftDown) changeMidiOutput(midiOutPtr-1);
  if(keyCode === 39&&shiftDown) changeMidiOutput(midiOutPtr+1);
  if(keyCode === 38) loadFile(filePtr-1);
  if(keyCode === 40) loadFile(filePtr+1);
}

async function loadFile(_ptr)
{
  filePtr = (_ptr + fileList.length)%fileList.length; // keep in bounds
  fileSelect.selected(fileList[filePtr]);
  const fileName = fileSelect.elt.value;
  speaker.speak("File Selected " + fileName.split('.json')[0]);
  thestuff = await loadJSON('./devices/'+fileName);
}

function changeMidiInput(_ptr)
{
  midiInPtr = (_ptr + midiInList.length)%midiInList.length; // keep in bounds
  midiDeviceSelectIn.selected(midiInList[midiInPtr]);
    const deviceName = midiDeviceSelectIn.elt.value;
    speaker.speak("MIDI input " + deviceName);
    const deviceIndex = WebMidi.inputs.findIndex(
      (device) => device.name === deviceName,
      );

    // remove earlier listeners
    WebMidi.inputs.forEach((device, index) => {
      WebMidi.inputs[index].removeListener("nrpn");
      WebMidi.inputs[index].removeListener("controlchange");
      WebMidi.inputs[index].removeListener("programchange");
    });

    // add new listeners
    selectedDevice = WebMidi.inputs[deviceIndex];
    selectedDevice.addListener("programchange", (e) => doit(e));
    selectedDevice.addListener("controlchange", (e) => doit(e));
    selectedDevice.addListener("nrpn", (e) => doit(e));
}

function changeMidiOutput(_ptr)
{
  midiOutPtr = (_ptr + midiOutList.length)%midiOutList.length; // keep in bounds
  midiDeviceSelectOut.selected(midiOutList[midiOutPtr]);
    const deviceName = midiDeviceSelectOut.elt.value;
    speaker.speak("MIDI output " + deviceName);
    const deviceIndex = WebMidi.outputs.findIndex(
      (device) => device.name === deviceName,
      );

}

function draw() {
  if (keyIsDown('ShiftLeft')=== true || keyIsDown('ShiftRight')===true) shiftDown = 1; else shiftDown = 0;
}

function doit(_mess) {

  let _c;
  let _param;
  let _val;

  if(_mess.type=="controlchange")
  {
    _c = _mess.message.channel;
    if(_mess.subtype=="dataentrycoarse") vvv = parseInt(_mess.rawValue) << 7;
    if(_mess.subtype=="dataentryfine") vvv+= parseInt(_mess.rawValue);
    _param = _mess.controller.number;
    _val = _mess.rawValue;
    if(_c==chan&&_param!=99&&_param!=98&&_param!=6&&_param!=38) {
            if(_param!=100&&_param!=101) // filter out RPNs (temporary)
            {
              showit("CC", _param, _val);
            }
          }
        }
        if(_mess.type=="nrpn")
        {
          _c = _mess.message.channel;
          if(_mess.subtype=="dataentrycoarse") vvv = parseInt(_mess.rawValue) << 7;
          if(_mess.subtype=="dataentryfine") vvv+= parseInt(_mess.rawValue);
          _param = _mess.parameter;
          _val = vvv;
          if(_c==chan) showit("nrpn", _param, _val);
        }
        if(_mess.type=="programchange")
        {
          _c = _mess.message.channel;
          if(_mess.subtype=="dataentrycoarse") vvv = parseInt(_mess.rawValue) << 7;
          if(_mess.subtype=="dataentryfine") vvv+= parseInt(_mess.rawValue);
          _param = _mess.parameter;
          _val = _mess.value;
          if(_c==chan) showit("programchange", 0, _val);
        }
      }

      function showit(_type, _param, _val)
      {

        let t = "";
        t = _type + ": " + _param + " " + _val;
        textDebug.html(t);
        speaker.speak(t);
      }