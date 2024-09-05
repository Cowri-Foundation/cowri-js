import { dataCode } from "./dataCodes.js"


export const blockType = Object.freeze({
    index: 0,
    timestamp: 0,
    parentHash: '',
    difficulty: 0,
    rewardAddress: '',
    minerKey: '',
    minerNumber: 0,
    xSignature: '',
    xTime: 0,
    blockRoot: '',
    stateRoot: '',
    memo: '',
    votes: [],
    reports: [],
    transactions: [],
    signature: {},
    hash: '',
    type: dataCode.BLOCK,
    raw: new Uint8Array()
})


export const voteType = Object.freeze({
    index: 0,
    blockHash: '',
    rewardAddress: '',
    proof: {
        minerPubKey: '',
        minerNumber: 0,
        voteXSig: '',
    },
    signature: '',
    hash: '',
    type: dataCode.VOTE,
    raw: new Uint8Array()
})


export const userType = Object.freeze({ 
    nonce: 0n,
    balance: 0n,  
    contracts: [] 
})


export const contractType = Object.freeze({ 
    type: 0,
    id: '', 
    balance: 0n, 
    value: []
})


export const minerType = Object.freeze({ 
    nonce: 0n, 
    count: 0n, 
    start: 0n 
})


export const nullNode = {
    key: '',
    value: ''
}


export const branchType = Object.freeze({ 
    children: [], 
    location: '', 
    hash: ''
})