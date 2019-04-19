const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const userRouters = require('./routers/userRouters');
const indexRouters = require('./routers/indexRouters');

// CONFIGURACAO DA CONEXAO COM O BANCO DE DADOS
const URL = 'mongodb+srv://adminapinodemongodb:13579aabbc@@cluster0-df8rr.mongodb.net/test?retryWrites=true';
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
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json);


// CONFIGURACAO DAS ROTAS
app.use('/', indexRouters);
app.use('/users', userRouters );

/*
app.get('/', (req, res) => {
    return res.send({ mensagem: 'API está rodando na porta 3000 GRT'});
});


app.post('/', (req, res) => {
    return res.send({ mensagem: 'API está rodando na porta 3000 POSP'});
});
*/

app.listen(3000);

console.log('API RODANDO OK');

module.exports = app;