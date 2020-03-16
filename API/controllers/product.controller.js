var Product = require('../../models/product.model');


module.exports.index = async function (req, res) {

    var product = await Product.find();
    res.json(product);
}

module.exports.getId= async function (req, res) {
   
    var i= req.params._id;

    var ids = await Product.findById(i);
    console.log(ids);
    res.render('product/id', {
        id:ids,
    });
}
module.exports.create = async function (req, res) {

    var product = await Product.create(req.body);
    res.json(product);
}

module.exports.delete = async function (req, res) {

    var product = await Product.deleteOne(req.body)
    res.json(product);
}

module.exports.put = async function (req, res) {

    var product = await Product.update(req.body);
    res.n; // Number of documents matched
    res.nModified; // Number of documents modified  
    res.json(product);
}

