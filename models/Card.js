const { Schema, model,Types } = require('mongoose');
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
        url:{type:String, required:true},
        alt:{type:String,required:true, minlength:5}
    },
    address:{
        _id:{type:Schema.Types.ObjectId, default:()=>new Types.ObjectId()},
        state:{type:String, required:true},
        country:{type:String, required:true},
        city:{type:String, required:true},
        street:{type:String, required:true},
        houseNumber:{type:String, required:true},
        zipCode:{type:Number, default:0, required:true}
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

cardSchema.pre('save', async function (next) {
    if (this.bizNumber) return next(); // Skip if already has a bizNumber
    const generateUniqueBizNumber = async () => {
        const randomNumber = Math.floor(1000000 + Math.random() * 9000000);
        const existingCard = await Card.findOne({ bizNumber: randomNumber });
        return existingCard ? await generateUniqueBizNumber() : randomNumber;
    };
    this.bizNumber = await generateUniqueBizNumber();
    next();
});

cardSchema.virtual('user', {
    ref: 'User',
    localField: 'user_id',
    foreignField: '_id',
    justOne: true
});

const Card= model("cards", cardSchema);
module.exports = Card;
