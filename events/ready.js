const Discord = require("discord.js")
const {client} = require("../index.js");
const mongo = require("../Banco/mongo.js")
const package = require('../package.json');
const moment = require("moment");
moment().locale("pt-br")

client.on("ready", () => {
  console.log(`[Sleepy]: Ready, running on version ${package.version}`);
})