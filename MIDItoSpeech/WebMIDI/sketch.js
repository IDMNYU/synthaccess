var vvv;
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
var midiOutputDevice; // midi output device object
let selectedDevice;
let loadFilebutton;

var textDebug;
let speaker; // speech synthesis object

var thestuff = {}; // main data structure
var fload = 0; // is the file loaded
var prevparam = -1; // most recent param
var chan = 1; // MIDI channel
var pmode = 0; // use "packet" mode (Max [thresh]) vs. individual messages
var verbose = 1; // verbosity: 0 = minimum, 1 = normal, 2 = maximum
var speechrate = 1; // speed of speaking
var muted = 0; // top level mute for speech
var paused = 0; // temp pause

// speech queue
let qflag = 0; // is there a speech event pending
let qclock = 0; // queue service clock
let qclock_time = 6 // how many frames of delay (default is 1/10th of a second)
let qstr = ""; // queue string

function onMidiEnabled() { // MIDI active
  // wipe everything
  midiInList = [];
  midiOutList = [];
  midiDeviceSelectIn.elt.innerHTML = '';
  midiDeviceSelectOut.elt.innerHTML = '';

    // remove earlier listeners
    WebMidi.inputs.forEach((device, index) => {
      WebMidi.inputs[index].removeListener("nrpn");
      WebMidi.inputs[index].removeListener("controlchange");
      WebMidi.inputs[index].removeListener("programchange");
    });

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

  midiOutputDevice = new Output(WebMidi.outputs[0]);
}

