require('dotenv').config();
var express = require('express');

const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');


var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var productRoute = require('./routes/product.route');
var transferRoute = require('./routes/transfer.route');

var authMiddleWare = require('./middleware/auth.middleware');

// Set some defaults (required if your JSON file is empty)

var port = 5501;

var app = express();
app.set('view engine', 'pug');
app.set('views', './view');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.KEY_SECRECT));
console.log(process.env.KEY_SECRECT);
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('index', {
        name: 'MQuang'
    });
});

app.use('/users', authMiddleWare.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/product', productRoute);
app.use('/transfer', authMiddleWare.requireAuth, transferRoute);

app.listen(port, function () {
    console.log('Server listening on port' + port);
});

