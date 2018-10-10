const fs = require("fs-extra");
const path = require("path");

const _ = require("lodash");

const argsConfigPath = path.resolve(__dirname, '../../config.json');
let config = {};

if (fs.existsSync(argsConfigPath)) {
    config = JSON.parse(fs.readFileSync(argsConfigPath, 'utf8'));

    _.forOwn(config, (value, key) => {
        config[_.camelCase(key)] = config[key];
    })
}

config.http = {};
config.http.port = config.httpPort || 8080;

config.mail = {};
config.mail.gmailAcc = config.gmailAcc;
config.mail.gmailPass = config.gmailPass;

global.CONF = config;
module.exports = config;
