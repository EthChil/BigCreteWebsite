# Power Subcircuit

## Battery and BMS
### Battery

Flat celled LIPO either 2s with bucks or 1s and boost for 5V line
2 cell for 8.4V max 6.6V min

Looking at using two of these
https://www.adafruit.com/product/328

Max discharge 1.5A @ 7V this is 10.5W

### BMS

Takes voltage in from possibly multiple sources must take these two inputs
plus the batteries and provide a consistent output

Vin - 10V 


## Power Converters
### Power Monitoring
All lines need to be monitored for voltage and current so that's 8 rails

voltage into the buck converter and current also need to be monitored for 9 total rails



### Regulators
#### Sequencing
power supplies are sequenced (Vccint + Vccbram) -> (Vccaux) -> (Vcco)

1V -> 1.8V -> 3.3V

5V is fed into PVIN3

(1V comes up as 5V comes up)
TRKSS1 -> softstarts on 2200pf cap
TRKSS2 -> held low
RUN3 -> held low
RUN4 -> held low

(1.8V comes up)
TRKSS1 -> started
TRKSS2 -> held low
RUN3 -> pulled high as 5V comes up
RUN4 -> held low

(3.3V comes up)
TRKSS1 -> started
TRKSS2 -> softstarts once PG3 high 
RUN3 -> started
RUN4 -> held low

(1.5V comes up)
TRKSS1 -> started
TRKSS2 -> started
RUN3 -> started
RUN4 -> pulled high as 3.3V comes up


#### Rails

| Voltage | Current | Target Current | FPGA Rails                | RAM Rails | Display Rails | LED Driver Rails | notes |
| ------- | ------- | -------------- | ------------------------- | --------- | ------------- | ---------------- | ----- |
| 1V      | 350mA   | 500mA          | Vccint, Vccbram, Vmgtavcc |           |               |                  | 3%    |
| 1.8V    | 73mA    | 250mA          | Vccaux, Vccadc            |           |               |                  | 5%    |
| 3.3v    | 12mA    | 250mA          | Vcco                      | Vddspd    | Vcc           |                  | 5%    |
| 1.2V    | 12mA    | 100mA          | Vmgtavtt                  |           |               |                  | 2.5%  |
| 1.25V   | 15uA    | 20uA           | Vrefp                     |           |               |                  | 4%    |
| 1.5V    | 2.3A    | 3A             |                           | Vdd       |               |                  | 5%    |
| 0.75V   | 610mA   | 1A             |                           | Vtt       |               |                  | 2%    |
| 5V      | 530mA   | 1A             |                           |           | Backlight     | Vcc              | 5%    |


Total Current Draw -> 6.25A
Total Power -> 12.3075W

Regulator setup
5v (Buck) 1A

3.3v (Buck) 1A (+2A)
| 0.75V (Linear special IC) 0.5A
| 1.2V (Linear) 0.1A
| 1V (Linear) 0.5A

1.8v (Buck) 0.25A

1.5V (Buck) 2.5A
| 1.25V (Zener Shunt) 20uA

4 channel buck IC 
LT8602

produces the following rails
5v @ 1A
3.3v -> feeds into 1.5v and 1.8v
1.5v 
1.8v

Linear reg IC
MIC69153

ADJ - 0.5v
FLG - pullup if low that means theres an error
Vin - 1.8v
En - 1.8v
Cout - 10uf (X7R)
Cin - 10uf


## Wireless Charging Circuit
