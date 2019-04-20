const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/authMiddle')
const users = require('../model/userModel');
const router = express.Router();


const createUserToken = (userID) => {
    return jwt.sign({id: userID}, "CHAVE_SECRETA", {expiresIn: '7d'});
}

// REFATORADO PARA UTILIZAÇÃO DO ASYNC AWAIT.
router.get('/', auth,  async (req,res) => {
    try{
        const retornoUsers = await users.find({});
        return res.status(200).send( {usuarios: retornoUsers, retorno:{codigo: 200, mensagem:'Dados retornado com sucesso'}});
    }catch(ex){
        return res.status(400).send({retorno: {codigo: 400, error: 'Ocorreu um erro na consulta dos usuários.' }});       
    }
});


/*
router.get('/', (req, res) => {
    users.find({}, (error, data) => {        
        if(error) {
            return res.status(400).send({retorno: {codigo: 400, error: 'Ocorreu um erro na consulta dos usuários.' }});       
        } 
        return res.status(200).send( {data, retorno:{codigo: 200, mensagem:'Dados retornado com sucesso'}});
    });    
});
*/

// REFATORADO PARA UTILIZAÇÃO DO ASYNC AWAIT.
router.post('/create',  async (req, res) => {
    try{
        const {email, password } = req.body;
        console.log('EMAIL : ' + email + ", " + "PASSWORD: " + password);

        if(!email || !password){
            return res.status(400).send({retorno: {codigo: 400,  error: 'Dados insuficientes'}});
        }else if(await users.findOne({email:email})){
            return res.status(400).send({ retorno: {codigo: 400, error: 'Usuário já cadastrado.' }});
        }

        const retornoUser = await users.create(req.body);
        retornoUser.password = undefined;
        return res.status(201).send({usuario: retornoUser, 
                                    token: createUserToken(email),
                                        retorno:{codigo: 200, 
                                                mensagem: 'Usuário cadastrado com sucesso.'}
                                    });   

    }catch(ex){
        return res.status(400).send({retorno: {codigo: 400,  error: 'Erro ao consultar usuário' }});        
    }    
});


/*
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
*/

// REFATORADO PARA UTILIZAÇÃO DO ASYNC AWAIT.
router.post('/auth', auth, async (req, res) => {
    const { email , password } = req.body;
    if(!email || !password){
        return res.status(400).send({ retorno: {codigo: 400, error:'Dados insuficientes'}});
    }
    try{
        const user = await users.findOne({email: email}).select('+password');
        if(!user){
            return res.status(400).send({retorno: {codigo: 400, error: 'Usuário não encontrado.' }});
        }
        
        const pass_ok = await bcrypt.compare(password, user.password);
        console.log('password_ok ' + pass_ok)
        
        if(!pass_ok){
            return res.status(400).send({retorno: {codigo: 400, error: 'Erro ao autentitar usuário.'}});
        }
        user.password = undefined;
        return res.status(200).send({usuario: user, retorno:{codigo: 200, mensagem: 'Usuário autenticado com sucesso.' }});
    }catch(ex){
        return res.status(400).send({retorno: {codigo: 400, error: 'Erro ao consultar o usuário.', exception: ex}});
    }
});


// ROTA DE AUTENTICACAO DO USUARIO
/*
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
*/

module.exports = router;    