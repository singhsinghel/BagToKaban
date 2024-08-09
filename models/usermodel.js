
const mongoose=require('mongoose');
const schema=mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const Products=require('./productmodel');
const { ref } = require('joi');

const cartSchema=schema({
    product:{type:schema.Types.ObjectId,ref:"Products"},
    quantity:{
        type:Number,
        default:1
    }
})

const userSchema=schema({
    email:{
        type:String,
        unique:true,
        required:true,
    },
    cart:[cartSchema],
    isadmin:Boolean,
    orders:[],
    contact:Number,
    picture:String,
});
userSchema.plugin(passportLocalMongoose);
const User=mongoose.model('User',userSchema);
module.exports=User;
