
Stream of conciousness for project allows me to keep track of what I've done and is a digital scratchpad

April 29th, 2021
- Doing design work before I start at NVIDIA
- Current status
	- SPD breakout board designed and arrived I know the pinout is for DDR3 and not DDR3L which may affect the ability for it to be used
	- LCD Display breakout is finished being designed just needs to be ordered
	- LED Breakout is not designed schematic or layout
	- Power is not designed schematic or layout

- By the end of today I want to have the LED breakout designed and laid out
- If possible I'd also like to start working on the power circuitry
- I may get cut short since I have a new computer arriving and I may get caught up setting that up

May 2nd, 2021
- I got caught up setting up my new workspace and computer
- None of the items from the previous logs were done at all and remain outstanding
- For today I plan to complete the schematic for the LED breakout using the LTSpice simulations I did from HOLO as a reference since that seemed to work fairly well

May 3rd, 2021
- Today was my first day at NVIDIA 
- Yesterday I looked at the ltspice sims for the LED driver circuitry
- Today I plan on taking a look at the breadboard I made for that and modifying the circuit and doing additional analysis
- I'll attach the math for that analysis here

May 5th, 2021
- So I continue to be pushed off what I'm doing hopefully today will be different
- So looking at all the things I said I would do here is the task for today 
- First I will go through on my iPad and generate a schematic for the driver circuitry that I agree with showing math
- I generated some designs on my iPad then shifted to producing footprints and selecting components, at the moment I still need to finish the footprint for the gateron switches

May 9th, 2021
- so today the goal is to finish the footprints the schematic then layout the LED Driver board which will also have key switch stuff
- If I have time I also want to fix the SPD breakout and reorder it
- So update I was able to finish the schematic layout and made a top level with the connections for the breakout, next step is to route all of it likely tomorrow? I should have time then

	just as a note below is the plan
	- SPD breakout (needs stencil)
	- Display breakout no stencil (maybe for the connector)
	- LED Driver no stencil (assembly tho)

