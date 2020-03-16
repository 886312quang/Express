var express = require('express');
var controller = require('../controllers/product.controller');

var router = express.Router();


router.get('/', controller.index);

router.post('/', controller.create);

router.delete('/', controller.delete);


router.get('/:_id', controller.getId);

router.put('/:_id', controller.put);

module.exports = router;