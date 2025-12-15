# MIDI speech synth

Part of synthaccess

NYU Ability Project / NYU IDM

Files:
- README.md - this file
- LICENSE - MIT license
- MaxMSP - folder containing the Max patcher version
- WebMIDI - folder containing the web version (not ready yet)
- devices - folder of JSON device files

JSON format:

The JSON root element is a **device**, which has the following top-level properties:
- **name** : the name of the device.
- **manufacturer** : who made it.
- **language** : a [BCP-47](https://en.wikipedia.org/wiki/IETF_language_tag) code representing the language used for the labels, e.g. 'en-US'.
- **version** : version of the *parser* to be used (this is in anticipation of a versioned release).
- **globals** : global variables to be maintained by the parameter structure, e.g. patch numbers combined by more than one parameter, etc.; each *key* is a paraemter name that can be called by different mappings; the properties of these keys are:
   -  **value** : the initial value of the parameter
   -  **offset** : a numeric offset for the parameter when used when speaking (e.g. 0-99 for a value that's internally represented as 1-100)
- **program_change**, **CC**, **NRPN** : these define speech interactions that occur upon receiving [MIDI](https://en.wikipedia.org/wiki/MIDI) program change, continuous controller, or [non-registered parameter number](https://en.wikipedia.org/wiki/NRPN) messages.
   - the encapsulated object contains enumerable string keys defining the *controller number* that dictates which CC or NRPN to respond; for program changes this is always *0*; the properties of these keys are:
      - **label** : the speakable label for the key (e.g. "modulation" for CC0).
      - **data** : how the MIDI parameter's *value* is to be parsed; options are:
         - "none" - read the label only.
            - n.b. this mode will *not* read multiple changes to the same parameter in direct succession.
         - "value" : read out its raw numeric value (0 to 127 or 0-16383).
         - "bivalue" : read out a signed (bipolar) value (-64 to 63 or -8192 to 8191).
         - "float" : read out an unsigned floating point value (0.0 to 1.0).
         - "bifloat" : read out a signed floating point value (-1.0 to 1.0).
         - "intrange" : read out an integer value specified by **range**.
         - "floatrange" : read out a floating-point value specified by **range**.
         - "intmap" : read out an integer value specified by a 4-value **map**.
         - "floatmap" : read out an float value specified by a 4-value **map**.
         - "offon" : read out "off" if the *value* is 0 and "on" if it's anything else.
         - "onoff" : read out "on" if the *value* is 0 and "off" if it's anything else.
         - "onetwo64" : read out "one" or "two" if the *value* is below or above 64, respectively.
         - "note" : read out the *value* as a MIDI pitch (60 = C3).
         - "noteC4" : read out the *value* as a MIDI pitch (60 = C4).
         - "enum" : read labels from an enumerating array using the *value* as the index.
         - "enumsplit" : read labels from an enumerating array using split points.
         - "global" : modify a global variable
         - "global1" : modify the first two digits of a global variable, leaving the third digit alone (good for program numbers)
         - "global100" : modify the third digit a global variable, leaving the first two digits alone (good for program numbers)
      - **hires** : for NRPN parameters, specifies whether the *value* is 7-bit 0-127 (default | "false") or 14-bit 0-16363 ("true")
      - **range** : array for "intrange", "floatrange" data; index 0 is the minimum output value; 1 is the maximum output value.
      - **map** : array for "intmap", and "floatmap" data, specifying the low (index 0) and high (index 1) input values to be mapped, and the low (index 2) and high (index 3) output values to be mapped; index 3 can be lower than index 2, allowing for inversion.
      - **clamp** : boolean ("true" / "false") value for "intmap" and "floatmap" data to specify whether the mapping will be constrained within the output values specified by **range**.
      - **enum** : array of labels for "enum" and "enumsplit" data.
         - for "enum", the *value* serves as the literal index to the array.
      - **split** : array of splitpoints for "enumsplit" data.
         - for "enumsplit" data, the *value* is checked against the **split** array, and...
         - the highest index that the *value* is greater than or equal to is the index for the **enum**.
      - **suffix** : for all "data" modes, a label to be appended to the readout e.g. to specify a unit (percent, semitones, etc.).
      - **silent** : for all "data" modes, any value at this parameter will mute the speech for that parameter.
- **keypress** : MIDI messages to be sent when receiving keyboard events on the computer; these also have speech labels attached.
   - the encapsulated object contains enumerable keys defining the alphanumeric key that will trigger the event; the properties of these keys are:
      - **label** : the speakable label for the keypress (e.g. "panel" for "p").
      - **data** : how the MIDI parameter's *value* is to be parsed; options are:
         - "none" : read the label and send the *byteprefix* data only; use this for a fixed MIDI message.
         - "enum" : with each keypress, enumerate through an array of labels (*enum*) and MIDI data bytes (*vals*).
         - "countup" : add one to an internal variable (named after *label*) and send it as MIDI data byte.
            - values larger than *max* will wrap to *min*.
         - "countdown" : subtract one from an internal variable (named after *label*) and send it as MIDI data byte.
            - values smaller than *min* will wrap to *max*.
      - **byteprefix** : an array of MIDI bytes to begin the MIDI message with (e.g. [176, 0] for a MIDI CC0 on channel 1).
      - **enum** : for "enum" data, an array of speakable labels that will be cycled through.
      - **vals** : for "enum" data, an array of integers in the MIDI data range (0-127) that will be transmitted in step with the **enum** array.
      - **ptr** : for "enum" data, the starting index of the **enum** and **vals** arrays.
      - **min** : for "countup" and "countdown" data, the minimum value.
      - **max** : for "countup" and "countdown" data, the maximum value.
  

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



