import fs from "fs"


export const config = createConfig();


export function checkConfig(config) {
    return config.PRIVATE_KEY
        && config.ADDRESS
}


function createConfig() {
    const path = './config.json';
    const encoding = 'utf-8'
    const opts = JSON.parse(fs.readFileSync(path, { encoding }));
    const defaults = getDefaults();

    const config = {}
    config.PRIVATE_KEY = opts.PRIVATE_KEY;
    config.ADDRESS = opts.ADDRESS;
    config.NETWORK_ID = opts.NETWORK_ID ?? defaults.NETWORK_ID;
    config.LOG_LEVEL = opts.LOG_LEVEL;
    config.PRIME_NUMBER = defaults.PRIME_NUMBER;
    config.VDF_ITERATIONS = defaults.VDF_ITERATIONS;
    config.BLOCK_TIME = defaults.BLOCK_TIME;
    config.BLOCK_DIFFICULTY = defaults.BLOCK_DIFFICULTY;
    config.BLOCK_MEMO = opts.BLOCK_MEMO;
    return config;
}


function getDefaults() {
    return Object.freeze({
        NETWORK_ID: 'c5',
        PRIME_NUMBER: 4082703715424098303599323992063184135094806911865676852957083160146845595338953052072703361860355283n,
        VDF_ITERATIONS: 1000,
        BLOCK_DIFFICULTY: 3,
        BLOCK_TIME: 40, // 40 xCount
    })
}
