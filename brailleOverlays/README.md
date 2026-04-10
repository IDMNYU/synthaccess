# brailleOverlays

#### brailleOverlays

Part of [synthaccess](../README.md)

[ABILITY Project](http://ability.nyu.edu) / [Integrated Design & Media](http://idm.engineering.nyu.edu)   
NYU

Files:
- README.md - this file
- img - folder containing example images

**brailleOverlays** is a set of design guidelines and examples for adding braille lettering to synthesizers. 

## Introduction

If your synthesizer is "one affordance per function", one of the simplest and most effective ways to add tactile accessibility for Blind / Low Vision users is to label the synthesizer with braille. Below, we outline three methods (from simple and inexpensive to somewhat complex) for doing this.

[Braille](https://en.wikipedia.org/wiki/Braille) is a [standard](https://brailleauthority.org/size-and-spacing-braille-characters) tactile writing system invented in 1824 that uses a two column by three row grid of six dots for each character. The braille system not only specifies the layout of these dots for each character in the writing system, but also defines the characters' nominal dot sizing and spacing. In other words, there's no such thing as "jumbo braille" or "mini braille". There's just braille. There are [standard mappings](https://en.wikipedia.org/wiki/International_uniformity_of_braille_alphabets) for common writing systems across the world. Languages that use logographic writing systems (such as [Chinese](https://en.wikipedia.org/wiki/Mainland_Chinese_Braille)) will use a phonetic alphabet to create a braille mapping.

Level 1 braille defines a [basic mapping](https://brailleaustralia.org/wp-content/uploads/2013/09/braillecharacters.pdf) for the alphabet, numbers, and punctuation. Level 2 braille has [contractions](https://www.teachingvisuallyimpaired.com/uploads/1/4/1/2/14122361/ueb_braille_chart.pdf), leveraging context and unused characters to reduce common words, letter combinations, and syllables to fewer characters. Level 2 braille is specific to the *language* being written (e.g. English vs. French), wherease Level 1 braille is standardized by character set (e.g. the Roman alphabet versus Cyrillic). Free software such as [BrailleBlaster](https://www.brailleblaster.org/) can be used to convert text into braille that includes these level 2 contractions.

If you use Level 2 braille, you can save space. For example, the phrase:

> "Some little children adding 2+2 might count it as 22." 

maps to...

> <bl>,"s ll *n add+ #b"6#b mi<t c.t x z #bb4</bl>

<br>

## Option #1: Braille Tape

The simplest way to add braille to a synthesizer is to use a low cost braille labeller (such as [this one](https://www.maxiaids.com/product/reizen-rl-350-braille-labeler)) and some labeling tape (such as [this](https://www.amazon.com/NineLeaf-Compatible-3D-Embossing-Organizer/dp/B0C3MGZKYH/?th=1)). You can then punch out braille labels and apply them directly to your synthesizer front panel. If you use clear labels, you can place the labels over your synthesizer.

## Suggested Mappings

When designing braille overlays for physical synthesizers, space may be at a premium, so shorhands, abbreviations, and contractions will be super useful for labelling things. Below are some suggested mappings for common synthesizer controls. For more high density interfaces, the [tactileSynths](../tactileSynths) part of this repository might be helpful as well. 

| Label | 2 | 3 | 4 |
| ----- | ----- | ----- | ----- |
| <bl>power</bl><br>Power | <bl>pr</bl><br>pr | <bl>pwr</bl><br>pwr | <bl>powr</bl><br>powr |
| <bl>headphones</bl><br>Headphones | <bl>ph</bl><br>ph | <bl>ph</bl><br>ph | <bl>phns</bl><br>phns |
| <bl>voltage-controlled oscillator</bl><br>Voltage-Controlled Oscillator | <bl>vo</bl><br>vo | <bl>vco</bl><br>vco | <bl>vco</bl><br>vco |
| <bl>voltage-controlled filter</bl><br>Voltage-Controlled Filter | <bl>vf</bl><br>vf | <bl>vcf</bl><br>vcf | <bl>vcf</bl><br>vcf |
| <bl>voltage-controlled amplifier</bl><br>Voltage-Controlled Amplifier | <bl>va</bl><br>va | <bl>vca</bl><br>vca | <bl>vca</bl><br>vca |
| <bl>attack decay sustain release</bl><br>Attack Decay Sustain Release | <bl>eg</bl><br>eg | <bl>eg</bl><br>eg | <bl>adsr</bl><br>adsr |
| <bl>envelope generator</bl><br>Envelope Generator | <bl>eg</bl><br>eg | <bl>eg</bl><br>eg | <bl>eg</bl><br>eg |
| <bl>sample and hold</bl><br>Sample and Hold | <bl>sh</bl><br>sh | <bl>sah</bl><br>sah | <bl>sah</bl><br>sah |

## Gallery

<img src = "./img/ttsh_braille.jpg" width="100%" title="TTSH & DIY 1601 Sequencer with braille" alt="TTSH & DIY 1601 Sequencer with braille">
<img src = "./img/prophet6_braille.jpg" width="100%" title="Sequential Prophet 6 module with braille" alt="Sequential Prophet 6 module with braille">
<img src = "./img/ddrm_braille.jpg" width="100%" title="Black Corporation Deckard's Dream with braille" alt="Black Corporation Deckard's Dream with braille">
<img src = "./img/roland100a_braille.jpg" width="100%" title="Roland 100 Series Model 101 with braille" alt="Roland 100 Series Model 101 with braille">
<img src = "./img/roland100b_braille.jpg" width="100%" title="Roland 100 Series Model 102 with braille" alt="Roland 100 Series Model 102 with braille">
<img src = "./img/roland100c_braille.jpg" width="100%" title="Roland 100 Series Model 104 with braille" alt="Roland 100 Series Model 104 with braille">
<img src = "./img/sh101_braille.jpg" width="100%" title="Roland SH-101 with braille" alt="Roland SH-101 with braille">
