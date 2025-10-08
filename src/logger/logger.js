const colors = require("ansi-colors")

class Logger {
    getFormattedDate = () => {
        return new Date().toLocaleString('en-US', {
            timeZone: 'America/New_York',
            hour12: false
        });
    }

    log = (message) => {
        console.log(colors.greenBright.bold(this.getFormattedDate() + " - [INFO] " + message));
    }

    warn = (message) => {
        console.log(colors.yellowBright.bold(this.getFormattedDate() + " - [WARN] " + message));
    }

    error = (message) => {
        console.log(colors.redBright.bold(this.getFormattedDate() + " - [ERROR] " + message));
    }
}

module.exports = Logger;