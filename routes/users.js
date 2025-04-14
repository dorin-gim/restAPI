const express = require('express');
const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {registerSchema, loginSchma, updateUserScma, updateUserBusinessScma} = require('../Joi/usersSchema');
const validator = require('../middlewares/validate');
const auth = require('../middlewares/auth');

//register user
router.post('/',validator(registerSchema),async(req , res)=>{
    try{
        //1. validate by middleware
        //2. check if the user is already registered
        let user = await User.findOne({email:req.body.email});
        if (user) return res.status(400).send("User alredy exists");

        //3.create a new user + encrypt the password
        user = new User(req.body);
        const salt = await bcryptjs.genSalt(10)

        user.password = await bcryptjs.hash(user.password, salt);
        
        await user.save();
        res.status(200).json(user);
    }
    catch(error){
        res.status(400).send(error.message);
    }
})

//login user
router.post('/login',validator(loginSchma), async(req, res)=>{
    try{
        //1. validate by middleware
        //2. check if user exists
        const user = await User.findOne({email:req.body.email})
        if(!user) return res.status(401).send("Invalid email or password");

        //3. compare the password
        const result = await bcryptjs.compare(req.body.password, user.password)
        if(!result) return res.status(401).send("Invalid email or password");

        //4. generate a token
        const token = jwt.sign({_id:user._id, isBusiness:user.isBusiness, isAdmin:user.isAdmin}, process.env.JWT_KEY);
        res.status(200).send(token);
    }
    catch(error){
        res.status(400).send(error.message);
    }
})

//get all users
router.get('/',auth(["admin"]), async(req, res)=>{
    try{
        const users = await User.find();
        res.status(200).json(users);
    }
    catch(error){
        res.status(400).send(error.message);
    }
})

//get a specific user
router.get('/:id',auth(["user","admin"]), async(req, res)=>{
    try{
        const user = await User.findById(req.params.id);
        if(!user) return res.status(400).send("User not found");
        res.status(200).json(user);
    }
    catch(error){
        res.status(400).send(error.message);
    }
})

//update user
router.put('/:id',validator(updateUserScma),auth(["user"]), async(req, res)=>{
    try{
        //1. validate by middleware
        //2. find user + update
        const user = await User.findOneAndUpdate({_id:req.params.id}, req.body, {new:true});
        if(!user) return res.status(400).send("User not found");
        res.status(200).send("user has been updated successfully");

    }
    catch(error){
        res.status(400).send(error.message);
    }
})

//change user business status
router.patch('/:id',validator(updateUserBusinessScma),auth(["user"]), async(req, res)=>{
    try{
        //1. validate by middleware
        //2. find user + update business status
        const user = await User.findOneAndUpdate({_id:req.params.id},{$set:req.body},{new:true});
        if(!user) return res.status(400).send("User not found");
        res.status(200).send("User business status has been updated successfully");
    }
    catch(error){
    res.status(400).send(error.message);
    }
})

//delete user
router.delete('/:id',auth(["admin","user"]), async(req,res)=>{
    try{
        //1.validate by middleware
        //2. find user + delete
        const user = await User.findOneAndDelete({_id:req.params.id});
        if(!user) return res.status(400).send("User not found");
        res.status(200).send("User has been deleted successfully");
    }
    catch(error){
        res.status(400).send(error.message);
    }
})



module.exports = router;