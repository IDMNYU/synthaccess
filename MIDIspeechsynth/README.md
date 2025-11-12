# MIDI speech synth

Files:
- README.md - this file
- LICENSE - MIT license
- MaxMSP - folder containing the Max patcher version
- WebMIDI - folder containing the web version (not ready yet)
- devices - folder of JSON device files

JSON format:

The JSON file root element is a "device", which has the following top-level parameters:
- name : the name of the device
- manufacturer : who made it
- version : version of the *parser* to be used (this is in anticipation of a versioned release
- program_change, CC, NRPN : speech interactions to occur on receiving MIDI program changes, continuous controller, or non-registered parameter number data; the encapsulated object contains enumerable string keys defining the *controller number* that dictates which CC or NRPN to respond; for program changes this is always *0*; the properties of these keys are:
   - label : the speakable label for the key (e.g. "modulation" for CC0)
   - data : how the MIDI parameter's *value* is to be parsed; options are:
      - foo
      - bar
      - baz
   - yikes
- keypress
- CC
- NRPN
  

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



