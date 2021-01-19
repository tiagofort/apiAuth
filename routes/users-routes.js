const express = require('express');
const usuariosModel = require('../models/users-model.js');
const router = express.Router();
const myToken = require("../token/token.js");
const UsuarioController = require('../controller/usuario-controller.js');

router.post("/register", async (req, res) => {
    const usuario = new usuariosModel(req.body);
    console.log(usuario);
    try {
        await usuario.save();
        var token = myToken.criarToken(usuario.userName);
        res.status(200).send({usuario, token});
        console.log({usuario, token})
    } catch (err) {
        res.status(500).send(err);
    }
})

router.post("/login", UsuarioController.logar)

router.put("/recuperaSenha", UsuarioController.recuperarSenha);

router.put("/", UsuarioController.alterarSenha);

router.put("/ativo", UsuarioController.ativar)

router.get("/buscarEmail", UsuarioController.buscarPorEmail);

router.put("/userLoged", UsuarioController.getUserLogado);

router.post("/verificarToken", myToken.verificarTokenRec ,async (req, res) => {
    if (res.status(200)){
        res.sendStatus(200)       
    } else {
        res.sendStatus(403)
    }  
});

router.get('/', async (req, res) => {
    const usuario = await usuariosModel.find({});
    try {
      res.json(usuario);
    } catch (err) {
      res.status(500).send(err);
    }
});

  router.delete("/:id", async (req,res)=>{
    console.log(req.params.id)
    await usuariosModel.findByIdAndRemove(req.params.id).catch((error)=>{
        res.send("Não foi possível remover!")
    });
        res.send("Excluído");
});

// router.put("/", async (req, res)=>{
//     await usuariosModel.findByIdAndUpdate(req.body._id, req.body).catch((error)=>{
//         res.send("Não foi possível alterar")
//     })
//         res.send("Alterado com sucesso.");
// });


module.exports = router;