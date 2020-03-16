var User = require('../models/user.model');
var db = require('../db');

module.exports.index = async function (req,res) {

    var user = await User.find(); 
    var sessionId = req.signedCookies.sessionId;  
    var cart = db  .get('sessions')
                    .find({id:sessionId})
                    .get('cart')
                    .value();
    var sum=0;
    for(var i in cart){
        sum=sum+cart[i];
    }

    res.render('users/index', {
        users: user,
        sum:sum
    });
};

module.exports.search =  async function (req, res) {
    
    var q = req.query.q;
    var query = await User.find({name:q})
    
    res.render('users/index', {
        users: query
    });
   
};

module.exports.create = function (req, res) {
    res.render('users/create');
};

module.exports.get = async function(req,res){
    var i= req.params._id;


    var ids = await User.find({_id:i});

    res.render('users/id', {
        id:ids,
    });
};

module.exports.Create = async function (req, res) {
    req.body.avatar = req.file.path;
    
    var product = await Product.create(req.body);
    res.json(product);
    res.redirect('/#');
};