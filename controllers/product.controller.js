var Product = require('../models/product.model');
var db = require('../db');

module.exports.index = async function (req, res) {
    var page = parseInt(req.query.page) || 1
    var perPgae = 8;
    var drop = (page - 1) * perPgae;
    var next = page + 1;
    var previous = page - 1;
    var products = await Product.find();
    var numProduct = await Product.estimatedDocumentCount();
    console.log(numProduct);
    var pageProduct = await Product.find(null, null, { skip: drop }).limit(perPgae);
    console.log(pageProduct);
    var sumPage = numProduct / perPgae;
    console.log(sumPage)
    // var sessionId = req.signedCookies.sessionId;  
    // var cart = db  .get('sessions')
    //                 .find({id:sessionId})
    //                 .get('cart')
    //                 .value();
    // var sum=0;
    // for(var i in cart){
    //     sum=sum+cart[i];
    // }


    res.render('product/index', {
        product: pageProduct,
        page: page,
        total: numProduct,
        perPgae: perPgae,
        sumPage: sumPage,
        next: next,
        previous: previous
    })

}
module.exports.search = async function (req, res) {
    var q = req.query.q;

    var products = await Product.find({ "name": q });

    res.render('product/index', {
        product: products
    })
}