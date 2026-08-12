# MIDItoSpeech

#### miditospee*

Part of [synthaccess](../README.md)

[ABILITY Project](http://ability.nyu.edu) / [Integrated Design & Media](http://idm.engineering.nyu.edu)   
New York University

Files:
- README.md - this file
- LICENSE - MIT license
- MaxMSP - source for the Max patcher version
- WebMIDI - source for the web version
- common - folder containing common JavaScript code for all versions
- devices - folder of JSON device files

[Live Web Version](https://idmnyu.github.io/synthaccess/MIDItoSpeech/WebMIDI/index.html)

[Max/MSP Executable (Mac)](https://drive.google.com/file/d/1HuW1gaNvlLbDQLGx_AmApwBpyzbMe49y/view?usp=sharing)

**MIDItoSpeech** is a set of software and tools to "speak" the affordances on the synthesizers using a computer. Our model relies on MIDI transmission of parameters as affordances are touched on the synth. This is being designed as both a [Max patch](https://cycling74.com/) / Max4Live device as well as a website using the Web MIDI API. In both cases, there is a community-driven repository of JSON files (the 'devices' folder) for models of synthesizers that describe their NRPN / CC values with labels, enumerators, etc. 

Manufacturers can develop these JSON files as part of their production pipeline, and community members / enthusiasts can develop them for legacy synthesizers, open source initiatives, etc. As a second-order benefit, these files can be used for translanguaging as well as access (i.e. you could have distinct JSON files for a synthesizer in English, Mandarin, Spanish, etc.).

If you'd like to contribute to the project, please get in touch.

JSON format:

The JSON root element is a **device**, which has the following hierarchy of properties:

---
- **name** : the name of the device, e.g. 'TEO-5'.
- **manufacturer** : who made it, e.g. 'Oberheim'.
- **language** : a [BCP-47](https://en.wikipedia.org/wiki/IETF_language_tag) code representing the language used for the labels, e.g. 'en-US'.
- **version** : version of the *parser* to be used (this is in anticipation of a versioned release).

---
- **MIDI_init** : MIDI byte stream to send to the synthesizer when the JSON loads; this can be used by the manufacturer to activate accessibility-specific features.
- **SysEx_header** : MIDI byte header for System Exclusive messages.

---
- **globals** : global variables to be maintained by the parameter structure, e.g. patch numbers combined by more than one parameter, etc.; each *key* is a parameter name that can be called by different mappings; the properties of these keys are:
   -  **value** : the initial value of the parameter
   -  **offset** : a numeric offset for the parameter when used when indexing against an array (e.g. use -1 when a MIDI parameter is transmitting 1-10 for a value you need to use as 0-9)
- *custom* : additional keys and values can be added in the top-level to be accessed by various **data** modes (e.g. **patchsimple**).

---
- **program_change**, **CC**, **NRPN**, **SysEx** : these define speech interactions that occur upon receiving [MIDI](https://en.wikipedia.org/wiki/MIDI) program change, continuous controller, [non-registered parameter number](https://en.wikipedia.org/wiki/NRPN), or System Exclusive ["SysEx"](https://midi.org/midi-1-0-universal-system-exclusive-messages) messages.
   - *number* : the encapsulated object contains enumerable string keys defining the *controller numbers* that dictates which CC, NRPN, or SysEx parameter to respond to; for program changes this is always *0*; the properties of these keys are:
      - **label** : the speakable label for the key (e.g. 'modulation' for CC0).
      - **data** : defines the algorithm by which the MIDI parameter's *value* is parsed; options are:
         - **none** - read the label only; in verbose mode 0 (minimum), all parameters except program changes are read label only.
         - **value** : read out the raw numeric value of the parameter (0 to 127 or 0-16383).
         - **byte1** : declares the value as the first byte in a two-byte pair and "stashes" it until the LSB shows up.
         - **plusone** : add one to the value (1 to 128 or 1-16384); good for program changes and people who are superstitious of the number zero.
         - **bivalue** : map the value to a signed (bipolar) range (-64 to 63 or -8192 to 8191).
         - **float**, **bifloat** : map the value to an unsigned or signed floating point range (-1.0 to 1.0, 0.0 to 1.0).
         - **percent** : map the value to an integer percentage (0 to 100).
         - **intrange**, **floatrange** : map the value to an integer or floating-point value specified by **range**.
         - **intmap**, **floatmap** : map the value to an integer or floating-point value specified by a 4-value **map**.
         - **offon**, **onoff** : read "off" if the *value* is 0 and "on" if it's anything else, or vice versa.
         - **onetwo64** : read "one" or "two" if the *value* is below or above 64, respectively.
         - **note**, **noteC4**, **noteC5** : read the value as a MIDI pitch (60 = C3, C4, or C5).
         - **frequency**, **decibels** : interpret the MIDI range as *frequency* (MIDI 69 = 440 Hz) or decibels (127 = 0dB).
         - **enum** : read labels from an enumerating array using the value as the index.
         - **enumsplit** : read labels from an enumerating array using split points.
         - **ascii** : interpret parameter data as an ASCII array.
         - **patchsimple** : read labels from a list of patch names based on the **global** value bound to that parameter; assumes **names** points to a 1-dimensional array of strings.
         - **patchcustom** : read labels from a list of patch names based on a custom global value as the index; assumes **names** points to a 1-dimensional array of strings.
         - **patchbank** : read labels from a 2-dimensional (bank, preset) list of patch names; assumes **names** points to a 2-dimensional array of strings.
         - **patchmultibank** : read labels from a 3-dimensional (single/multi, bank, preset) list of patch names; assumes **names** points to a 3-dimensional array of strings.
      - **hires** : for NRPN parameters, specifies whether the *value* is 7-bit 0-127 (default - "false"), 14-bit 0-16363 ("true"), or 14-bit interpreted as 0-127 ("MSBonly")
      - **byte1** : sums the value with a previously stashed first byte (MSB/LSB) before parsing.
      - **bitshift** : bitshifts the parameter before using it; a positive number shifts left, a negative number shifts right; useful for two-byte (LSB/MSB) data
      - **precision** : number of floating-point decimal places to use when creating speech strings (default: 2).
      - **trunc** : truncate (1) or round (default: 0) fractional values after scaling.
      - **range** : array for **intrange** and **floatrange** data modes.
         - index 0 is the minimum output value; 1 is the maximum output value.
      - **map** : array for **intmap** and **floatmap** data modes.
         - the array should have four numbers, specifying the low (index 0) and high (index 1) input values, and the low (index 2) and high (index 3) output values; index 3 can be lower than index 2, allowing for inversion.
      - **enharmonic** : for **note**, **noteC4**, and **noteC5**, defines whether enharmonic pitch classes are read as "sharp" (default) or "flat".
      - **clamp** : boolean ("true" / "false") value for **intmap** and **floatmap** data to specify whether the mapping will be constrained within the output range.
      - **enum** : array of labels for **enum** and **enumsplit** data.
         - for **enum**, the *value* serves as the literal index to the array.
         - if **enum** is a symbol rather than an array, an array in the JSON at that key will be indexed instead.
      - **split** : array of splitpoints for **enumsplit** data.
         - for "**numsplit** data, the *value* is checked against the **split** array, and...
         - the highest index that the *value* is greater than or equal to is the index for the **enum**.
      - **global** : name of a global variable to write into
      - **globalmode** : format of how global data is written:
         - **global** (default) : overwrite a global variable
         - **global1** : modify the first two digits of a global variable, leaving the third digit alone (good for program numbers)
         - **global100** : modify the third digit a global variable, leaving the first two digits alone (good for e.g. three-digit program numbers on Sequential equipment)
         - **0or128** : set the global to 1 if the value is 128, 0 otherwise (good for e.g. Novation single/multi mode)
      - **idx** : for **patch** modes other than **patchsimple**, an array of globals to use as indices for the **names** array; if this is missing from the JSON, you will get an error.
      - **names** : for **patch** modes, the name of an array in the JSON listing strings for patch / preset names.
      - **suffix** : a label to be appended to the readout e.g. to specify a unit (percent, semitones, etc.).
      - **silent** : any value at this parameter will mute the speech for that parameter.
      - **dataLength** : length of byte payload for **ascii** mode.
      - **dataOffset** : offset of bytes for **ascii** mode.

---
- **keypress** : MIDI messages to be sent when receiving keyboard events on the computer; these also have speech labels attached.
   - the encapsulated object contains enumerable keys defining the alphanumeric key that will trigger the event; the properties of these keys are:
      - **label** : the speakable label for the keypress (e.g. "panel" for "p").
      - **data** : how the MIDI parameter's *value* is to be parsed; options are:
         - **none** : read the label and send the *byteprefix* data only; use this for a fixed MIDI message.
         - **enum** : with each keypress, enumerate through an array of labels (*enum*) and MIDI data bytes (*vals*).
         - **countup** : add one to an internal variable (named after *label*) and send it as MIDI data byte.
            - values larger than *max* will wrap to *min*.
         - **countdown** : subtract one from an internal variable (named after *label*) and send it as MIDI data byte.
            - values smaller than *min* will wrap to *max*.
      - **byteprefix** : an array of MIDI bytes to begin the MIDI message with (e.g. [176, 0] for a MIDI CC0 on channel 1).
      - **enum** : for "enum" data, an array of speakable labels that will be cycled through.
      - **vals** : for "enum" data, an array of integers in the MIDI data range (0-127) that will be transmitted in step with the **enum** array.
      - **ptr** : for **enum** data, the starting index of the **enum** and **vals** arrays.
      - **min** : for **countup** and "countdown** data, the minimum value.
      - **max** : for **countup** and "countdown** data, the maximum value.

Example:
```javascript
{
   "device": {
      "name": "Luke's Hypothetical Synthesizer",
      "manufacturer": "Luke's Hypothetical Company",
      "language": "en-US",
      "version": 1,
      "program_change": {
         "0": {
            "label": "program",
            "data": "value"
         }
      },
      "CC": {
         "5": {
            "label": "portamento glissando",
            "data": "none"
         },
         "8": {
            "label": "layer mix",
            "data": "none"
         },
         "102": {
            "label": "feet A.",
            "data": "enumsplit",
            "enum": [
               "16 feet",
               "8 feet",
               "5 and a third feet",
               "4 feet",
               "2 and a third feet",
               "2 feet"
            ],
            "split": [
               0,
               22,
               43,
               64,
               85,
               106
            ]
         }
      },
      "NRPN": {
         "67": {
            "label": "amplifier attack",
            "data": "none"
         },
         "68": {
            "label": "amplifier decay",
            "data": "none"
         }
      },
      "keypress": {
         "p": {
            "label": "panel",
            "data": "enum",
            "byteprefix": [
               176,
               3
            ],
            "enum": [
               "on",
               "off"
            ],
            "vals": [
               0,
               127
            ],
            "ptr": 0
         }
      }
   }
}
```



