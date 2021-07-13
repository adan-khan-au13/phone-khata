const customerSchema = require('../models/user')
const sequelize = require('sequelize')

var controller = {

//Add the customer
create : (req,res)=>{
    let eachCustomer = new customerSchema({
        name:req.body.name,
        phone_number:req.body.phone_number,
        debit:req.body.debit,
        credit:req.body.credit,
        description:req.body.description,
        date_of_transaction:Date.now(),
        due_date_of_transaction:Date.now(),
        user_id: req.app.get("data1").user_id
    })
    // console.log(eachCustomer.user_id)
    eachCustomer.save().then(function(val){
        res.status(201).json({
            message:"Customer created",
            data:eachCustomer
        })
    })
    .catch((err)=>{
        console.log("Error while creating customer ",JSON.stringify(err))
        res.status(500).json({
            message:"Error in creating customer",
            error:err.message
        })
    }) 
},


//To get all the customers
findCustomer : (req,res)=>{
    // console.log("Data",req.app.get("data1"))
    customerSchema.findAll({
        where:{
            user_id:req.app.get("data1").user_id
        }
    })
    .then((data)=>{
        if(data.length>0){
        res.status(200).json({
            message:"Found",
            data:data
        })
        }else{
            res.status(404).json({
                message:"No customer's info found"
            })
        }
    })
    .catch((err)=>{
        console.log("Error while finding all customers ",JSON.stringify(err))
        res.status(500).json({
            message:"Couldn't find your request",
            error:err.message
        })
    })
},

//Finding all customers on the basis of name
findCustomerOnTheBasisOfName : (req,res)=>{
    customerSchema.findAll({
        where:{
            user_id:req.app.get("data1").user_id,
            [sequelize.Op.and]:{
                name:req.params.name
            }
        }
    })
    .then((data)=>{
        if(data.length>0){
        res.status(200).json({
            message:`Details of the customer with name ${req.params.name}`,
            data:data
        })
        }else{
            res.status(404).json({
                message:`No customer exist with name ${req.params.name}`
            })
        }
    })
    .catch((err)=>{
        console.log("Error while finding  customer on the basis of name ",JSON.stringify(err))
        res.status(500).json({
            message:"Couldn't find your request",
            error:err.message
        })
    })
},

//To find a customer on the basis of customer_id.
findaCustomer : (req,res)=>{
    customerSchema.findOne({
        where:{
            user_id:req.app.get("data1").user_id,
            [sequelize.Op.and]:{
                customer_id:req.params.customer_id
            }
        }
    })
    .then((data)=>{
        if(!data){
            res.status(404).json({
                message:`No customer exist with id ${req.params.customer_id}`
            })
        }else{
            res.status(200).json({
                message:"Found a query",
                data:data
            })
        }
    })
    .catch((err)=>{
        console.log("Error while finding a particular customer ",JSON.stringify(err))
        res.status(500).json({
            message:`Couldn't find the customer with name ${req.params.name}`,
            error:err.message
        })
    })
},

//To edit the customer on the basis of customer_id
editCustomer : (req,res)=>{
    customerSchema.findOne({
        where:{
            user_id:req.app.get("data1").user_id,
            [sequelize.Op.and]:{
                customer_id:req.params.customer_id
            }
        }
    })
    .then(data=>{
        if(!data){
            res.status(404).json({
                message:`No customer exists with customer_id ${req.params.customer_id}`
            })
        }
        else{
            data.name=req.body.name,
            data.phone_number=req.body.phone_number,
            data.debit=req.body.debit,
            data.credit=req.body.credit,
            data.description=req.body.description
    
            return data.save()
        }
    })
    .then((data)=>{
        if(data){
            res.status(200).json({
                message:`Updated customer's information`
            })
        }
            
    })
    .catch((err)=>{
        console.log("Error while updating a customer ",JSON.stringify(err))
        res.status(500).json({
            message:`Error in updating customer's info with id ${req.params.customer_id}`

        })
    })
},

//Delete the customer on the basis of id
deleteCustomer : (req,res)=>{
    customerSchema.destroy(
        {
        where:{
            user_id:req.app.get("data1").user_id,
            [sequelize.Op.and]:{
                customer_id:req.params.customer_id
            }
        }
    })
    .then((data)=>{
        if(!data){
            res.status(404).json({
                message:`No customer exists with id ${req.params.customer_id}`
            })
        }else{
            res.status(200).json({
                message:"Customer info has been deleted!!"
            })
        }
    })
    .catch((err)=>{
        console.log("Error while deleting a customer ",JSON.stringify(err))
        res.status(500).json({
            message:"Error in deleting customer's info",
            error:err.message
        })
    })
},

//Get those customers who have debit balance
getDebitBalance:(req,res)=>{    
    customerSchema.findAll({
        where:{
            user_id:req.app.get("data1").user_id,
            [sequelize.Op.and]:{
                credit:null
            }
        }
    })
    .then((data)=>{
        if(data.length != 0){
            res.status(200).json({
                message:"Found",
                data:data
            })
        }else{
            res.status(200).json({
                message:"No customers found with debit balance"
            })
        }
    })
    .catch((err)=>{
        res.status(500).json({
            message:"Couldn't find your request",
            error:err.message
        })
    })
},

//Get those customers who have credit balance
getCreditBalance:(req,res)=>{    
    customerSchema.findAll({
        where:{
            user_id:req.app.get("data1").user_id,
            [sequelize.Op.and]:{
                debit:null
            }
        }
    })

    .then((data)=>{
        if(data.length != 0){
            res.status(200).json({
                message:"Found",
                data:data
            })
        }else{
            res.status(200).json({
                message:"No customers found with credit balance"
            })
        }
    })
    .catch((err)=>{
        res.status(500).json({
            message:"Couldn't find your request",
            error:err.message
        })
    })
}
}

module.exports = { controller }