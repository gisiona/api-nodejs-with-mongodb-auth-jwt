const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddle')

router.get('/', auth, (req, res) => {
    console.log(res.locals.auth_data);
    return res.status(200).send({ mensagem: 'API está rodando na porta 3000 GET' });
});

router.post('/', auth, (req, res)  => {
    return res.status(200).send({ mensagem: 'API está rodando na porta 3000 POST'});
});

module.exports = router;