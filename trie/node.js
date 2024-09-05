import { Level } from "level";
import { 
    getHash, 
    getMerkleRoot, 
    binToHex, 
    hexToBin, 
    config,
    createLRUMap,
    hexToBytes,
    bytesToHex,
    NodeMessage
} from "../util/index.js";
import log from "../logger.js";


const trieDB = new Level('./db/trie',  { valueEncoding: 'view' })
export const cache = createLRUMap(20000);


export async function fetchNode(dbKey, mapDB) {
    if (mapDB) return mapDB.get(dbKey);
    if (cache.has(dbKey)) return cache.get(dbKey);
    try {
        const retrieved = await config.TRIE_DB.get(dbKey);
        const value = decodeNode(retrieved);
        cache.set(dbKey, value);
        return value;
    } catch (error) {
        // do nothing! it's expected to encounter empty nodes
    }
}


export async function putNode(dbKey, node, mapDB) {
    if (mapDB) return mapDB.set(dbKey);
    try {
        const encoded = encodeNode(node);
        // @ts-ignore
        await trieDB.put(dbKey, encoded);
        cache.set(dbKey, node);
    } catch (error) {
        log.warn(`Unable to persist db record: ${error}`);
    }
}


function encodeNode(node) {
    if (!isNode(node)) return false;
    const n = {}
    n.key = node.key.map(hexToBytes);
    n.value = hexToBytes(node.value);
    const bytes = NodeMessage.encode(n).finish();
    return bytes ? bytes : false;
}


function decodeNode(bytes) {
    try {
        const n = NodeMessage.decode(bytes);
        const node = {}
        node.key = n.key.map(bytesToHex);
        node.value = bytesToHex(n.value);
        return node;
    } catch (error) {
        log.warn(error);
    }
}


export function createLeaf(accKey, accHash) {
    return { key: [accKey, accHash], value: getHash(accKey + accHash) };
}


export function createBranch() {
    return { key: new Array(16).fill(''), value: '' };
}


export function isNode(node) {
    return node && Array.isArray(node.key) 
    && (node.key.length === 16 || node.key.length === 2);
}


export function isLeaf(node) {
    return node && Array.isArray(node.key) && node.key.length === 2;
}


export function isBranch(node) {
    return node && Array.isArray(node.key) && node.key.length === 16;
}


export function isSameLeaf(a, b) {
    return isLeaf(a) && isLeaf(b)
        && a.key[0] === b.key[0] && a.value === b.value;
}


export function isSameAcc(a, b) {
    return isLeaf(a) && isLeaf(b)
        && a.key[0] === b.key[0];
}


export function nodeHash(node) {
    if (isLeaf(node)) return getHash(node.key[0] + node.key[1]);
    if (!isBranch(node)) return;
    const mRoot = getMerkleRoot(node.key.filter(child => child));
    const members = node.key.map(child => child ? 1 : 0).join('');
    const membership = binToHex(members);
    return getHash(mRoot + membership);
}


export function calcMembership(node) {
    if (!isBranch(node)) return;
    const members = node.key.map(e => e ? 1 : 0).join('');
    const membership = binToHex(members);
    return membership;
}


export function calcMembers(membership) {
    const mb = hexToBin(membership);
    const members = mb.split('').map(Number);
    return members;
}
