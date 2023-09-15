
## OPTION 1 - 1s boost to 5V (selected)

(preferred option)

Battery charger circuit
RT9526A - used in numworks calculator
![[Pasted image 20230106223113.png]]
Numworks calculator power circuit 

Pins
Vin (hook to USB power)
Iset - use a resistor to tune charge speed
Imin - use a resistor to tune minimum current
CHG_SB
PGB
BATT - add output capacitor and hook into cells


Boost circuit
TLV61070A - 5V output with 2.7V to 4.35V on input which is within lipo range
This circuit is capped at 1A continous so 5W delivery (based on power estimation this should be fine)
if this isn't sufficient swap to these https://www.ti.com/lit/ds/symlink/tps61033.pdf?ts=1677895328479&ref_url=https%253A%252F%252Fwww.ti.com%252Fproduct%252FTPS61033



Continous power circuit

Make brekaout PCBs for ICs that are breadboard mountable (done both circuits verified)

Battery

Power Consumption document
https://docs.google.com/spreadsheets/d/19ptPP8tYTS9Z_lMBAoifKPtHAU-QfR65nrqQTcai4M8/edit?usp=sharing



## OPTION 2 - 2s BMS and buck to 5V

2s BMS giving between 8.4V and 6.4V
