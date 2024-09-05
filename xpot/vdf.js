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












/**   

export function computeVDF2(input) {
    const exponent = (prime + 1n) / 4n;
    let output = BigInt(input) % prime;
    for (let i = 0n; i < iterations; ++i) {
        output = bexmod(output, exponent, prime);
    }
    return output;
}


export function verifyVDF2(input, output) {
    const iter = (output, i) => i >= iterations ? output : iter(BigInt(output * output) % prime, i + 1n);
    const finalOutput = iter(output, 0n);
    input %= prime;
    return input === finalOutput || prime - input === finalOutput;
}


export function bexmod2(base, exponent, modulus) {
    let result = 1n; 
    for (; exponent > 0n; exponent >>= 1n) {
        if (exponent & 1n) {
            result = (result * base) % modulus;
        }
        base = (base * base) % modulus;
    }
    return result;
}


export function verifyVDF2(output, input) {
    for (let i = 0n; i < iterations; ++i) {
        output = BigInt(output * output) % prime; 
    }
    input %= prime;
    return input === output || prime - input === output;
}


export function _computeVDF (input) {
    if (cache.has(input)) return cache.get(input);
    const exponent = (prime + 1n) / 4n;
    const bexmod = (base, exponent, modulus, result = 1n) => {
        if (exponent === 0n) return result;
        return bexmod(
            (base * base) % modulus,
            exponent >> 1n,
            modulus,
            exponent & 1n ? (result * base) % modulus : result
        );
    }
    const iter = (output, i) => i >= iterations ? output : iter(bexmod(output, exponent, prime), i + 1n);
    const result = iter(BigInt(input) % prime, 0n);
    cache.set(input, result);
    return result;
}

*/

