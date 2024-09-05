
export function addTx(store, tx) {
  store.transactions.set(tx.hash, tx);
}


export function hasTx(store, hash) {
  return store.transactions.has(hash) || store.temp.has(hash);
}


export function getTx(store, hash) {
  return store.transactions.get(hash);
}


export function forEachTx(store, cb) {
  return store.transactions.forEach(cb);
}
