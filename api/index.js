import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();



mongoose.connect(process.env.MONGO).then(()=>{
      console.log('connected to mongoDB!');
})
.catch((err)=>{
     comsole.log(err);
})

const app=express();

app.listen(300,()=>{
   console.log('server is running on 3000');
  }
);