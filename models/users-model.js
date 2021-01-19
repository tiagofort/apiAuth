const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nome: String,
    userName: String,
    password: String,
    ativo: Boolean,
    email: String
})

const usuario = mongoose.model("usuarioteste-model", usuarioSchema);
module.exports = usuario;