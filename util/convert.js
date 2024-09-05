import { isBinStr, isHexStr } from "./util.js";


const hexBinMap = {
    '0': '0000',
    '1': '0001',
    '2': '0010',
    '3': '0011',
    '4': '0100',
    '5': '0101',
    '6': '0110',
    '7': '0111',
    '8': '1000',
    '9': '1001',
    'A': '1010',
    'B': '1011',
    'C': '1100',
    'D': '1101',
    'E': '1110',
    'F': '1111',
    '0000': '0',
    '0001': '1',
    '0010': '2',
    '0011': '3',
    '0100': '4',
    '0101': '5',
    '0110': '6',
    '0111': '7',
    '1000': '8',
    '1001': '9',
    '1010': 'A',
    '1011': 'B',
    '1100': 'C',
    '1101': 'D',
    '1110': 'E',
    '1111': 'F'
}


export function hexToBin(hex) {
    if (!isHexStr) return;
    return hex.toUpperCase().split('').map(e => hexBinMap[e]).join('');
}


export function binToHex(bin) {
    if (!isBinStr(bin)) return;
    const nibbles = bin.match(/.{1,4}/g);
    return nibbles.map(nib => hexBinMap[nib]).join('');
}


export function bigIntToBytes(number) {
    if (typeof number !== 'bigint') return;
    const bytes = hexToBytes(number.toString(16));
    return bytes;
}


export function bytesToBigInt(bytes) {
    if (!(bytes instanceof Uint8Array)) return;
    const hex = bytesToHex(bytes);
    const withPrefix = '0x' + hex;
    return BigInt(withPrefix);
}


export function bytesToHex(bytes) {
    if (!(bytes instanceof Uint8Array)) return;
    // Convert each byte to hexadecimal and join them into a string
    const arr = Array.from(bytes);
    const hex = arr.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hex[0] === '0' ? hex.slice(1) : hex;
}


export function hexToBytes(hex) {
    if (!isHexStr(hex)) return;
    hex = hex.length % 2 ? `0${hex}` : hex;
    // Split the string into pairs/bytes
    const byteArray = hex.match(/.{1,2}/g) ?? [];
    const bytes = Uint8Array.from(byteArray.map(byte => parseInt(byte, 16)));
    return bytes;
}


export function hexToBigInt(hex) {
    return BigInt(`0x${hex}`);
}


export function utf8ToBytes(string) {
    if (typeof string !== 'string') return;
    const encoded = new TextEncoder().encode(string);
    const bytes = Uint8Array.from(encoded);
    return bytes;
}


export function bytesToUtf8(bytes) {
    if (!(bytes instanceof Uint8Array)) return;
    const string = new TextDecoder().decode(bytes);
    return string;
}


export function utf8ToHex(string) {
    if (typeof string !== 'string') return;
    const chars = Array.from(string);
    return chars.map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join('');
}


export function hexToUtf8(hex) {
    if (!isHexStr(hex)) return;
    return decodeURIComponent(hex.replace(/../g, '%$&'));
}