var db = require('../db');
var shortid = require('shortid');

module.exports.index = function (req,res) {
    res.render('users/index', {
        users: db.get('users').value()
    });
};

module.exports.search = function (req, res) {
    var q = req.query.q;
    var matchedUser = db.get('users').write().filter(function (users) {
        return users.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
    });
    res.render('users/index', {
        users: matchedUser
    });
};

module.exports.create = function (req, res) {
    res.render('users/create');
};

module.exports.get = function(req,res){
    var id= req.params.id;

    var user = db.get('users').find({ id: id}).value();
    var sessionId = req.signedCookies.sessionId;  
    var cart = db  .get('sessions')
                    .find({id:sessionId})
                    .get('cart')
                    .value();
    var sum=0;
    for(var i in cart){
        sum=sum+cart[i];
    }

    res.render('users/view', {
        user:user,
        sum:sum
    });
};

module.exports.postCreate = function (req, res) {
    req.body.id = shortid.generate();
    req.body.avatar = req.file.path.split('\\').slice(1).join('/');

    
    db.get('users').push(req.body).write();
    res.redirect('/users');
};