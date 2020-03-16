var Product = require('../models/product.model');


module.exports.index = async function (req, res) {
    var page = parseInt(req.query.page) || 1
    var perPgae = 8;
    var drop = (page - 1) * perPgae;
    
    var products = await Product.find();
    res.render('product/index', {
        product: products
    })

}