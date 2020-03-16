var md5 = require('md5');
var User = require('../models/user.model');

module.exports.login = function (req, res) {
    res.render('auth/login');
}

module.exports.postLogin = async function (req, res) {
    var email = req.body.email;
    var pass = req.body.password;
    var user = await User.find({ email: email})

    var name="";
    var password="";
    var mail="";
 
    for (const key of user){
        var u=key;
        name = key.name;
        password = key.password;
        mail = key.email;
    }
    console.log(u);
    //var user = db.get('users').find({ email: email}).value();
    if (email!==mail) {
        res.render('auth/login', {
            err: [
                'User does not exist'
            ],
            vaule: req.body
        });
        return;

    }

    var hashedPassword = md5(pass);
    
    if (password !== hashedPassword) {
        res.render('auth/login', {
            err: [
                'Wrong password.'
            ],
            vaule: req.body
        });
        return;
    };
    res.cookie('userId', u.id, {
        signed: true
    });

    res.redirect('/users');
};