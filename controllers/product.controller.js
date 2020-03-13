var db = require('../db');

module.exports.index = function (req, res) {
    var page = parseInt(req.query.page) || 1; //n
    var perPage = 8; //x
    var start = (page - 1) * perPage;
    var end = page * perPage;
    //drop
    var quatityPage = Math.ceil(db.get('product')
        .size()
        .value() / perPage);
    
    var sizePage = db.get('dem')
                    .size()
                    .value();
    if(sizePage<quatityPage){
    for (var i = sizePage+1; i <= quatityPage; i++) {
        db.get('dem')
            .push({ id:""+i+"", title: 'lowdb is awesome'})
            .write()
    }
}
    var drop = (page - 1) * perPage;
    res.render('product/index', {
        product: db.get('product').drop(drop).take(perPage).value(),
        dem: db.get('dem').value()

    });
};