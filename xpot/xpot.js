import workerpool from 'workerpool';
import {
    findVoteProofs,
    findBlockProof,
    verifyVoteProof,
    verifyBlockProof
} from './xProof.js';


const worker = workerpool.pool({
    workerType: 'thread',
    maxWorkers: 4
});


export async function isVoter(opts) {
    return worker.exec(findVoteProofs, [opts])
        .then(proofs => proofs)
        .catch(error => error)
}


export async function isMiner(opts, voteProofs) {
    return worker.exec(findBlockProof, [opts, voteProofs])
        .then(proofs => proofs)
        .catch(error => error)
}


export async function isValidVoteProof(opts) {
    return worker.exec(verifyVoteProof, [opts])
        .then(result => result)
        .catch(error => error)
}


export async function isValidBlockProof(opts) {
    return worker.exec(verifyBlockProof, [opts])
        .then(result => result)
        .catch(error => error)
}
