**Battery Circuit

Battery circuit must supply 5 volts with a current draw of 5A (25W)

when battery is charging how does the system run?

power supplied to charge the battery also supplies power to the calculator
5V supply to charge batteries

Component sourcing below

Each cell has a protection IC, split the cells with a MOSFET to charge, charge with additional IC


two battery protection ICs, BQ2973 seems pretty good

charger IC, BQ24095? I think I can do better tho

buck IC TPS56528 seems fine, they all seem the same, maybe find one my team uses 


then split with a fet (should have designs of this)

charge in parallel with a single charger

if 5V comes in this needs to bypass the buck convertor, (switch the buck off)

question is how do you allow for the plug to be removed and also allow everything to react in time?

I suggest a board is made to test this circuit 

it should allow for two 18650s to be connected both with protection ICs, then an additional charger combined with the buck IC I intend to use, this needs an easy universal hookup to an arduino and electronic load



buck circuit done
enable on buck is 1.1-1.3 (1.2V normally)
enable when USB is unplugged (above 5V input)
disable when USB is plugged in

(disable when the batteries are almost dead below 3.3V (6.6V))

6.6V -> 1.2V

battery protection ic
OVP
OVC

 
BQ29732
OCD - 0.19V
OCC - 0.10V
UVP - 2.5V
OVP - 4.28V
SCD - 0.5V

I want OCD - 1.5A (this would be 9.9W to 12.6W)

0.19V / 1.5A = 126mOhm

this gives 
OCC of 793mA
SCD of 3.97A

MOSFET Paramaters
Vdss = 25V
Rds(on) = 63mOhm @ Vgs 3.5V

 

BQ29737
OCD - 0.10V
OCC - 0.05V
UVP - 2.8V
OVP - 4.25V
SCD - 0.3V

I want OCD - 1.5A (this would be 9.9W to 12.6W)

0.10V / 1.5A = 66mOhm

this gives 
OCC of 757mA
SCD of 4.5A

MOSFET Paramaters
Vdss = 25V
Rds(on) = 33mOhm @ Vgs 3.5V

Best part is the FDS6612A but DMG4496SSS-13 will work I think