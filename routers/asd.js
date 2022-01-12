var express = require('express');
var router = express.Router();
const data = require('../modules/database');



router.get('/', async(req, res) => {
    result = 'ASD'
    res.send(result)
    res.end()
});


module.exports = router;