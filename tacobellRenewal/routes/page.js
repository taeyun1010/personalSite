const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();

// router.get('/profile', isLoggedIn, (req, res) => {
//     res.render('profile', { title: '마이페이지' });
// });

router.get('/join', isNotLoggedIn, (req, res) => {
    res.render('join', { title: '회원가입' });
});

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

router.get('/', (req, res, next) => {
    res.render('index', {
        title: 'TacobellRenewal',
    });
});

module.exports = router;