// main stuff:
async function setup() {
  let blah;
  noCanvas();

  //text debugger:
  textDebug = createDiv('hi there.');

  blah = createDiv('<br>JSON files:');

  fileList = await loadStrings('devlist.txt');
  if(fileList[fileList.length-1].length==0) fileList.pop(); // kill blank line
  fileSelect = createSelect();
  fileList.forEach((fname) => {
      fileSelect.option(fname);
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

  blah = createDiv('<br>');

  loadFilebutton = createFileInput(loadCustomFile);

  blah = createDiv('<br>by R. Luke DuBois & Tommy Martinez<br>NYU IDM / NYU Ability Project<br>part of <a href="https://idmnyu.github.io/synthaccess/" target="new">synthaccess</a>');

  blah = createDiv('<br>\
key mappings:<br>\
ESC = reload MIDI ports<br>\
up/down = cycle file list<br>\
left/right = cycle MIDI input port<br>\
shift-left/shift-right = cycle MIDI output port<br>\
c = cycle MIDI channel<br>\
r = voiceover rate<br>\
v = verbose mode<br>\
j = JSON load<br>\
V = toggle speech<br>\
i = instructions<br>\
I = list device-specific mappings');

  speaker = new p5.Speech();

  await WebMidi.enable()
  .then(onMidiEnabled)
  .catch((err) => alert(err));

  // end of setup
}


function keyPressed() {
  // require user interaction on audio context
  if(firstspeak) {
    console.log('starting speech from keypress...');
    let def = 0;
    for(let i in speaker.voices)
    {
      if(speaker.voices[i].default) def = i;
      break;
    }
    speaker.setVoice(speaker.voices[def].name);
    speaker.interrupt = true;
    speechrate>0 ? speaker.setRate(1.8) : speaker.setRate(1.0);
    saySomething('Welcome to MIDI to Speech! Press i for instructions.');
    firstspeak = 0;
  }
  if(keyCode === 37&&!shiftDown) changeMidiInput(midiInPtr-1); // LEFT
  if(keyCode === 39&&!shiftDown) changeMidiInput(midiInPtr+1); // RIGHT
  if(keyCode === 37&&shiftDown) changeMidiOutput(midiOutPtr-1); // SHIFT-LEFT
  if(keyCode === 39&&shiftDown) changeMidiOutput(midiOutPtr+1); // SHIFT-RIGHT
  if(keyCode === 38) loadFile(filePtr-1); // UP
  if(keyCode === 40) loadFile(filePtr+1); // DOWN
  if(keyCode === 27) onMidiEnabled(); // ESC - redo MIDI
  if(key === 'V') toggleMute();
  if(key === 'v') cycleVerbosity();
  if(key === 'I') readkeymap();
  if(key === 'i') readInstructions();
  if(key === 'c') changeChannel();
  if(key === 'r') changeSpeechRate();
  if(key === 'l') loadFilebutton.elt.click();
  keypress(key);
  //console.log(keyCode);
}

async function loadCustomFile(_f)
{
  thestuff = _f.data;
  // parse globals
  pmode = 0;
  if(thestuff.device.datatype=="packet") pmode=1;

  fload = 1; // file is loaded
  prevparam = -1; // reset params
}

async function loadFile(_ptr)
{
  filePtr = (_ptr + fileList.length)%fileList.length; // keep in bounds
  fileSelect.selected(fileList[filePtr]);
  const fileName = fileSelect.elt.value;
  saySomething("File Selected " + fileName.split('.json')[0]);
  thestuff = await loadJSON('./devices/'+fileName);
  //console.log(thestuff);
  // parse globals
  pmode = 0;
  if(thestuff.device.datatype=="packet") pmode=1;

  fload = 1; // file is loaded
  prevparam = -1; // reset params
}

function changeMidiInput(_ptr)
{
  midiInPtr = (_ptr + midiInList.length)%midiInList.length; // keep in bounds
  midiDeviceSelectIn.selected(midiInList[midiInPtr]);
    const deviceName = midiDeviceSelectIn.elt.value;
    saySomething("MIDI input " + deviceName);
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
    saySomething("MIDI output " + deviceName);
    const deviceIndex = WebMidi.outputs.findIndex(
      (device) => device.name === deviceName,
      );
  midiOutputDevice = new Output(WebMidi.outputs[deviceIndex]);

}

function changeChannel()
{
  chan = chan+1;
  if(chan>16) chan=1;
  saySomething("MIDI channel " + chan);
}

function changeSpeechRate()
{
  speechrate = !speechrate;
  speechrate>0 ? speaker.setRate(1.5) : speaker.setRate(1.0);

  saySomething("Rate changed.");
}

function toggleMute()
{
  if(muted==0)
  {
    saySomething("voice off");
    muted = 1;
  }
  else
  {
    muted = 0;
    saySomething("voice on");
  }
}

function cycleVerbosity()
{
  verbose = (verbose + 1) % 2;
  if(verbose == 0) saySomething("verbosity level minimum.");
  else if(verbose == 1) saySomething("verbosity level normal.");
  else if(verbose == 2) saySomething("Verbosity level maximum.");
}

function draw() {
  if (keyIsDown('ShiftLeft')=== true || keyIsDown('ShiftRight')===true) shiftDown = 1; else shiftDown = 0;

  paused--;
  if(paused<0) paused=0;
  qclock--;
  if(qclock<0) {
    if(qflag) serviceSpeechQueue();
    qclock=0;
  }
}

// main function for parsing incoming MIDI
function doit(_mess) {

  let _c;
  let _param;
  let _val;

  if(_mess.type=="controlchange"&&paused==0)
  {
    _c = _mess.message.channel;
    if(_mess.subtype=="dataentrycoarse") vvv = parseInt(_mess.rawValue) << 7;
    if(_mess.subtype=="dataentryfine") vvv+= parseInt(_mess.rawValue);
    _param = _mess.controller.number;
    _val = _mess.rawValue;
    if(_param!=99&&_param!=98&&_param!=6&&_param!=38) {
            if(_param!=100&&_param!=101) // filter out RPNs (temporary)
            {
              if(fload==1&&pmode==0) {
                let plist = thestuff.device.CC;
                if(_c==chan) parseSpeak(plist, _param, _val);
              } 
            }
          }
        }
        if(_mess.type=="nrpn"&&paused==0)
        {
          _c = _mess.message.channel;
          if(_mess.subtype=="dataentrycoarse") vvv = parseInt(_mess.rawValue) << 7;
          if(_mess.subtype=="dataentryfine") vvv+= parseInt(_mess.rawValue);
          _param = _mess.parameter;
          _val = vvv;
          if(fload==1&&pmode==0) {
            let plist = thestuff.device.NRPN;
              if(_c==chan) parseSpeak(plist, _param, _val);
          }
        }
        if(_mess.type=="programchange"&&paused==0)
        {
          _c = _mess.message.channel;
          if(_mess.subtype=="dataentrycoarse") vvv = parseInt(_mess.rawValue) << 7;
          if(_mess.subtype=="dataentryfine") vvv+= parseInt(_mess.rawValue);
          _param = _mess.parameter;
          _val = _mess.value;
          if(fload==1&&pmode==0) {
          let tempv = verbose;
          let plist = thestuff.device.program_change;
          if(tempv==0) verbose=1; // program changes always read numbers
          if(_c==chan) parseSpeak(plist, 0, _val);
          verbose = tempv; // swap back
          }
        }
}

// debugging function
function showit(_type, _param, _val)
{
  let t = "";
  t = _type + ": " + _param + " " + _val;
  textDebug.html(t);
  speaker.speak(t);
}

function readInstructions()
{
  let _istr = "MIDI to speech translator instructions. The up and down keys cycle through the list of device files in the devices folder. If the file is elsewhere, press the j key to find it. The escape key will rescan your MIDI ports. The left and right keys will cycle through the MIDI inputs; if you hold down shift, the left and right keys will cycle through the MIDI outputs. The c key will change your active MIDI channel. The r key changes the rate of the voice. The v key changes how verbose the speech is. The tab key turns on and off the speech. Other keys can be mapped in the device file. The capital I key will read any device-specific key mappings. The lowercase i key will reread these instructions. ";
  saySomething(_istr);
}

function saySomething(_s) // shim for transmission to speech synthesizer
{
  textDebug.html(_s);
  // create a queue
  qstr = _s; // set string
  qclock = qclock_time; // reset clock
  qflag = 1; // something is now in the queue
}

function serviceSpeechQueue()
{
    if(!muted&&!firstspeak) {
      speaker.speak(qstr); // send to synthesizer
    }
    qflag = 0;

}

function sendMidi(_b) // shim for MIDI transmission
{
    midiOutputDevice.send(_b);
}

function pauseReceiver() // shim for blanking Midi input temporarily
{
  paused = 30; // 30 frame pause on MIDI input
}

