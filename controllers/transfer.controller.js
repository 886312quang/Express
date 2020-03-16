var Tran = require('../models/tran.model');

module.exports.tran = function (req, res, next) {
    res.render('transfer/tran',{
    });
}

module.exports.postTran = async function (req, res, next) {
    var data={
        amount: parseInt(req.body.amount),
        acountID: req.body.acountId,
        userId: req.signedCookies.userId
    }

    var tran = await Tran(data);
    tran.save();
    res.redirect('/#');
    next();
}