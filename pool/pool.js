// POOL MODULE
import { createLRUMap } from "../util";
import { 
  addBlock, 
  forEachBlock, 
  getBlock, 
  getBlockByIndex, 
  getDenaryXSig, 
  getMostVotedParent, 
  hasBlock 
} from "./blockPool";
import { addReport, hasReport, getReport, forEachReport } from "./reportPool";
import { addTx, hasTx, getTx, forEachTx } from "./txPool";
import { addVote, hasVote, getVote, forEachVote } from "./votePool";


export default (function createPool() {
  const store = createStore()
  const pool = {}
  pool.getMetrics = () => getMetrics(store)
  pool.updateMetrics = (block) => updateMetrics(store, block)
  pool.addTx = (tx) => addTx(store, tx)
  pool.hasTx = (hash) => hasTx(store, hash)
  pool.getTx = (hash) => getTx(store, hash)
  pool.forEachTx = (cb) => forEachTx(store, cb)
  pool.addBlock = (block) => addBlock(store, block)
  pool.hasBlock = (hash) => hasBlock(store, hash)
  pool.getBlock = (hash) => getBlock(store, hash)
  pool.forEachBlock = (cb) => forEachBlock(store, cb)
  pool.addVote = (vote) => addVote(store, vote)
  pool.hasVote = (hash) => hasVote(store, hash)
  pool.getVote = (hash) => getVote(store, hash)
  pool.forEachVote = (cb) => forEachVote(store, cb)
  pool.addReport = (report) => addReport(store, report)
  pool.hasReport = (hash) => hasReport(store, hash)
  pool.getReport = (hash) => getReport(store, hash)
  pool.forEachReport = (cb) => forEachReport(store, cb)
  pool.getBlockByIndex = (index) => getBlockByIndex(store, index)
  pool.getDenaryXSig = (index) => getDenaryXSig(store, index)
  pool.getMostVotedParent = (index) => getMostVotedParent(store, index)
  return pool;
})()


function createStore() {
  const store = {}
  store.chain = createLRUMap(100);
  store.blocks = createLRUMap(100);
  store.votes = createLRUMap(4000);
  store.reports = createLRUMap(1000);
  store.transactions = createLRUMap(20000);
  store.trash = createLRUMap(100);
  store.metrics = { index: 0, lastBlockTime: 0 }
  return store;
}


function getMetrics(store) {
  return store.metrics;
}


function updateMetrics(store, block) {
  store.metrics.index = block.index;
  store.metrics.lastBlockTime = block.timestamp;
}
