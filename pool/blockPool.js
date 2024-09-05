
export function getBlock(store, hash) {
    return store.blocks.get(hash);
}


export function addBlock(store, block) {
    // add block
    block.status = 'valid';
    const { index, hash } = block;
    store.blocks.set(hash, block);
    store.temp.has(hash) && store.temp.delete(hash);
    // update chain 
    const blocks = store.chain.get(index) ?? [];
    if (blocks.includes(hash)) return;
    blocks.push(hash);
    store.chain.set(index, blocks);
}


export function hasBlock(store, hash) {
    return store.blocks.has(hash) || store.temp.has(hash);
}


export function forEachBlock(store, cb) {
    return store.blocks.forEach(cb);
}


export function getBlockByIndex(store, index) {
    const blocks = [];
    store.blocks.forEach(block => {
        if (block.index === index) blocks.push(block);
    })
    //TODO: check in state db if block is above a certain height
    return blocks.pop(); 
}


export function getDenaryXSig(store, index) {
    const blocks = [];
    store.blocks.forEach(block => {
        if (block.index === index - 10) blocks.push(block);
    })
    const denaryXSig = blocks.pop().xSignature;
    return denaryXSig;
}


export function getMostVotedParent(store, index) {
    const blocks = [];
    store.blocks.forEach(block => {
        if (block.index === index - 1) blocks.push(block);
    })
    const mvp = blocks.sort((a, b) => b.votes.length - a.votes.length)[0];
    return mvp;
}
