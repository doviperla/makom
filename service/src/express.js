const express = require('express');
const config = require('../config/config');
const chalk = require('chalk');
const router = express.Router();
const cors = require('cors')
const userController = require('./controllers/user.controller');

const PORT = 3005;
const HOST = '0.0.0.0';

module.exports.init = () => {
    let app = express();
    _initCors(app);
    _initModulesServerRoutes(app);
    app.listen(PORT, HOST, () => {
        console.log(chalk.green.bold(`Web server started successfully on http://${HOST}:${PORT}`));
    })
}

_initCors = (app) => {
    const corsOptions = {
        origin: function (origin, callback) {
            if (!origin) { // origin will be empty if the request is not coming from the web client (for example, ARC or direct link from browser to the server)
                console.log(`SECURITY BREACH - CORS has rejected an empty origin`);
                //callback(new Error('Request was denied!'));
                callback(null, true);
            } else if (config.cors.whitelist.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                console.log(`SECURITY BREACH - CORS has rejected a non whitelist origin: ${origin}`);
                callback(new Error('Request was denied!'));
            }
        }, credentials: true
    };

    app.options('*', cors(corsOptions));
    app.use('*', cors(corsOptions));
}

_initModulesServerRoutes = (app) => {
    app.use('/api', router);

    router.use('/user/is-login', userController.isLogin);
};
