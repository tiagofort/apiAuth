const usuarioModel = require("../models/users-model");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const jwt_token = require("../token/token.js");
const chavePrivadaRec = process.env.CHAVE_RECUPERACAO;
const chavePrivada = process.env.CHAVE_AUTENTICACAO;


class UsuarioController {

    static async recuperarSenha(req, res) {

        // Monta o filtro

        let filtro = {
            email: req.body.email,
            ativo: true
        };

        //Buscar usuario no banco 
        let lista = await usuarioModel.find(filtro);


        if (lista.length > 0) {
            let usuarioEncontrado = lista[0];

            let dadosToken = {
                id: usuarioEncontrado._id
            }

            // Gerar um Token
            let token = jwt_token.criarTokenRecSenha(dadosToken);
            //3) Gerar um Link com o token
            let link = `http://localhost:8080/changepass/?token=${token}`;
            //4)Enviar o link no email
            UsuarioController.enviarEmail(link, req.body.email).catch(console.error);
            res.send(link);


        } else {
            res.send("não encontrado");
        }


    }

    static async logar(req, res){
            const arrUsu = await usuarioModel.find({userName: req.body.userName});
            if(arrUsu.length > 0 && arrUsu[0].password == req.body.password && arrUsu[0].ativo == true){ 
                let dadosToken = {
                    id: arrUsu[0]._id
                }
                var token = jwt_token.criarToken(dadosToken);
                console.log("metodo logar:"+arrUsu);
                res.status(200).send({arrUsu,token})
            }else{
                console.log("Usuario não encontrado ou inativo")
                res.status(403).send("Usuario não encontrado ou inativo");  
            }
    }

    static async verificarToken(req, res) {

    }

    static async buscarPorEmail(req, res) {
        // Monta o filtro

        let filtro = {
            email: req.body.email
        };

        //Buscar usuario no banco 
        let lista = await usuarioModel.find(filtro);

        if(lista.length > 0){
           console.log("usuario encontrado")
           console.log(lista[0].email); 
        } else {
            console.log("usuario nao encontrado");
        }
    }

    static async ativar(req, res) {
        await usuarioModel.findByIdAndUpdate({_id: req.body._id}, {ativo: req.body.ativo})
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(403));
    }

    static async favoritar(req, res) {

    }

    static async getUserLogado(req, res) {
        let decoded = jwt.verify(req.body.token, chavePrivada);
        var userid = decoded.id;
        console.log("id getUser: "+ userid)
        const user = await usuarioModel.findById({ _id : userid});
        console.log(user)
        try {
            res.json(user);
          } catch (err) {
            res.status(500).send(err);
          }
    }

    static async alterarSenha(req, res) {
        let decoded = jwt.verify(req.body.token, chavePrivadaRec);
        var id = decoded.id;
        console.log(req.body.token);
        console.log(id);
        await usuarioModel.findByIdAndUpdate({_id: id}, {password: req.body.password})
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(403));  
    }

    static async enviarEmail(link, emailUsuario) {

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: process.env.NODEMAILER_SERVICE,
            auth: {
                user: process.env.NODEMAILER_USER, // generated ethereal user
                pass: process.env.NODEMAILER_PASS // generated ethereal password
            }
        });
    
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: process.env.NODEMAILER_FROM, // sender address
            to: emailUsuario, // list of receivers
            subject: process.env.NODEMAILER_SUBJECT, // Subject line
            html: process.env.NODEMAILER_TEXT + link, // plain text body
        });
    
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }

}

module.exports = UsuarioController;

