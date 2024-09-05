import sha3 from "js-sha3"; const { keccak256 } = sha3;
import { dataCode } from "./dataCodes.js";
import os from 'os';
import log from '../logger.js';



export function getHash(message) {
    return keccak256(message);
}


export function isNumber(...args) {
    return args.every(a => typeof a === 'number');
}


export function isBytes(...args) {
    return args.every(a => a instanceof Uint8Array && a.length > 1);
}


export function isHexStr(...args) {
    const cb = (string) => !/[^a-fA-F0-9]/u.test(string);
    return args.every(a => typeof a === 'string' && cb(a));
}


export function isBinStr(...args) {
    const cb = (string) => /^(?:[01]{4})+$/.test(string);
    return args.every(a => typeof a === 'string' && cb(a));
}


export function isAddress(...args) {
    const cb = (string) => /^[0-9a-fA-F]{40}$/.test(string);
    return args.every(a => typeof a === 'string' && cb(a));
}


export function isHash(...args) {
    const cb = (string) => /^[0-9a-fA-F]{64}$/.test(string);
    return args.every(a => typeof a === 'string' && cb(a));
}


export function isHandshake(type) {
    return type === dataCode.HANDSHAKE;
}


export function isTransaction(type) {
    return type === dataCode.TRANSACTION;
}


export function isChainData(type) {
    return type === (
        dataCode.TRANSACTION
        || dataCode.VOTE
        || dataCode.REPORT
    )
}


export function stripZeros(string) {
    if (typeof string !== 'string') return;
    return string.replace(/^0+/, '');
}


export function getPoolParams(isBlock) {
    const poolParams = { waitList: 0, expiry: 0, peer: '' }
    if (!isBlock) return poolParams;
    return { ...poolParams, attestors: [] }
}


export function PoolParams(isBlock) {
    this.signature = '';
    this.hash = '';
    this.raw = new Uint8Array();
    this.type = 0;
    this.waitList = 0;
    this.peer = '';
    if (!isBlock) return this;
    this.attestors = [];
}


export function checkCPU() {
    const numOfThreads = os.availableParallelism();
    if (numOfThreads < 3) {
        log.error('The minimum number of threads required to run this program is 3')
        return false;
    }
    return true;
}


export function encode(a) { a; return '' } //placeholder
export function decode(a) { a; return {} } //placeholder