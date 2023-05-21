so the current mirror draws from a 5V source what I want to know is if it's powering an LED what is the power draw associated. Is it acting like a linear regulator and losing any excess voltage?

![[Pasted image 20230314001918.png]]
from an LTSpice sim here I show the voltage across the diode during switching we can see that when it's on the voltage is 0.72V to 0.36V if we overlay the current on this we see the following.

![[Pasted image 20230314002223.png]]
![[Pasted image 20230314002234.png]]
looking at slice it varies from 0mA and 0.36V across the diode to 23mA and 0.72V across the diode. The actual power here when it's on would be VI =  0.01656 W 

however at the same time from the source at 5V we are seeing 26.77mA ignor the polarity on the plot
![[Pasted image 20230314002424.png]]
at a voltage of 5V this is VI = 0.13385W this is a lot more than whats going through the LED so where is the power headed.

so for one we can see that the current has two paths it can follow in this instance one is through R4 on the schematic and the other is through the diode D2. We see that when it's on the current through R4 is 4mA roughly this is 0.02W already more than what travels through the diode. Adding these two paths together we get the following relation.

0.02W + 0.01656W = 0.03656W
the remaining power is 0.0973W this is a lot I think this is largely lost through the current mirror to drive the voltage on the diode. I think that playing with some parameters here will make the efficiency a bit clearer. Since this is basically still operating in a linear manner I think that using voltages closer to that of the diode voltage will work best. Of course I don't want to limit the output brightness so maybe some PWM tests at high voltage are in order. 

Below is an efficiency calc with 2V on the input. 
V across diode is 0.734V again at 21.33mA for P = 0.01565W (same as before mostly)
from source A = 0.02175mA V = 2 so P = 0.0435W (much closer this time)
It seems that the losses are whatever goes through the current match resistor plus the voltage offset to the diode. I think to get this better using a voltage close to the drive voltage is best. 
 
Since the LED array will be switched (only one LED on at a time) the power requirement would be the current through one LED to get the brightness I want with a 10% margin at the voltage steady. So if I drive the LED at 100mA to get the brightness.

I'm beginning to think that scanning across the LEDs isn't the best solution for this. So from the datasheet for these LEDs they can handle 100mA at a 10% duty cycle. This is 4x the current with 10x less time. 

Currently with what I have at the moment I have 27 RGB LEDs giving 81 LEDs to address. I really want to add 3 more RGBs to get a full 90 LEDs. This is then indexed through one by one. This gives a time of 1/90 for each LED which is 11.1ms per LED. A current above 100mA will likely need to be driven. I'm thinking that I split it into the 3 colours giving 3 zones dropping the time from 1/90 to 1/30 which is 33.3ms much closer to the datasheet spec of 100ms. then each individual channel could have a current mirror tuned to the required current. 

I think a test setup to test 33ms on time with different forward currents is the best idea to validate this system and circuit. The main things I care about are how much power is actually delivered from the source to drive a given LED at a brightness for a representative amount of time so to do this I need to create a circuit that mimics the switching characteristics of my actual setup with and LED I can use to verify brightness. To handle the high and low side switching my FPGA should be used to ensure consistency in the design (and I don't have an arduino around) then I can validate the pulse width with my saleae and to measure the current I really need an oscilloscope and measure the voltage across the current matching resistor. This will tell me the peak current through the led when it's on.  I am going to limit the on time to what the datasheet says which is 1/10 width at 100mA I'll do 1/30 ontime at 100mA capped, with further testing this could be pushed up but I'm sure that for a first version this will be suficient. 

Diode curves for the red blue and green
red
![[Pasted image 20230314133720.png]]
green
![[Pasted image 20230314133729.png]]
blue
![[Pasted image 20230314133735.png]]
blue and green are the highest at a rough forward voltage of 3.6V for 50mA I am going to attempt to extrapolate these curves to get the forward current I want for 100mA. 

using this wikipedia for diodes
https://en.wikipedia.org/wiki/Diode_modelling
and using the shockley equation I get the following for the diodes. note that Vt is 25.6796mV for these at a temperature of 25C
![[Pasted image 20230314145947.png]]
the fit isn't amazing but the values seem to make sense 
so we can assume that at 100mA a forward voltage of 2.582 will be required


https://docs.google.com/spreadsheets/d/19ptPP8tYTS9Z_lMBAoifKPtHAU-QfR65nrqQTcai4M8/edit?usp=sharing

The results are below
| diode | forward voltage | current |
|--|--|--|
| red | 2.582V | 100mA |
| green | 3.791V | 100mA |
| blue | 3.791V | 100mA |

this means that a supply in excess of 3.791V will be needed. I think this means it can be powered direct from the battery. Next up lets check efficiency in LTSpice for the battery voltage range which is 3.6V - 4.2V

To do this I am first going to add custom diodes for the values we got from the datasheet the process for this is in [[LTSpice Master Notes]]

The values for the spice model as determined from within desmos are in the table below with compensation for Vt assuming 25C
| diode | Is | n |
|--|--|--|
| red | 0.0000606102 | 13.5699 |
| green | 0.00000257692 | 13.9707 |
| blue | 0.00000257692 | 13.9707 |

running this for the diodes up to 3.791V with a ramp input gives the following diode curves for blue and green which have the same parameters

![[Pasted image 20230314151508.png]]
this looks pretty close to what we would expect which is a good sign, the peak current is 97.3mA which is fairly close. The error here is probably gmin or one of the other spice parameters which weren't taken into account. Comparing to the datasheet curves as a given point such as 3.1V which should be 15mA (14.5mA on the desmos) gives 14.3mA which is close enough for me. 

With this all figured out we can now start testing efficiencies of the circuit. 

documented in the spreadsheet but from going through all the values and testing the worst case efficiency is 60% with the best case being 88% this is manageable. Max battery current draw is ~100mA and it tends to be fixed. The resistor values that should be used are 
Red = 8ohm
blue = green = 3ohm

With this all determined we can budget 300mA max draw for the LED drivers and the circuit can be redesigned following these parameters. 