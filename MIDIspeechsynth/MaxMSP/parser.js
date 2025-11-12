// parser.js
// MIDI parameter -> speech interface
// rld, 2025

outlets = 3;

var thestuff = {}; // main data structure
var fload = 0; // is the file loaded
var prevparam = -1; // most recent param
var chan = 1; // MIDI channel

function fread(_s) // read a JSON file
{
    var f = new File(_s, "read"); // open file
    if(f.isopen)
    {
        let s = "";
        while(f.position<f.eof) s+=f.readline(); // ingest file
        thestuff = JSON.parse(s); // parse and stash the data
        f.close(); // close file
        fload = 1; // file is loaded
        prevparam = -1; // reset params
    }  
}

function cc(_val, _param, _c) // continuous controller
{
    if(fload==1) {
        let plist = thestuff.device.CC;
        if(_c==chan) parseSpeak(plist, _param, _val);
    } 
}

function nrpn(_val, _param, _c) // non-registered parameter number
{
    if(fload==1) {
        let plist = thestuff.device.NRPN;
        if(_c==chan) parseSpeak(plist, _param, _val);
    }
}

function keypress(_val) // keypress
{
    if(fload==1) {
        if(Object.hasOwn(thestuff.device, keypress))
        {
            let plist = thestuff.device.keypress;
            parseMIDIout(plist, _val);
        }
    }
}

function program(_val, _c) // program change
{
    if(fload==1) {
        let plist = thestuff.device.program_change;
        if(_c==chan) parseSpeak(plist, 0, _val);
    }
}

function channel(_c) // change active MIDI channel
{
    chan = _c;
}

function parseMIDIout(_plist, _param) // takes (computer) keyboard events and pings the receiving synth
{
    let l;
    outlet(2, "bang"); // turn off MIDI receiver
    let speakstring = "";
    if(Object.hasOwn(_plist, _param.toString())) // check if parameter exists
    {
        speakstring+=_plist[_param].label; // speechify parameter
        switch(_plist[_param].data) // speechify data byte
        {
            case "enum": // enumerator (value=index)
                let ptr = _plist[_param].ptr;
                let databyte = _plist[_param].vals[ptr];
                speakstring+=" " + _plist[_param].enum[ptr];
                for(let i = 0;i<_plist[_param].byteprefix.length;i++)
                {
                    outlet(1, _plist[_param].byteprefix[i]);
                }
                outlet(1, databyte);
                _plist[_param].ptr = (_plist[_param].ptr+1)%_plist[_param].vals.length;
                break;
            case "countup": // counter with internal
                l = _plist[_param].label;
                if(typeof(_plist[l])==='undefined') _plist[l] = _plist[_param].min;
                _plist[l] = (_plist[l] + 1) % _plist[_param].max;
                speakstring+=" " + (_plist[l]+1);
                for(let i = 0;i<_plist[_param].byteprefix.length;i++)
                {
                    outlet(1, _plist[_param].byteprefix[i]);
                }
                outlet(1, _plist[l]);
                break;
            case "countdown": // counter with internal
                l = _plist[_param].label;
                if(typeof(_plist[l])==='undefined') _plist[l] = _plist[_param].max;
                _plist[l] = (_plist[l] - 1 + _plist[_param].max) % _plist[_param].max;
                speakstring+=" " + (_plist[l]+1);
                for(let i = 0;i<_plist[_param].byteprefix.length;i++)
                {
                    outlet(1, _plist[_param].byteprefix[i]);
                }
                outlet(1, _plist[l]);
                break;
            case "none": // read just the parameter
                break;
            default:
                break;
        }
        outlet(0, speakstring); // send to synthesizer
    }
}

function parseSpeak(_plist, _param, _val) // create and generate a speech string based on MIDI input
{
    let speakstring = "";
    let a, b, s;
    let dospeak = 1; // default to speaking
    if(Object.hasOwn(_plist, _param.toString())) // check if parameter exists
    {
        speakstring+=_plist[_param].label; // speechify parameter
        switch(_plist[_param].data) // speechify data byte
        {
            case "value": // read the numeric value of the parameter
                speakstring+=" " + _val.toString();
                break;
            case "bivalue": // read the numeric value of the parameter (bipolar -64 to 63)
                speakstring+=" " + (_val-64).toString();
                break;
            case "float": // read the parameter as a float 0.0 to 1.0
                speakstring+=" " + (_val/127).toFixed(2);
                break;
            case "bifloat": // read the parameter as a float -1.0 to 1.0
                speakstring+=" " + ((_val/127)*2.0-1.0).toFixed(2);
                break;
            case "intrange": // read the parameter as a int a to b
                a = _plist[_param].range[0];
                b = _plist[_param].range[1];
                speakstring+=" " + Math.round((_val/127)*(b-a)+a);
                break;
            case "floatrange": // read the parameter as a float a to b
                a = _plist[_param].range[0];
                b = _plist[_param].range[1];
                speakstring+=" " + ((_val/127)*(b-a)+a).toFixed(2);
                break;
            case "offon": // 0="off", 1="on"
                speakstring+=". " + (_val==0?"off":"on");
                break;
            case "onoff": // 0="on", 2="off"
                speakstring+=". " + (_val==0?"on":"off");
                break;
            case "onetwo64": // one/two switch at halfway point
                speakstring+=". " + (_val>64?"two":"one");
                break;
            case "note": // interpret value as MIDI pitch
                speakstring+=" " + mtos(_val);
                break;
            case "enum": // enumerator (value=index)
                speakstring+=" " + _plist[_param].enum[_val];
                break;
            case "enumsplit": // enumerator (value split up across range)
                let idx = 0;
                for(let i=0;i<_plist[_param].split.length;i++)
                {
                    if(_val<_plist[_param].split[i]) break;
                    idx = i;
                }
                speakstring+=" " + _plist[_param].enum[idx];
                break;
            case "none": // read just the parameter
                if(prevparam == _param) dospeak = 0; // skip repeats
                break;
            default:
                break;
        }
        s = ("suffix" in _plist[_param]) ? _plist[_param].suffix : " ";
        speakstring+=" " + s;
        if(dospeak) outlet(0, speakstring); // send to synthesizer
        prevparam = _param; // save for next time
    }
}

function mtos(_i) // MIDI note number to name
{
    let pitches = ["C", "C sharp", "D", "D sharp", "E", "F", "F sharp", "G", "G sharp", "A", "A sharp", "B"];
    let pc = _i%12; // pitch class
    let oct = Math.floor(_i/12); // octave
    let outstr = pitches[pc] + " " + oct.toString();
    return(outstr);      
}
