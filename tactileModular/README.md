# tactileModular

#### tactilemodul>

Part of [synthaccess](../README.md)

[ABILITY Project](http://ability.nyu.edu) / [Integrated Design & Media](http://idm.engineering.nyu.edu)   
NYU

Contents:
- README.md - this file
- [Serge/](https://github.com/IDMNYU/synthaccess/tree/main/tactileModular/Serge) - 3D files for the Serge modular system

Resources for tactile affordances specific to modular synthesizers. 

The *Serge* folder contains a collection of Serge modular jack collars and knob designs by Jason Wallach to allow for tactile sensing of the different affordances on Serge Modular (and related "4U" banana-jack modular) equipment. The repository contains both [STL](https://en.wikipedia.org/wiki/STL_(file_format)) and [STEP](https://en.wikipedia.org/wiki/ISO_10303-21) files that can be used with most 3D printers.

- In our mapping, AC signal jacks have circular collars, DC signal jacks have square collars, and Pulse jacks have triangular collars. Miscellaneous jacks (such as the coupler output on an SSG module) have hexagonal collars.
- The *output* jacks are flat and should fit flush onto the standard Pomona jacks used on most Serge and other 4U synthesizers.
- The *input* jacks are deeper and have rounded "calderas"; in addition to providing a tactile distinction from the output jacks, they (lightly) disincentivize the stacking of banana cables at inputs.

| Jack Type  | Color | Image | Render | STL file | STEP file |
| ---------- | ----- | ----- | -- | -------- | --------- |
| AC Input   | Black/Brown | ![black cylinder with caldera](./img/AC_InCircle.jpg) | ![black cylinder with caldera](./img/AC_InCircle_3d.png) | AC_InCircle.stl | AC_InCircle.step |
| AC Output   | Black/Brown | ![black cylinder](./img/AC_OutCircle.jpg) | ![black cylinder](./img/AC_OutCircle_3d.png) | AC_OutCircle.stl | AC_OutCircle.step |
| DC Input   | Blue/Grey | ![blue square with caldera](./img/DC_InSquare.jpg) | ![blue square with caldera](./img/DC_InSquare_3d.png) | DC_InSquare.stl | DC_InSquare.step |
| DC Output   | Blue/Grey | ![blue square](./img/DC_OutSquare.jpg) | ![blue square](./img/DC_OutSquare_3d.png) | DC_OutSquare.stl | DC_OutSquare.step |
| Pulse Input   | Red | ![red triangle with caldera](./img/pulse_InTriangle.jpg) | ![red triangle with caldera](./img/pulse_InTriangle_3d.png) | DC_InSquare.stl | DC_InSquare.step |
| Pulse Output   | Red | ![red triangle](./img/pulse_OutTriangle.jpg) | ![red triangle](./img/pulse_OutTriangle_3d.png) | DC_OutSquare.stl | DC_OutSquare.step |
| Misc Input   | Various | ![gray hexagon with dots](./img/misc_InHexagon.jpg) | ![gray hexagon with dots](./img/misc_InHexagon_3d.png) | DC_InSquare.stl | DC_InSquare.step |
| Misc Output   | Various | ![gray hexagon](./img/misc_OutHexagon.jpg) | ![gray hexagon](./img/misc_OutHexagon_3d.png) | DC_OutSquare.stl | DC_OutSquare.step |
