const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const User = require('../models/user');

module.exports = () => {
    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_ID,
        callbackURL: '/auth/kakao/callback',
    }, async (accessToken, refreshToken, profile, done) => {
        // console.log('kakao profile', profile);
        try {
            const exUser = await User.findOne({
                where: { id: profile.displayName, provider: 'kakao' },
            });
            if (exUser) {
                done(null, exUser);
            } else {
                // console.log(profile);
                //TODO: 동일한 이름을 가진 사용자가 가입 못한다.
                const newUser = await User.create({
                    id: profile.displayName,
                    provider: 'kakao',
                });
                done(null, newUser);
            } 
        }catch (error) {
                console.error(error);
                done(error);
            }
        }));
};