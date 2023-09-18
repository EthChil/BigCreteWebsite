---
title: "Big Crete Calculator"
---
[Return to Projects](main.html)

## Overview

The calculator is a humble device and is often a project that early engineers embark on as they learn. Typically this takes the form of whatever discipline they are learning, so for instance an individual learning software may try to program a basic calculator application, a firmware engineer may try to program a calculator onto an ARM processor or equivalent embedded device. I thought what if I truly built a calculator from scratch, the hardware, the mechanical, the software, even down to the digital architecture. This is the dream behind the Big Crete calculator, a project that requires me to design from the minutia of transistors to material properties of the larger structure. 


## Architecture / Design Journey

The primary guiding principle for this calculator is excess, that is for each component go way over the top. This means it should have the following characteristics.
1. Physically large
2. Heavy
3. Premium quality materials
4. Loud flashy keys
5. Large bright display
6. Powerful compute

From this I designed what would be the most ideal design. First I wanted it to be heavy, in previous projects such as my Big Crete Clock I had developed a love of brass for it's gold appeareance easy machiniability and weight. So using brass where possible in this design makes a lot of sense for it's flashiness and weight. Next the keypad should definitely have individual key RGB backlighting since it's excessive and loud clicky mechanical switches. Imagine basically a numpad layout with some extra rows on the top and bottom. For the display an LCD display with integrated backlight makes sense giving a premium viewing experience. Moving to the internals I wanted to use an FPGA since I love working with them and they are just a bit ridiculous for a calculator. One cool thing I thought of was to allow my raytracer projcet to run on the calculator, this would require at minimum a RAM chip to act as the frame buffer then I remembered that many Xilinx FPGAs allow for LPDDR SODIMM support so I could in theory have swappable RAM in a calculator. Truly over the top. So this was the plan for the most over the top calculator yet:
 - FPGA with upgradeable RAM
 - RGB backlit mechanical gaming switches
 - backlit full colour LCD display
 - heavy polished brasss
 - USB-C charging and reporgramming

From there I started with the FPGA designing the baord and sourcing components. At the time when I was designing this we were in the midst of the chip shortage and FPGAs were in short supply, I was luckily able to find a single Xilinx Artix-7 A200T available at $300 CAD the highest end Artix available on the market with a sexy exposed die (NSFW).

<img class="center-picture sixty-per" src="./Projects/Attachments/A200T.jpg">

This chip is a 484 pin BGA package with 1mm pitch, never have I been able to solder a BGA part succesfully on the first go with my [[Big Crete Reflow Oven]] and so my plan for this design was to get it professionally assembled especially since the FPGA is $300 and it has 484 balls. 


# V2
## Mechanical
TODO

## Hardware
TODO

## Digital Design
TODO

## Firmware
TODO