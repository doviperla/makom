const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const db = require("./models");

module.exports.init = () => {
    const Users = db.Users;
    const Account = db.Account;

    passport.use('local', new Strategy(
        {
            usernameField: 'email',    // define the parameter in req.body that passport can use as username and password
            passwordField: 'password'
        }, async (email, password, cb) => {
            const user = await Users.findAll({
                include: [
                    {
                        model: Account,
                    }
                ],
                where: {
                    email: email
                }
            });
            if (user.length == 0 || user[0].password != password)
                return cb(null, false);

            return cb(null, user[0]);
        }));

    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });

    passport.deserializeUser(async (id, cb) => {
        const user = await Users.findAll({
            include: [
                {
                    model: Account,
                }
            ],
            where: {
                id: id
            }
        });
        cb(null, user);
    });

    return passport;
}