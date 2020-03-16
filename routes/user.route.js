var express = require('express');
var multer = require('multer');    

var validate = require('../validate/user.validate');

var controller = require('../controllers/user.controller');
var authMiddleWare = require('../middleware/auth.middleware');
;

var upload = multer({dest: './public/uploads/' });

var router = express.Router();


router.get('/', authMiddleWare.requireAuth,controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:_id',controller.get);

router.post('/create', 
            upload.single('avatar'),
            validate.postCreate,
            controller.Create);


module.exports = router;