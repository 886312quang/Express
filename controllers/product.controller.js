var Product = require('../models/product.model');
var db = require('../db');

module.exports.index = async function (req, res) {
    var page = parseInt(req.query.page) || 1
    var perPgae = 8;
    var drop = (page - 1) * perPgae;

    var sessionId = req.signedCookies.sessionId;  
    var cart = db  .get('sessions')
                    .find({id:sessionId})
                    .get('cart')
                    .value();
    var sum=0;
    for(var i in cart){
        sum=sum+cart[i];
    }
    var products = await Product.find();
    res.render('product/index', {
        product: products,
        sum:sum
    })

}