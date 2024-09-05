import { getHash, verifyEdSignature, config, hexToBin } from '../util/index.js';
import { computeVDF, verifyVDF } from './vdf.js';


export function findVoteProofs(opts) {
    const miners = [...Array(opts.minerCount + 1).keys()].slice(1);
    const proofs = miners.map(minerNumber => isVoter(minerNumber, opts));
    return proofs.filter(e => e);
}


function isVoter(minerNumber, opts) {
    const { minerKey, denaryXSig, difficulty, minerSign } = opts;
    const vXSig = minerSign(getHash(minerKey + minerNumber + denaryXSig));
    if (!hasDiff(vXSig, difficulty)) return false;
    return { vXSignature: vXSig, minerKey, minerNumber }
}


export function findBlockProof(opts, vProofs, xCount = 1) {
    if (opts.getMetrics().index > opts.index) return;
    const output = computeVDF(opts.input, xCount);
    opts.input = output;
    const blockProof = xCount >= 6 ? isMiner(opts, vProofs, xCount) : false;
    return blockProof ? blockProof : findBlockProof(opts, xCount + 1);
}


function isMiner(opts, voteProofs, xCount) {
    const res = []
    voteProofs.find(prf => {
        const xSignature = opts.minerSign(getHash(opts.input));
        if (!hasDiff(xSignature, config.BLOCK_DIFFICULTY)) return false;
        return res.push({ ...prf, xSignature, xCount, xTime: opts.input });
    })
    return res.pop();
}


export function verifyVoteProof(opts) {
    const { vote, miner, parent, denaryXSig } = opts;
    const { index, minerKey, minerNumber, voteXSig } = vote;
    // verify minerAddress & minerNumber 
    if (miner.count < minerNumber || miner.start > index) return false;
    // verify vote xSignature
    const msg = getHash(minerKey + minerNumber + denaryXSig);
    const isValidXSig = verifyEdSignature(minerKey, msg, voteXSig);
    if (!isValidXSig) return false;
    // verify vote difficulty
    const isValidDiff = hasDiff(voteXSig, parent.difficulty);
    if (!isValidDiff) return false;
    return true;
}


export function verifyBlockProof(opts) {
    const { block, parent } = opts;
    const { minerKey, xCount, blockXSig, xTime } = block;
    // verify vote proof - must be a valid voter, to be eligible to mine
    const isValidVP = verifyVoteProof(opts);
    if (!isValidVP) return false;
    // verify xCount, should be less than 60 to avoid ddos
    if (xCount > 60) return false;
    // verify xTime
    const isValidXTime = verifyVDF(parent.xTime, xTime, xCount);
    if (!isValidXTime) return false;
    // verify block xSignature
    const msg = getHash(xTime);
    const isValidXSig = verifyEdSignature(minerKey, msg, blockXSig);
    if (!isValidXSig) return false;
    // verify block difficulty
    const isValidDiff = hasDiff(blockXSig, config.BLOCK_DIFFICULTY);
    if (!isValidDiff) return false;
    return true;
}


function hasDiff(signature, difficulty) {
    return hexToBin(signature).startsWith('0'.repeat(difficulty));
}