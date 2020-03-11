var express = require('express');
var app = express();
var port = 5500;
var users = [
    { id: 1, name: 'MQ' },
    { id: 2, name: 'MQ2' }
]
app.set('view engine', 'pug');
app.set('views', './view');
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.get('/', function (req, res) {
    res.render('index', {
        name: 'MQ'
    });
});
app.get('/users', function (req, res) {
    res.render('users/index', {
        users: users
    });
});
app.get('/users/search', function (req, res) {
    var q = req.query.q;
    var matchedUser = users.filter(function (users) {
        return users.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
    });
    res.render('users/index', {
        users: matchedUser
    })
});
app.get('/users/create', function (req, res) {
    res.render('users/create');
});
app.post('/users/create', function(req,res){
    users.push(req.body);
    res.redirect('/users');
});
app.listen(port, function () {
    console.log('Sever listening on port' + port)
});
