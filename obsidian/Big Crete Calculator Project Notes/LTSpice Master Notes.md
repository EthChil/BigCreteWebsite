
Creating a custom diode model

from this document https://ltwiki.org/files/SPICEdiodeModel.pdf
![[Pasted image 20230314142118.png]]
these are the parameters and they fit the schokley equation below
![[Pasted image 20230314142137.png]]
IS = IS (saturation current)
Vd is the input voltage
N = N (emission coefficient)
Vt = thermal voltage and is set based on simulator values
Vt is determined by the following equation. k is the boltzman constant, T is the temperature (kelvin), q is the electron charge (1.602176634e-19 C)
![[Pasted image 20230314145436.png]]

GMIN is added by the program to help with convergence

![[Pasted image 20230314145236.png]]
example spice decleration for custom model

Note that since components are temperature dependent the temperature can be set via a .TEMP decleration in celsius. So for example to set a temperature of 25C the following directive is used
![[Pasted image 20230314152145.png]]
