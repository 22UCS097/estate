import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.router.js'
import authRouter from "./routes/auth.route.js"
import cookieParser from 'cookie-parser';

dotenv.config();



mongoose.connect(process.env.MONGO).then(()=>{
      console.log('connected to mongoDB!');
})
.catch((err)=>{
     comsole.log(err);
})

const app=express();
app.use(express.json());
app.use(cookieParser());

app.listen(3000,()=>{
   console.log('server is running on 3000');
  }
);

//api route:

app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);

//middelware:
app.use((err,req ,res , next)=>{
        const statusCode=err.statusCode|| 500;
         const message=err.message ||'Internal Server Error';
         return res.status(statusCode).json({
             success:false,
             statusCode,
             message,
         });
});

