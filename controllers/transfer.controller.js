var shortid = require('shortid');

var db = require('../db');

module.exports.tran = function (req, res, next) {
    res.render('transfer/tran');
}

module.exports.postTran = function (req, res, next) {
    var data={
        id: shortid.generate(),
        amount: parseInt(req.body.amount),
        acountID: req.body.acountId,
        userId: req.signedCookies.userId
    }
   
    db.get('transfer').push(data).write();
    res.redirect('/transfer/tran');
}