// parser.js
// MIDI parameter -> speech interface
// rld, 2025

function parseSpeak(_plist, _param, _val) // create and generate a speech string based on MIDI input
{
    let speakstring = "";
    let a, b, s, cl, l, o, v, g, i, j, k, nlist, p;
    let dospeak = 1; // default to speaking
    let mval = 127; // assume 7-bit
    let hval = 64; // 7-bit half value
    if(Object.hasOwn(_plist, _param.toString())) // check if parameter exists
    {
        speakstring+=_plist[_param].label; // speechify parameter
        if(typeof(_plist[_param].silent)!=='undefined') {
            dospeak = 0;
        }
        if(typeof(_plist[_param].hires)!=='undefined') {
            if(_plist[_param].hires=='true') 
            {
                mval = 16383; // 14-bit value
                hval = 8192; // half value
            }
            if(_plist[_param].hires=='MSBonly')
            {
                _val = _val>>7; // shift 7 bits down then interpret
            }
        }
        // global data in the param?
        if(typeof(_plist[_param].global)!='undefined')
        {
            switch(_plist[_param].globalmode)
            {
            case "global1": // modify the first two digits of a global value and preserve the third
                l = _plist[_param].global;
                v = parseInt(thestuff.device.globals[l].value);
                v = (Math.floor(v/100)*100) + _val;
                thestuff.device.globals[l].value = v;
                _val = v; // replace _val for speaksynth later
                break;
            case "global100": // modify the third digit of a global value and preserve the first two
                l = _plist[_param].global;
                v = parseInt(thestuff.device.globals[l].value);
                v = (_val*100) + v%100;
                thestuff.device.globals[l].value = v;
                _val = v; // replace _val for speaksynth later
                break;
            case "0or128": // set global to 1 if 128 (novation single/multi)
                l = _plist[_param].global;
                thestuff.device.globals[l].value = _val==128?1:0;                
                break;
            case "global": // modify a global value directly
            default:
                l = _plist[_param].global;
                thestuff.device.globals[l].value = _val;
                break;
            }
        }

        if(verbose>0) {
        switch(_plist[_param].data) // speechify data byte
        {
            case "value": // read the numeric value of the parameter
                speakstring+=" " + _val.toString();
                break;
            case "plusone": // add one and read (good for 1-based program changes)
                speakstring+=" " + (_val+1).toString();
                break;
            case "bivalue": // read the numeric value of the parameter (bipolar -64 to 63)
                speakstring+=" " + (_val-hval).toString();
                break;
            case "float": // read the parameter as a float 0.0 to 1.0
                speakstring+=" " + (_val/mval).toFixed(2);
                break;
            case "bifloat": // read the parameter as a float -1.0 to 1.0
                speakstring+=" " + ((_val/mval)*2.0-1.0).toFixed(2);
                break;
            case "intrange": // read the parameter as a int a to b
                a = _plist[_param].range[0];
                b = _plist[_param].range[1];
                speakstring+=" " + Math.round((_val/mval)*(b-a)+a);
                break;
            case "floatrange": // read the parameter as a float a to b
                a = _plist[_param].range[0];
                b = _plist[_param].range[1];
                speakstring+=" " + ((_val/mval)*(b-a)+a).toFixed(2);
                break;
            case "intmap": // 4-point scale the parameter (sim. to Max [scale]), output int
                if(typeof(_plist[_param].clamp)!=='undefined') cl = _plist[_param].clamp; else cl = false;
                s = vmap(_val, _plist[_param].map, cl)
                speakstring+=" " + Math.round(s);
                break;
            case "floatmap": // 4-point scale the parameter (sim. to Max [scale]), output float
                if(typeof(_plist[_param].clamp)!=='undefined') cl = _plist[_param].clamp; else cl = false;
                s = vmap(_val, _plist[_param].map, cl)
                speakstring+=" " + s.toFixed(2);
                break;
            case "offon": // 0="off", 1="on"
                speakstring+=". " + (_val==0?"off":"on");
                break;
            case "onoff": // 0="on", 2="off"
                speakstring+=". " + (_val==0?"on":"off");
                break;
            case "onetwo64": // one/two switch at halfway point
                speakstring+=". " + (_val>hval?"two":"one");
                break;
            case "note": // interpret value as MIDI pitch (60=C3)
                if(typeof(_plist[_param].enharmonic)!=='undefined') a = _plist[_param].enharmonic; else a = "sharp";
                speakstring+=" " + mtos(_val, a);
                break;
            case "noteC4": // interpret value as MIDI pitch (60=C4)
                if(typeof(_plist[_param].enharmonic)!=='undefined') a = _plist[_param].enharmonic; else a = "sharp";
                speakstring+=" " + mtos(_val+12, a);
                break;
            case "noteC5": // interpret value as MIDI pitch (60=C5)
                if(typeof(_plist[_param].enharmonic)!=='undefined') a = _plist[_param].enharmonic; else a = "sharp";
                speakstring+=" " + mtos(_val+24, a);
                break;
            case "frequency": // interpret value as MIDI, read as Hz (60=C3)
                speakstring+=" " + mtof(_val);
                break;
            case "decibels": // interpret value as dB, 127 = 0
                speakstring+=" " + mtodb(_val);
                break;
            case "percent": // interpret value as percent, 127 = 100%
                speakstring+=" " + mtopct(_val);
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
            case "patchsimple": // read strings against an index
                nlist = _plist[_param].names;
                p = thestuff.device[nlist];
                speakstring+=" " + _val.toString();
                o = thestuff.device.globals[_plist[_param].global].offset;
                _val+=o; // add offset for indexing
                if(_val in p)
                {
                    if(verbose==2) speakstring+= ". " + p[_val];
                }
                break;
            case "patchcustom": // read strings against an (custom) index
                g = thestuff.device.globals;
                i = g[_plist[_param].idx[0]].value;
                nlist = _plist[_param].names;
                p = thestuff.device[nlist];
                speakstring+=" " + i.toString();
                // do offsets:
                o = g[_plist[_param].idx[0]].offset;
                i+=o;
                if(i in p)
                {
                    if(verbose==2) speakstring+= ". " + p[i+o];
                }
                break;
            case "patchbank": // read strings against a bank/patch 2d index
                g = thestuff.device.globals;
                i = g[_plist[_param].idx[0]].value;
                j = g[_plist[_param].idx[1]].value;
                nlist = _plist[_param].names;
                p = thestuff.device[nlist];
                speakstring+=" " + i.toString() + " " + j.toString();
                // do offsets:
                o = g[_plist[_param].idx[0]].offset;
                i+=o;
                o = g[_plist[_param].idx[1]].offset;
                j+=o;
                if(i in p)
                {
                    if(j in p[i])
                    {
                        if(verbose==2) speakstring+= ". " + p[i][j];
                    }
                }
                break;
            case "patchmultibank": // read strings against a multi/bank/patch 3d index
                g = thestuff.device.globals;
                i = g[_plist[_param].idx[0]].value;
                j = g[_plist[_param].idx[1]].value;
                k = g[_plist[_param].idx[2]].value;
                nlist = _plist[_param].names;
                p = thestuff.device[nlist];
                speakstring+=" " + i.toString() + " " + j.toString() + " " + k.toString();
                // do offsets:
                o = g[_plist[_param].idx[0]].offset;
                i+=o;
                o = g[_plist[_param].idx[1]].offset;
                j+=o;
                o = g[_plist[_param].idx[2]].offset;
                k+=o;
                if(i in p)
                {
                    if(j in p[i])
                    {
                        if(k in p[i][j])
                        {
                            if(verbose==2) speakstring+= ". " + p[i][j][k];
                        }
                    }
                }
                break;
            case "none": // read just the parameter
                //if(prevparam == _param) dospeak = 0; // skip repeats
                break;
            default:
                break;
        }
            s = ("suffix" in _plist[_param]) ? _plist[_param].suffix : " ";
            speakstring+=" " + s;
        }
        //post("dospeak: " + dospeak + "\n");
        //post("string: " + speakstring + "\n");
        if(dospeak) saySomething(speakstring); // send to synthesizer
        prevparam = _param; // save for next time
    }
}

