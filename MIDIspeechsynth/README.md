# MIDI speech synth

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
- **version** : version of the *parser* to be used (this is in anticipation of a versioned release).
- **program_change**, **CC**, **NRPN** : these define speech interactions that occur upon receiving MIDI program change, continuous controller, or non-registered parameter number messages.
   - the encapsulated object contains enumerable string keys defining the *controller number* that dictates which CC or NRPN to respond; for program changes this is always *0*; the properties of these keys are:
      - **label** : the speakable label for the key (e.g. "modulation" for CC0).
      - **data** : how the MIDI parameter's *value* is to be parsed; options are:
         - "none" - read the label only.
            - n.b. this mode will *not* read multiple changes to the same parameter in direct succession.
         - "value" - read out its raw numeric value (0 to 127).
         - "bivalue" - read out a signed (bipolar) value (-64 to 63).
         - "float" - read out an unsigned floating point value (0.0 to 1.0).
         - "bifloat" - read out a signed floating point value (-1.0 to 1.0).
         - "intrange" - read out an integer value specified by **range**.
         - "floatrange" - read out a floating-point value specified by **range**.
         - "offon" - read out "off" if the *value* is 0 and "on" if it's anything else.
         - "onoff" - read out "on" if the *value* is 0 and "off" if it's anything else.
         - "onetwo64" - read out "one" or "two" if the *value* is below or above 64, respectively.
         - "note" - read out the *value* as a MIDI pitch (60 = C3).
         - "noteC4" - read out the *value* as a MIDI pitch (60 = C4).
         - "enum" - read labels from an enumerating array using the *value* as the index.
         - "enumsplit" - read labels from an enumerating array using split points. 
      - **range** - array for "intrange" and "floatrange" data; index 0 is the minimum; 1 is the maximum.
      - **enum** - array of labels for "enum" and "enumsplit" data.
         - for "enum", the *value* serves as the literal index to the array.
      - **split** - array of splitpoints for "enumsplit" data.
         - for "enumsplit" data, the *value* is checked against the **split** array, and...
         - the highest index that the *value* is greater than or equal to is the index for the **enum**.
      - **suffix** - for all "data" modes, a label to be appended to the readout e.g. to specify a unit (percent, semitones, etc.).
- **keypress** : MIDI messages to be sent when receiving keyboard events on the computer; these also have speech labels attached.
   - the encapsulated object contains enumerable keys defining the alphanumeric key that will trigger the event; the properties of these keys are:
      - **label** : the speakable label for the keypress (e.g. "panel" for "p").
      - **data** : how the MIDI parameter's *value* is to be parsed; options are:
         - "none" - read the label and send the *byteprefix* data only; use this for a fixed MIDI message.
         - "enum" - with each keypress, enumerate through an array of labels (*enum*) and MIDI data bytes (*vals*).
         - "countup" - add one to an internal variable (named after *label*) and send it as MIDI data byte.
            - values larger than *max* will wrap to *min*.
         - "countdown" subtract one from an internal variable (named after *label*) and send it as MIDI data byte.
            - values smaller than *min* will wrap to *max*.
      - **byteprefix** - an array of MIDI bytes to begin the MIDI message with (e.g. [176, 0] for a MIDI CC0 on channel 1).
      - **enum** - for "enum" data, an array of speakable labels that will be cycled through.
      - **vals** - for "enum" data, an array of integers in the MIDI data range (0-127) that will be transmitted in step with the **enum** array.
      - **ptr** - for "enum" data, the starting index of the **enum* and **vals** arrays.
      - **min** - for "countup" and "countdown" data, the minimum value.
      - **max** - for "countup" and "countdown" data, the maximum value.
  

Example:
```javascript
{
   "device": {
      "name": "Luke's Hypothetical Synthesizer",
      "manufacturer": "Luke's Hypothetical Company",
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



