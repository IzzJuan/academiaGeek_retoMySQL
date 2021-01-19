const express = require('express');
const router = express.Router();
const connectionBD = require('../database');
const helper = ('../lib/helpers')

router.get('/', (req, res) => {
    res.send('API funcionando!!!')
});

module.exports = router;