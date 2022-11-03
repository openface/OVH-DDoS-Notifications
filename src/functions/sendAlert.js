const axios = require("axios");
const config = require("../managers/config");

async function sendAlert(mode, ipAddress) {
    let embeds;

    mode ? embeds = [ config.messages["mitigation-enabled"] ] : embeds = [ config.messages["mitigation-disabled"] ];

    await axios(
        {
            method: "POST",
            url: config.webhook.webhookURL,
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify({ embeds }).replaceAll(/{ipAddress}/g, ipAddress)
        }
    )
    .catch(e => {
        console.log(e)
    })
}

module.exports = sendAlert;