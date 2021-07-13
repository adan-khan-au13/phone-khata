const Sequelize = require('sequelize'); 

// const database = new Sequelize("demo","admin","psswrd",
//    {
//    host:'localhost',
//    dialect:'postgres'
//    }
// );  


const database = new Sequelize(
     "ztdridho",
     "ztdridho",
     "djO8Cvj6oSZ1oR8L_012hyjmFoqp2s6N",
     {
     host:'ziggy.db.elephantsql.com',
     dialect:'postgres'
     }
);

//It will create the table if it is not exist
database.sync({
    force:false
})

module.exports = database
