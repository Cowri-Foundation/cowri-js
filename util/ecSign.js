import el from 'elliptic'; const ec = new el.ec("secp256k1");
import { getHash } from './util.js';


export function sign(key, msg) {
    const signature = key.sign(msg);
    return {
        r: signature.r.toString('hex'),
        s: signature.s.toString('hex'),
        v: signature.recoveryParam
    }
}


export function verifySignature(msg, signature) {
    const keyPair = keyFromSig(msg, signature);
    return keyPair.verify(msg, signature);
}


export function keyFromSig(msg, signature) {
    const result = ec.recoverPubKey(
        BigInt('0x' + msg).toString(),
        signature,
        signature.v)
    const keyPair = ec.keyFromPublic(result);
    return keyPair;
}


export function pubFromKey(keyPair) {
    const pubKey = keyPair.getPublic("hex");
    return pubKey;
}


export function addressFromSig(msg, signature) {
    const keyPair = keyFromSig(msg, signature);
    const address = addressFromKey(keyPair);
    return address;
}


export function addressFromPub(pubKey) {
    const input = pubKey.slice(2);
    const address = getHash(Buffer.from(input, "hex")).slice(-40);
    return address;
}


export function addressFromKey(keyPair) {
    const pubKey = keyPair.getPublic().encode("hex").slice(2);
    const address = getHash(Buffer.from(pubKey, "hex")).slice(-40);
    return address;
}
