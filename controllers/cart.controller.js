var db = require('../db');
module.exports.addToCart = function (req, res, next) {
    var proId = req.params.proId; // lay prID
    var sessionId = req.signedCookies.sessionId;
    if (!sessionId) {
        res.redirect('/product');
        return;
    }
    var count = db  .get('sessions')
                    .find({id:sessionId})
                    .get('cart.'+proId,0)
                    .value();
    db.get('sessions').
        find({ id: sessionId }).
        set('cart.' + proId, count + 1).
        write();
    var sessionId = req.signedCookies.sessionId;  
    var cart = db  .get('sessions')
                    .find({id:sessionId})
                    .get('cart')
                    .value();
    var sum=0;
    for(var i in cart){
        sum=sum+cart[i];
    }

    
    res.redirect('/product')
}