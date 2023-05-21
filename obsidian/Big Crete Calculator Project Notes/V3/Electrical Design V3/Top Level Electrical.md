# Top Level Electrical
*outlines the eletrical design of V13

refer to 
[[Design Journal]]
for status of everything, below is a top level overview of tasks and roughly where they stand

### Boards
- Motherboard (primary board) [[Motherboard]]
- [[FPGA Board]] (over M.2)
- FPGA config board (over PCIE x1)
- Potential expansion through a ribbon connector (external boards outside scope of V1 design)

## TODO
### Documentation / Design
- Create pinout for M.2
- Start rough sketches of physical design
- Create master BOM in excel
- Create active BOM in Altium

### RTL
- Generate template with simple example code to determine IO
- Estimate power with some form of reasonably complex example code

### Prototype Boards
- Power delivery (items below could be designed as seperate dev boards)
	- should contain all the required rails (that are on the motherboard)
	- wireless charging circuitry
	- battery control circuitry
- LED Driver + switches (acts as board to verify mechanical) **should be designed following holo circuit** [[LED + Driver]]
- RAM SPD breakout (allow for ram specs to be verified) **V1 made follows the DDR3L standard not DDR3 needs to be redone**
- Display driver (allows selection of LCD) **DONE** **needs to be ordered**
- Boot card (test gold fingers and signal integrity)

