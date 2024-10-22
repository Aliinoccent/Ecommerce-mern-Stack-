const mongoose=require('mongoose');
const Category=mongoose.Schema({
    name:{
        type:String,
        required:true,
       
    },
    image:{
        type:String
    },
    createdAt:{
        type:Date,
        defualt:new Date
    }
})
module.exports=mongoose.model('Category',Category);