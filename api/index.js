import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.router.js'
import authRouter from "./routes/auth.route.js"
dotenv.config();



mongoose.connect(process.env.MONGO).then(()=>{
      console.log('connected to mongoDB!');
})
.catch((err)=>{
     comsole.log(err);
})

const app=express();
app.use(express.json());

app.listen(3000,()=>{
   console.log('server is running on 3000');
  }
);

//api route:

app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);