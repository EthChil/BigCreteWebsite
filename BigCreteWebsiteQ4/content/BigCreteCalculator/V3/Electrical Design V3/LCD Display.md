# LCD Display
[[Motherboard]]


## Power

| Rail      | Voltage | Current | Notes                    |
| --------- | ------- | ------- | ------------------------ |
| Vcc       | 3v3     | 5mA     | 5mA should be peak       |
| Backlight | 5v      | 30mA    | should be lower than 30mA |

Current Display ![[2032020d-1dc4-4283-95de-47f034540884.pdf]]
P/N: 4DLCD-43480272
https://www.mouser.ca/ProductDetail/971-4DLCD-43480272/

Specs
24bit colour
Resolution: 480 x 272
Outer Dimension: 105mm x 67.2mm

Connection
40 pin ribbon

FPGA Lines (27)
24 lines for colour
3 lines (HSync, VSync, DClk)

Motherboard Lines (5)
GND
5v (used for backlight)
3v3 (needed for display (logic level))
DE, DISP