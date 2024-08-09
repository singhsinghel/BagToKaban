const mongoose=require('mongoose');
const User= require('./usermodel');
const { ref } = require('joi');
const { description, type } = require('../schema');
const Review=require('./reviewmodel');
const schema=mongoose.Schema;
const productSchema=schema({
    name:{
        type:String,
        required:true
    },
    panelColor:String,
    textColor:String,
    bgcolor:String,
    discount:{
        type:Number,
        default:0
    },
    price:Number,
    image:Buffer,
    owner:{
        type:schema.Types.ObjectId,
        ref:'User'
    },
    description:{
        type:String,
        minlength:25,
    },
    review:[{
        type:schema.Types.ObjectId,
        ref:'Review'

    }]
});
const Products=mongoose.model('Products',productSchema);

module.exports=Products;