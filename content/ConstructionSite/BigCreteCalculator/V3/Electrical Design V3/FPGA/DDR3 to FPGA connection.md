# Connection from FGPA to RAM

relates to [[FPGA Board]]

## IMPEDANCE NOTES

https://resources.altium.com/p/how-to-route-ddr3-memory-and-cpu-fan-out
https://www.micron.com/support/~/media/D546161C2C6140BCB0BAEE954AA53433.pdf
https://www.altium.com/documentation/altium-designer/controlled-impedance-routing-ad

Pin Groups
DQ (63 - 0)
A (15 - 0)
BA (2 - 0)
DQS (8 differential pairs)
CK (1 differential pair)
RAS
CAS
WE
RESET
CKE0
ODT0
CS0

Route Command signals (DQ and DQS)

Group into byte groups
Length matching only applies to byte lanes
DQ(7:0) DQS0
DQ(15:8) DQS1
DQ(23:16) DQS2
DQ(31:24) DQS3
DQ(39:32) DQS4
DQ(47:40) DQS5
DQ(55:48) DQS6
DQ(63:56) DQS7

DQS difference in lenght between pair is +/- 20 mil
100 mil on byte lanes? I think that's 100 mil difference try to match them up as close as possible

DATA GROUP
Data (DQ) 1.9 inch minimum
7.9 mil width: target impedance 40 ohm
trace space = 11.8 mils (between wires?)
trace space from DIMM pins = 7 mil (not sure what this means?)
trace space to other signal groups = 12 mils

Strobe (DQS) 1.9 inch minimum
7.9 mil width: target impedance 40 ohm
trace space = 4 mil between pair
trace space to other signal groups = 15.8 mils

CLOCK GROUP
Memory Clock(CK) 1.9 inch minimum
4 mils length difference between pair
9.9 mils pair to pair (2 pairs)
width 8 mils target 40 ohm trace impedance 80 ohm differential impedance
trace space 5 mil
trace space to other groups 20 mil

CONTROL GROUP
Control Group (CKE, ODT, CS, RESET) 1.9 inch minimum
20 mil length difference from memory clock (clock group)
width 5 mil target 40 ohm impedance
trace space 12 to 15 mil (except at dimm)
trace space from dimm 7 mil
trace space to other signal groups 25 mil

ADDRESS GROUP
Address Group (BA, RAS, CAS, WE, A) 1.9 inch minimum
20 mil length difference from memory clock (clock group)
width 5 mil target 40 ohm impedance
trace space 12 to 15 mil (except at dimm)
trace space from dimm 7 mil
trace space to other signal groups 25 mil





## Other DDR Pins
| Pin Name | RAM Pin | Function             |
| -------- | ------- | -------------------- |
| Vrefdq   | 1       | [[FPGA Board]]       |
| Vss      | 3       | 0V                   |
| Vss      | 9       | 0V                   |
| Vss      | 13      | 0V                   |
| Vss      | 19      | 0V                   |
| Vss      | 25      | 0V                   |
| Vss      | 31      | 0V                   |
| Vss      | 37      | 0V                   |
| Vss      | 43      | 0V                   |
| Vss      | 49      | 0V                   |
| Vss      | 55      | 0V                   |
| Vss      | 61      | 0V                   |
| Vss      | 65      | 0V                   |
| Vss      | 71      | 0V                   |
| Vdd      | 75      | [[FPGA Board]]       |
| Vdd      | 81      | 0V                   |
| Vdd      | 87      | 0V                   |
| Vdd      | 93      | [[FPGA Board]]       |
| Vdd      | 99      | [[FPGA Board]]       |
| Vdd      | 105     | [[FPGA Board]]       |
| Vdd      | 111     | [[FPGA Board]]       |
| Vdd      | 117     | [[FPGA Board]]       |
| Vdd      | 123     | [[FPGA Board]]       |
| Vss      | 127     | 0V                   |
| Vss      | 133     | 0V                   |
| Vss      | 139     | 0V                   |
| Vss      | 145     | 0V                   |
| Vss      | 151     | 0V                   |
| Vss      | 155     | 0V                   |
| Vss      | 161     | 0V                   |
| Vss      | 167     | 0V                   |
| Vss      | 173     | 0V                   |
| Vss      | 179     | 0V                   |
| Vss      | 185     | 0V                   |
| Vss      | 189     | 0V                   |
| Vss      | 195     | 0V                   |
| SA0      | 197     | Serial Address Input |
| Vddspd   | 199     | [[FPGA Board]]       |
| SA1      | 201     | Serial Address Input |
| Vtt      | 203     | [[FPGA Board]]       |
| Vss      | 2       | 0V                   |
| Vss      | 8       | 0V                   |
| Vss      | 14      | 0V                   |
| Vss      | 20      | 0V                   |
| Vss      | 26      | 0V                   |
| Vss      | 32      | 0V                   |
| Vss      | 38      | 0V                   |
| Vss      | 44      | 0V                   |
| Vss      | 48      | 0V                   |
| Vss      | 54      | 0V                   |
| Vss      | 60      | 0V                   |
| Vss      | 66      | 0V                   |
| Vss      | 72      | 0V                   |
| Vdd      | 76      | [[FPGA Board]]       |
| Vdd      | 82      | [[FPGA Board]]       |
| Vdd      | 88      | [[FPGA Board]]       |
| Vdd      | 94      | [[FPGA Board]]       |
| Vdd      | 100     | [[FPGA Board]]       |
| Ck1      | 102     | NC                   |
| Ck1#     | 104     | NC                   |
| Vdd      | 106     | [[FPGA Board]]       |
| Vdd      | 112     | [[FPGA Board]]       |
| Vdd      | 118     | [[FPGA Board]]       |
| Vdd      | 124     | [[FPGA Board]]       |
| Vrefca   | 126     | [[FPGA Board]]       |
| Vss      | 128     | 0V                   |
| Vss      | 134     | 0V                   |
| Vss      | 138     | 0V                   |
| Vss      | 144     | 0V                   |
| Vss      | 150     | 0V                   |
| Vss      | 156     | 0V                   |
| Vss      | 162     | 0V                   |
| Vss      | 168     | 0V                   |
| Vss      | 172     | 0V                   |
| Vss      | 178     | 0V                   |
| Vss      | 184     | 0V                   |
| Vss      | 190     | 0V                   |
| Vss      | 196     | 0V                   |
| SDA      | 200     | SPD SDA              |
| SCL      | 202     | SPD SCL              |
| Vtt      | 204     | [[FPGA Board]]       |

