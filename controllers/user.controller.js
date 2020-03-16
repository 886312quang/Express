var User = require('../models/user.model');

module.exports.index = async function (req,res) {

    var user = await User.find(); 

    res.render('users/index', {
        users: user
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
        id:ids
    });
};

module.exports.Create = async function (req, res) {
    req.body.avatar = req.file.path;
    
    var user= await User(req.body);
    user.save();
    res.redirect('/#');
};