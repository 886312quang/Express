var express = require('express');
var controller = require('../controllers/transfer.controller');

var router = express.Router();

router.get('/tran', controller.tran);
router.post('/tran', controller.postTran);

module.exports = router;