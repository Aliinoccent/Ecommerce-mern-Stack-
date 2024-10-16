const mongoose=require('mongoose');
const reviewSchema=mongoose.Schema({
    Review:{
        type:String,
        require:true
    },
    User:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    Product:{
        type:mongoose.Schema.ObjectId,
        ref:"Porduct"
    }
})
module.exports=mongoose.model('Review',reviewSchema);