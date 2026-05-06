# synthaccess

#### syn?a3ess

A repository for research around synthesizer (and other audio technology) accessibility.

[ABILITY Project](http://ability.nyu.edu) / [Integrated Design & Media](http://idm.engineering.nyu.edu)   
New York University

Featuring the work of:
- Ciarra Black
- Jason Dasent
- R. Luke DuBois, Faculty Lead, MIDI Speech Synth
- Stefanie Koseff, Faculty Lead, Tactile Synth Guides
- Tommy Martinez
- Madeline Mau
- Willie Payne
- Lauren Race
- Izabella Rodrigues
- Jason Wallach
- Moira Zhang

Projects:
- **[MIDItoSpeech](./MIDItoSpeech/)** : a speech synthesizer to vocalize parameters from a music technology device (synthesizer, effects processor, etc.) that transmits its state via MIDI.
- **[tactileSynthGuides](./tactileSynthGuides/)** : a design guide and library of swell-form printable tactile guides for synthesizers.
- **[brailleOverlays](./brailleOverlays/)** : guidelines for adding braille labels and overlays to physical synthesizers.
- **[tactileModular](./tactileModular/)** : a set of design resources for tactile affordances for modular synthesizers.

---

**SynthAccess** is a multi-pronged open source initiative around accessibility for Blind / Low Vision (BLV) musicians who use synthesizers and related equipment. This includes standards for braille labeling and tactile guides, software to generate sythesized speech as affordances are moved on the devices, and 3D printed alternatives to knobs and jacks to make them distinguishable by feel.

Modern music technology is challenging from an accessibility standpoint as it often features ocularcentric design patterns that use screens, LEDs to indicate state, and affordances such as rotary controls and soft buttons that only provide visual feedback.

For this project, we leverage two trends in synthesizer equipment: 
- Historical synthesizer designs employ *analog* circuitry, and have a design layout that is one affordance per function, which means that there are knobs, buttons, switches, sliders, and so forth that map to one specific parameter on the instrument. There are many modern synthesizers that either emulate this design approach or are recreations of historical equipment. This allows us to create overlay systems and tactile guides that allow a user to navigate a synthesizer user interface by touch.
- Modern synthesizers often employ microprocessors that *transmit the state* of their controls as they are being manipulated, typically using the MIDI protocol introduced in 1983 for digital communication among music technology equipment. This allows us to use computer software to listen to user actions performed on a synthesizer and create accessible speech information without any change to the hardware.

Over the past year, we have developed a number of exemplar design interventions to assist BLV users with synthesizers. This work was undertaken as part of a larger initiative around making the [NYU Tandon IDM Audio Lab](https://idmnyu.github.io/audiolab/) accessible for users with disabilities, as well as work done in collaboration with the [FMDG Music School](https://fmdgmusicschool.org/) and a number of US music conservatories towards creating contemporary standards around music education for BLV students. In addition, we have been partnering with the [Focusrite Group](https://focusriteplc.com/) to adopt our standards to three of their synthesizer brands ([Sequential Circuits](https://sequential.com/), [Oberheim](https://oberheim.com/), and [Novation](http://novationmusic.com/)). We have also developed overlays for various other historical and contemporary synthesizers made by ARP, Roland, Nensén Electronics, and the Black Corporation.

We are interested in collaborating with industry partners and organizations to further develop our proposed designs and have them adopted as standards that could be integrated into the design and manufacturing stage for commercial synthesizers. We are also interested in further developing these tools for other music technology devices, and partnering with enthusiasts in the community to develop assets for vintage, open source, and DIY equipment.

We believe there is an opportunity to create strong consensus in the music technology industry that accessibility matters and can be viewed as a focal point of *collaboration*, not *competition*. To this end, this work is being published as free and open to the public under open-source software (MIT) and document copyright (CC BY-NC-SA 4.0) licenses.

If you're interested in working with us, please get in touch by writing Luke (dubois at nyu dot edu).

---

*A note to screen reader users:* some of the pages in this site use Grade 2 braille examples. These examples will be encoded in a way that may prevent a screen reader from reading them correctly. For example, the Grade 2 braille equivalent of **synthaccess** - this project's name - is <bl>syn?a3ess</bl>. In each case, a regular transliteration will be provided as well.
