var db = require('../db');

module.exports.index = function (req, res) {
    var page = parseInt(req.query.page) || 1; //n
    var perPage = 8; //x
    var start = (page - 1) * perPage;
    var end = page * perPage;
    var next = page + 1;
    var previous = page - 1;

    var quatityPage = Math.ceil(db.get('product')
        .size()
        .value() / perPage);
    var sizePage = db.get('dem')
        .size()
        .value();
    if (next > sizePage) {
        next = page;
    }
    if (sizePage < quatityPage) {
        for (var i = sizePage + 1; i <= quatityPage; i++) {
            db.get('dem')
                .push({ id: "" + i + "", title: 'lowdb is awesome' })
                .write()
        }
    }
    var drop = (page - 1) * perPage;


    var sessionId = req.signedCookies.sessionId;
    var cart = db.get('sessions')
        .find({ id: sessionId })
        .get('cart')
        .value();
    var sum = 0;
    for (var i in cart) {
        sum = sum + cart[i];
    }
    res.render('product/index', {
        product: db.get('product').drop(drop).take(perPage).value(),
        dem: db.get('dem').value(),
        next: next,
        previous: previous,
        sum: sum
    });
};


module.exports.active = function (req, res) {
    var page = parseInt(req.query.page) || 1; //n
}