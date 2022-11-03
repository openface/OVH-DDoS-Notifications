const colors = require("ansi-colors")

class Logger {
    log(message) {
        console.log(colors.greenBright.bold(new Date().toLocaleString('es-ES') + " - [INFO] " + message));
    }
    warn(message) {
        console.log(colors.yellowBright.bold(new Date().toLocaleString('es-ES') + " - [WARN] " + message));
    }
    error(message) {
        console.log(colors.redBright.bold(new Date().toLocaleString('es-ES') + " - [ERROR] " + message));
    }
}

module.exports = Logger;