import { checkCPU, checkConfig, config } from './util/index.js'
import { createClient } from './node/client.js';
import log from './logger';


(function startClient() {
    if (!checkCPU) return log.error('You need a minimum of 3 cpu cores to run this program');
    if (!checkConfig) return log.error(`Fill all mandatory fields in the config.json file`);

    // check no cowri instance is running
    const { NETWORK_ID, ADDRESS } = config;
    const instance = NETWORK_ID + ADDRESS;
    if (globalThis.instance) {
        return log.warn('Cannot start a new instance while program is running');
    }

    // start and register the cowri client
    const cowri = createClient();
    globalThis.instance = cowri;
    cowri && cowri.start();
    log.info(`A new cowri node instance has started: ${instance}`);
})()