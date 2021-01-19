const jwt = require("jsonwebtoken");
const chavePrivada = process.env.CHAVE_AUTENTICACAO;
const chavePrivadaRec = process.env.CHAVE_RECUPERACAO;

function verificarToken(req, res, next) {

    //JWT
    //Leitura dos header para verificar se tem o atributo authorization
    if (typeof req.headers.authorization !== "undefined") {

        //Dentro do atribuito authorization virá uma string como Bearer <Token>
        //fazemo split para obter apenas o token
        var token = req.headers.authorization.split(" ")[1]
        try {
            //Pedimos par ao JWT verificar se o token é valido
            var decoded = jwt.verify(token, chavePrivada);

            //Imprimios o usuário que foi utilizado na hora da geração do toke pela rota de cadastro
            console.log("usuario:" + decoded.userName);
            //res.sendStatus(403)
            console.log("Vericando token, está OK")
            next()
        } catch (e) {
            res.sendStatus(403)
        }

    } else {
        res.sendStatus(403)
    }
}

function verificarTokenRec(req, res, next) {

    //JWT
    //Leitura dos header para verificar se tem o atributo authorization
    if (typeof req.headers.authorization !== "undefined") {

        //Dentro do atribuito authorization virá uma string como Bearer <Token>
        //fazemo split para obter apenas o token
        var token = req.headers.authorization.split(" ")[1]
        try {
            //Pedimos par ao JWT verificar se o token é valido
            var decoded = jwt.verify(token, chavePrivadaRec);

            //Imprimios o usuário que foi utilizado na hora da geração do toke pela rota de cadastro
            console.log("usuario:" + decoded.userName + " permissões: " + decoded.permissions);
            //res.sendStatus(403)
            console.log("Vericando token, está OK")
            next()
        } catch (e) {
            res.sendStatus(403)
        }

    } else {
        res.sendStatus(403)
    }
}

function criarToken(dados) {
    console.log("id: "+dados)
    return jwt.sign(dados, chavePrivada);
}

function criarTokenRecSenha(dados){
    return jwt.sign(dados, chavePrivadaRec, {
           expiresIn: 600
    });
}

module.exports = {
    verificarToken: verificarToken,
    verificarTokenRec: verificarTokenRec,
    criarToken: criarToken,
    criarTokenRecSenha: criarTokenRecSenha
};