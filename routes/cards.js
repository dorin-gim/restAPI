const express = require('express');
const Card = require('../models/Card');
const User = require('../models/User');
const router = express.Router();
const { cardSchema, cardUpdateSchema } = require('../Joi/cardsSchema');
const validator = require('../middlewares/validate');
const auth = require('../middlewares/auth');

//get all cards
router.get('/',async(req, res)=>{
    try{
        const cards = await Card.find();
        res.status(200).json(cards);
    }
    catch(error){
        res.status(400).send(error.message);
    }
})

//get registered user cards
router.get('/my-cards', auth([]) ,async(req, res)=>{
    try{
        const user = await User.findById(req.payload._id);
        if(!user) return res.status(400).send("User not found");
        const cards = await Card.find({userId:user._id});
        if(!cards) return res.status(400).send("No cards found");
        res.status(200).json(cards);
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

// get a specific card
router.get('/:id',async(req, res)=>{
    try{
        const card = await Card.findOne({_id:req.params.id});
        if(!card) return res.status(400).send("Card not found");
        res.status(200).json(card);
    }
    catch(error){
        res.status(400).send(error.message);
    }
})

// create a new card
router.post('/', validator(cardSchema), auth(["businesss"]), async(req,res)=>{
    try{
        //1. validate user by middleware
        //2. check if the user is business by middleware
        //3.body validation by middleware
        //4.create a new card
        let card = new Card(req.body);
        await card.save();
        res.status(201).send("card has been created successfully");
    }
    catch(error){
        res.status(400).send(error.message);
    }
})

//edit card
router.put('/:id', validator(cardUpdateSchema), auth([]), async(req, res)=>{
    try{
        //1. validate user by middleware
        //2. check if the user is business by middleware
        //3.body validation by middleware
        //4.update card
        const card = await Card.findById(req.params.id);
        if(!card) return res.status(400).send("Card not found");
        if(card.user_id !== req.payload._id) return res.status(403).send("You are not allowed to update this card");
        Card.updateOne({_id:req.params.id}, req.body, {new:true}, (err, card)=>{
            if(err) return res.status(400).send(err.message);
        })
        res.status(200).send("Card has been updated successfully");
    } 
    catch(error){
        res.status(400).send(error.message);
    }
})

//like card
router.patch('/:id', auth([]), async(req,res)=>{
    try{
        //1. validate user by middleware
        //2. change the likes array
        const card = await Card.findById(req.params.id);
        if(!card) return res.status(400).send("Card not found");
        if(card.likes.includes(req.payload._id)) {
            card.likes = card.likes.filter(like => like !== req.payload._id);
            await card.save();
            return res.status(200).send("Card has been unliked successfully");
        }else{
            card.likes.push(req.payload._id);
            await card.save();
            res.status(200).send("Card has been liked successfully");
        }
    } 
    catch(error){
        res.status(400).send(error.message);
    }
})

//delete card
router.delete('/:id', auth([]),async(req,res)=>{
    try{
        //1. validate user by middleware
        //2. check the type of user
        const user = await User.findById(req.payload._id);
        const card = await Card.findOne({_id:req.params.id})
        if(!card) return res.status(400).send("Card not found");
        if(card.user_id !== req.payload._id && !user.isAdmin) return res.status(403).send("You are not allowed to delete this card");
        await Card.deleteOne({_id:req.params.id});
    }
    catch(error){
        res.status(400).send(error.message);
    }
})

module.exports = router;