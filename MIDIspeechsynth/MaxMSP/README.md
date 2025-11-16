## MIDItospeech (MAX PATCH VERSION)

This software requires [Max 9](https://cycling74.com/) and the the [MaxEss objects](https://www.if-tah.com/devices/maxess
).

The devices folder symlinks to the JSON files one level above in the repository (shared with the Web version).

The patcher is designed to be navigated entirely with keystrokes:

- up/down : cycle through the list of device files found in the 'devices' folder.
- j : load a JSON device file directly; an accessible file browser will open.
- escape : rescan the MIDI ports on your computer
- left/right : cycle through available MIDI input ports
- shift-left/shift-right : cycle through available MIDI output ports
- c : cycle through the active MIDI channel for the device
- r : toggle the voiceover rate between fast and normal
- tabe : toggle the speech synthesizer off and on
- i : read instructions through the speech synthesizer

other keys can be mapped in the JSON.

rld, 2025

