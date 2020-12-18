// Node Logging Using Winston
const winston = require("winston");

const logger = new winston.createLogger({
  transports: [
    new winston.transports.Console({
      timestamp: new Date().toISOString(),
      colorize: true,
    }),
  ],
});

module.exports = logger;
