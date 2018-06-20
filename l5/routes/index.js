var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Express',
        condition: true,
        success: req.session.success,
        errors: req.session.errors
    });
    req.session.errors = null;
});

router.post('/submit', function (req, res, next) {
    // Check validity
    req.check('email', 'Invalid email address').isEmail();
    req.check('password', 'Invalid password').isLength({min: 4});
    req.check('confirmPassword', 'Confirmation password not match').equals(req.body.password);

    let errors = req.validationErrors();
    if (errors) {
        req.session.errors = errors;
        req.session.success = false;
    } else {
        req.session.success = true;
    }

    res.redirect('/');
});

/* GET users listing. */
router.get('/users/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/users/detail', function (req, res, next) {
    res.send('detail');
});

module.exports = router;
