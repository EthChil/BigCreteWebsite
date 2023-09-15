# Connection from FGPA to Peripherals

relates to [[FPGA Board]]

Notes
Power
VCCO - Vcco input refer to [[Power Subcircuit]]
MGTAVTT - refer to [[Power Subcircuit]]

JTAG
TDI_0 - TDI
TDIO_0 - TDO
TCK_0 - TCK
TMS_0 - TMS

Configuration
CCLK_0 - configuration clock, this will be hooked into the SPI boot flash (May require termination)
M0_0 - config pin (tie to Vcco)
M1_0 - config pin (tie to GND)
M2_0 - config pin (tie to GND)
![[Pasted image 20210714174230.png]]

MOSI/D\[00\] - Master out slave in to SPI
DIN/D\[01\] - Master in slave out from SPI
FCS_B - flash chip select, chip select for SPI specifically for configuration 

PUDC_B - enables pullups on IO pins during configuration, for pullups to be disabled on configuration tie to Vcco (tie low)
EMCCLK - optional external clock input that can be forwarded to the CCLK (possibly use to limit clock frequency)
CSI_B - Chip select configuration interface (high-z if not used) (high-z)
CSO_B - Chip select output for daisy chaining FPGAs (high-z if not used) (high-z)
DOUT - data output, (high-z if not used) (high-z)

DONE_0 - open drain output, for if configuration has completed, run this through a LED for debug (active high)
INIT_B_0 - open drain output, indicates initilization of configuration memory, must be connected by a pullup to VCCO (4.7k) (active low)
PROGRAM_B_0 - Async reset for configuration (active low)

CFGBVS_0 - selects the voltage level for IO, connect to Vcco for 3.3v, for 1.8v connect to GND


General IO
AD(X)(P/N) - ADC Pin, X = channel num, (P/N) Positive negative differential
IO - user input output
L(X)(P/N) - Differential input, X = channel num, (P/N) Positive negative differential
T0 - belongs to memory byte group 0-3 (not sure what this means)
T(X)_DQS - DDR DQS Pin, X = byte group

VP_0 - dedicated positive ADC input
VN_0 - dedication negative ADC input

DXN - positive differential output from chip temp sensor (Cathode)
DXP - negative differential output from chip temp sensor (Annode)

MGTPTXN(X) - GTP transciever tx, X = group num 0-3
MGTPRXN(X) - GTP transciever rx, X = group num 0-3



## Pinout
| FPGA Pin | GPIO Pin |
| -------- | -------- |
| T3       | 1        |
| T1       | 2        |
| U2       |          |
| V2       |          |
| R3       |          |
| R2       |          |
| W2       |          |
| Y2       |          |
| W1       |          |
| Y1       |          |
| U3       |          |
| V3       |          |
| AA1      |          |
| AB1      |          |
| AB3      |          |
| AB2      |          |
| Y3       |          |
| AA3      |          |
| AA5      |          |
| AB5      |          |
| Y4       |          |
| AA4      |          |
| V4       |          |
| W4       |          |
|          |          |

