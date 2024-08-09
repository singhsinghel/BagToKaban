const express =require('express');
const router=express.Router();
const  Owner=require('../models/ownermodel');
const ExpressError=require('../utils/ExpressError');
const ownerSchema=require('../schema.js')

if(process.env.NODE_ENV==='development'){

    router.post('/create', async(req,res)=>{
        let owners= await Owner.find();
     
        
        if(owners.length>0){
            throw new ExpressError(500,"You don't have permission to create a new owner")
        }
        let result=ownerSchema.validate(req.body);
        console.log(result);
        if(result.error){
            throw new ExpressError(404,result.error)
        }
        let newOwner= new Owner(req.body);
        await newOwner.save();
        res.send(newOwner)
    })
}



module.exports=router;