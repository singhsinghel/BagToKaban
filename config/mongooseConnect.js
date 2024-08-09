require('dotenv').config();
const mongoose=require('mongoose');
//using config instead of .env as it is much secure
const dbgr=require('debug')('development:mongoose');


const main=async()=>{

    await  mongoose.connect("mongodb+srv://singhelboyankit:J5ZR9LKOzjFNePqR@bagtokabandb.nxmlo.mongodb.net/?retryWrites=true&w=majority&appName=BagtoKabandb")
  }
  main().then((res)=>{
      dbgr('connected');
  }).catch((err)=>{
    dbgr('not connected',err);
  })
      module.exports=mongoose.connnection;  //exports the connection