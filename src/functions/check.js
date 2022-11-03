const Logger = require("../logger/logger")
const config = require("../managers/config");
const sendAlert = require("./sendAlert");
const { log, warn, error } = new Logger()
const ovh = require("ovh")({
    ...config.ovh
})

function checkMitigation(ipAddress, interval) {
    let ipOnMitigation = false;

    setInterval(async () => {
        await ovh.request("GET", `/ip/${ipAddress}/mitigation/${ipAddress}`, async (err, status) => {

            if(err) {
                if(err === 404) {
                    return;
                }

                return error(`OVH API returned this HTTP error: ${err}. Response: ${status}`);
            }
    
            if(status.permanent) {
                return warn(`Ignoring status for IP: ${ipAddress}, due to Mitigation Mode is set to permanent.`)
            }
    
            if(status.auto) {
    
                if(ipOnMitigation) {
                    return log(`Mitigation mode is still enabled for IP: ${ipAddress}`)
                }
    
                ipOnMitigation = true;
                await sendAlert(ipOnMitigation, ipAddress)
                log(`Mitigation mode is enabled on IP: ${ipAddress}. DDoS Attack detected!`)
            } else {
                if(!ipOnMitigation) return;

                ipOnMitigation = false;
                await sendAlert(ipOnMitigation, ipAddress)
                log(`Mitigation mode is no longer enabled on IP: ${ipAddress}. DDoS Attack has stopped!`)
            }
        });
    }, interval)
}

module.exports = checkMitigation;