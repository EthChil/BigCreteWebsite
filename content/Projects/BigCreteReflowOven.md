---
title: "Big Crete Reflow Oven"
---

I was walking through Canadian Tire one day and saw a killer deal of just $20 CAD for a toaster oven and immediately thought "I need to turn that into a reflow oven". So I did just that and took it home, stripped it open and figured out how to modify it.

<img class="center-picture eighty-per" src="./Projects/Attachments/BCReflowOven.jpeg">

I noticed there was a temperature sensor failsafe which would switch the heating coils off. Pictured above you can see on the left the dials and then there are 3 white circles. The ones on the top and bottom are the heating elements and the one in the center I believe is a temperature failsafe which turns the power to the heating elements off should the temeprature exceed some limit. I pulled the wires off of this and soldered a toggle switch on to test out this hypothesis. 

<img class="center-picture eighty-per" src="./Projects/Attachments/BCReflowTesting.JPG">

Testing with the switch confirmed this hyopthesis so the next step was to hook a proper feedback controller up. I decided this would take the form of a simple relay circuit acting as a shield on an Aruduino Uno paired with a thermocouple. The relay would switch the high voltage AC providing isolation from the Arduino and the thermocouple would provide temperature feedback. This would all then connect to a python script running on my laptop which implemented the control algorithm and would allow for me to set a reflow curve. 

<img class="center-picture eighty-per" src="./Projects/Attachments/BCReflowHat.jpeg">

Inside the oven I kept the tray and filled it with sand which the boards sit on during reflow. This ensures that it has consistent heat on the back of the board.

So far I have reflowd more than 10 PCBs with this oven and it has been great. It was a fun project in tearing down consumer products and modifiying them to fit alterior purposes. Not to mention I now have a reflow oven which makes assembling PCBs super easy. 

<img class="center-picture eighty-per" src="./Projects/Attachments/BCReflowAction.jpeg">
Image of thermocouple and BMS test board being reflowed.

<img class="center-picture eighty-per" src="./Projects/Attachments/BCReflowAction2.jpeg">
Close up of my custom FPGA Pong board being reflowed. (ignore the poor solder paste application)
