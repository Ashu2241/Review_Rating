const {response} = require('express')
let userSchema = require('../models/userSchema')

let createUser = async (req,res) =>{


    let userData = new userSchema(req.body);
    try{
        const isUserExist = await userSchema.findOne({
            userEmail : req.body.userEmail, 
        });
       
        if (isUserExist) {

            res.status(401).send({  
                success : false,
                message : "User is already registered with this email",
            });
        }
        else{
            //const hashPassword = await bcrypt.hash(req.body.userPassword, 10);
            //userData.userPassword = hashPassword;

            const user = await userData.save();

            res.status(201).send({
                success : true,
                message : "User successfully registered",
                user : user,
            });
        }
    }
    catch (error) {
        res.status(500).send({
            success : false,
            message : `Error occur ${error.message}`,
        });
    }


}


module.exports = {
    createUser
}