
var db = require('../db');

module.exports.index = function (req,res) {
    res.render('product/index', {
        product: db.get('product').value()
    });
};