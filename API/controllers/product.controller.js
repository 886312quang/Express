var Product = require('../../models/product.model');


module.exports.index = async function (req, res) {

    var product = await Product.find();
    res.json(product);
}

module.exports.getId= async function (req, res) {
   
    var i= req.params._id;

    var ids = await Product.findById(i);
   
    res.json(ids);  
    
}
module.exports.create = async function (req, res) {

    var product = await Product.create(req.body);
    res.json(product);
}

module.exports.delete = async function (req, res) {

    var product = await Product.deleteOne(req.body)
    res.n; // Number of documents matched
    res.nModified; // Number of documents modified  
    res.json(product);
}

module.exports.patch = async function (req, res) {
    var id= req.params._id;

    var product = await Product.findByIdAndUpdate({_id:id},(req.body));
    res.json(product);
}

module.exports.put = async function (req, res ,next) {
    var id= req.params._id;
    var product = await Product.findById({_id:id});
    if(product===null){
        var products = await Product.create(req.body);
        res.json(products);
    }else{
        var products = await Product.findByIdAndUpdate({_id:id},(req.body));
        res.json(products);
    }
}



