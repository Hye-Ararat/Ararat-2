#! /usr/bin/env node
const yargs = require("yargs")
const options = yargs
.option("l", {alias:"language", describe: "Translate to language", type: "string", demandOption: false })
.option("s", {alias:"sentence", describe: "Sentence to be translated", type: "string", demandOption: false })
.argv;
console.log("e")