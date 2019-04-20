const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config/config');

const indexRouters = require('./routers/indexRouters');
const userRouters = require('./routers/userRouters');
const tokenRouters = require('./routers/tokenRouters');


// CONFIGURACAO DA CONEXAO COM O BANCO DE DADOS
const URL = config.url_bd;
const options = { reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true };

mongoose.connect(URL, options);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (erro) => {
    console.log('ERRO NA CONEXÃO COM O BANCO DE DADOS ' + erro);
});

mongoose.connection.on('connected', () => {
    console.log('APLICAÇÃO CONECTADA COM SUCESSO DO BANCO DE DADOS ');
});

mongoose.connection.on('disconnected', () => {
    console.log('APLICAÇÃO DISCONECTADA COM SUCESSO DO BANCO DE DADOS ');
});

// CONFIGURACAO DO BODY-PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CONFIGURACAO DAS ROTAS
app.use('/', indexRouters);
app.use('/users', userRouters );
app.use('/token', tokenRouters);

// PORTA EM O SERVER ESTA RESPONDENDO
app.listen(3000);

console.log('API RODANDO OK NA PORTA 3000');
module.exports = app;