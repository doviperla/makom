const express = require('express');
const config = require('../config/config');
const chalk = require('chalk');
const router = express.Router();
const cors = require('cors')
const userController = require('./controllers/user.controller');
const pepoleController = require('./controllers/pepole.controller');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const middleware = require('./helpers/middleware');

const PORT = 3005;
const HOST = 'localhost';

module.exports.init = (models, passport) => {
    let app = express();
    app.use(bodyParser.urlencoded({
        limit: '50mb',
        extended: true
    }));
    app.use(require('morgan')('combined'));
    app.use(bodyParser.json({ limit: '50mb', extended: true }));
    app.use(cookieParser());
    app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
    app.use(passport.initialize());
    app.use(passport.session());
    _initCors(app);
    _initModulesServerRoutes(app, models, passport);
    app.listen(PORT, HOST, () => {
        console.log(chalk.green.bold(`Web server started on http://${HOST}:${PORT}`));
    })
    return app;
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

_initModulesServerRoutes = (app, models, passport) => {
    app.use('/api', router);

    router.use('/pepole/check-connection', pepoleController.checkConnection)

    router.use('/auth/login', userController.login);

    router.use('/auth/logout', userController.logout);

    router.use('/pepole/get-all', middleware.validateToken, (req, res, next) => {
        req.models = models;
        next();
    }, pepoleController.getAllPepoles);

    router.use('/pepole/update-list', middleware.validateToken, (req, res, next) => {
        req.pepole = models.pepole;
        next();
    }, pepoleController.updateList);

    router.use('/pepole/delete-row', middleware.validateToken, (req, res, next) => {
        req.pepole = models.pepole;
        next();
    }, pepoleController.deleteRow);

    router.use('/pepole/add-new-list', middleware.validateToken, (req, res, next) => {
        req.models = models;
        next();
    }, pepoleController.addNewList);

    router.use('/pepole/delete-list', middleware.validateToken, (req, res, next) => {
        req.models = models;
        next();
    }, pepoleController.deleteList);

    router.use('/pepole/change-name-list', middleware.validateToken, (req, res, next) => {
        req.models = models;
        next();
    }, pepoleController.changeNameList);

};
