import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs"
let UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide name'],
        minlength:3,
        maxlength:20,
        trim:true, 
    },
    email:{
        type:String,
        required:[true,'Please provide email'],
        validate:{
            validator:(value)=>validator.isEmail(value),
            message:'please provide a valid email'
        },
        unique:true,
        trim:true, 
    },
    password:{
        type:String,
        trim:true, 
        required:[true,'Please provide password'],
        minlength:6,
    },
    lastname:{
        type:String,
        trim:true,
        maxlength:20,
        default:'lastName' 
    },
    location:{
        type:String,
        trim:true,
        maxLength:20,
        default:'my city'
    }
},
{
    versionKey:false
})

UserSchema.pre('save', async function(){
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt) 
})


export default mongoose.model('User',UserSchema)