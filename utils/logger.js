// TODO - to be customized
// https://github.com/winstonjs/winston/tree/master/examples
// https://blog.risingstack.com/node-js-logging-tutorial/
const winston = require('winston')

module.exports = winston.createLogger({
  transports: [new winston.transports.Console()]
})
