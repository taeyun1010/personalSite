const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'password',
    }, async (id, password, done) => {
        try {
            const exUser = await User.findOne({ where: { id }});
            if (exUser) {
                const result = await bcrypt.compare(password, exUser.password);
                if (result) {
                    done(null, exUser);
                } else {
                    done(null, false, { message: '잘못된 비밀번호 입니다.' });
                }
            } else {
                done(null, false, { message: '존재하지 않는 아이디입니다.' });
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};