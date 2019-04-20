

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true},
    password: { type: String, required: true, select: false },
    dataCadastro: { type: Date, default: Date.now }
});


// CRIPTOGRAFANDO OS DADOS DO PASSWORD ANTES DE SALVAR NO BANCO DE DADOS - UTILIZANDO BCRYPT
userSchema.pre('save', function(next){
    let user = this;
    if(!user.isModified('password')){
        return next();
    }
    // ENCRYPT PASSWORD
    bcrypt.hash(user.password, 10, (error, encrypted) => {
        user.password = encrypted;
        return next();
    });
});
module.exports = mongoose.model('user',userSchema);