May 10th, 2021
- today I discovered that I've been structuring my altium stuff all wrong so I'm currently restructuring it
- additionally I appear to have lost the schematic for the display driver breakout, kinda akward (looks like it was in my downloads on my other computer, i'll retrieve it later)

May 11th
- I pulled the schematic for the LCD off my previous computer now I guess it's time to restructure the files properly
- Files have been restructured and I properly laid out the display driver and found some issues with the schematic along the way

May 12th
- only thing outstanding from the layout was fixing up the silkscreen that is now down and the board is ready to be ordered

	Current tasks 
	- rewire SPD breakout
	- prepare gerber for SPD breakout
	- prepare gerber for LED Driver
	- prepare required placement files for LED Driver
	Boards for Breakout Version
	- SPD Breakout (not part of calculator needed for programming)
	- LED and Switch breakout
	- LCD Breakout
	- Power Breakout (includes BMS circuitry)
	- Wireless Charging Breakout
	- Configuration card breakout

May 17th
- Fixed issue with the keys being incorrectly laid out on the bottom row
- as a note the issue with the SPD was that I wired it for ECC DDR3L this mistake was not made on the A200T ram

May 23rd
- I think I forgot to note it in this journal but the SPD breakout was rewired for DDR3L without ECC however I recall some form of issue with the nets not mapping properly to the pcb
- yea so the issue is that Vtt, Vss, Vrefdq, Vdd aren't mapping onto the pcb
- just required an import the issue is gone must've been a small bug

	Current tasks 
	- Layout SPD Breakout
	- prepare gerber for SPD breakout
	- prepare gerber for LED Driver
	- prepare required placement files for LED Driver
	- finish schematic for FPGA board
	Boards for Breakout Version
	- SPD Breakout (not part of calculator needed for programming) (SCHEMATIC DONE)
	- LED and Switch breakout (LAID OUT)
	- LCD Breakout (LAID OUT)
	- Power Breakout (includes BMS circuitry)
	- Wireless Charging Breakout
	- Configuration card breakout
	- FPGA board

May 31st
- Task for today is to finish the SPD breakout layout
- clean up the fpga board and highlight what power lines are needed (note this in obsidian for the power board)
- start designing the power board
- SPD breakout has been laid out it now just needs gerbers generated and it's good for manufacture

June 1st
- With the SPD board done the next task is to look over the FPGA board and highlight the power lines that will be fed from the power board

June 4th
- broke out the lines and created a new power subcircuit document
- Developed plan for how the rails will be powered and current allowances
- I also pulled the regulation tolerance data from the datasheets for the components
- I was going to start looking at components on digikey but the websites filters are having issues
- contacted jlc and determined speedgrade is -2 and the unit is industrial meaning the voltage is 1V

June 6th 
- Started selecting power ICs and testing them out in ltspice
- Running into issues with Digikey (started friday night)

June 18th
- Started schematic layout for power board
- Splitting bms into seperate board
- adding USB-C power in addition to wireless power (wireless will be fully custom)
- Adding current and voltage monitoring to power board (mostly for initial debug and bringup)
- Issue with schematic right now is I'm not exactly using the correct components, I need to get the online library I had reinstalled that was dope

June 19th
- noticed in LTSpice that some lower voltages cause regulation to drop out on the 5v rail this probably can be fixed by using a smaller inductor, for now UVLO circuitry will be added so the rails dropout at anything below 7V into the regulator (3.5V cell voltage)

June 25th 
- Deadline for boards to get ordered is this sunday (27th)
- split up the power boards, at the least I want the power subcircuit board done, followed by bms, then monitoring board

Boards for Order (BRIAN)
READY: Ram breakout (SPD)
READY: LCD Display Breakout
IN-PROGRESS: Power subcircuit (Buck + Linear Reg)
IN-PROGRESS: Voltage / current breakout (monitoring for 9 rails per [[Power Subcircuit]])
IN-PROGRESS: BMS subcircuit (USB-C plug, charging IC, passthrough from battery / USB-C)

Boards for Order (ETHAN)
LED + Driver
FPGA Board (IN PROGRESS)

Other:
Wireless charging, (likely for post prototype)

June 26th
- Starting to go through these items first up is power subcircuit 
- Power subcircuit schematic appears to be done, I also had to minorly rearchitect for power up sequence and also because my rails were too close to the buck ones for LDOs to work properly 
- Now working on layout
- Got about halfway through layout

June 27th
- Finished layout
- One issue with VIN is that I didn't leave enough room to route big enough traces
- as it stands it WILL work but I want to solder patch wires from the caps on the left and right inductors so just make sure you do that before assembly 
- I also put in mounting holes spaced 1.5" apart and sized for a #4 fastener 

Boards going out for order today
READY: Ram breakout (SPD)
READY: LCD Display Breakout
READY: Power subcircuit (Buck + Linear Reg)
READY: LED + Driver


July 8th
Got boards in
Assembled SPD board, reflow seemed to work out fine I had to touch it up with the iron a bit

switch board
- switches are a bit tight going in this should be investigated for V2
- enter and plus key collide, check spacing I think the plus key is too low the enter looks fine
- Stabilizers were missed on this design make sure that's in V2

RAM Notes
- couldn't find info for Trefi and Tcke timings so 4us is being used for Trefi and 5ns for Tcke

- When redoing the vivado stuff noticed an issue with obsidian linking of RAM connections but there was also an error in altium so double check vivado/atlium/obsidian and make sure they all agree

- Updtaed vivado to meet -2 timing requirments on FPGA and fixed some timing issues with the ram

Notes for next time:
- Focus on getting FPGA board ordered (Schematic then layout)
- Verify ram connections are correct (vivado/atlium/obsidian)
- Get FPGA boards ordered asap maybe order a run of 1 for now then if design verified order another each is like probably ~$200 CAD


July 9th
- Having issues sourcing the FPGA I need, JLC doesn't have it and all A200T FPGAs are out of stock literally everywhere
- For now I will work under the assumption that I am getting the FPGA I've been designing for, hopefully this will reduce the risk of mistakes in the design
- For today I will work on routing the FPGA and doing all the schematic related things for it

July 10th
- Got stuck in a rabit hole looking at pinout info for the chip which sorta exists not really tho
- Validate ram pinout is top priority 
- Then deal with all the config pins and what they are and what they should be tied to
- Determine what other pins are required for what (SPI BOOT, JTAG, SPI Storage, External Interfaces)

July 12th
- Ordered FPGA from mouser P/N XC7A200T-1SBG484C
- Vivado was rebuilt for the new part but is giving some warnings

July 13th
- FPGA arrived a lot smaller than I expected, I don't think I'm putting in any time today but if I do I think the next step is going to be doing the pinout, the challenge with this however is there is the pinout from the board itself, the pinout to the FPGA and the pinout from big parts like SPI and ram. My thinking is to make a sperate pinout document for each device so every component has it's own unified pinout table this means getting rid of the row system I had before. I'll make sure I focus on doing this, once it's done I'll have to redo the schematic anyways with the new circuit element since this FPGA is not the same as JLC and I will also have to look into what PCBWay wants and what their design rules are around BGA components. 

July 15th
- Ordered syringes for solder paste
- Redid the schematic for the FPGA to put the new part in and rewired the RAM
- Created an excel sheet with the pinout info
- Broke out the SPI configuration pins for boot, this needs to be implemented properly next time, copy the AU design
- Pins for the M.2 Connection need to be decided on and plumbed
- testpoint the INIT, PROGRAM, DONE, CFGBVS, and PUDC lines
- ADD THE OSCILLATOR 100mhz


July 16th
- PCBWAY STUFF (what to get)
	- 0.25mm (10mil) vias, plated 0.48mm (19mil)
	- 4-3 mil traces (select 4/4 or 3/3) (4/4 is cheaper)
	- trace spacing 
		- One trace 4mil
		- Two trace 3mil

- REFER to BGA design rules when setting up the board stuff'

https://www.altium.com/documentation/altium-designer/controlled-impedance-routing-ad
^ controlled impedance routing in altium

July 28th
- took a bit of a break, I think the current stuff to do is mount the crystal and wire up the boot rom

July 29th
- so I missed this from yesterdays update but I wired up the boot rom the one thing that is missing is any form of termination resistor this should be fine if you run at a lower frequency since boot time isn't a concern

August 11th
- Finished wiring up the FPGA pretty much, a few notes 
	- The wiring for things that go to GPIO such as the switch board and the display will need a more robust writeup on which gpio is which
	- pretty much every GPIO got wired and about half the EIOs got wired
	- should probably do the breakout board for the FPGA before actually laying the FPGA out since the layout will take a long time and the schematics should be done first

August 12th
- Did some mechanical stackup for the calculator, created new boards
- Switch board holds LED drivers, test points, mechanical mounts (mechanical support structure)
- Motherboard is above switch board and has power delivery, boot card, USB-C connection, Display connection, battery hookup, FPGA hookup
- Started putting rules together in the altium

Notes on Rules set
min hole size = 0.25mm (XILINX DOC)
routing width and spacing 4/4 (XILINX DOC) space for one trace between balls
6 layer stackup


August 15th
- routing has begun on the FPGA, assembled the power breakout and started testing found the following issue
	- Rt, the resistor that tunes the frequency was 26.3 ohms it should have been 26.3k ohms I ordered a 26.7k ohm resistor to swap it out with


August 18th
- After swapping resistor still having issues wasn't seeing any switching on the output to the inductor
- so I removed the chip from the board and swapped it with a new one
- Preliminary tests showed the 5v and 1v8 lines working as intended
- I also severed the connection from the TRKSS2 to PG3 which was required for the sequencing this doesn't affect 3v3 as it will still come up but it does mean that it will come up probably before the 1v8 line which is technically the wrong sequence just be aware of it

August 19th
- Checked the 3v3 and 1v5 lines they seem to be working. The voltages don't seem to be very accurate so this will need to be validated and potentially tuned
-
August 28th 
- Went into altium and fixed the issue that was causing the keys to collide the + and enter keys. This will be carried forward to the next rev of the board
- Added 3D switch model to PCB so I can do some mechanical CAD

October 13th
- to simplify initial calculator plan using the AU in place of the custom FPGA board I was designing
- Also plans to make a mass market version based on the numworks calculator https://github.com/numworks/epsilon/tree/version-16

October 14th 
- weird battery is 3.2ish volts discharged


June 11th (major bruh)

Major things that need to be documented here
- Battery splitter
- what is needed to run the display with the AU (minimum just to test)
- Buck convertor CAD


August 16th

Okay so now I'm at home and ready to start real work again, the in progress portions of this that I can work on are as follows
- Assembled switch board needs to be tested (make up a test plan for this circuit)
- Unassembled but designed battery splitter (this may have an issue with the charging circuit but it should be tested regardless)
- adafruit display breakout hookup to alchitry and test screen
	- Digital design for testing displays needs to be done up
	- This also needs to be wired

August 17th
- Work on display driving and validate switch board

Display driver
- The alchitry has 36 pins soldered to the Br board
- R1-8, G1-8, B1-8, 5V, GND, ON/OFF, CLK, VSYNC, HSYNC, DE (32 connections)
- PWM is used to control the shutdown pin on the FAN5333 which would allow for reducing the current I don't think this will be needed
- Default current is 25mA

Switch board testing
- solder one line of switches 
- hook arduino up and read one line of switches 
- hook one led in 
- Use arduino to drive LED

For the switch board I soldered on headers one row of switches and populated R1 with 10kOhm and R2 with 58 Ohm this should allow 9mA to flow through the LED when on

August 18th 
- Setup new computer which will allow for cleaner work between lab and desk
- Reorganized hardware folder to show distinction in hardware versions
- Starting tests on switch board with single line
- Missing pulldown resistors are causing values to float when highz on high side line, patch pulldowns were added to each of the SWL lines of value 10kOhm
- Using pulldowns the issue was solved

Running list of issues for Switch and LED Driver
- keyswitch spacing
- Pulldowns on SWL lines (add 10ks to each line)

August 19th
- Analyzed the situ with the decoders and I'm moving forward with an initial test running the circuit with enable pulled high to disable them 
- First test is being done with AN1 and Ca0-2
- This decodes to HS1 and LS2-4
- That means on the inputs LSG0 high and HSG 0100 -> 1100 -> 0010

Running list of issues for Switch and LED Driver
- keyswitch spacing
- Pulldowns on SWL lines (add 10ks to each line)
- **new** LS labeling is not consistent with CA labelling, draw out a table and make this consistent
- **new** LSG and HSG swapped on inputs to decoder
- **new** Why does LSG 0->1 on the connector then HSG 3->0 ? idiot
- **new** Add a petentiometer pad for tuning brightness
- **new** to prevent human error on decoder add jumper to cut power, this will be helpful for debugging on the alchitry backpack
- earlier from the journal stabilizers need to be considered which are PCB mounted

- tested S6 LED and verified that all colours are working with, 68ohm resistor for current set it's fairly bright I'm not sure if the current needs to be increased further
- measured 0.59V across 68ohm current set resistor meaning there is 8.67mA of current through the LED
- Wire up full row of LEDs and do a brightness check PWMing between them
- Full row wired and tested 
- Doubled current capacity by adding a second 68ohm in parallel and the LEDs seem brighter but it's hard to say, I think adding a petentiometer would be helpful but I just need to be careful of current through said petentiometer
- I think the next step is to incorporate these design fixes into the CAD before I forget and rev it up for V2 REV1 for alchitry backpack

- Started work on switch board, I've decided that in the interest of compactness the switchboard will connect via FFC to the mainboard 

Progress on issues
- keyswitch spacing (plus and enter) (in board)
- Pulldowns on SWL lines (add 1ks to each line) (in schematic)
- **new** LS labeling is not consistent with CA labelling, draw out a table and make this consistent (fixed in schematic and board)
	- **new** LSG and HSG swapped on inputs to decoder (fixed and renamed)
- **new** Why does LSG 0->1 on the connector then HSG 3->0 ? idiot
- **new** Add a petentiometer pad for tuning brightness
- **new** to prevent human error on decoder add jumper to cut power, this will be helpful for debugging on the alchitry backpack
- earlier from the journal stabilizers need to be considered which are PCB mounted


September 4th
- Started printing mockups to check stabilizer mounting
- Online cherry plate cutouts don't work for my stabilizers I have a new test print that needs to be made
- rudimentary stackup was completed in solidworks, it is now a single board design
- battery count was reduced from 2 to 1 and a boost convertor will be used instead this simplifies the charging circuitry
- mock board for checking display cable alignment was printed
- outline for what is needed for the pcb was made, the PCB can now be made 
- Steps for today are

1. update issue list made for the switchboard breakout
2. print new top plate to test fit with stabilizers (print a new mock pcb also for a better fit)
3. document findings on display cable mount
4. get top panel ready to be cut on the CNC 
5. test display with adafruit display breakout and alchitry (determine if backlight circuit is adequete)

Findings from screen jig
FFC from LCD interferes with one of the plugs for the alchitry, best solution is to avoid using this header (verify this is possible)
gap wire runs through is too long
forget to account for screen offset for the cable and it doesn't align with the plug


Sept 5th 

- Hooked up display to adafruit controller and backlight is clearly illuminating, this is a great sign
- In theory I can hook the remainder of the wires and start drawing shapes
- using breadboard that arrived today I finished hooking the display up I have full colour control minus 3 wires on blue, this should be fine for initial tests

Sept 6th
- Verilog code to test the display is looking good ready for initial test
- so looks like the display is damaged, this is likely from the shorted pin on a previous test PCB
- From digging through datasheets it's being driven correctly i verified this with my oscilloscope and still no luck

Jan 6th, 2023
- Switched to a new display this one is working now. This uses a chip that handles the sketchy timing and allows me to interface over a custom MCU interface. Pretty fire tbh. 
- Next steps are to do a quick overview of untested electrical pieces mostly the power converter circuit and the BMS. The display driver plus switchboard is pretty much verified at this point.
- Battery circuit plus power circuitry is all that is outstanding. consider one of 2 topologies
	- 3.2-4.2V battery stepped up to 5V with a boost then a battery charging circuit (preferred for now)
	- 6.4-8.4V battery stepped down to 5V with a buck and BMS

Jan 10th
- ordered final testboards for BMS and Boost circuit
- started working on the full motherboard integration
- using this new display the calculator width and height can be shrunk a bit but it extrudes from the frame, to resolve this I think I'm going to oversize the cutout and add a 3d printed bezel after the fact which I can slowly modify to fit
- Steps for tomorrow are as follows
	- focus on the mechanical integration and get the top panel in a shape that makes sense
	- shrink the top panel (switch plate) axes so that it nicely fits the display and minimizes the size of the calculator
	- once this is complete refit the alchitry into the design
	- after that cad up the new batteries and mock them into the design as well make sure to add a blocked between the exposed through hole pins and the battery
	- once this is complete shrink the height of the device
	- once the positions look good redesign the pcb mock 
	- NOTE there is no really good documentation on the alchitry header pinout so maybe take a closer look at what exists prior to tapeout to ensure this isn't a disaster

Jan 11th 
- decent amount of cad work fitting everything in
- display is poking out in current configuration and USBC doesn't really have a place to go
- A cutout will be made in the PCB to allow the components space this will require a more detailed model of the display 
- it's unclear where all the circuits will go they aren't terribly large but there also isn't much space 
- I want to try to keep the alchitry where it is in that upper section beneath the display and find some method to get the USBC connector in there as well

Jan 12th
- mechanical stackup is looking good the design has been split into two different boards. one will be the switchboard with all the led driver and switch decoding electronics everything else will be handled by the main board
- Usb-C will go back to the regular flat connector which should work fine

Feb 3rd
- I have the prorotype switch boards
- I also assembled the test boards for the boost convertor and battery charger, the boost circuit appears to be fine it can handle a modest load but without a proper load box it's hard to characterize it properly. One major challenge I noticed is that the current output of the boost isn't sized correctly to power all the LEDs, the display and the alchitry

Mar 13
- link to sheet with data on power consumption the big deliverables for tonight are firming up the power architecture and making required schematic modifications and at least lay out the LCD board, bms and power circuit. I should try to order that tonight if possible or at least have it ready to order. https://docs.google.com/spreadsheets/d/19ptPP8tYTS9Z_lMBAoifKPtHAU-QfR65nrqQTcai4M8/edit?usp=sharing

Mar 14
- Based on the power budget the 1A circuit should be sufficient for the display plus FPGA which is a good sign
- The LED circuit will be redesigned following the work in [[Current Mirror Power Analysis]] 
- I created a document to keep notes on LTSpice techniques in [[LTSpice Master Notes]]
- Next step is to redo the LED driver circuit and resolve problems spotted in the main power board
- Main power board should be able to put out enough power but it needs to be rewired to provide voltage from the batteries direct to the LED circuit and I think some of the LED circuitry should be shifted on to it given that it is the mainboard... (doing this would mean more connections between the two boards)

Mar 15
- for the led driver the decoders are going to need to be redone to handle this since we need to address 0-5 that requires 3 bits of binary meaning an additional decoder with each decoder having a dedicated address line

Mar 28
- led driver is actually just going to be connected straight thru for 15 pins to drive the display + the lowside address which is
- The connector I selected is this set of header pins from harwin which also will act as board spacer https://www.digikey.ca/en/products/detail/harwin-inc/M50-3502042/2264368

Apr 3
- the next step here is to layout the board
- With the reduced number of components and tighter connector routing around the connector will become more complex but the board should as a whole become easier
- I also noticed when doing some MCAD integration that the switches weren't lining up with the front plate I should resolve this prior to redoing the layout on the switch board 
- This is now resolved I had to move the switches up slightly, there is another issue which seems to be the radii on the switch holes may hit the switches, this can be resolved in post with a precision file set which I will need to order [[To Buy]]

Apr 4
- Starting to lay out the board and I am now realizing the double stacked hearder is maybe not better than a traditional approach I am going to try sourcing a flat one with the same number of connectors and pitch i expect this to work better than what I have currently selected
- I was able to find ones that are 20pos but single row, using two of these side by side should resolve the issue https://www.digikey.ca/en/products/detail/harwin-inc/M50-3532042/7044020
- Time to modify the library to add this in
- library was modified and pcb was updated
- some cleaning was done on routing and I started laying the components out one major thing that is missing is the alignment on the header, I'm going to let the Switchboard PCB drive the placement and then this will be handled on the top board after

Apr 7
- broke some projects so that will need to be resolved by changing the folder names to have V2 after
- Finished the switchboard layout it's looking good and ready to order
- top switchboard can be ordered with send cut send for $65 per piece
- current issue with parts hitting main board, the biggest offenders are the pots which luckily are thru hole so I could just extend the holes through the mainboard
- The mainboard will require an overhaul to use the new connectors 

Apr 9
- Spring cleaning, cleaning up the github and reorganizing this documentation

Apr 11
- Continuing work on mainboard pushing to get this ordered prior to exams
- The mainboard has cutouts integrated and the new connector added and lined up, routing is needed now
- Cleaned up mainboard and checked with solidworks model
- I removed the dummy boards from the solidworks model
- Currently ordering JLCPCB 
- JLCPCB order is placed I am now going through and ordering parts on DIGIKEY
- there is some serious cleanup required in this documentation as well as gitignore work to be done to remove files which have been incorrectly uploaded I also am conflating V2 with revision so it's important that I seperate those moving forwards
- Master electronics list with what I have and what I need is going in under V2 [[BOM V2 Rev 1 Electronics]]

Apr 13
- parts were ordered digikey ref #80976678


Apr 18
- kalih box whites are sick but don't work with through hole leds the below ones seem like good SMD equivalents 
https://www.digikey.ca/en/products/detail/w%C3%BCrth-elektronik/150141M173100/4489960

should probably try to source cheaper ones tho these are pretty expensive
on V2 of this calculator I should aim to reduce BOM without sacrificing function

Apr 19 **BIG NOTE**
- modifications discovered (pre-assembly)
- power switch was completely omitted from design
	- reset for fpga to prep for flash?
	- switch on side to solve this?
	- potential issue when flashing FPGA of leaving an LED turned on (figure out if this is a problem and how to mitigate)
- smd LEDs are needed for kalih box whites
- think about what a swap to a microcontroller would look like (changing the motherboard I believe)

Apr 22
- Parts are here it's assembly time, below is the order of steps for assembly
	- first off is the fpga board (mainboard) this guy needs to have it's battery circuit and boost circuit assembled and tested. Then the FPGA can be mounted. Some initial digital design work should be done to bringup the FPGA. Once this is good to go the switchboard can be tested in conjunction with the mainboard.
		- to test the battery circuit I think this will just be a trial by fire where I probe the battery leads and attempt to charge
		- to test the boost a resistive load on the 5V while I probe it with the batteries hooked up should suffice
	- The header pins on the display need the plastic removed and also need to be realigned. 
	- the USB-C partial pass thru needs to be soldered and fit checked with the rest of the design

Website modifications
- Blog post about SF trip and HF0
- flesh out project section
	- big wafer and each project is a die on the wafer
	- just generate 3d models for new ones and make a (vault) for older ones which is just images?
		- **Motor controller (3d models)**
		- **clock (3d models)**
		- **power convertor (3d models)**
		- calculator (3d models)
		- bracket bot (3d models)
		- 380 robot (3d models)
		- MAG-Z (3d models)
		- **pong board (3d models)**
		- FRC (images)
		- big crete reflow oven (3d models)
		- fold3r origami system (3d models)
		- FPGA board on crack for calculator A200T (3d models)
		- covid-19 ventillator (3d models)
		- raytracer (3d models?)
		- cdot board (images)
		- 2020 cadathon bot (3d models)
		- roamer (3d models)
		- 3d printer cleaner (maybe 3d model otherwise image) (probably skip)
		- plane? (probaby skip this one)
- flesh out construction site
	- try using hugo with quartz to run obsidian on the in progress projects
	- make documentation repo which is shared among projects to make it easier to handle documentation
	- 