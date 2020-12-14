const express = require('./src/express');
const db = require('./src/db');

//generate models from db
//const automate = require('./src/helpers/sequelize.automate');
//automate.generate();

db.init();
express.init();