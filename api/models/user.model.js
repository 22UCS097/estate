import mongoose from "mongoose";

const  userSchema=new mongoose.Schema({
    username:{
        type:String,
         required:true,
         unique:true,
    },
    email:{
        type:String,
         required:true,
         unique:true,
    },
    password:{
        type:String,
         required:true,
    },
    avatar:{
        type:String,
        default:"https://cdn.pixabay.com/animation/2023/06/13/15/13/15-13-16-585__480.png"
    },

},{ timestamps:true});

const User=mongoose.model('User',userSchema);
export default User;