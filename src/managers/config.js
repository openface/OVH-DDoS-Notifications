const { readFileSync } = require("fs")
const { load } = require("js-yaml");

const config = load(readFileSync("./config.yml", "utf-8"));

module.exports = config;