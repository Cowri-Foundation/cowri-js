// LOGGER MODULE: Implements the logging function

import pino from 'pino';
import { config } from './util/config.js';


const transport = pino.transport({
  targets: [
    {
      level: 'warn',
      target: 'pino/file',
      options: {
        translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
        ignore: "pid,hostname",
        destination: `./db/log/error.log`,
        mkdir: true
      }
    },
    {
      level: config.LOG_LEVEL,
      target: 'pino-pretty',
      options: {
        translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
        ignore: "pid,hostname"
      }
    }]
})


const log = pino({
  level: config.LOG_LEVEL,
  //timestamp: pino.stdTimeFunctions.isoTime,
},
  transport
)


export default log;