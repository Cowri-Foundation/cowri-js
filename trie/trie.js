import { contractHash } from "../state/account/contract.js";
import { minerHash } from "../state/account/miner.js";
import { userHash } from "../state/account/user.js";
import { getHash } from "../util/index.js";
import {
    createLeaf,
    createBranch,
    isLeaf,
    isBranch,
    isSameLeaf,
    isSameAcc,
    fetchNode,
    putNode,
    nodeHash,
    isNode
} from "./node.js";


export async function createTrie(accounts) {
    const { user, contract, miner } = accounts;
    const trie = { db: new Map(), root: '' }
    const all = [];
    user.forEach((acc, key) => all.push([key, userHash(acc)]));
    contract.forEach((acc, key) => all.push([key, contractHash(acc)]));
    miner.forEach((acc, key) => all.push([key, minerHash(acc)]));
    all.forEach(async ([key]) => trie.db.set(key, await searchTrie(key)));
    trie.root = trie.db.get(all[0][0])[0][0];
    return trie;
}


export async function addToTrie(accKey, accHash) {
    const leaf = createLeaf(accKey, accHash);
    const dbKeys = getTrieDBKeys(accKey).reverse();
    const path = await searchTrie(dbKeys);
    await updateTrie(leaf, path);
}


export async function searchTrie(dbKeys, path = []) {
    const dbKey = dbKeys.pop();
    const node = await fetchNode(dbKey);
    if (isNode(node)) path.push({ dbKey, node });
    return isBranch(node) ? await searchTrie(dbKeys, path) : path;
}


async function updateTrie(leaf, path) {
    const node = path.at(-1)?.node;
    if (!node || isBranch(node)) return await insertLeaf([leaf], path);
    if (!isLeaf(node) || isSameLeaf(leaf, node)) return;
    const leaves = handleCollision(leaf, node, path);
    await insertLeaf(leaves, path);
}


async function insertLeaf(leaves, path) {
    const last = path.at(-1);
    if (!last) return await putNode('0', leaves[0]);
    leaves.forEach(leaf => {
        const dbKey = getTrieDBKeys(leaf.key[0])[last.dbKey.length];
        path.push({ dbKey, node: leaf });
    })
    path.reverse().forEach(({ dbKey, node }, i) => {
        const pos = parseInt(dbKey.at(-1), 16);
        const parent = isLeaf(node) ? last.node : path[i + 1]?.node;
        node.value = nodeHash(node);
        if (isBranch(parent)) parent.key[pos] = node.value;
    })
    await Promise.all(path.map(e => putNode(e.dbKey, e.node)));
}


function handleCollision(leaf, node, path) {
    path.pop();
    if (isSameAcc(leaf, node)) return [leaf];
    const keys1 = getTrieDBKeys(leaf.key[0]);
    const keys2 = getTrieDBKeys(node.key[0]);
    keys2.find((dbKey, i) => {
        if (i < path.length) return false;
        if (dbKey !== keys1[i]) return true;
        path.push({ dbKey, node: createBranch() });
    })
    return [leaf, node];
}


export function getTrieDBKeys(accKey) {
    const arr = ['0', ...getHash(accKey)];
    const dbKeys = arr.map((e, i, a) => a.slice(0, i + 1).join(''));
    return dbKeys;
}


// INFO: Account Keys are hashed to get the trie path
// This is to accomodate keys of different size in the same trie
// E.g, length of userAddress = 40, minerKey = 64, contractID = 64
// The hashing is done in getTrieDBKeys and verifyTrieProof functions
// remove hashing when testing handleCollision function