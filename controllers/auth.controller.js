var md5 = require('md5');
var db = require('../db');

module.exports.login = function(req, res){
    res.render('auth/login');
}

module.exports.postLogin = function(req, res) {
    var email = req.body.email;
    var pass = req.body.password;

    var user = db.get('users').find({ email: email}).value();
    if(!user) {
        res.render('auth/login', {
            err: [ 
                'User does not exist'
            ],
            vaule: req.body
        });
        return;
    };
    
    var hashedPassword = md5(pass);

    if(user.password !== hashedPassword) {
        res.render('auth/login', {
            err:[
                'Wrong password.'
            ],
            vaule: req.body
        });
        return;
    };
    res.cookie('userId', user.id,{
        signed: true
    });
    res.redirect('/users');
};