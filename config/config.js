const env = process.env.NODE_ENV || 'dev';
const pass_bd_dev = 'SUA_SENHA_DO_BD';
const pass_bd_hml = 'senha_hml';
const pass_bd_prod = 'senha_prod';

const config = () => {
    switch(env){
        case 'dev':
        return {
            url_bd: `mongodb+srv://adminapinodemongodb:${ pass_bd_dev }@cluster0-df8rr.mongodb.net/test?retryWrites=true`,
            jwt_pass: 'SUA_SENHA_SECRETA',
            jwt_expired_in: '7d'
        }

        case 'hml':
        return {
            url_bd: `mongodb+srv://adminapinodemongodb:${ pass_bd_hml }@cluster0-df8rr.mongodb.net/test?retryWrites=true`,
            jwt_pass: 'SUA_SENHA_SECRETA',
            jwt_expired_in: '7d'
        }

        case 'prod': 
        return{
            url_bd: `mongodb+srv://adminapinodemongodb:${ pass_bd_prod }@cluster0-df8rr.mongodb.net/test?retryWrites=true`,
            jwt_pass: 'SUA_SENHA_SECRETA',
            jwt_expired_in: '7d'
        }        
    }
}

console.log(`API ESTÁ RODANDO NO AMBIENTE : ${ env.toUpperCase() }`);

module.exports = config();
