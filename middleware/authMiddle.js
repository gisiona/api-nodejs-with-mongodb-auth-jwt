const jwt = require('jsonwebtoken');


const auth = (req, res, next) => {
    const token_header = req.headers.auth;

    if(!token_header){
        return res.send({retorno: {codigo: 403 ,error: 'Token não enviado, autenticação recusada.'}});
    }
    jwt.verify(token_header,'CHAVE_SECRETA', (error, decoded) => {
        if(error){
            return res.send({retorno: {codigo: 403 ,error: 'Token inválido.'}});
        }
        res.locals.auth_data = decoded;
        return next();
    });
}



const geraToken = () => {
    return jwt.sign({id: 123}, "CHAVE_SECRETA", {expiresIn: '7d'});
}



module.exports = auth;