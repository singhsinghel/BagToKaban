require('dotenv').config();
const mongoose=require('mongoose');

const dbgr=require('debug')('development:mongoose');


const connectionString = process.env.AT;
const main=async()=>{

  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  }
  main().then((res)=>{
      dbgr('connected');
  }).catch((err)=>{
    dbgr('not connected',err);
  })
      module.exports=mongoose.connnection;  //exports the connection