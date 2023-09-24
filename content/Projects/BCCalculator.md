---
title: "Big Crete Calculator"
---
[Return to Projects](main.html)

## Overview

The calculator is a humble device and is often a project that early engineers embark on as they learn. Typically this takes the form of whatever discipline they are learning, so for instance an individual learning software may try to program a basic calculator application, a firmware engineer may try to program a calculator onto an ARM processor or equivalent embedded device. I thought what if I truly built a calculator from scratch, the hardware, the mechanical, the software, even down to the digital architecture. This is the dream behind the Big Crete calculator, a project that requires me to design from the minutia of transistors to material properties of the larger structure. 


## V1 Architecture / Design Journey

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

This chip is a 484 pin BGA package with 1mm pitch, I have never been able to solder a BGA part succesfully on the first go with my [[BigCreteReflowOven]] and so my plan for this design was to get it professionally assembled especially since the FPGA is $300 and it has 484 balls. The next challenge was to route the ~250 signals for the RAM. For this design I was targeting LPDDR3 in a SODIMM slot which has 8 groups of 8 wide parralel signals which need to be routed to the RAM. All signals require impedance matching and within a group there are requirements for minimum, maximum, and differential trace lengths. Starting with impedance matching a target trace impedance of 40 Ohm this was determined from [here](https://docs.xilinx.com/v/u/en-US/ug933-Zynq-7000-PCB). Another requirement is that the traces be routable between the BGA balls, Xilinx [specifies](https://docs.xilinx.com/r/en-US/ug1099-bga-device-design-rules/Recommended-BGA-Ball-Pad-Via-and-Trace-Dimensions-for-1.0mm-0.92mm-0.8mm-and-0.5mm-Devices) that for this ball pitch the largest routable trace between balls is 4 mil or if two traces are side by side then it's 3 mil. After doing some research there didn't seem to be a low cost approach to achieve these trace widths while maintaining 40 Ohm impedance matching. I was attempting to use JLCPcb or PCBWays manufacturing service to ensure the FPGA was bonded properly to the board. 

# V1

Despite these challenges I moved ahead with this design. As I typically do with complicated projects such as this I work to derisk as much as possible by segmenting the design so that I can revise different portions of the design independently. This breakout board style calculator system is designated as the V1 of the design. This is how I segmented it:

1. FPGA, Clock, FLASH, DDR3 RAM all on a single board (connect to motherboard with card edge connector)
2. Motherboard 
- Power supply circuitry
- BMS circuit
- LCD Display backlight driver
3. Switchboard
- Constant current RGB LED Driver
- Switch multiplexer

I then went and worked on all of these seperately as discrete boards.

The power supply circuitry can be found here:
[[FPGAPowerSupply]]

**SPD breakout**, this was used to read out the SPD configuration of the DDR3 Ram I wanted to use. The SPD chip is a small ROM included on all DIMMs which has the timing characteristics for that memory. Typically on boot this is read by the processor or whatever is interacting with the memory to properly configure the memory controller this is done prior to write leveling where the memory controller will adjust skew on the DQS lines. For the Xilinx MIG implementation which is the memory controller included as IP on 7 sereies FPGAs the SPD configuration must be known when the IP is implemented meaning it needs to be determined prior to attaching the RAM to the board. I used this breakout board along with an Arduino to read out the SPD values.

<img class="center-picture eighty-per" src="./Projects/Attachments/SPDReadout.jpeg">

**RGB LED Switchboard**, this board provides the chance for me to evaluate a couple of things: first the mechanical layout of the switches and RGB Leds, the antighosting and multiplexing of the switches reading out their state, and finally the multiplexing and constant current driver circuit for the RGB LEDs. This board allowed me to catch an error with the layout of the switches and tune the required LED current.

<img class="center-picture eighty-per" src="./Projects/Attachments/SwitchboardDev.jpeg">

**LCD Display / Backlight Driver**, this breakout was to allow for the initial development of the FPGA code required to drive the LCD display and backlight. As I learned during this process I should have ordered a stencil for the FFC connector since soldering it with an iron simply did not work due to the tight pitch and height of the pins.

<img class="center-picture eighty-per" src="./Projects/Attachments/DisplayTester.jpeg">

I wound up switching to an [LCD breakout](https://www.digikey.ca/en/products/detail/adafruit-industries-llc/1932/5761222?utm_adgroup=&utm_source=google&utm_medium=cpc&utm_campaign=PMax%20Product_Low%20ROAS%20Categories&utm_term=&productid=5761222&gclid=CjwKCAjwsKqoBhBPEiwALrrqiEvPcj2WGaP7CYyxLIS4dK870V-1wmV1ocRru8SmDicgXQp5J2Q5lBoCIR8QAvD_BwE) board that adafruit sold which appeared to have the same pinout as my display. I was really surprised to see that they sell this I think they developed it for internal use when bringing up their own displays and decided to sell it externally. Still great to have access to it. Testing with this board I was able to get the backlight on my display to turn on but I was never able to drive the display reliably. I could see regions of the LCD turning on or off but was never able to cleanly drive the display. I'm still not quite sure why this was the case, I worked at this for a few days. I don't have the right tools to be able to measure the signals since they are so highspeed and there isn't a whole lot of documentation online about how to drive these displays with an FPGA. It is something I want to revisist but ultimately caved for a prepackaged display from adafruit and directly wrote GRAM on an existing control IC which abstracted out the work. Eventually I want to try revisiting the LCD display especially now that I have a Saleae and can probe the signals properly to see whats really going on. I think I will revisit this when I go and design the A200T version of the calculator.

After working on these and validating them I was still working on the FPGA board laying out all the components and routing the DDR traces. It quickly became clear that in order to properly impedance match the traces and route them between the BGA balls the default stackups will not work and the overall cost especially getting it assembled would be north of $600 CAD not to mention the FPGA itself was already $300 CAD so I ultimately decided to use my Alchitry Au FPGA which I already had on hand and shelve the custom FPGA design. As a result I have designated the following versions

**V1** (Completed) these are the breakout boards I stated above
**V2** (Completed) this will be with my Alchitry Au fully integrated into a calculator
**V3** (In Progress) this will be a fully custom calculator including the FPGA board with removable RAM and the A200T


# V2
## Architecture

The design is straightforward 2 panels of brass with a 3D printed spacer inbetween. The front brass panel acts as a switchplate with a switchboard beneath which holds the stabilizers, RGB LED drive circuitry, switch decode multiplexers, and adjustments POTs for RGB brightness. Connected to this will be the mainboard which holds battery charger circuits and a boost convertor to provide a 5V rail from two LiPo batteries in parallel. The Alchitry Au mounts to this mainboard and it powered through the 5V rail. The LCD display sourced from adafruit is also connected to the mainboard. 

## Mechanical
The basic mechanical stackup consists 

## Hardware
TODO

## Digital Design
TODO

## Firmware
TODO

# V3

Currently in progress refer to the [construction site](/content/construction.html) for more up to date information. 