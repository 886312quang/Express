
var User = require('../models/user.model');
module.exports.requireAuth = async function (req, res, next){
     if(!req.signedCookies.userId){
        res.redirect('/auth/login');
        return;
    }
    var user = await User.find({id:req.signedCookies.userId})
    //var user =db.get('users').find({id: req.signedCookies.userId}).value();  
  
    var id="";
    for (const key of user){
      id=key._id;
    }
    console.log("ïd")
    console.log(id);
    if(id!==req.signedCookies.userId){
        res.redirect('/auth/login');
        return;
    }
    res.locals.user = user;

    next();
};