require('dotenv').config();
const mongoose=require('mongoose');

const dbgr=require('debug')('development:mongoose');


const main=async()=>{

    await  mongoose.connect(process.env.AT)
  }
  main().then((res)=>{
      dbgr('connected');
  }).catch((err)=>{
    dbgr('not connected',err);
  })
      module.exports=mongoose.connnection;  //exports the connection