import el from 'elliptic'; const ed = new el.eddsa("ed25519");


export function edSign(key, msg) {
    const signature = key.sign(msg).toHex();
    return signature;
}


export function verifyEdSignature(pubKey, msg, signature) {
    const keyPair = ed.keyFromPublic(pubKey);
    const isValid = keyPair.verify(msg, signature);
    return isValid;
}


export function edKeyFromPub(pubKey) {
    const keyPair = ed.keyFromPublic(pubKey);
    return keyPair;
}
