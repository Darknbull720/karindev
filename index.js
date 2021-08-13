//Dependencias
const {Intents, Client} = require("discord.js")
const Database = require("@replit/database")
const fs = require('fs');
const glob = require('glob')
const colors = require('colors')
const client = new Client({ intents: [
  Intents.FLAGS.GUILD_VOICE_STATES,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  Intents.FLAGS.GUILDS,
]});

const config = require('./config.json');

//Variaveis
client.config = config;
client.config = process.env;
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.rDatabase = require("@replit/database");
client.mongo = require('./Banco/mongo.js');
client.getPrefix = require("./functions/getPrefix.js")

//Handlers
//1. Handler de Eventos
//2. Handler de Comandos
fs.readdir("./events/", (error, files) => {
  if(error) return reportError(error);
  const eventsFiles = files.filter(file => file.split(".").pop() == "js");
  if(eventsFiles.length <= 0) return console.log(colors.brightBlue("[EVENTOS] - Não existem eventos para ser carregado"));
  console.log(colors.brightBlue("[EVENTOS] - Carregados os eventos"));
  eventsFiles.forEach((file, i) => {
      require("./events/" + file);
  });
});

glob(__dirname+'/commands/*/*.js', function (er, files) {
    if(er) return reportError(error);
    files.forEach(f => {
        let props = require(`${f.replace('.js', '')}`)
        client.commands.set(props.help.name, props);
        props.help.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
        });
        })
    console.log("[COMANDOS] - Carregados com sucesso".brightBlue)
})

//Exportações
module.exports = {
  client
}

//Login
client.login(proces.env.token)