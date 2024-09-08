# CowriJS  - Under Active Development !!!

This is an attempt to do the unthinkable: design a fully functional blockchain protocol that is safe to be implemented in vanilla javascript, and light enough to run on thin clients like smart phones, browsers and IOT devices. This first implementation however is being written to run on the nodeJs platform.

We hope to achieve a permissionless, egalitarian and highly decentralized blockchain network, with a non-interactive leadership selection process.



## Consensus Algorithm

To achieve the above objectives, a new consensus algorithm had to be invented. We call it 'Extended Proof of Time' or 'XPoT'. It borrows several desirable features from other consensus protocols, without their disadvantages. 

For example, it takes from the Proof of Work protocol used by bitcoin, without the high energy consumption, as only a very small sample of miners are chosen to perform the 'work', which is linear and cannot be parallelized, hence a node with a higher computing power have no edge over a node with limited resources. Every slot, a miner performs a small computation to check if it is among a list of workers to vote on the previous block and also produce the next block. If selected, it submits a vote on the previous block, and runs a certain amount of sequential computation to generate a random number. The first voter whose number matches the set block difficulty is eligible to produce the block for that slot.

It also borrows from the proof of stake network, but without the centralizing effects. In the PoS protocol, miners stake a large amount of tokens to be able to participate in the block production process and also earn a reward, and the nodes can withdraw their stake anytime. But in XPoT, the stake is a tiny non-refundable amount that gives the node access to a virtual miner. Also there is a concept of voting (attestations) but unlike in PoS where blocks need two-third of all votes to be confirmed, votes in XPoT play a different role; they add 'weight' to a block, as there could be multiple miners in a slot (this promotes liveliness and a measure against centralization), and voters and miners are incentivized to follow the most voted chain since their rewards are tied to the average weight (total weight divided by block height) of the chain they vote for or extend. Miners are penalized if they vote or extend a bad/malicious block.

As mentioned earlier, XPoT makes use of sequential computations to select the miner for a block, this is done through a 'Verifiable Delay Function', which is used in all Proof of Time blockchains like Chia. VDFs are hard to compute, but easy to verify. For example, it can take 10s to run a VDF and generate a proof, while taking less than a second to verify that proof. The VDF used in the XPoT protocol is the slothVDF which employs the use of modular square roots, the technical details and reason for choosing this VDF is beyond the scope of this introduction, and will be outlined in the upcoming Cowri Black Paper.



## Why?

Why build a blockchain client in Javascript, given the overhead, the lack of type safety and several quirks of javascript?

Currently, about 66% of all developers worldwide are Javascript developers. Read that again. While platforms like Ethereum and Solana opened up the blockchain ecosystem through the introduction of smart contracts enabling millions of developers to partake in the blockchain and cryptocurrency industry. A Javascript-first blockchain will bring millions more into the ecosystem, and we hope to achieve that through the implementation of Cowri dumb contracts, which are smart contracts written in javascript, but with safety nets and certain limitations.

Finally, I leave you with the words of a wise man, and co-founder of Stack Exchange:

> *"Any application that can be written in JavaScript, will eventually be written in JavaScript." - Jeff Atwood*


## Contribution

This project started late July 2024, and there is still so much work to be done. We will be posting work tasks and contribution guidelines in the coming days. We encourage all Javascript developers who wants to contribute to the code to do so. Also find below our crypto wallet addresses for those who wish to support our efforts financially.

> Bitcoin: bc1qw6lja7ee4540z5jy8lthwhur6eemth7h9p2jqp
> 
> Ethereum: 0xD9667D8c6dED8935EE9Ed2F45eCBE8A62D41Ae99
> 
> Solana: CRAirJfJFRZNqCtyqssCmcW4QKRxb6993WxxNDcurAjG
>
> Dogecoin: D6d2rZSe1AFzqauEv6oA8Xqvv8bMArvY3C
