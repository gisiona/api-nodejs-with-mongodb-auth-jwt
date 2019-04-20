

const express = require('express');
const users = require('../model/userModel');

const router = express.Router();

router.get('/', (req, res) => {
    users.find({}, (error, data) => {
        
        if(error) {
            return res.status(401).send({error: 'Ocorreu um erro na consulta dos usuários.' });       
        } 
        return res.status(200).send(data);
    });    
    //return res.status(200).send({ mensagem: 'API está rodando na porta 3000 GET rota de usuário'});
});

/*
router.post('/', (req, res) => {
    return res.send({ mensagem: 'API está rodando na porta 3000 POSP rota de usuário'});
});
*/


router.post('/create', (req, res) => {
    const objUser = req.body;
    console.log(objUser);
    //const {email, password } = req.body;
    if(!objUser.body.email || !objUser.body.password){
        return res.status(401).send({ error: 'Dados insuficientes'});
    }

    const email = req.body.email;

    users.findOne({email: email}, (error, data) => {
        if(error){
            return res.status(401).send({ error: 'Erro ao consultar usuário' });            
        }

        if(data){
            return res.status(201).send({ error: 'Usuário já cadastrado.' });
        }

        users.create(req.body, (error, data) => {
            if(error){
                return res.status(201).send({ error: 'Erro ao criar usuário.'});
            }
            return res.status(200).send({data, mensagem: 'Usuário cadastrado com sucesso.'});
        });
    });
    //return res.send({ mensagem: 'Seu usuário foi criado com sucesso.'});
});

module.exports = router;    