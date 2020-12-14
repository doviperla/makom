const SequelizeAuto = require('sequelize-auto');
const auto = new SequelizeAuto('db', 'app', 'password', {
    host: 'localhost',
    dialect: 'postgres',
    directory: './models', // where to write files
    port: '5432',
    caseModel: 'c', // convert snake_case column names to camelCase field names: user_id -> userId
    caseFile: 'c', // file names created for each model use camelCase.js not snake_case.js
    singularize: true, // convert plural table names to singular model names
    additional: {
        timestamps: false
        // ...options added to each model
    },
    tables: ['pepole'] // use all tables, if omitted
    //...
})

module.exports.generate = async () => {
    auto.run().then(data => {
        console.log(data.tables);      // table list
        console.log(data.foreignKeys); // foreign key list
        console.log(data.text)         // text of generated files
      });
   }
   

