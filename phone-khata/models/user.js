const Sequelize = require('sequelize')
const database = require('../config/database.connection')

//Here, the name of the table will be customers and user_id is the foreign key

const customerSchema = database.define('customers',{
    customer_id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    name:{
        type:Sequelize.STRING,
        require:true
    },
    phone_number:{
        type:Sequelize.CHAR(10),
        require:true,

    },    
    debit:{
        type:Sequelize.INTEGER
    },    
    credit:{
        type:Sequelize.INTEGER
    },    
    description:{
        type:Sequelize.TEXT,
        require:true
    },  
    date_of_transaction:{
        type:Sequelize.DATEONLY
    },
    due_date_of_transaction:{
        type:Sequelize.DATEONLY
    },
    user_id:{
        type:Sequelize.UUID,
        allowNull:false,
        references:{
            model:'users',
            key:'uuid'
        }
    }
    
},
{
    timestamps: false
});  

customerSchema.associate=(models)=>{
    customerSchema.belongsTo(models.signup)
}

module.exports = customerSchema
