var express = require('express');
var controller = require('../controllers/cart.controller');

var router = express.Router();

router.get('/add/:proId', controller.addToCart);

module.exports = router;