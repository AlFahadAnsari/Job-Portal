import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    phonenumber:{
        type:Number,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        enum:["studen", "recruiter"]
    },
    profile:{
        bio:{type:String},
        skills :[{type:String}],
        resume:{type:String} ,// url
        resumeOriginalName:{type:String}, 
        company:{type:mongoose.Schema.Types.ObjectId, ref:"Company"},
        profilePhoto:{
            type:String,
            default:""
        }
    }
},{timestamps:true})

export const User = mongoose.model("User",userSchema)