function parseMIDIout(_plist, _param) // takes (computer) keyboard events and pings the receiving synth
{
    let l, o;
    let xstream = [];
    pauseReceiver(); // turn off MIDI receiver
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
                    xstream.push(_plist[_param].byteprefix[i]);
                }
                xstream.push(databyte);
                _plist[_param].ptr = (_plist[_param].ptr+1)%_plist[_param].vals.length;
                break;
            case "countup": // counter with internal
                l = _plist[_param].label;
                if(typeof(_plist[l])==='undefined') _plist[l] = _plist[_param].min;
                _plist[l] = (_plist[l] + 1) % _plist[_param].max;
                speakstring+=" " + (_plist[l]+1);
                for(let i = 0;i<_plist[_param].byteprefix.length;i++)
                {
                    xstream.push(_plist[_param].byteprefix[i]);
                }
                xstream.push(_plist[l]);
                break;
            case "countdown": // counter with internal
                l = _plist[_param].label;
                if(typeof(_plist[l])==='undefined') _plist[l] = _plist[_param].max;
                _plist[l] = (_plist[l] - 1 + _plist[_param].max) % _plist[_param].max;
                speakstring+=" " + (_plist[l]+1);
                for(let i = 0;i<_plist[_param].byteprefix.length;i++)
                {
                    xstream.push(_plist[_param].byteprefix[i]);
                }
                xstream.push(_plist[l]);
                break;
            case "none": // read just the parameter
                break;
            default:
                break;
        }
        sendMidi(xstream);
        saySomething(speakstring); // send to synthesizer
    }
}

