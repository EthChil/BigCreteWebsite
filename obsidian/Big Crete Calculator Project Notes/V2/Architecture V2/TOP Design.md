

# External Devices

## Alchitry
See https://www.sparkfun.com/products/16527 I have one of these already and it's connectors make it easy to mount to a custom PCB for integration into a calculator

## Battery
Battery will be a LiPO 1s2p pack to give the most capacity possible. Easiest to get batteries are 2Ah ones from adafruit. The biggest drawback from using them is their C rating which tops me out at 4A max draw which at their minimum voltage of 3.7V is 15W which should be adequete for the circuit. See [[Power Architecture V2]] for more information.

## LEDs
For the keyswitches square LEDs are required. The selected ones are from adafruit but purchased through digikey [[p2739.pdf]]

## Switches
Switches were selected on the basis of being as loud as possible and allowing RGB lighting. The best option for this are gateron greens which can be paired with rectangular RGB LEDs. 

## Screen
The screen being used is the adafruit 320x480 full colour LCD. This is verified working with the FPGA per a design I wrote located under RTL/display_test in this repo. https://www.adafruit.com/product/2050

## USB-C Port
fairly straightforward this isn't going to be supporting USB-PD (maybe that'll show up in V3) instead it will be taking 5V input from a non PD power source and allow reprogramming the alchitry over the data connection (this will just be attached through from the alchitry)
The 5V signal will be fed past the boost convertor directly going to the circuit. The data pins will be connected through a header on the mainboard to the alchitry. Since the alchitry doesn't breakout it's programming pins over the header this will be done by using a male USB-C connector with pads for soldering wires on the end. it's a tad jank but it'll get the job done. https://www.digikey.ca/en/products/detail/keystone-electronics/954/5638367
this is the connector that will hook into the alchitry


# Internal Subcircuits

## Screen
Adafruit Display that handles driving, backlight, voltage translation

## LED Multiplexer
for more information on the LED driver circuit topology see [[Current Mirror Power Analysis]] 

## BMS
simple single cell charger that takes 5V from USB-C as input. See [[Power Architecture V2]]

## Boost Regulator 
steps 3.2V-4.2V to a constant 5V. See [[Power Architecture V2]]