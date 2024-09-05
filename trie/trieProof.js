import { getTrieDBKeys, searchTrie } from "./trie.js";
import {
    createLeaf,
    isSameLeaf,
    isLeaf,
    calcMembership,
    calcMembers,
    nodeHash
} from "./node.js";
import {
    createBinTree,
    getMerklePath,
    getHash,
    isHexStr
} from "../util/index.js";


export async function getTrieProof(accKey, accHash) {
    const leaf = createLeaf(accKey, accHash);
    const dbKeys = getTrieDBKeys(accKey).reverse();
    const path = await searchTrie(dbKeys);
    const node = path.at(-1)?.node;
    const proof = {}
    proof.type = isSameLeaf(leaf, node) ? 1 : 0;
    proof.root = path.at(0)?.node.value;
    proof.value = isLeaf(node) ? path.pop().node.value : node.key.find(e => e);
    proof.body = path.reverse().map((e, i) => {
        const tree = createBinTree(e.node.key.filter(e => e));
        const childVal = i ? path[i - 1].node.value : proof.value;
        const location = tree[0].indexOf(childVal);
        const merklePath = getMerklePath(tree, location);
        const membership = calcMembership(e.node);
        const parity = location % 2 ? 1 : 0;
        return [...merklePath, membership, parity];
    });
    return proof;
}


export function verifyTrieProof(proof, accKey, accHash, stateRoot) {
    if (!isValidTrieProof) return false;
    const { type, root, value, body } = proof;
    const leaf = createLeaf(accKey, accHash);
    const membership = body[0].at(-2);
    const members = calcMembers(membership);
    const position = parseInt(getHash(accKey)[body.length - 1], 16);
    const occupied = members[position] ? true : false;
    const present = value === nodeHash(leaf);
    if (!!type !== (present && occupied)) return false;
    const computedRoot = body.reduce((ac, el) => {
        const parity = el.pop();
        const membership = el.pop();
        const merkleRoot = el.reduce((a, e, i) => {
            return getHash(!i && parity ? e + a : a + e);
        }, ac);
        return getHash(merkleRoot + membership);
    }, value);
    if (computedRoot !== root) return false;
    if (stateRoot && stateRoot !== root) return false;
    return true;
}


export function isValidTrieProof(proof) {
    const { type, root, value, body } = proof;
    return (type === 1 || type === 0)
        && isHexStr(root, value)
        && Array.isArray(body)
        && body.every(e => {
            return typeof e.parity === 'number'
                && isHexStr(e.membership)
                && Array.isArray(e.merklePath)
                && e.merklePath.every(isHexStr)
        })
}
