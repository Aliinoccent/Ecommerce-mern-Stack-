const mongoose=require('mongoose');
const Category=mongoose.Schema({
    name:{
        type:String,
        required:true,
       
    },
    createdAt:{
        type:Date,
        defualt:new Date
    }
})
module.exports=mongoose.model('Category',Category);