## FPGA to DDR3 Connection

| Pin Name  | RAM Pin | FPGA Pin | Notes                   |
| --------- | ------- | -------- | ----------------------- |
| dq0       | 5       | F13      | SSTL15                  |
| dq1       | 7       | F14      | SSTL15                  |
| dq2       | 15      | F16      | SSTL15                  |
| dq3       | 17      | E17      | SSTL15                  |
| dq4       | 4       | E13      | SSTL15                  |
| dq5       | 6       | E14      | SSTL15                  |
| dq6       | 16      | E16      | SSTL15                  |
| dq7       | 18      | D16      | SSTL15                  |
| dq8       | 21      | B15      | SSTL15                  |
| dq9       | 23      | B16      | SSTL15                  |
| dq10      | 33      | C13      | SSTL15                  |
| dq11      | 35      | B13      | SSTL15                  |
| dq12      | 22      | A13      | SSTL15                  |
| dq13      | 24      | A14      | SSTL15                  |
| dq14      | 34      | B17      | SSTL15                  |
| dq15      | 36      | B18      | SSTL15                  |
| dq16      | 39      | E19      | SSTL15                  |
| dq17      | 41      | D19      | SSTL15                  |
| dq18      | 51      | B20      | SSTL15                  |
| dq19      | 53      | A20      | SSTL15                  |
| dq20      | 40      | A18      | SSTL15                  |
| dq21      | 42      | A19      | SSTL15                  |
| dq22      | 50      | F19      | SSTL15                  |
| dq23      | 52      | F20      | SSTL15                  |
| dq24      | 57      | D20      | SSTL15                  |
| dq25      | 59      | C20      | SSTL15                  |
| dq26      | 67      | C22      | SSTL15                  |
| dq27      | 69      | B22      | SSTL15                  |
| dq28      | 56      | E22      | SSTL15                  |
| dq29      | 58      | D22      | SSTL15                  |
| dq30      | 68      | E21      | SSTL15                  |
| dq31      | 70      | D21      | SSTL15                  |
| dq32      | 129     | K13      | SSTL15                  |
| dq33      | 131     | K14      | SSTL15                  |
| dq34      | 141     | M13      | SSTL15                  |
| dq35      | 143     | L13      | SSTL15                  |
| dq36      | 130     | L14      | SSTL15                  |
| dq37      | 132     | L15      | SSTL15                  |
| dq38      | 140     | L16      | SSTL15                  |
| dq39      | 142     | K16      | SSTL15                  |
| dq40      | 147     | W21      | SSTL15                  |
| dq41      | 149     | W22      | SSTL15                  |
| dq42      | 157     | AA20     | SSTL15                  |
| dq43      | 159     | AA21     | SSTL15                  |
| dq44      | 146     | AB21     | SSTL15                  |
| dq45      | 148     | AB22     | SSTL15                  |
| dq46      | 158     | U20      | SSTL15                  |
| dq47      | 160     | V20      | SSTL15                  |
| dq48      | 163     | V18      | SSTL15                  |
| dq49      | 165     | V19      | SSTL15                  |
| dq50      | 175     | V17      | SSTL15                  |
| dq51      | 177     | W17      | SSTL15                  |
| dq52      | 164     | AA18     | SSTL15                  |
| dq53      | 166     | AB18     | SSTL15                  |
| dq54      | 174     | U17      | SSTL15                  |
| dq55      | 176     | U18      | SSTL15                  |
| dq56      | 181     | P14      | SSTL15                  |
| dq57      | 183     | R14      | SSTL15                  |
| dq58      | 191     | R18      | SSTL15                  |
| dq59      | 193     | T18      | SSTL15                  |
| dq60      | 180     | P15      | SSTL15                  |
| dq61      | 182     | R16      | SSTL15                  |
| dq62      | 192     | N13      | SSTL15                  |
| dq63      | 194     | N14      | SSTL15                  |
| dm0       | 11      |          | pull low, ram pin wrong |
| dm1       | 28      |          | pull low, ram pin wrong |
| dm2       | 44      |          | pull low, ram pin wrong |
| dm3       | 59      |          | pull low, ram pin wrong |
| dm4       | 140     |          | pull low, ram pin wrong |
| dm5       | 157     |          | pull low, ram pin wrong |
| dm6       | 172     |          | pull low, ram pin wrong |
| dm7       | 189     |          | pull low, ram pin wrong |
| dqsp0     | 12      | C14      | DIFF_SSTL15             |
| dqsn0     | 10      | C15      | DIFF_SSTL15             |
| dqsp1     | 29      | A15      | DIFF_SSTL15             |
| dqsn1     | 27      | A16      | DIFF_SSTL15             |
| dqsp2     | 47      | F18      | DIFF_SSTL15             |
| dqsn2     | 45      | E18      | DIFF_SSTL15             |
| dqsp3     | 64      | B21      | DIFF_SSTL15             |
| dqsn3     | 62      | A21      | DIFF_SSTL15             |
| dqsp4     | 137     | K17      | DIFF_SSTL15             |
| dqsn4     | 135     | J17      | DIFF_SSTL15             |
| dqsp5     | 154     | Y21      | DIFF_SSTL15             |
| dqsn5     | 152     | Y22      | DIFF_SSTL15             |
| dqsp6     | 171     | AA19     | DIFF_SSTL15             |
| dqsn6     | 169     | AB20     | DIFF_SSTL15             |
| dqsp7     | 188     | N17      | DIFF_SSTL15             |
| dqsn7     | 186     | P17      | DIFF_SSTL15             |
| addr15    | 78      | H13      | SSTL15                  |
| addr14    | 80      | G13      | SSTL15                  |
| addr13    | 119     | G15      | SSTL15                  |
| addr12    | 83      | G16      | SSTL15                  |
| addr11    | 84      | G17      | SSTL15                  |
| addr10    | 107     | G18      | SSTL15                  |
| addr9     | 85      | J15      | SSTL15                  |
| addr8     | 89      | H15      | SSTL15                  |
| addr7     | 86      | H17      | SSTL15                  |
| addr6     | 90      | H18      | SSTL15                  |
| addr5     | 91      | J22      | SSTL15                  |
| addr4     | 92      | H22      | SSTL15                  |
| addr3     | 95      | H20      | SSTL15                  |
| addr2     | 96      | G20      | SSTL15                  |
| addr1     | 97      | K21      | SSTL15                  |
| addr0     | 98      | K22      | SSTL15                  |
| ba2       | 79      | M21      | SSTL15                  |
| ba1       | 108     | L21      | SSTL15                  |
| ba0       | 109     | J20      | SSTL15                  |
| ckp0      | 101     | J14      | DIFF_SSTL15             |
| ckn0      | 103     | H14      | DIFF_SSTL15             |
| rasn      | 110     | J21      | SSTL15                  |
| casn      | 115     | J19      | SSTL15                  |
| wen       | 113     | H19      | SSTL15                  |
| resetn    | 30      | D14      | LVCMOS15                |
| cke0      | 73      | M22      | SSTL15                  |
| odt0      | 116     | M18      | SSTL15                  |
| csn0      | 114     | N22      | SSTL15                  |
| sys_clk_i |         | K18      |                         |

