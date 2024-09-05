# COWRI-JS

This is an attempt to do the impossible: create a fully functional and safe blockchain protocol that is light enough to be implemented in vanilla javascript, and can run on thin clients like smart phones, browsers and iot devices. This first implementation however is being written to run on the nodeJs platform.


## Consensus Algorithm

To achieve this objective, a new consensus algorithm had to be invented. We call it 'Extended Proof of Time' or 'XPot'. 

To participate in block production, an intending miner must burn a small unrefundable fee in exchange for a virtual miner. Every slot, a miner performs a small computation to check if it is among a list of workers to vote in the previous block and also produce the next block. If it is, it submits a vote on the previous block, and runs a Verifiable Delay Function for a certain duration. The first voter whose vdf result matches the set block difficulty gets to produce the block for that slot.
