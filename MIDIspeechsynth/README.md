# MIDI speech synth

Files:
README.md - this file
LICENSE - MIT license
MaxMSP - folder containing the Max patcher version
WebMIDI - folder containing the web version
devices - folder of JSON device files

JSON format:

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
      }
   }
}
```



