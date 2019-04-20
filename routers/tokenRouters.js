const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/', (req,res) => {
   return res.send({retorno:{codigo: 200, mensagem: 'Rota OK, mas para gerar um novo token use o metodo POST.'}})
});

router.post('/', (req,res) => {
    const { user_key } = req.body;
    if(!user_key){
        return res.send({retorno:{ codigo: 400, error: 'Chave não enviada para gerar token. '}});
    }
    const createUserToken =  jwt.sign({id: user_key }, "CHAVE_SECRETA", {expiresIn: '7d'});
    return res.send({retorno: {codigo: 200, token: createUserToken, mensagem: 'O seu token expira em 7 dias. ' }});
});

module.exports = router;