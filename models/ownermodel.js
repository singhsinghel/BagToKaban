const { required } = require('joi');
const mongoose=require('mongoose');
const schema=mongoose.Schema;

const ownerSchema=schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:String,
    products:[],
    gstin:Number,
    picture:String,
});

const Owner=mongoose.model('Owner',ownerSchema);
module.exports= Owner;