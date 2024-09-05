// Sloth Verifiable Delay Funtion

import { config } from '../util/index.js';
const { 
    PRIME_NUMBER: prime, 
    VDF_ITERATIONS: iterations 
} = config;


export function computeVDF(input, xCount) {
    const looper = [...new Array(iterations).keys()]
    const exponent = (prime + 1n) / 4n;
    const start = xCount === 1 ? BigInt(input) % prime : input;
    return looper.reduce(ac => bexmod(ac, exponent, prime), start);
}


export function verifyVDF(input, output, xCount) {
    const looper = [...new Array(iterations * xCount).keys()]
    const value = looper.reduce(ac => BigInt(ac * ac) % prime, output);
    input %= prime;
    return input === value || prime - input === value;
}


function bexmod(base, exponent, modulus, result = 1n) {
    if (exponent === 0n) return result;
    return bexmod(
        (base * base) % modulus,
        exponent >> 1n,
        modulus,
        exponent & 1n ? (result * base) % modulus : result
    );
}
