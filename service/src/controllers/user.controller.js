const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const passport = require('passport');

module.exports.isLogin = (req, res) => {
    res.status(200).json({ success: true });
}

module.exports.login = function (req, res, next) {
    try {
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return res.json(500, {
                    success: false,
                    error: 'Auth Error!'
                });
            }
            if (!user) {
                return res.json(200, {
                    success: false,
                    error: 'user not exist'
                });
            }

            user.token = jwt.sign({
                username: user.email,
                id: user.id
            }, config.sessionSecret, { expiresIn: config.tokenExpireTime }); // token for user validation

            const userObj = {
                id: user.id,
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name,
                token: user.token,
                account_name: user.account.name,
                account_logo: user.account.logo,
                account_id: user.account.id,
            };

            res.json(200, {
                success: true,
                user: userObj
            });
        })(req, res, next);
    }
    catch (ex) {
        console.log(ex);
        return res.json(500, {
            success: false,
            error: 'Auth Error!'
        });
    }
};

module.exports.logout = function (req, res, next) {
    req.logout();
    res.json({
        success: true
    });
};