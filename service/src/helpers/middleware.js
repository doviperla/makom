const jwt = require('jsonwebtoken');
const config = require('../../config/config');

module.exports.validateToken = (req, res, next) => {
    const token = req.body.token;

    if (token) { // verifies secret and checks exp
        jwt.verify(token, config.sessionSecret, (err, decoded) => {
            if (err)
                return res.status(401).json({ success: false, status: 401, message: 'Failed to authenticate token.' });
            else
                next();
        });
    } else { // if there is no token
        return res.status(401).json({
            success: false, status: 401, message: 'No token provided.'
        });
    }
}

module.exports.addModels = (req, res, next) => {
    req.pepole = models.pepole;
    next();
}
