const mongoose=require('mongoose');
const userSchema=new  mongoose.Schema({
        username:{
            type:String,

        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        hashPassword:{
            type:String,
            required:true,

        }, 
        phone:{
            type:Number,
            required:true
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        role:{
            type:String,
            required:true,
            enum:['user','admin'],
            default:'user'
        }

    });

module.exports=mongoose.model('User',userSchema);