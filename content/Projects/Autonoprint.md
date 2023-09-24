---
title: "Autonoprint"
---
[Return to Projects](main.html)

Autonoprint was a project built for Make UofT with Clayton Haight, and Dana Zarezankova. This is a yearly hackathon with a focus on hardware held at the University of Toronto. Our project AutonoPrint consisted of automoting a Prusa Mk3 printer such that it is capable of removing parts from it's printbed automatically. 

To do this we added an arm which is lowered onto the printbed with a scraper. The bed would then move pushing the part into the scraper. While this moves there is a sponge irigated with IPA under the scraper cleaning the bed to prepare it for the next print. To achieve this we added a raspberry pi which would control a small peristaltic pump and the arm stepper motor.

A major learning I gained during this project was digging into gcode and how it controls the printer. I wrote custom gcode to move the bed and trigger the raspberry pi to move the arm and peristaltic pump.