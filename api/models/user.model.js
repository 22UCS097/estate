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
        default:"https://static.vecteezy.com/system/resources/previews/024/766/962/original/silver-gradient-social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-free-vector.jpg"
    },

},{ timestamps:true});

const User=mongoose.model('User',userSchema);
export default User;