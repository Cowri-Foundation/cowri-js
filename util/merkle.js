import { getHash } from "./util.js";


// Binary Merkle Tree Root
export function getMerkleRoot(hashes) {
    return createBinTree(hashes).at(-1).at(0);
}


// computes a Compact Binary Tree for an array of hashes
export function createBinTree(hashes, tree = [hashes]) {
    const parent = [];
    hashes.forEach((e, i, arr) => {
        if (i % 2) return parent.push(getHash(arr[i - 1] + e));
        if (i === arr.length - 1) parent.push(getHash(e + e));
    })
    tree.push(parent);
    return parent.length > 1 ? createBinTree(parent, tree) : tree;
}


export function createBinTree2(hashes, tree = [hashes]) {
    const parent = hashes.map((e, i, arr) => {
        if (i % 2) return getHash(arr[i - 1] + e);
        if (i === arr.length - 1) return getHash(e + e);
    }).filter(e => e);
    tree.push(parent);
    return parent.length > 1 ? createBinTree(parent, tree) : tree;
}


export function getMerklePath(tree, loc) {
    const merklePath = [];
    tree.forEach((e, i, arr) => {
        if (i === arr.length - 1) return;
        const end = e.length - 1;
        const hash = loc % 2 ? e[loc - 1] : loc < end ? e[loc + 1] : e[loc];
        merklePath.push(hash);
        loc = Math.floor(loc / 2);
    })
    return merklePath;
}


export function getMerklePath2(tree, location) {
    return tree.map((e, i, arr) => {
        if (i === arr.length - 1) return;
        const end = e.length - 1;
        const loc = location;
        location = Math.floor(location / 2);
        return loc % 2 ? e[loc - 1] : loc < end ? e[loc + 1] : e[loc];
    }).filter(e => e);
}
