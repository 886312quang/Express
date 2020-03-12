module.exports.postCreate = function(req, res, next) {
    var err = []
    
    if(!req.body.name) {
        err.push('Name is required.')
    }
    if(!req.body.phone) {
        err.push('Phone is required.')
    }
    if(err.length) {
        res.render('users/create', {
            err:err,
            values: req.body
        });
        return;
    }
    next();
};