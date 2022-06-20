const express = require('./src/express');
// const db = require('./src/db');
const auth = require('./src/auth');
const pgdb = require('./src/helpers/db.connection').pgdb;

//generate models from db
//const automate = require('./src/helpers/sequelize.automate');
//automate.generate();


const run = async () => {
    console.log('success to connect to db')
    const passport = auth.init();
    express.init(passport);
    console.log('success to init server')
};

run();
