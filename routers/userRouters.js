const express = require('express');
const users = require('../model/userModel');
const router = express.Router();
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    users.find({}, (error, data) => {        
        if(error) {
            return res.status(400).send({retorno: {codigo: 400, error: 'Ocorreu um erro na consulta dos usuários.' }});       
        } 
        return res.status(200).send( {data, retorno:{codigo: 200, mensagem:'Dados retornado com sucesso'}});
    });    
});

/*
router.post('/', (req, res) => {
    return res.send({ mensagem: 'API está rodando na porta 3000 POSP rota de usuário'});
});
*/


router.post('/create', (req, res) => {
    const objUser = req.body;
    console.log(objUser);

    const {email, password } = req.body;
    console.log('EMAIL : ' + email + ", " + "PASSWORD: " + password);

    if(!email || !password){
        return res.status(400).send({retorno: {codigo: 400,  error: 'Dados insuficientes'}});
    }

    users.findOne({email: email}, (error, data) => {
        if(error){
            return res.status(400).send({retorno: {codigo: 400,  error: 'Erro ao consultar usuário' }});            
        }else if(data){
            return res.status(400).send({ retorno: {codigo: 400, error: 'Usuário já cadastrado.' }});
        }

        users.create(req.body, (error, data) => {
            if(error){
                return res.status(400).send({retorno: {codigo: 400,  error: 'Erro ao criar usuário.'}});
            }

            data.password = undefined;
            return res.status(201).send({data, retorno:{codigo: 200, mensagem: 'Usuário cadastrado com sucesso.'} });
        });
    });
});


// ROTA DE AUTENTICACAO DO USUARIO
router.post('/auth', (req,res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).send({ retorno: {codigo: 400, error:'Dados insuficientes'}});
    }

    users.findOne({email: email}, (error, data) => {
        if(error){
            return res.status(400).send({retorno: {codigo: 400, error: 'Erro ao consultar o usuário.'}});
        }else if(!data){
            return res.status(400).send({retorno: {codigo: 400, error: 'Usuário não encontrado.' }});
        }

        bcrypt.compare(password, data.password, (error, same) => {
            if(!same){
                return res.status(400).send({retorno: {codigo: 400, error: 'Erro ao autentitar usuário.'}});
            }

            data.password = undefined;
            return res.status(200).send({data, retorno:{codigo: 200, mensagem: 'Usuário autenticado com sucesso.' }});
        });
    }).select('+password'); // ADICIONADO +PASSWORD PARA QUE NO RETORNO SEJA ADICIONADO O CAMPO DE PASSWORD


});

module.exports = router;    