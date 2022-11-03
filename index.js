const Logger = require("./src/logger/logger");
const config = require("./src/managers/config");
const checkMitigation = require("./src/functions/check");
const ms = require("ms");
const { log } = new Logger();

for (const ip of config.ips) {
    checkMitigation(ip.ipAddress, ms(ip.checkInterval))
    log(`Started check interval task for IP: ${ip.ipAddress}. Scheduled every ${ip.checkInterval} (${ms(ip.checkInterval)}ms)`)
}
