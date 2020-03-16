
var User = require('../models/user.model');
module.exports.requireAuth = async function (req, res, next){
     if(!req.signedCookies.userId){
        res.redirect('/auth/login');
        return;
    }
    var user = await User.find({_id:req.signedCookies.userId})
    //var user =db.get('users').find({id: req.signedCookies.userId}).value();  
  
    var id="";
    var name="";
    for (const key of user){
      id=key.id;
      name=key.name;
    }
   
    if(id!==req.signedCookies.userId){
        res.redirect('/auth/login');
        return;
    }
    res.locals.user = name;

    next();
};