function readkeymap() // read the device keymap, if it exists
{
    if(fload==1) {
        let speakstring = "";
        for(var i in thestuff.device.keypress)
        {
            speakstring+="press " + i + " for " + thestuff.device.keypress[i].label + ". ";
        }        
        if(speakstring.length>0) saySomething(speakstring); // send to synthesizer
    }
}

function keypress(_val) // keypress
{
    if(fload==1) {
        for(var i in thestuff.device.keypress)
        {
                if(i==_val)
                {
                  let plist = thestuff.device.keypress;
                  parseMIDIout(plist, _val);  
                  break;
                }
        }
    }
}

function mtos(_i, _a) // MIDI note number to name
{
    let pitches; 
    if(_a=="sharp") pitches= ["C", "C sharp", "D", "D sharp", "E", "F", "F sharp", "G", "G sharp", "A", "A sharp", "B"];
    if(_a=="flat") pitches= ["C", "D flat", "D", "E flat", "E", "F", "G flat", "G", "A flat", "A", "B flat", "B"];
    let pc = _i%12; // pitch class
    let oct = Math.floor(_i/12)-2; // octave
    let outstr = pitches[pc] + " " + oct.toString();
    return(outstr);      
}

function mtof(_i) // MIDI note number to hertz
{
    if(_i<0) i=0;
    let f = 440.0 * Math.pow(2.0, (_i - 69.0) / 12.0)
    let outstr = "";
    if(f<1000) { // Hz
        outstr = f.toFixed(2) + " hertz";
    } else // kHz
    {
        outstr = (f/1000.).toFixed(2) + " kilohertz";
    }
    return(outstr);
}

function mtodb(_i) // MIDI CC value to dB (127=0db)
{
    let db = 20.*Math.log10(_i/127.);
    let outstr = db.toFixed(2) + " d b";
    return(outstr);
}

function mtopct(_i) // MIDI CC value as percent
{
    let pct = Math.round((_i/127.)*100.);
    let outstr = pct + " percent";
    return(outstr);
}

function vmap(_i, _m, _cl) // arbitrary value mapping
{
    let v;
    a = _m[0];
    b = _m[1];
    c = _m[2];
    d = _m[3];
    if(_cl=='true') // clamp
    {
        if(_i<a) _i=a;
        if(_i>b) _i=b;
    }
    if(c<d) v = (_i/(b-a))*(d-c)+c;
    else v = (1.0-_i/(b-a))*(c-d)+d;
    return(v);    
}
