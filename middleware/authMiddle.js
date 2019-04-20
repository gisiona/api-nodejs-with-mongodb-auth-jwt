const jwt = require('jsonwebtoken');
const config = require('../config/config');

const auth = (req, res, next) => {
    const token_header = req.headers.auth;

    if(!token_header){
        return res.send({retorno: {codigo: 403 ,error: 'Token não enviado, autenticação recusada.'}});
    }
    jwt.verify(token_header, config.jwt_pass, (error, decoded) => {
        if(error){
            return res.send({retorno: {codigo: 403 ,error: 'Token inválido.'}});
        }
        res.locals.auth_data = decoded;
        return next();
    });
}
module.exports = auth;