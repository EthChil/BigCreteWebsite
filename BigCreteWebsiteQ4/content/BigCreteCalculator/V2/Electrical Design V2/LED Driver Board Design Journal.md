
Mar 15 
re-architecting the LED Driver board

One big issue is how to change the addressing structure now that blue green and red are being split up. One thought is that each colour gets a dedicated decoder with a 3 bit input. This would mean 9 control lines driving 15 gates not terribly efficient not to mention the added complexity and cost of the decoders. Below is a different way of approaching this showing all the possible output combinations. the red highlight is showing how the leds are in groups of 3 and since only one rgb led is driven at a time you need to be able to only handle every combination for that led masking the rest out and this just moves across. this gives 40 unique combinations where the bottom 3 bits represent the value output to a specific rgb led and the top 3 are effectively the mask. This drops the required bits from 9 to 6 which is still a lot but far more reasonable. The bottom 3 bits won't require a decoder and can be multiplexed using the top 3 bits. This would require 3 multiplexers one for each colour channel. 

![[Pasted image 20230315141529.png]]

New thought, this should just be handled in the fpga since that's literally what it's for and it has a lot of available pins so a higher density connector should be employed. I think using a tighter pitch or double rows is the solution here. The savings on pins isn't outweighed by the added circuit complexity and honestly just makes a more expensive and complex design.
