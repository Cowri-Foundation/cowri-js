# C-TRIE

The C-Trie is a 16-Ary trie, that maps accounts such as addresses, contracts and miner keys to their values (or more precisely, hash of their values), while making it efficient to compute a single 32 byte root from all those values.

The trie makes it possible for mobile devices to participate in block production and verification, as they do not need to store the full blockchain state, but can request only the needed account data and trie proofs from a full client, and verify the data is accurate using only the state root from the previous block.

The C-Trie is similar to the Merkle-Patricia trie used by the Ethereum blockchain, except for a few small differences:
1. The c-trie is 16-ary, as in the branches in the trie point to 16 other children, while the branch value is derived using a binary (2-ary) merkle tree.
2. The c-trie, unlike under trie implementations enable both proof of presence of a key value pair, as well as proof of absence if the pair is not in the trie. This is possible because of the use of membershib bits in deriving the value of a branch node.
