const client = require("../index.js")

function getPrefix(id){
  client.mongo.Guilds.findOne({_id: id }, function(erro, db){
    if(db){
      return db.prefix;
    }else{
      return "!";
    }
  })
}

module.exports = getPrefix