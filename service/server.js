const express = require('./src/express');
const db = require('./src/db');
const auth = require('./src/auth');

//generate models from db
//const automate = require('./src/helpers/sequelize.automate');
//automate.generate();


const run = async () => {
    const models = await db.init();
    const passport = auth.init(models);
    const app = express.init(models, passport);
};

run();