| FPGA Pin | Pin Name           | Function   | Hookup Notes | External Device Link |
| -------- | ------------------ | ---------- | ------------ | -------------------- |
| A1       | IO_L1N_T0_AD4N_35  | General IO |              |                      |
| A2       | GND                |            |              |                      |
| A3       | GND                |            |              |                      |
| A4       | MGTPTXN0_216       | GTP TX 0   |              |                      |
| A5       | GND                |            |              |                      |
| A6       | MGTPTXN2_216       | GTP TX 2   |              |                      |
| A7       | GND                |            |              |                      |
| A8       | MGTPRXN0_216       | GTP RX 0   |              |                      |
| A9       | GND                |            |              |                      |
| A10      | MGTPRXN2_216       | GTP RX 2   |              |                      |
| A11      | GND                |            |              |                      |
| A12      | GND                |            |              |                      |
| A13      | IO_L10P_T1_16      | General IO |              |                      |
| A14      | IO_L10N_T1_16      | General IO |              |                      |
| A15      | IO_L9P_T1_DQS_16   |            |              |                      |
| A16      | IO_L9N_T1_DQS_16   |            |              |                      |
| A17      | VCCO_16            | POWER      |              |                      |
| A18      | IO_L17P_T2_16      | General IO |              |                      |
| A19      | IO_L17N_T2_16      | General IO |              |                      |
| A20      | IO_L16N_T2_16      | General IO |              |                      |
| A21      | IO_L21N_T3_DQS_16  |            |              |                      |
| A22      | GND                |            |              |                      |
| B1       | IO_L1P_T0_AD4P_35  | General IO |              |                      |
| B2       | IO_L2N_T0_AD12N_35 | General IO |              |                      |
| B3       | GND                |            |              |                      |
| B4       | MGTPTXP0_216       | GTP TX 0   |              |                      |
| B5       | MGTAVTT            | POWER      |              |                      |
| B6       | MGTPTXP2_216       | GTP TX 2   |              |                      |
| B7       | MGTAVTT            | POWER      |              |                      |
| B8       |                    |            |              |                      |
| B9       | MGTAVTT            | POWER      |              |                      |
| B10      | MGTPRXP2_216       | GTP RX 2   |              |                      |
| B11      | MGTAVTT            | POWER      |              |                      |
| B12      | IO_L7N_T1_13       | General IO |              |                      |
| B13      | IO_L8N_T1_16       | General IO |              |                      |
| B14      |                    |            |              |                      |
| B15      |                    |            |              |                      |
| B16      |                    |            |              |                      |
| B17      |                    |            |              |                      |
| B18      |                    |            |              |                      |
| B19      |                    |            |              |                      |
| B20      |                    |            |              |                      |
| B21      |                    |            |              |                      |
| B22      |                    |            |              |                      |
| C1       |                    |            |              |                      |
| C2       |                    |            |              |                      |
| C3       |                    |            |              |                      |
| C4       |                    |            |              |                      |
| C5       |                    |            |              |                      |
| C6       |                    |            |              |                      |
| C7       |                    |            |              |                      |
| C9       |                    |            |              |                      |
| C10      |                    |            |              |                      |
| C11      |                    |            |              |                      |
| C12      |                    |            |              |                      |
| C13      |                    |            |              |                      |
| C14      |                    |            |              |                      |
| C15      |                    |            |              |                      |
| C16      |                    |            |              |                      |
| C17      |                    |            |              |                      |
| C18      |                    |            |              |                      |
| C19      |                    |            |              |                      |
| C20      |                    |            |              |                      |
| C21      |                    |            |              |                      |
| C22      |                    |            |              |                      |
| D1       |                    |            |              |                      |
| D2       |                    |            |              |                      |
| D3       |                    |            |              |                      |
| D4       |                    |            |              |                      |
| D5       |                    |            |              |                      |
| D6       |                    |            |              |                      |
| D7       |                    |            |              |                      |
| D9       |                    |            |              |                      |
| D10      |                    |            |              |                      |
| D11      |                    |            |              |                      |
| D12      |                    |            |              |                      |
| D13      |                    |            |              |                      |
| D14      |                    |            |              |                      |
| D15      |                    |            |              |                      |
| D16      |                    |            |              |                      |
| D17      |                    |            |              |                      |
| D18      |                    |            |              |                      |
| D19      |                    |            |              |                      |
| D20      |                    |            |              |                      |
| D21      |                    |            |              |                      |
| D22      |                    |            |              |                      |
| E1       |                    |            |              |                      |
| E2       |                    |            |              |                      |
| E3       |                    |            |              |                      |
| E4       |                    |            |              |                      |
| E5       |                    |            |              |                      |
| E6       |                    |            |              |                      |
| E7       |                    |            |              |                      |
| E9       |                    |            |              |                      |
| E10      |                    |            |              |                      |
| E11      |                    |            |              |                      |
| E12      |                    |            |              |                      |
| E13      |                    |            |              |                      |
| E14      |                    |            |              |                      |
| E15      |                    |            |              |                      |
| E16      |                    |            |              |                      |
| E17      |                    |            |              |                      |
| E18      |                    |            |              |                      |
| E19      |                    |            |              |                      |
| E20      |                    |            |              |                      |
| E21      |                    |            |              |                      |
| E22      |                    |            |              |                      |
| F1       |                    |            |              |                      |
| F2       |                    |            |              |                      |
| F3       |                    |            |              |                      |
| F4       |                    |            |              |                      |
| F5       |                    |            |              |                      |
| F6       |                    |            |              |                      |
| F7       |                    |            |              |                      |
| F9       |                    |            |              |                      |
| F10      |                    |            |              |                      |
| F11      |                    |            |              |                      |
| F12      |                    |            |              |                      |
| F13      |                    |            |              |                      |
| F14      |                    |            |              |                      |
| F15      |                    |            |              |                      |
| F16      |                    |            |              |                      |
| F17      |                    |            |              |                      |
| F18      |                    |            |              |                      |
| F19      |                    |            |              |                      |
| F20      |                    |            |              |                      |
| F21      |                    |            |              |                      |
| F22      |                    |            |              |                      |
| G1       |                    |            |              |                      |
| G2       |                    |            |              |                      |
| G3       |                    |            |              |                      |
| G4       |                    |            |              |                      |
| G5       |                    |            |              |                      |
| G6       |                    |            |              |                      |
| G7       |                    |            |              |                      |
| G9       |                    |            |              |                      |
| G10      |                    |            |              |                      |
| G11      |                    |            |              |                      |
| G12      |                    |            |              |                      |
| G13      |                    |            |              |                      |
| G14      |                    |            |              |                      |
| G15      |                    |            |              |                      |
| G16      |                    |            |              |                      |
| G17      |                    |            |              |                      |
| G18      |                    |            |              |                      |
| G19      |                    |            |              |                      |
| G20      |                    |            |              |                      |
| G21      |                    |            |              |                      |
| G22      |                    |            |              |                      |
| H1       |                    |            |              |                      |
| H2       |                    |            |              |                      |
| H3       |                    |            |              |                      |
| H4       |                    |            |              |                      |
| H5       |                    |            |              |                      |
| H6       |                    |            |              |                      |
| H7       |                    |            |              |                      |
| H9       |                    |            |              |                      |
| H10      |                    |            |              |                      |
| H11      |                    |            |              |                      |
| H12      |                    |            |              |                      |
| H13      |                    |            |              |                      |
| H14      |                    |            |              |                      |
| H15      |                    |            |              |                      |
| H16      |                    |            |              |                      |
| H17      |                    |            |              |                      |
| H18      |                    |            |              |                      |
| H19      |                    |            |              |                      |
| H20      |                    |            |              |                      |
| H21      |                    |            |              |                      |
| H22      |                    |            |              |                      |
| J1       |                    |            |              |                      |
| J2       |                    |            |              |                      |
| J3       |                    |            |              |                      |
| J4       |                    |            |              |                      |
| J5       |                    |            |              |                      |
| J6       |                    |            |              |                      |
| J7       |                    |            |              |                      |
| J9       |                    |            |              |                      |
| J10      |                    |            |              |                      |
| J11      |                    |            |              |                      |
| J12      |                    |            |              |                      |
| J13      |                    |            |              |                      |
| J14      |                    |            |              |                      |
| J15      |                    |            |              |                      |
| J16      |                    |            |              |                      |
| J17      |                    |            |              |                      |
| J18      |                    |            |              |                      |
| J19      |                    |            |              |                      |
| J20      |                    |            |              |                      |
| J21      |                    |            |              |                      |
| J22      |                    |            |              |                      |
| K1       |                    |            |              |                      |
| K2       |                    |            |              |                      |
| K3       |                    |            |              |                      |
| K4       |                    |            |              |                      |
| K5       |                    |            |              |                      |
| K6       |                    |            |              |                      |
| K7       |                    |            |              |                      |
| K9       |                    |            |              |                      |
| K10      |                    |            |              |                      |
| K11      |                    |            |              |                      |
| K12      |                    |            |              |                      |
| K13      |                    |            |              |                      |
| K14      |                    |            |              |                      |
| K15      |                    |            |              |                      |
| K16      |                    |            |              |                      |
| K17      |                    |            |              |                      |
| K18      |                    |            |              |                      |
| K19      |                    |            |              |                      |
| K20      |                    |            |              |                      |
| K21      |                    |            |              |                      |
| K22      |                    |            |              |                      |
| L1       |                    |            |              |                      |
| L2       |                    |            |              |                      |
| L3       |                    |            |              |                      |
| L4       |                    |            |              |                      |
| L5       |                    |            |              |                      |
| L6       |                    |            |              |                      |
| L7       |                    |            |              |                      |
| L9       |                    |            |              |                      |
| L10      |                    |            |              |                      |
| L11      |                    |            |              |                      |
| L12      |                    |            |              |                      |
| L13      |                    |            |              |                      |
| L14      |                    |            |              |                      |
| L15      |                    |            |              |                      |
| L16      |                    |            |              |                      |
| L17      |                    |            |              |                      |
| L18      |                    |            |              |                      |
| L19      |                    |            |              |                      |
| L20      |                    |            |              |                      |
| L21      |                    |            |              |                      |
| L22      |                    |            |              |                      |
| M1       |                    |            |              |                      |
| M2       |                    |            |              |                      |
| M3       |                    |            |              |                      |
| M4       |                    |            |              |                      |
| M5       |                    |            |              |                      |
| M6       |                    |            |              |                      |
| M7       |                    |            |              |                      |
| M9       |                    |            |              |                      |
| M10      |                    |            |              |                      |
| M11      |                    |            |              |                      |
| M12      |                    |            |              |                      |
| M13      |                    |            |              |                      |
| M14      |                    |            |              |                      |
| M15      |                    |            |              |                      |
| M16      |                    |            |              |                      |
| M17      |                    |            |              |                      |
| M18      |                    |            |              |                      |
| M19      |                    |            |              |                      |
| M20      |                    |            |              |                      |
| M21      |                    |            |              |                      |
| M22      |                    |            |              |                      |
| N1       |                    |            |              |                      |
| N2       |                    |            |              |                      |
| N3       |                    |            |              |                      |
| N4       |                    |            |              |                      |
| N5       |                    |            |              |                      |
| N6       |                    |            |              |                      |
| N7       |                    |            |              |                      |
| N9       |                    |            |              |                      |
| N10      |                    |            |              |                      |
| N11      |                    |            |              |                      |
| N12      |                    |            |              |                      |
| N13      |                    |            |              |                      |
| N14      |                    |            |              |                      |
| N15      |                    |            |              |                      |
| N16      |                    |            |              |                      |
| N17      |                    |            |              |                      |
| N18      |                    |            |              |                      |
| N19      |                    |            |              |                      |
| N20      |                    |            |              |                      |
| N21      |                    |            |              |                      |
| N22      |                    |            |              |                      |
| P1       |                    |            |              |                      |
| P2       |                    |            |              |                      |
| P3       |                    |            |              |                      |
| P4       |                    |            |              |                      |
| P5       |                    |            |              |                      |
| P6       |                    |            |              |                      |
| P7       |                    |            |              |                      |
| P9       |                    |            |              |                      |
| P10      |                    |            |              |                      |
| P11      |                    |            |              |                      |
| P12      |                    |            |              |                      |
| P13      |                    |            |              |                      |
| P14      |                    |            |              |                      |
| P15      |                    |            |              |                      |
| P16      |                    |            |              |                      |
| P17      |                    |            |              |                      |
| P18      |                    |            |              |                      |
| P19      |                    |            |              |                      |
| P20      |                    |            |              |                      |
| P21      |                    |            |              |                      |
| P22      |                    |            |              |                      |
| R1       |                    |            |              |                      |
| R2       |                    |            |              |                      |
| R3       |                    |            |              |                      |
| R4       |                    |            |              |                      |
| R5       |                    |            |              |                      |
| R6       |                    |            |              |                      |
| R7       |                    |            |              |                      |
| R9       |                    |            |              |                      |
| R10      |                    |            |              |                      |
| R11      |                    |            |              |                      |
| R12      |                    |            |              |                      |
| R13      |                    |            |              |                      |
| R14      |                    |            |              |                      |
| R15      |                    |            |              |                      |
| R16      |                    |            |              |                      |
| R17      |                    |            |              |                      |
| R18      |                    |            |              |                      |
| R19      |                    |            |              |                      |
| R20      |                    |            |              |                      |
| R21      |                    |            |              |                      |
| R22      |                    |            |              |                      |
| T1       |                    |            |              |                      |
| T2       |                    |            |              |                      |
| T3       |                    |            |              |                      |
| T4       |                    |            |              |                      |
| T5       |                    |            |              |                      |
| T6       |                    |            |              |                      |
| T7       |                    |            |              |                      |
| T9       |                    |            |              |                      |
| T10      |                    |            |              |                      |
| T11      |                    |            |              |                      |
| T12      |                    |            |              |                      |
| T13      |                    |            |              |                      |
| T14      |                    |            |              |                      |
| T15      |                    |            |              |                      |
| T16      |                    |            |              |                      |
| T17      |                    |            |              |                      |
| T18      |                    |            |              |                      |
| T19      |                    |            |              |                      |
| T20      |                    |            |              |                      |
| T21      |                    |            |              |                      |
| T22      |                    |            |              |                      |
| U1       |                    |            |              |                      |
| U2       |                    |            |              |                      |
| U3       |                    |            |              |                      |
| U4       |                    |            |              |                      |
| U5       |                    |            |              |                      |
| U6       |                    |            |              |                      |
| U7       |                    |            |              |                      |
| U9       |                    |            |              |                      |
| U10      |                    |            |              |                      |
| U11      |                    |            |              |                      |
| U12      |                    |            |              |                      |
| U13      |                    |            |              |                      |
| U14      |                    |            |              |                      |
| U15      |                    |            |              |                      |
| U16      |                    |            |              |                      |
| U17      |                    |            |              |                      |
| U18      |                    |            |              |                      |
| U19      |                    |            |              |                      |
| U20      |                    |            |              |                      |
| U21      |                    |            |              |                      |
| U22      |                    |            |              |                      |
| V1       |                    |            |              |                      |
| V2       |                    |            |              |                      |
| V3       |                    |            |              |                      |
| V4       |                    |            |              |                      |
| V5       |                    |            |              |                      |
| V6       |                    |            |              |                      |
| V7       |                    |            |              |                      |
| V9       |                    |            |              |                      |
| V10      |                    |            |              |                      |
| V11      |                    |            |              |                      |
| V12      |                    |            |              |                      |
| V13      |                    |            |              |                      |
| V14      |                    |            |              |                      |
| V15      |                    |            |              |                      |
| V16      |                    |            |              |                      |
| V17      |                    |            |              |                      |
| V18      |                    |            |              |                      |
| V19      |                    |            |              |                      |
| V20      |                    |            |              |                      |
| V21      |                    |            |              |                      |
| V22      |                    |            |              |                      |
| W1       |                    |            |              |                      |
| W2       |                    |            |              |                      |
| W3       |                    |            |              |                      |
| W4       |                    |            |              |                      |
| W5       |                    |            |              |                      |
| W6       |                    |            |              |                      |
| W7       |                    |            |              |                      |
| W9       |                    |            |              |                      |
| W10      |                    |            |              |                      |
| W11      |                    |            |              |                      |
| W12      |                    |            |              |                      |
| W13      |                    |            |              |                      |
| W14      |                    |            |              |                      |
| W15      |                    |            |              |                      |
| W16      |                    |            |              |                      |
| W17      |                    |            |              |                      |
| W18      |                    |            |              |                      |
| W19      |                    |            |              |                      |
| W20      |                    |            |              |                      |
| W21      |                    |            |              |                      |
| W22      |                    |            |              |                      |
| Y1       |                    |            |              |                      |
| Y2       |                    |            |              |                      |
| Y3       |                    |            |              |                      |
| Y4       |                    |            |              |                      |
| Y5       |                    |            |              |                      |
| Y6       |                    |            |              |                      |
| Y7       |                    |            |              |                      |
| Y9       |                    |            |              |                      |
| Y10      |                    |            |              |                      |
| Y11      |                    |            |              |                      |
| Y12      |                    |            |              |                      |
| Y13      |                    |            |              |                      |
| Y14      |                    |            |              |                      |
| Y15      |                    |            |              |                      |
| Y16      |                    |            |              |                      |
| Y17      |                    |            |              |                      |
| Y18      |                    |            |              |                      |
| Y19      |                    |            |              |                      |
| Y20      |                    |            |              |                      |
| Y21      |                    |            |              |                      |
| Y22      |                    |            |              |                      |
| AA1      |                    |            |              |                      |
| AA2      |                    |            |              |                      |
| AA3      |                    |            |              |                      |
| AA4      |                    |            |              |                      |
| AA5      |                    |            |              |                      |
| AA6      |                    |            |              |                      |
| AA7      |                    |            |              |                      |
| AA9      |                    |            |              |                      |
| AA10     |                    |            |              |                      |
| AA11     |                    |            |              |                      |
| AA12     |                    |            |              |                      |
| AA13     |                    |            |              |                      |
| AA14     |                    |            |              |                      |
| AA15     |                    |            |              |                      |
| AA16     |                    |            |              |                      |
| AA17     |                    |            |              |                      |
| AA18     |                    |            |              |                      |
| AA19     |                    |            |              |                      |
| AA20     |                    |            |              |                      |
| AA21     |                    |            |              |                      |
| AA22     |                    |            |              |                      |
| AB1      |                    |            |              |                      |
| AB2      |                    |            |              |                      |
| AB3      |                    |            |              |                      |
| AB4      |                    |            |              |                      |
| AB5      |                    |            |              |                      |
| AB6      |                    |            |              |                      |
| AB7      |                    |            |              |                      |
| AB9      |                    |            |              |                      |
| AB10     |                    |            |              |                      |
| AB11     |                    |            |              |                      |
| AB12     |                    |            |              |                      |
| AB13     |                    |            |              |                      |
| AB14     |                    |            |              |                      |
| AB15     |                    |            |              |                      |
| AB16     |                    |            |              |                      |
| AB17     |                    |            |              |                      |
| AB18     |                    |            |              |                      |
| AB19     |                    |            |              |                      |
| AB20     |                    |            |              |                      |
| AB21     |                    |            |              |                      |
| AB22     |                    |            |              |                      |



