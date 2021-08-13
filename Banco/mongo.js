var mongoose = require("mongoose") // faz requisicao do mongoose
var config = require("../config.json")
var Schema = mongoose.Schema // só para deixar bonitinho
mongoose.connect(config.Banco.mongo, { // Onde pegamos o link, da conexão em Cluster
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(function () { // Caso Logue Corretamente
    console.log('\x1b[32m[CONSOLE] - Banco de dados foi ligado com sucesso!\x1b[0m');
}).catch(function (err) { // Caso de ERRO
    console.log('\x1b[31m[CONSOLE] - Banco de dados foi interrompido por:\n   '+err+'   \nme conserta ai mano.\x1b[0m');
});

var Guild = new Schema({
    _id: { type: Number, required: true },
    prefix: { type: String, default: "s!" },
    autorole: { type: Array, required: false },
})

var User = new Schema({
    _id: { type: Number, required: true },
    cmd: { type: String, default: "não" },
    parceiro: { type: Boolean, default: false },
    patrocinador: { type: Boolean, default: false },
    blacklist: { type: Boolean, default: false },
    premium: { type: Boolean, default: false },
})

var Guilds = mongoose.model("Guilds", Guild)
exports.Guilds = Guilds

var Users = mongoose.model("Users", User)
exports.Users = Users