const { required } = require('joi');
const { Schema, model } = require('mongoose');
const cardSchema = new Schema({
    title:{
        type:String,
        required:true,
        minlength:5
    },
    subtitle:{
        type:String,
        required:true,
        minlength:5
    },
    description:{
        type:String,
        required:true,
        minlength:5
    },
    phone:{
        type:Number,
        required:true,
        minlength:10,
        maxlength:10
    },
    email:{
        type:String,
        required:true,
        minlength:5
    },
    web:{
        type:String,
        required:true,
        minlength:5
    },
    image:{
        _id:{type:Schema.Types.ObjectId, default:()=>new Types.ObjectId()},
        "url":{type:String, required:true},
        "alt":{type:String,required:true, minlength:5}
    },
    address:{
        _id:{type:Schema.Types.ObjectId, default:()=>new Types.ObjectId()},
        "state":{type:String, required:true},
        "country":{type:String, required:true},
        "city":{type:String, required:true},
        "street":{type:String, required:true},
        "houseNumber":{type:String, required:true},
        "zipCode":{type:Number, default:0, required:true}
    },
    bizNumber:{
        type:Number,
    },
    likes:{
        type:Array,
    },
    user_id:{
        type:Schema.Types.ObjectId,
    }
},{timestamps:true});

cardSchema.virtual('user', {
    ref: 'User',
    localField: 'user_id',
    foreignField: '_id',
    justOne: true
});

const Card= model("cards", cardSchema);
module.exports = Card;
