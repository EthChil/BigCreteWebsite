# LED and Driver
[[Motherboard]]

| Rail   | Voltage | Current | Notes                       |
| ------ | ------- | ------- | --------------------------- |
| Vcc    | 5V      | 2A      | 1.62A should be peak        |

## LED Array Information
Switch LEDs
https://www.adafruit.com/product/2739
 Common anode (grounds tied together)
 ![[p2739.pdf]]
 20mA forward current
 100mA at 1/10 duty
 21 - 27 keys 
 this is 27 x 3 leds = 81 leds
 at full tilt this would be 81 x 0.02A = 1.62A JEEZ
 
5x6 (5 wide 6 tall)
with RGB in the rows not columns this becomes 15x6

## Driver Circuitry

### Requirements
- Must be able to adjust LED brightness on each RGB channel for the LEDs
- Must be able to drive each LED to a maximum current of 

### LTSpice
NOTE this needs to be redone 
![[Pasted image 20210311220234.png]]

Willson current mirror paired with two transistors for charlieplexing
Decoders would be used to select MOSFETS to select the diode getting power


Gate Decoders are being used to select highside and lowside gates

On the lowside (nch) there are two 74HC238 decoders
these take 5 control signals HSG0, HSG1, HSG2, HSG3, En
EN needs to be low to allow for operation, pull high to disable the output and keep all LEDs off 




Components

N Channel Mosfet
LCSC: C344010
SOT-23-3
![[1912111437_BORN-AO3400A_C344010.pdf]]

P Channel Mosfet
LCSC: C15127
SOT-23-3L
![[Alpha-Omega-Semicon-AOS-AO3401A_C15127.pdf]]

3-8 decoder (INVERTING)
LCSC P/N C5602
SOIC-16
Datasheet
![[Nexperia-74HC138D-653_C5602.pdf]]

3-8 decoder (NON INVERTING)
LCSC P/N C5620
Datasheet
![[2005221001_Nexperia-74HC238D-653_C5620.pdf]]

NPN BJT
LCSC: C6749
SOT-23-3
![[1810051504_Changjiang-Electronics-Tech-CJ-S9013_C6749.pdf]]

PNP BJT (NOTE THE DESIGN NOW REQUIRES A NPN BJT)
LCSC P/N C444726
SOT-23
Datasheet
![[1912111437_Slkor-SLKORMICRO-Elec-SS8550_C444726.pdf]]

Diode 
LCSC: C2128
SOD-323
Datasheet
![[Changjiang-Electronics-Tech-CJ-1N4148WS_C2128.pdf]]