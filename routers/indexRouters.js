
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    return res.status(200).send({ mensagem: 'API está rodando na porta 3000 GET' });
});

router.post('/', (req, res)  => {
    return res.status(200).send({ mensagem: 'API está rodando na porta 3000 POST'});
});

module.exports = router;