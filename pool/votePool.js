
export function addVote(store, vote) {
  // add vote
  vote.status = 'valid';
  const { hash, blockHash } = vote;
  store.votes.set(hash, vote);
  store.temp.has(hash) && store.temp.delete(hash);
  // update voted block
  const block = store.blocks.get(blockHash);
  block && block.votes.push(hash);
  store.blocks.set(hash, block);
}


export function hasVote(store, hash) {
  return store.votes.has(hash) || store.temp.has(hash);
}


export function getVote(store, hash) {
  return store.votes.get(hash);
}


export function forEachVote(store, cb) {
  return store.votes.forEach(cb);
}
