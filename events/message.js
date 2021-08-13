const Discord = require("discord.js");
const {client} = require("../index.js")
const mongo = client.mongo

client.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  if (message.webhookID) return;
  if (message.channel.type === 'dm') return;    
  const prefix = client.getPrefix(message.guild.id)
  const messageArray = message.content.split(" ")
  const command = messageArray[0].slice(prefix.length)
  const args = messageArray.slice(1)
  if(message.content.startsWith("<@!"+client.user.id+">")){
      message.channel.send("Olá meu prefix é `"+prefix+"`")   
  }
  if (message.mentions.has("@everyone")) return;
  if(!message.content.startsWith(prefix)) return
  let commandfile = client.commands.get(command) || client.commands.get(client.aliases.get(command))
  if(!commandfile){
      message.channel.send("Desculpe não reconheci esse comando...\nUse `"+prefix+"help` para ver meus comandos!")   
  }else{
    if(db2.cmd === "sim") return message.reply("Vai com calma aí!");
    db2.cmd = "sim"
    db2.save()
    commandfile.run(client, message, args, prefix) 
    setTimeout(() => {
      db2.cmd = "não"
      db2.save()
    }, 10000)
  }
})