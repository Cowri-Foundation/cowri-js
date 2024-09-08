# CowriJS  - Under Active Development !!!

This is an attempt to do the unthinkable: design a fully functional blockchain protocol that is safe to be implemented in vanilla javascript, and light enough to run on thin clients like smart phones, browsers and iot devices. This first implementation however is being written to run on the nodeJs platform.

We hope to achieve a permissionless, egalitarian and highly decentralized blockchain network, with a non-interactive leadership selection process.


## Consensus Algorithm

To achieve the above objectives, a new consensus algorithm had to be invented. We call it 'Extended Proof of Time' or 'XPoT'. It borrows several desirable features from several other consensus protocols, without their disadvantages. 

For example, it takes from the Proof of Work protocol used by bitcoin, without the energy waste, as only a very small sample of miners are chosen to perform a small computation or 'work', but the work is linear and cannot be parallelized, hence a node with a higher computing power have no edge over a node with limited resources. Every slot, a miner performs a small computation to check if it is among a list of workers to vote in the previous block and also produce the next block. If it is, it submits a vote on the previous block, and runs a certain amount of sequential computation. The first voter whose computation result matches the set block difficulty gets to produce the block for that slot.

It borrows from the proof of stake network, but without the centralizing effects. In the PoS protocol, miners stake a large amount of tokens to be able to participate in the block production process and also earn a reward, and the nodes can withdraw their stake anytime. But in XPoT, the stake is a tiny non-refundable amount that gives the node access to a virtual miner. Also there is a concept of voting (attestations) but unlike PoS where blocks need two-third of all votes to be confirmed, votes in XPoT plays a different role; they add 'weight' to a block as there could be multiple miners in a slot (promotes liveliness and a measure against centralization), and voters and miners are incentivized to follow the most voted chain since their rewards are tied to the average weight (total weight divided by block height) of the chain they vote for or extend, but are penalized if they vote or extend a bad/malicious block.

As mentioned earlier, XPoT makes use of sequential computations to select the miner for a block, this is done through a 'Verifiable Delay Function', which is used in all Proof of Time blockchains like Chia. VDFs are hard to compute, but easy to verify. For example, it can take 10s to run a VDF and compute a result, but take less than a second to verify. The current VDF bing used in our XPoT protocol is the slothVDF which employs the use of modular square roots, the explanation and reason for choosing this VDF is beyond the scope of this introduction, and will be explained properly in the upcoming Cowri Black Paper.


## Why?

Why build a blockchain client in Javascript, given the overhead, the lack of type safety and several quirks of javascript?

> *"Any application that can be written in JavaScript, will eventually be written in JavaScript." - Jeff Atwood*

Currently, 66% of all developers worldwide are Javascript developers. Read that again. While, platforms like Ethereum and Solana opened up the blockchain ecosystem through the use of smart contracts enabling millions of developers to partake in the blockchain and cryptocurrency industry. A Javascript-first blockchain will bring millions more into the ecosystem, and we hope to achieve that through the implementation of dumb contracts, which are smart contracts written in javascript, but with safety nets.
