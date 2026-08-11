// main.js
// MIDI parameter -> speech interface
// rld, 2025

include("./common/envdetect.js");
include("./common/parser.js");

outlets = 3;

var thestuff = {}; // main data structure
var fload = 0; // is the file loaded
var prevparam = -1; // most recent param
var chan = 1; // MIDI channel
var pmode = 0; // use "packet" mode (Max [thresh]) vs. individual messages
var verbose = 1; // verbosity: 0 = minimum, 1 = normal, 2 = maximum
var sysexbuf = [];

function fread(_s) // read a JSON file
{
    thestuff = {}; // blow everyting away
    var f = new File(_s, "read"); // open file
    if(f.isopen)
    {
        let s = "";
        while(f.position<f.eof) s+=f.readline(); // ingest file
        thestuff = JSON.parse(s); // parse and stash the data
        f.close(); // close file
        
        // parse globals
        pmode = 0;
        if(thestuff.device.datatype=="packet") pmode=1;
        sendinit();

        fload = 1; // file is loaded
        prevparam = -1; // reset params

    }
}

function sendinit() // send MIDI init string
{
    if(fload==1&&typeof(thestuff.device.MIDI_init)!=="undefined") // send initial MIDI
    {
      sendMidi(thestuff.device.MIDI_init);
    }  
}

function packet(..._p)
{
    post("packet: " + _p.length + "\n");
}

function verboselevel(_v)
{
    verbose = _v;
}

function cc(_val, _param, _c) // continuous controller
{
    if(fload==1&&pmode==0) {
        let plist = thestuff.device.CC;
        if(_c==chan) parseSpeak(plist, _param, _val);
    } 
}

function nrpn(_val, _param, _c) // non-registered parameter number
{
    if(fload==1&&pmode==0) {
        let plist = thestuff.device.NRPN;
        if(_c==chan) parseSpeak(plist, _param, _val);
    }
}

function program(_val, _c) // program change
{
    if(fload==1&&pmode==0) {
        let tempv = verbose;
        let plist = thestuff.device.program_change;
        if(tempv==0) verbose=1; // program changes always read numbers
        if(_c==chan) parseSpeak(plist, 0, _val);
        verbose = tempv; // swap back
    }
}

function sysex(_val)
{
    if(_val == 240) // we are starting
    {
        sysexbuf = [];
        sysexbuf.push(240);
    }
    if(_val == 247) // we are done
    {
        sysexbuf.push(247);
        if(fload==1&&pmode==0) {
            // check sysexid
            let match = 1;
            let hdr = thestuff.device.SysEx_header;
            for(let i = 0;i<hdr.length;i++)
            {
                if(hdr[i]!=sysexbuf[i]) match==0;
            }
            if(match) {
                let plist = thestuff.device.SysEx;
                let key = sysexbuf[hdr.length+1]; // key for sysex parser
                console.log("index: " + key);
                let payload = sysexbuf.slice(hdr.length+2, sysexbuf.length-1); // payload
                console.log("payload: " + payload);
                parseSpeak(plist, key, payload);
            }
        }
     
    }
    else
    {
        sysexbuf.push(_val);
    }
    
}

function channel(_c) // change active MIDI channel
{
    chan = _c;
}

function saySomething(_s) // shim for transmission to speech synthesizer
{
    outlet(0, _s); // send to synthesizer
}

function sendMidi(_b) // shim for MIDI transmission
{
    outlet(1, _b); // send MIDI output
}

function pauseReceiver() // shim for blanking Midi input temporarily
{
    outlet(2, "bang"); // turn off MIDI receiver
}
